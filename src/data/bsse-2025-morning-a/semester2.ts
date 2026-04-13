import type { RawSemesterData } from "@/types";

export const semester2: RawSemesterData = {
    name: "BSSE Semester II",
    batch: "2025 (Morning Program)",
    university: "UBIT - University of Karachi",
    courses: [
        { code: "OOPs", name: "Object Oriented Concepts & Programming", creditHours: 4 },
        { code: "SE", name: "Software Engineering", creditHours: 3 },
        { code: "MV Calc", name: "Multivariable Calculus", creditHours: 3 },
        { code: "DM", name: "Discrete Mathematics", creditHours: 3 },
        { code: "PST", name: "Pakistan Studies", creditHours: 2 },
    ],
    students: [
        // ── Data will be added here ──────────────────────────────────────────
        // Format:
        // {
        //   roll: "MB25210106XXX",
        //   name: "STUDENT NAME",
        //   results: {
        //     "OOPs":    { marks: 0, grade: "F", gradePoint: 0 },
        //     "SE":      { marks: 0, grade: "F", gradePoint: 0 },
        //     "MV Calc": { marks: 0, grade: "F", gradePoint: 0 },
        //     "DM":      { marks: 0, grade: "F", gradePoint: 0 },
        //     "PST":     { marks: 0, grade: "F", gradePoint: 0 },
        //   }
        // },
    ],
};
