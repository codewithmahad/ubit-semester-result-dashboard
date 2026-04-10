/**
 * @file src/constants/academic.ts
 * @description Centralized academic constants for the UBIT Results Portal.
 *
 * All magic numbers and institutionally significant strings are declared here.
 * Components, pages, and utility functions MUST reference these constants —
 * never hardcode values like passing thresholds or grading boundaries inline.
 *
 * Source: Department of Computer Science, University of Karachi (UBIT).
 */

import type { GradeScale } from "@/types";

/**
 * The official UBIT grading scale as prescribed by the Department of
 * Computer Science, University of Karachi.
 *
 * Entries are ordered highest-to-lowest for correct range lookup via `Array.find()`.
 * Both `min` and `max` boundaries are inclusive.
 *
 * @example
 * // Resolve a grade for 87 marks:
 * const entry = UBIT_GRADE_SCALE.find(g => 87 >= g.min && 87 <= g.max);
 * // → { min: 85, max: 89, grade: "A", gp: 4.0 }
 */
export const UBIT_GRADE_SCALE: GradeScale[] = [
  { min: 90, max: 100, grade: "A+", gp: 4.0 },
  { min: 85, max: 89,  grade: "A",  gp: 4.0 },
  { min: 80, max: 84,  grade: "A-", gp: 3.8 },
  { min: 75, max: 79,  grade: "B+", gp: 3.4 },
  { min: 71, max: 74,  grade: "B",  gp: 3.0 },
  { min: 68, max: 70,  grade: "B-", gp: 2.8 },
  { min: 64, max: 67,  grade: "C+", gp: 2.4 },
  { min: 61, max: 63,  grade: "C",  gp: 2.0 },
  { min: 57, max: 60,  grade: "C-", gp: 1.8 },
  { min: 53, max: 56,  grade: "D+", gp: 1.4 },
  { min: 50, max: 52,  grade: "D",  gp: 1.0 },
  { min: 0,  max: 49,  grade: "F",  gp: 0.0 },
];

/**
 * The minimum CGPA a student must maintain to be considered in
 * good academic standing. Students below this threshold are flagged.
 */
export const PASSING_CGPA = 2.0;

/**
 * The maximum credit hours permitted for a single course at UBIT.
 * Used for validation in the GPA Calculator.
 */
export const MAX_CREDIT_HOURS = 4;

/** Official department name used in print-ready documents and footers. */
export const DEPARTMENT = "Department of Computer Science";

/** Full institutional name used in transcripts, PDFs, and metadata. */
export const UNIVERSITY = "UBIT - University of Karachi";

/**
 * Active batch metadata for the class this portal serves.
 * Update this object when the portal is extended to cover a new intake.
 */
export const BATCH_INFO = {
  batch: "2025",
  shift: "Evening",
} as const;
