import { Course, Student, Result } from "@/data/semester1";

export interface StudentRanking extends Student {
    sgpa: number;
    totalMarks: number;
    rank?: number;
}

export function calculateSGPA(courses: Course[], studentResults: Record<string, Result>): number {
    let totalGradePoints = 0;
    let totalCreditHours = 0;

    courses.forEach(course => {
        const result = studentResults[course.code];
        if (result) {
            totalGradePoints += result.gradePoint * course.creditHours;
            totalCreditHours += course.creditHours;
        }
    });

    if (totalCreditHours === 0) return 0;
    return Number((totalGradePoints / totalCreditHours).toFixed(2));
}

export function calculateTotalMarks(studentResults: Record<string, Result>): number {
    return Object.values(studentResults).reduce((sum, result) => sum + result.marks, 0);
}

export function calculateRankings(courses: Course[], students: Student[]): StudentRanking[] {
    const studentsWithStats: StudentRanking[] = students.map(student => ({
        ...student,
        sgpa: calculateSGPA(courses, student.results),
        totalMarks: calculateTotalMarks(student.results)
    }));

    // Sort by rules
    studentsWithStats.sort((a, b) => {
        if (b.sgpa !== a.sgpa) {
            return b.sgpa - a.sgpa; // Higher SGPA first
        }
        if (b.totalMarks !== a.totalMarks) {
            return b.totalMarks - a.totalMarks; // Higher total marks wins
        }
        return a.name.localeCompare(b.name); // Alphabetical
    });

    // Assign ranks (handle ties properly)
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
