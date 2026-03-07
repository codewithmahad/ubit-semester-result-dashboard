export interface Course {
  code: string;
  name: string;
  creditHours: number;
}

export interface Result {
  marks: number;
  gradePoint: number;
  grade: string;
}

export interface Student {
  name: string;
  roll: string;
  results: Record<string, Result>;
}

export interface SemesterData {
  name: string;
  batch: string;
  university: string;
  courses: Course[];
  students: Student[];
}

export const semester: SemesterData = {
  name: "BSSE Semester I",
  batch: "2025 (Evening Program)",
  university: "UBIT - University of Karachi",

  courses: [
    { code: "SE 352", name: "OBJECT ORIENTED CONCEPTS & PROGRAMMING", creditHours: 4 },
    { code: "SE 354", name: "SOFTWARE ENG. FUNDAMENTALS", creditHours: 3 },
    { code: "SE 356", name: "MULTIVARIABLE CALCULUS", creditHours: 3 },
    { code: "SE 358", name: "APPLIED PHYSICS", creditHours: 3 },
    { code: "SE 360", name: "PROBABILITY & STATISTICS", creditHours: 3 },
    { code: "SE 362", name: "ISLAMIC STUDIES OR ETHICS", creditHours: 2 }
  ],

  students: [
    {
      name: "Ahmed Ali",
      roll: "EB25210106114",
      results: {
        "SE 352": { marks: 88, gradePoint: 4.0, grade: "A" },
        "SE 354": { marks: 75, gradePoint: 3.5, grade: "B+" },
        "SE 356": { marks: 92, gradePoint: 4.0, grade: "A" },
        "SE 358": { marks: 81, gradePoint: 4.0, grade: "A-" },
        "SE 360": { marks: 85, gradePoint: 4.0, grade: "A" },
        "SE 362": { marks: 78, gradePoint: 3.5, grade: "B+" }
      }
    },
    {
      name: "Fatima Khan",
      roll: "EB25210106115",
      results: {
        "SE 352": { marks: 65, gradePoint: 2.5, grade: "C+" },
        "SE 354": { marks: 70, gradePoint: 3.0, grade: "B-" },
        "SE 356": { marks: 55, gradePoint: 1.5, grade: "D" },
        "SE 358": { marks: 61, gradePoint: 2.0, grade: "C" },
        "SE 360": { marks: 72, gradePoint: 3.0, grade: "B" },
        "SE 362": { marks: 68, gradePoint: 2.5, grade: "C+" }
      }
    },
    {
      name: "Muhammad Usman",
      roll: "EB25210106116",
      results: {
        "SE 352": { marks: 95, gradePoint: 4.0, grade: "A" },
        "SE 354": { marks: 90, gradePoint: 4.0, grade: "A" },
        "SE 356": { marks: 98, gradePoint: 4.0, grade: "A" },
        "SE 358": { marks: 89, gradePoint: 4.0, grade: "A" },
        "SE 360": { marks: 92, gradePoint: 4.0, grade: "A" },
        "SE 362": { marks: 85, gradePoint: 4.0, grade: "A" }
      }
    },
    {
      name: "Ayesha Noor",
      roll: "EB25210106117",
      results: {
        "SE 352": { marks: 78, gradePoint: 3.5, grade: "B+" },
        "SE 356": { marks: 84, gradePoint: 4.0, grade: "A-" },
        "SE 358": { marks: 76, gradePoint: 3.5, grade: "B+" },
        "SE 360": { marks: 80, gradePoint: 4.0, grade: "A-" },
        "SE 362": { marks: 71, gradePoint: 3.0, grade: "B-" }
      }
    }
  ]
};
