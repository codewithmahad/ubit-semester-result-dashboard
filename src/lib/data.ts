/**
 * src/lib/data.ts
 * Unified data adapter — wraps the raw semester data files and exposes
 * a clean, typed interface for the entire application.
 * All SGPA/CGPA values are computed here from the canonical grade points
 * stored in the semester data files.
 */

import { semester1 } from "@/data/semester1";
import { semester2 } from "@/data/semester2";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface CourseResult {
  courseCode: string;
  courseName: string;
  creditHours: number;
  marks: number;
  grade: string;
  gradePoint: number;
}

export interface SemesterRecord {
  semesterNum: number;
  semesterName: string;
  courses: CourseResult[];
  sgpa: number;
  totalCredits: number;
  qualityPoints: number;
}

export interface StudentProfile {
  rollNo: string;
  name: string;
  batch: string;
  shift: string;
  semesters: SemesterRecord[];
  cgpa: number;
  totalCredits: number;
  totalMarks: number;
  cgpaRank?: number;
}

export interface ClassRecord {
  batch: string;
  shift: string;
  semesterCount: number;
  students: StudentProfile[];
}

// ── Builder ────────────────────────────────────────────────────────────────────

function buildSemesterRecord(
  semData: typeof semester1,
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

  const qualityPoints = courses.reduce((sum, c) => sum + c.gradePoint * c.creditHours, 0);
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

function buildStudentProfiles(): StudentProfile[] {
  // Collect all unique roll numbers across both semesters
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
      batch: "2025",
      shift: "Evening",
      semesters,
      cgpa,
      totalCredits: totalCr,
      totalMarks,
    });
  }

  // Sort by CGPA → totalMarks → name
  profiles.sort((a, b) => {
    if (b.cgpa !== a.cgpa) return b.cgpa - a.cgpa;
    if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
    return a.name.localeCompare(b.name);
  });

  // Assign cumulative ranks (ties share the same rank)
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

// ── Cache ──────────────────────────────────────────────────────────────────────

let _cache: ClassRecord | null = null;

export function getClassData(): ClassRecord {
  if (_cache) return _cache;
  _cache = {
    batch: "2025",
    shift: "Evening",
    semesterCount: 2,
    students: buildStudentProfiles(),
  };
  return _cache;
}

// ── Query helpers ──────────────────────────────────────────────────────────────

export function getStudent(rollNo: string): StudentProfile | null {
  return getClassData().students.find((s) => s.rollNo === rollNo) ?? null;
}

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

export function getClassStats(students: StudentProfile[]) {
  const total = students.length;
  const withCGPA = students.filter((s) => s.cgpa > 0);
  const passing = students.filter((s) => s.cgpa >= 2.0).length;
  const avgCGPA =
    withCGPA.length > 0
      ? Number(
          (withCGPA.reduce((sum, s) => sum + s.cgpa, 0) / withCGPA.length).toFixed(2)
        )
      : 0;
  const passRate = total > 0 ? Math.round((passing / total) * 100) : 0;
  return { total, passing, passRate, avgCGPA };
}
