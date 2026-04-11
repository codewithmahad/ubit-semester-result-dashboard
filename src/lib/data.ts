/**
 * @file src/lib/data.ts
 * @description Unified data adapter — wraps dynamic semester data files and exposes
 * a clean, typed interface for the entire application.
 *
 * Responsibilities:
 *   - Load data dynamically using the CLASS_REGISTRY.
 *   - Build computed `StudentProfile` objects from raw semester records.
 *   - Expose query helpers (`getStudent`, `searchStudents`) that scan all registries.
 */

import { PASSING_CGPA } from "@/constants/academic";
import { CLASS_REGISTRY, type ClassMetadata } from "@/data/registry";
import type {
  RawSemesterData,
  CourseResult,
  SemesterRecord,
  StudentProfile,
  ClassRecord,
} from "@/types";

export type { CourseResult, SemesterRecord, StudentProfile, ClassRecord };

// ─── Dynamic Loader ────────────────────────────────────────────────────────
// Next.js (Webpack) can bundle this safely because the base path is static.
export async function loadClassSemesters(classId: string): Promise<RawSemesterData[]> {
  const meta = CLASS_REGISTRY.find((c) => c.id === classId);
  if (!meta) return [];

  const semestersData: RawSemesterData[] = [];
  for (const sem of meta.activeSemesters) {
    try {
      const mod = await import(`@/data/${classId}/${sem}.ts`);
      if (mod && mod[sem]) {
        semestersData.push(mod[sem]);
      }
    } catch (e) {
      console.warn(`Failed to dynamically load @/data/${classId}/${sem}.ts`, e);
    }
  }

  return semestersData;
}

// ─── Internal Builders ────────────────────────────────────────────────────────

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
  const sgpa = totalCredits > 0 ? Number((qualityPoints / totalCredits).toFixed(2)) : 0;

  return {
    semesterNum: semNum,
    semesterName: semData.name,
    courses,
    sgpa,
    totalCredits,
    qualityPoints,
  };
}

function buildStudentProfiles(
  meta: ClassMetadata,
  semestersData: RawSemesterData[]
): StudentProfile[] {
  if (semestersData.length === 0) return [];

  const rollSet = new Set<string>();
  semestersData.forEach((sem) => {
    if (sem.students) {
      sem.students.forEach((s) => rollSet.add(s.roll));
    }
  });

  const profiles: StudentProfile[] = [];

  for (const roll of rollSet) {
    // Find the student name from the first available record
    let name = "";
    const semesters: SemesterRecord[] = [];
    let totalQP = 0;
    let totalCr = 0;
    let totalMarks = 0;

    semestersData.forEach((sem, index) => {
      if (!sem.students) return;
      const sRaw = sem.students.find((s) => s.roll === roll);
      if (sRaw) {
        if (!name) name = sRaw.name;
        // Construct the semNum from index
        const record = buildSemesterRecord(sem, index + 1, sRaw.results);
        if (record) {
          semesters.push(record);
          totalQP += record.qualityPoints;
          totalCr += record.totalCredits;
          record.courses.forEach((c) => (totalMarks += c.marks));
        }
      }
    });

    const cgpa = totalCr > 0 ? Number((totalQP / totalCr).toFixed(2)) : 0;

    profiles.push({
      rollNo: roll,
      name,
      batch: meta.batch,
      shift: meta.shift,
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
const _cache: Record<string, ClassRecord> = {};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the fully computed `ClassRecord` for a given class ID dynamically.
 */
export async function getClassData(classId: string): Promise<ClassRecord | null> {
  if (_cache[classId]) return _cache[classId];

  const meta = CLASS_REGISTRY.find(c => c.id === classId);
  if (!meta) return null;

  const semestersData = await loadClassSemesters(classId);

  const record: ClassRecord = {
    batch: meta.batch,
    shift: meta.shift,
    semesterCount: semestersData.length,
    students: buildStudentProfiles(meta, semestersData),
  };

  _cache[classId] = record;
  return record;
}

/**
 * Looks up a single student profile by roll number across ALL registries.
 */
export async function getStudent(rollNo: string): Promise<StudentProfile | null> {
  for (const meta of CLASS_REGISTRY) {
    const classData = await getClassData(meta.id);
    if (!classData) continue;
    const student = classData.students.find((s) => s.rollNo === rollNo);
    if (student) return student;
  }
  return null;
}

/**
 * Searches for students matching a name or roll number query across ALL registries.
 */
export async function searchStudents(
  query: string
): Promise<Pick<StudentProfile, "rollNo" | "name" | "cgpa" | "cgpaRank">[]> {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  
  const results: Pick<StudentProfile, "rollNo" | "name" | "cgpa" | "cgpaRank">[] = [];

  for (const meta of CLASS_REGISTRY) {
    const classData = await getClassData(meta.id);
    if (!classData) continue;
    
    const matches = classData.students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q)
    );
    matches.forEach(({ rollNo, name, cgpa, cgpaRank }) => {
      results.push({ rollNo, name, cgpa, cgpaRank });
    });
  }

  // Cap to 8
  return results.slice(0, 8);
}

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
