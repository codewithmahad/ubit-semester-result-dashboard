import type { RawSemesterData } from "@/types";

export const semester1: RawSemesterData = {
  name: "Semester I", // Adjust as appropriate
  batch: "2025 (Morning Program)",
  university: "UBIT - University of Karachi",
  courses: [
    { code: "CS-351", name: "Programming Fundamentals", creditHours: 4 }, // PF
    { code: "CS-353", name: "Introduction to ICT", creditHours: 3 },
    { code: "MATH-355", name: "Calculus and Analytical Geometry", creditHours: 3 },
    { code: "PHY-357", name: "Physics", creditHours: 3 },
    { code: "ISL-359", name: "Islamiat", creditHours: 2 },
    { code: "ENG-361", name: "Functional English", creditHours: 3 },
  ],
  students: []
};
