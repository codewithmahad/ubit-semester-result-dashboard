/**
 * @file src/lib/data.ts
 * @description Unified data adapter — wraps raw semester data files and exposes
 * a clean, typed interface for the entire application.
 *
 * Responsibilities:
 *   - Build computed `StudentProfile` objects from raw semester records.
 *   - Compute and cache the full `ClassRecord` for the active batch.
 *   - Expose query helpers (`getStudent`, `searchStudents`, `getClassStats`)
 *     so pages never import directly from src/data/*.ts files.
 *
 * All SGPA/CGPA computation is delegated to `src/lib/utils/academic-math.ts`.
 * All types are sourced from `src/types/index.ts`.
 * All constants (batch name, passing threshold) are sourced from `src/constants/academic.ts`.
 *
 * Re-exports computed types for backward compatibility with components that
 * currently import types from this module.
 */

import { semester1 } from "@/data/semester1";
import { semester2 } from "@/data/semester2";
import { BATCH_INFO, PASSING_CGPA } from "@/constants/academic";
import type {
  RawSemesterData,
  CourseResult,
  SemesterRecord,
  StudentProfile,
  ClassRecord,
} from "@/types";

// Re-export computed types so existing consumers don't break.
// New code should import directly from "@/types".
export type { CourseResult, SemesterRecord, StudentProfile, ClassRecord };

// ─── Internal Builders ────────────────────────────────────────────────────────

/**
 * Builds a single computed `SemesterRecord` for one student within a semester.
 *
 * Filters to only the courses for which this student has a result entry,
 * then calculates SGPA and quality points from those results.
 *
 * @param semData        - The full raw semester data object.
 * @param semNum         - The semester number (1, 2, 3, …) for display purposes.
 * @param studentResults - The student's raw result map (code → result).
 * @returns A computed `SemesterRecord`, or `null` if the student has no results.
 */
function buildSemesterRecord(
  semData: RawSemesterData,
  semNum: number,
  studentResults: Record<string, { marks: number; gradePoint: number; grade: string }>
): SemesterRecord | null {
  const courses: CourseResult[] = semData.courses
    .filter((c) => studentResults[c.code])
    .map((c) => {
      const r = studentResults[c.code];
      return {
        courseCode: c.code,
        courseName: c.name,
        creditHours: c.creditHours,
        marks: r.marks,
        grade: r.grade,
        gradePoint: r.gradePoint,
      };
    });

  if (courses.length === 0) return null;

  const qualityPoints = courses.reduce(
    (sum, c) => sum + c.gradePoint * c.creditHours,
    0
  );
  const totalCredits = courses.reduce((sum, c) => sum + c.creditHours, 0);
  const sgpa =
    totalCredits > 0 ? Number((qualityPoints / totalCredits).toFixed(2)) : 0;

  return {
    semesterNum: semNum,
    semesterName: semData.name,
    courses,
    sgpa,
    totalCredits,
    qualityPoints,
  };
}

/**
 * Constructs the full list of computed `StudentProfile` objects by merging
 * data across all available semesters.
 *
 * A student who only appears in Semester 1 will still be included, with their
 * Semester 2 record simply absent from their `semesters` array.
 *
 * After building, profiles are sorted by CGPA → totalMarks → name,
 * and tie-aware `cgpaRank` values are assigned.
 *
 * @returns Sorted array of `StudentProfile` with ranks assigned.
 */
function buildStudentProfiles(): StudentProfile[] {
  // Collect unique roll numbers across all semesters
  const rollSet = new Set<string>();
  semester1.students.forEach((s) => rollSet.add(s.roll));
  semester2.students.forEach((s) => rollSet.add(s.roll));

  const profiles: StudentProfile[] = [];

  for (const roll of rollSet) {
    const s1 = semester1.students.find((s) => s.roll === roll);
    const s2 = semester2.students.find((s) => s.roll === roll);
    const name = (s1 ?? s2)!.name;

    const semesters: SemesterRecord[] = [];
    let totalQP = 0;
    let totalCr = 0;
    let totalMarks = 0;

    const sem1Record = s1 ? buildSemesterRecord(semester1, 1, s1.results) : null;
    const sem2Record = s2 ? buildSemesterRecord(semester2, 2, s2.results) : null;

    if (sem1Record) {
      semesters.push(sem1Record);
      totalQP += sem1Record.qualityPoints;
      totalCr += sem1Record.totalCredits;
      sem1Record.courses.forEach((c) => (totalMarks += c.marks));
    }

    if (sem2Record) {
      semesters.push(sem2Record);
      totalQP += sem2Record.qualityPoints;
      totalCr += sem2Record.totalCredits;
      sem2Record.courses.forEach((c) => (totalMarks += c.marks));
    }

    const cgpa = totalCr > 0 ? Number((totalQP / totalCr).toFixed(2)) : 0;

    profiles.push({
      rollNo: roll,
      name,
      batch: BATCH_INFO.batch,
      shift: BATCH_INFO.shift,
      semesters,
      cgpa,
      totalCredits: totalCr,
      totalMarks,
    });
  }

  // Sort by CGPA → totalMarks → alphabetical name
  profiles.sort((a, b) => {
    if (b.cgpa !== a.cgpa) return b.cgpa - a.cgpa;
    if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
    return a.name.localeCompare(b.name);
  });

  // Tie-aware CGPA rank assignment
  let rank = 1;
  for (let i = 0; i < profiles.length; i++) {
    if (
      i > 0 &&
      profiles[i].cgpa === profiles[i - 1].cgpa &&
      profiles[i].totalMarks === profiles[i - 1].totalMarks
    ) {
      profiles[i].cgpaRank = profiles[i - 1].cgpaRank;
    } else {
      profiles[i].cgpaRank = rank;
    }
    rank++;
  }

  return profiles;
}

// ─── Module-Level Cache ───────────────────────────────────────────────────────

/** Cached ClassRecord — built once on first call, reused on all subsequent calls. */
let _cache: ClassRecord | null = null;

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the fully computed `ClassRecord` for the active batch.
 *
 * The result is memoized: the `buildStudentProfiles()` computation only runs
 * on the first call. All subsequent calls return the cached value.
 *
 * @returns The batch's `ClassRecord` containing all computed student profiles.
 */
export function getClassData(): ClassRecord {
  if (_cache) return _cache;
  _cache = {
    batch: BATCH_INFO.batch,
    shift: BATCH_INFO.shift,
    semesterCount: 2,
    students: buildStudentProfiles(),
  };
  return _cache;
}

/**
 * Looks up a single student profile by roll number.
 *
 * @param rollNo - The student's roll number (e.g. "EB25210106004").
 * @returns The matching `StudentProfile`, or `null` if not found.
 */
export function getStudent(rollNo: string): StudentProfile | null {
  return getClassData().students.find((s) => s.rollNo === rollNo) ?? null;
}

/**
 * Searches for students matching a name or roll number query.
 *
 * Matching is case-insensitive, space-trimmed substring search.
 * Results are capped at 8 entries to keep the search omnibar performant.
 *
 * @param query - The raw search query string from the user input.
 * @returns Up to 8 minimal student records (rollNo, name, cgpa, cgpaRank).
 */
export function searchStudents(
  query: string
): Pick<StudentProfile, "rollNo" | "name" | "cgpa" | "cgpaRank">[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return getClassData()
    .students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q)
    )
    .slice(0, 8)
    .map(({ rollNo, name, cgpa, cgpaRank }) => ({ rollNo, name, cgpa, cgpaRank }));
}

/**
 * Computes summary statistics for a given list of student profiles.
 *
 * Statistics computed:
 *   - `total`    — total number of students.
 *   - `passing`  — students with CGPA ≥ PASSING_CGPA (2.0).
 *   - `passRate` — percentage of passing students (rounded integer).
 *   - `avgCGPA`  — class average CGPA among students with CGPA > 0.
 *
 * @param students - Array of student profiles (typically from `getClassData().students`).
 * @returns An object with the four computed statistics.
 */
export function getClassStats(students: StudentProfile[]) {
  const total = students.length;
  const withCGPA = students.filter((s) => s.cgpa > 0);
  const passing = students.filter((s) => s.cgpa >= PASSING_CGPA).length;
  const avgCGPA =
    withCGPA.length > 0
      ? Number(
          (withCGPA.reduce((sum, s) => sum + s.cgpa, 0) / withCGPA.length).toFixed(2)
        )
      : 0;
  const passRate = total > 0 ? Math.round((passing / total) * 100) : 0;
  return { total, passing, passRate, avgCGPA };
}
