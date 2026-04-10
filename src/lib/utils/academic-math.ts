/**
 * @file src/lib/utils/academic-math.ts
 * @description Pure, stateless utility functions for all academic computations
 * in the UBIT Results Portal.
 *
 * Design constraints:
 *   - Every function is a pure function: no side effects, no React imports,
 *     no module-level state, no API calls.
 *   - All grade boundary logic flows through the single `UBIT_GRADE_SCALE`
 *     constant from src/constants/academic.ts — never hardcode grade ranges.
 *   - Ranking functions implement tie-aware logic: students with identical
 *     SGPA and total marks receive the same rank number.
 *
 * This file is the single authoritative source for GPA math, ranking
 * algorithms, and grade lookups. Import from here, never from legacy files.
 */

import { UBIT_GRADE_SCALE } from "@/constants/academic";
import type {
  Course,
  SemesterResult,
  RawStudent,
  RawSemesterData,
  GradeInfo,
  StudentRanking,
  CGPARanking,
} from "@/types";

// ─── Grade Lookup ─────────────────────────────────────────────────────────────

/**
 * Resolves the UBIT grade letter and grade point for a given marks score.
 *
 * Uses the official `UBIT_GRADE_SCALE` from src/constants/academic.ts.
 * Falls back to the "F" entry (last in scale) if no range matches.
 *
 * @param marks - The student's percentage marks, expected in [0, 100].
 * @returns A `GradeInfo` object with the grade letter and numeric grade point.
 *
 * @example
 * getGradeInfo(92)  // → { grade: "A+", gradePoint: 4.0 }
 * getGradeInfo(71)  // → { grade: "B",  gradePoint: 3.0 }
 * getGradeInfo(45)  // → { grade: "F",  gradePoint: 0.0 }
 */
export function getGradeInfo(marks: number): GradeInfo {
  const entry = UBIT_GRADE_SCALE.find((g) => marks >= g.min && marks <= g.max);
  const fallback = UBIT_GRADE_SCALE[UBIT_GRADE_SCALE.length - 1];
  return {
    grade: (entry ?? fallback).grade,
    gradePoint: (entry ?? fallback).gp,
  };
}

/**
 * Returns a Tailwind CSS class string for styling grade badges in the UI.
 *
 * Produces a consistent color-coding convention:
 *   - A-grades → green
 *   - B-grades → blue
 *   - C-grades → orange
 *   - F        → red
 *   - D/other  → neutral gray
 *
 * @param grade - The letter grade string (e.g. "A+", "B-", "C", "F").
 * @returns A space-separated Tailwind class string for text, bg, and border.
 */
export function getGradeColor(grade: string): string {
  if (grade === "F") return "text-red-700 bg-red-50 border-red-200";
  if (grade.startsWith("A")) return "text-green-700 bg-green-50 border-green-200";
  if (grade.startsWith("B")) return "text-blue-700 bg-blue-50 border-blue-200";
  if (grade.startsWith("C")) return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
}

// ─── GPA Calculation ──────────────────────────────────────────────────────────

/**
 * Calculates the Semester Grade Point Average (SGPA) for a student.
 *
 * Formula: SGPA = Σ(gradePoint × creditHours) / Σ(creditHours)
 * Only courses for which the student has a result entry are included.
 *
 * @param courses       - The ordered list of courses for the semester.
 * @param studentResults - Map of course codes → the student's result object.
 * @returns SGPA rounded to 2 decimal places, or `0` if no matching credits found.
 *
 * @example
 * calculateSGPA(courses, student.results) // → 3.45
 */
export function calculateSGPA(
  courses: Course[],
  studentResults: Record<string, SemesterResult>
): number {
  let totalGradePoints = 0;
  let totalCreditHours = 0;

  courses.forEach((course) => {
    const result = studentResults[course.code];
    if (result) {
      totalGradePoints += result.gradePoint * course.creditHours;
      totalCreditHours += course.creditHours;
    }
  });

  if (totalCreditHours === 0) return 0;
  return Number((totalGradePoints / totalCreditHours).toFixed(2));
}

/**
 * Computes the sum of all marks values in a student's result record.
 *
 * @param studentResults - Map of course codes → the student's result object.
 * @returns Integer sum of all `marks` values across all courses.
 */
export function calculateTotalMarks(
  studentResults: Record<string, SemesterResult>
): number {
  return Object.values(studentResults).reduce(
    (sum, result) => sum + result.marks,
    0
  );
}

// ─── Semester Ranking ─────────────────────────────────────────────────────────

/**
 * Generates a sorted, tie-aware ranked list of students for a single semester.
 *
 * Sorting priority:
 *   1. Higher SGPA wins.
 *   2. On SGPA tie → higher total marks wins.
 *   3. On total marks tie → alphabetical name (A→Z).
 *
 * Tie-aware ranking: students with identical SGPA **and** total marks receive
 * the same rank number. Subsequent ranks are not skipped (dense ranking).
 *
 * @param courses  - The semester's course definitions (needed to compute SGPA).
 * @param students - Raw student records for this semester.
 * @returns Array of `StudentRanking` objects, sorted and with `rank` assigned.
 */
export function calculateRankings(
  courses: Course[],
  students: RawStudent[]
): StudentRanking[] {
  const studentsWithStats: StudentRanking[] = students.map((student) => ({
    ...student,
    sgpa: calculateSGPA(courses, student.results),
    totalMarks: calculateTotalMarks(student.results),
  }));

  studentsWithStats.sort((a, b) => {
    if (b.sgpa !== a.sgpa) return b.sgpa - a.sgpa;
    if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
    return a.name.localeCompare(b.name);
  });

  let currentRank = 1;
  for (let i = 0; i < studentsWithStats.length; i++) {
    if (
      i > 0 &&
      studentsWithStats[i].sgpa === studentsWithStats[i - 1].sgpa &&
      studentsWithStats[i].totalMarks === studentsWithStats[i - 1].totalMarks
    ) {
      studentsWithStats[i].rank = studentsWithStats[i - 1].rank;
    } else {
      studentsWithStats[i].rank = currentRank;
    }
    currentRank++;
  }

  return studentsWithStats;
}

// ─── Cumulative Ranking ───────────────────────────────────────────────────────

/**
 * Generates a cumulative GPA (CGPA) ranking list by aggregating results
 * from two distinct semester data objects.
 *
 * Students present in only one semester are included with a SGPA of `0`
 * for the absent semester — they are not excluded from the final ranking.
 *
 * CGPA formula: (Σ quality points across all semesters) / (Σ credit hours)
 *
 * Sorting and tie-breaking follow the same rules as `calculateRankings()`,
 * but use CGPA instead of SGPA.
 *
 * @param sem1 - Full raw data object for Semester 1.
 * @param sem2 - Full raw data object for Semester 2.
 * @returns Sorted, ranked array of `CGPARanking` objects.
 */
export function calculateCGPARankings(
  sem1: RawSemesterData,
  sem2: RawSemesterData
): CGPARanking[] {
  const cgpaMap = new Map<string, CGPARanking>();

  // ── Process Semester 1 ──────────────────────────────────────────
  const sem1Rankings = calculateRankings(sem1.courses, sem1.students);
  sem1Rankings.forEach((s1) => {
    let totalPoints = 0;
    let totalCredits = 0;
    sem1.courses.forEach((c) => {
      const r = s1.results[c.code];
      if (r) {
        totalPoints += r.gradePoint * c.creditHours;
        totalCredits += c.creditHours;
      }
    });

    cgpaMap.set(s1.roll, {
      name: s1.name,
      roll: s1.roll,
      sem1SGPA: s1.sgpa,
      sem2SGPA: 0,
      cgpa: 0,
      totalMarks: s1.totalMarks,
      sem1Points: totalPoints,
      sem1Credits: totalCredits,
      sem2Points: 0,
      sem2Credits: 0,
    });
  });

  // ── Process Semester 2 ──────────────────────────────────────────
  const sem2Rankings = calculateRankings(sem2.courses, sem2.students);
  sem2Rankings.forEach((s2) => {
    let totalPoints = 0;
    let totalCredits = 0;
    sem2.courses.forEach((c) => {
      const r = s2.results[c.code];
      if (r) {
        totalPoints += r.gradePoint * c.creditHours;
        totalCredits += c.creditHours;
      }
    });

    if (cgpaMap.has(s2.roll)) {
      const entry = cgpaMap.get(s2.roll)!;
      entry.sem2SGPA = s2.sgpa;
      entry.sem2Points = totalPoints;
      entry.sem2Credits = totalCredits;
      entry.totalMarks += s2.totalMarks;
    } else {
      cgpaMap.set(s2.roll, {
        name: s2.name,
        roll: s2.roll,
        sem1SGPA: 0,
        sem2SGPA: s2.sgpa,
        cgpa: 0,
        totalMarks: s2.totalMarks,
        sem1Points: 0,
        sem1Credits: 0,
        sem2Points: totalPoints,
        sem2Credits: totalCredits,
      });
    }
  });

  // ── Compute final CGPA for every entry ─────────────────────────
  const finalRankings = Array.from(cgpaMap.values()).map((entry) => {
    const totalCredits = entry.sem1Credits + entry.sem2Credits;
    const totalPoints = entry.sem1Points + entry.sem2Points;
    entry.cgpa =
      totalCredits === 0 ? 0 : Number((totalPoints / totalCredits).toFixed(2));
    return entry;
  });

  // ── Sort by CGPA → totalMarks → name ───────────────────────────
  finalRankings.sort((a, b) => {
    if (b.cgpa !== a.cgpa) return b.cgpa - a.cgpa;
    if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
    return a.name.localeCompare(b.name);
  });

  // ── Assign tie-aware ranks ──────────────────────────────────────
  let currentRank = 1;
  for (let i = 0; i < finalRankings.length; i++) {
    if (
      i > 0 &&
      finalRankings[i].cgpa === finalRankings[i - 1].cgpa &&
      finalRankings[i].totalMarks === finalRankings[i - 1].totalMarks
    ) {
      finalRankings[i].rank = finalRankings[i - 1].rank;
    } else {
      finalRankings[i].rank = currentRank;
    }
    currentRank++;
  }

  return finalRankings;
}
