import fs from "fs";

const englishJSONPath = "scripts/raw-sem1-english.json";
const pstJSONPath = "scripts/raw-sem1-pst.json";
const discreteJSONPath = "scripts/raw-sem1-discrete.json";
const calcJSONPath = "scripts/raw-sem1-calc.json";
const ictJSONPath = "scripts/raw-sem1-ict.json";
const pfJSONPath = "scripts/raw-sem1-pf.json";

let englishData = [];
let pstData = [];
let discreteData = [];
let calcData = [];
let ictData = [];
let pfData = [];

if (fs.existsSync(englishJSONPath)) {
    englishData = JSON.parse(fs.readFileSync(englishJSONPath, "utf-8"));
}
if (fs.existsSync(pstJSONPath)) {
    pstData = JSON.parse(fs.readFileSync(pstJSONPath, "utf-8"));
}
if (fs.existsSync(discreteJSONPath)) {
    discreteData = JSON.parse(fs.readFileSync(discreteJSONPath, "utf-8"));
}
if (fs.existsSync(calcJSONPath)) {
    calcData = JSON.parse(fs.readFileSync(calcJSONPath, "utf-8"));
}
if (fs.existsSync(ictJSONPath)) {
    ictData = JSON.parse(fs.readFileSync(ictJSONPath, "utf-8"));
}
if (fs.existsSync(pfJSONPath)) {
    pfData = JSON.parse(fs.readFileSync(pfJSONPath, "utf-8"));
}

const processGrades = (marks) => {
    if (marks === "N/A" || typeof marks !== 'number') return { grade: "-", gradePoint: 0.0 };
    if (marks >= 85) return { grade: "A", gradePoint: 4.0 };
    if (marks >= 80) return { grade: "A-", gradePoint: 3.7 };
    if (marks >= 75) return { grade: "B+", gradePoint: 3.3 };
    if (marks >= 71) return { grade: "B", gradePoint: 3.0 };
    if (marks >= 68) return { grade: "B-", gradePoint: 2.7 };
    if (marks >= 64) return { grade: "C+", gradePoint: 2.3 };
    if (marks >= 60) return { grade: "C", gradePoint: 2.0 };
    if (marks >= 57) return { grade: "C-", gradePoint: 1.7 };
    if (marks >= 53) return { grade: "D+", gradePoint: 1.3 };
    if (marks >= 50) return { grade: "D", gradePoint: 1.0 };
    return { grade: "F", gradePoint: 0.0 };
};

const studentsMap = new Map();

const mergeData = (data, subjectCode) => {
    for (const entry of data) {
        const roll = entry["Seat No"];
        if (!roll) continue;

        if (!studentsMap.has(roll)) {
            studentsMap.set(roll, { name: entry["Student Name"], roll, results: {} });
        }

        let marks = entry["Theory Marks"];
        if (marks === "N/A" || typeof marks !== 'number') continue; // Skip N/A

        let gradeInfo = processGrades(marks);

        const student = studentsMap.get(roll);
        student.results[subjectCode] = { marks: marks, gradePoint: gradeInfo.gradePoint, grade: gradeInfo.grade };
    }
};

const mergeDataPF = (data, subjectCode) => {
    for (const entry of data) {
        let marks = entry["PF Marks"];
        if (marks === "N/A" || typeof marks !== 'number') continue;

        let roll = entry["Seat No"];
        let name = entry["Student Name"].replace(/ YOU$/, "").trim();

        let correctRoll = null;

        for (const [r, student] of studentsMap.entries()) {
            if (student.name.toUpperCase() === name.toUpperCase()) {
                correctRoll = r;
                break;
            }
        }

        if (!correctRoll) {
            for (const [r, student] of studentsMap.entries()) {
                let n1 = student.name.toLowerCase().replace(/[^a-z]/g, "");
                let n2 = name.toLowerCase().replace(/[^a-z]/g, "");
                if (n1 === n2 || n1.includes(n2) || n2.includes(n1)) {
                    correctRoll = r;
                    break;
                }
            }
        }

        if (correctRoll) {
            let gradeInfo = processGrades(marks);
            const student = studentsMap.get(correctRoll);
            student.results[subjectCode] = { marks: marks, gradePoint: gradeInfo.gradePoint, grade: gradeInfo.grade };
        } else {
            console.log("Could not find student in PF data:", name, roll);
        }
    }
};

mergeData(englishData, "SE-359"); // SE-359 is Functional English
mergeData(pstData, "SE-361"); // SE-361 is Pak Studies
mergeData(discreteData, "SE-357"); // SE-357 is Discrete Structures
mergeData(calcData, "SE-355"); // SE-355 is Calculus
mergeData(ictData, "SE-353"); // SE-353 is ICT
mergeDataPF(pfData, "SE-351"); // SE-351 is Programming Fundamentals

const studentsArray = Array.from(studentsMap.values());

const tsFileContent = `export interface Course {
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

export const semester1: SemesterData = {
    name: "BSSE Semester I",
    batch: "2025 (Evening Program)",
    university: "UBIT - University of Karachi",
    courses: [
        { code: "SE-351", name: "Programming Fundamentals", creditHours: 4 },
        { code: "SE-353", name: "Introduction to Information & Communication Technologies", creditHours: 3 },
        { code: "SE-355", name: "Calculus and Analytical Geometry", creditHours: 3 },
        { code: "SE-357", name: "Discrete Structures", creditHours: 3 },
        { code: "SE-359", name: "Functional English", creditHours: 3 },
        { code: "SE-361", name: "Pak Studies", creditHours: 2 }
    ],
    students: ${JSON.stringify(studentsArray, null, 2)}
};
`;

fs.writeFileSync("src/data/semester1.ts", tsFileContent);
console.log("Semester 1 data written successfully!");
