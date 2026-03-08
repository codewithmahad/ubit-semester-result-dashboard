import { Course, Student, Result, SemesterData } from "@/data/semester1";

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

export function calculateCGPARankings(sem1: SemesterData, sem2: SemesterData): CGPARanking[] {
    const cgpaMap = new Map<string, CGPARanking>();

    // Process Sem 1
    const sem1Rankings = calculateRankings(sem1.courses, sem1.students);
    sem1Rankings.forEach(s1 => {
        let totalPoints = 0;
        let totalCredits = 0;

        sem1.courses.forEach(c => {
            const r = s1.results[c.code];
            if (r) { totalPoints += r.gradePoint * c.creditHours; totalCredits += c.creditHours; }
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
            sem2Credits: 0
        });
    });

    // Process Sem 2
    const sem2Rankings = calculateRankings(sem2.courses, sem2.students);
    sem2Rankings.forEach(s2 => {
        let totalPoints = 0;
        let totalCredits = 0;

        sem2.courses.forEach(c => {
            const r = s2.results[c.code];
            if (r) { totalPoints += r.gradePoint * c.creditHours; totalCredits += c.creditHours; }
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
                sem2Credits: totalCredits
            });
        }
    });

    // Calculate Final CGPA
    const finalRankings = Array.from(cgpaMap.values()).map(entry => {
        const totalCredits = entry.sem1Credits + entry.sem2Credits;
        const totalPoints = entry.sem1Points + entry.sem2Points;
        entry.cgpa = totalCredits === 0 ? 0 : Number((totalPoints / totalCredits).toFixed(2));
        return entry;
    });

    // Sort by CGPA
    finalRankings.sort((a, b) => {
        if (b.cgpa !== a.cgpa) return b.cgpa - a.cgpa;
        if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
        return a.name.localeCompare(b.name);
    });

    // Assign Rank
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
