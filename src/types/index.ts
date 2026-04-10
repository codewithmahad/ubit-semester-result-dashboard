/**
 * @file src/types/index.ts
 * @description Central type registry for the UBIT Results Portal.
 *
 * All domain interfaces are defined and exported from this single file.
 * Components, pages, and lib utilities MUST import types from here —
 * never define structural interfaces inline in component or data files.
 *
 * Layer separation:
 *   - "Raw" types mirror the shape stored in src/data/*.ts files.
 *   - "Computed" types are built by src/lib/data.ts from the raw data.
 *   - "Ranking" types are produced by src/lib/utils/academic-math.ts.
 *   - "UI" types are specific to individual page/component concerns.
 */

// ─── Raw Data Layer ───────────────────────────────────────────────────────────
// These types mirror the exact shape stored in src/data/semester*.ts files.

/**
 * A single academic course definition.
 * The `code` field is used as the key in student result records.
 */
export interface Course {
  code: string;
  name: string;
  creditHours: number;
}

/**
 * A student's raw result entry for a single course, as stored in the data files.
 */
export interface SemesterResult {
  marks: number;
  gradePoint: number;
  grade: string;
}

/**
 * A single student record as stored in a raw semester data file.
 * `results` is keyed by course code (matching `Course.code`).
 */
export interface RawStudent {
  name: string;
  roll: string;
  results: Record<string, SemesterResult>;
}

/**
 * The top-level shape of a semester data file (e.g. src/data/semester1.ts).
 * This is the canonical raw data contract — do not define it elsewhere.
 */
export interface RawSemesterData {
  name: string;
  batch: string;
  university: string;
  courses: Course[];
  students: RawStudent[];
}

// ─── Computed / Presentation Layer ───────────────────────────────────────────
// These types are produced by src/lib/data.ts and consumed by pages/components.

/**
 * A single course result entry on a student's computed academic record.
 * Flattened from RawStudent for easier rendering.
 */
export interface CourseResult {
  courseCode: string;
  courseName: string;
  creditHours: number;
  marks: number;
  grade: string;
  gradePoint: number;
}

/**
 * A fully computed semester record attached to a StudentProfile.
 * Includes derived values: SGPA, total credits, and quality points.
 */
export interface SemesterRecord {
  semesterNum: number;
  semesterName: string;
  courses: CourseResult[];
  sgpa: number;
  totalCredits: number;
  qualityPoints: number;
}

/**
 * The full computed academic profile for a student.
 * Built by `buildStudentProfiles()` in src/lib/data.ts.
 */
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

/**
 * A batch-level container holding all computed student profiles for a class.
 */
export interface ClassRecord {
  batch: string;
  shift: string;
  semesterCount: number;
  students: StudentProfile[];
}

// ─── Grading & Ranking Types ──────────────────────────────────────────────────

/**
 * The resolved grade letter and grade point for a given marks value.
 * Returned by `getGradeInfo()` in src/lib/utils/academic-math.ts.
 */
export interface GradeInfo {
  grade: string;
  gradePoint: number;
}

/**
 * A single entry in the UBIT official grading scale table.
 * `min` and `max` are inclusive mark boundaries (e.g. 85–89 → "A").
 */
export interface GradeScale {
  min: number;
  max: number;
  grade: string;
  gp: number;
}

/**
 * A student record augmented with computed SGPA, total marks,
 * and a rank position for a single semester leaderboard.
 */
export interface StudentRanking extends RawStudent {
  sgpa: number;
  totalMarks: number;
  rank?: number;
}

/**
 * A student's cumulative GPA ranking record, spanning multiple semesters.
 * Produced by `calculateCGPARankings()` in src/lib/utils/academic-math.ts.
 */
export interface CGPARanking {
  name: string;
  roll: string;
  sem1SGPA: number;
  sem2SGPA: number;
  cgpa: number;
  totalMarks: number;
  rank?: number;
  sem1Points: number;
  sem1Credits: number;
  sem2Points: number;
  sem2Credits: number;
}

// ─── UI-Specific Types ────────────────────────────────────────────────────────
// Types scoped to a specific page or component's local state/props.

/**
 * A single editable row in the GPA Calculator page's course list.
 */
export interface CalculatorRow {
  id: string;
  subject: string;
  credits: number;
  marks: number;
}

/**
 * A section card entry displayed on the Leaderboards page.
 * Represents one available class section with result data.
 */
export interface ClassSection {
  id: string;
  batch: string;
  section: string;
  degree: string;
  semester: string;
  students: number;
  cr: string;
  topPerformer: string;
  href: string;
  live: boolean;
}
