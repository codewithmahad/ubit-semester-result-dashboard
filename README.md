# UBIT Results Portal

A fast, institution-grade academic results portal for **BSSE Batch 2025 (Evening Program)**, Department of Computer Science, University of Karachi (UBIT).

Built by students, for students. Provides instant access to official grade records, SGPA/CGPA analytics, class rankings, and a print-ready transcript system.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Data Tables | TanStack Table v8 |
| Charts | Recharts |
| PDF Export | html2pdf.js (dynamic import) |
| Font | Inter (Google Fonts via `next/font`) |

---

## File Architecture

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout: font, metadata, global CSS
│   ├── page.tsx                  # Landing page (hero search + feature cards)
│   ├── leaderboards/
│   │   └── page.tsx              # Section browser — lists all available classes
│   ├── class/[batch]/[section]/
│   │   └── page.tsx              # Class leaderboard shell (renders DashboardTabs)
│   ├── student/[rollNo]/
│   │   └── page.tsx              # Individual student transcript page
│   └── calculator/
│       └── page.tsx              # Interactive SGPA calculator
│
├── components/                   # Reusable React components
│   ├── nav.tsx                   # Sticky top navigation bar
│   ├── notification-banner.tsx   # Dismissable announcement banner
│   ├── search-omnibar.tsx        # Hero search input (seat number → /student/:rollNo)
│   ├── dashboard-tabs.tsx        # Tab container for Sem I / Sem II / Cumulative views
│   ├── result-table.tsx          # Single-semester ranked result table (TanStack)
│   ├── cgpa-table.tsx            # Cumulative CGPA ranked table (TanStack)
│   ├── semester-card.tsx         # Per-semester course result card on transcript
│   ├── student-modal.tsx         # Slide-out detail panel with radar chart
│   └── ui/                       # shadcn/ui primitives (auto-generated)
│
├── lib/
│   ├── data.ts                   # Data adapter: builds StudentProfile objects, exposes query API
│   ├── utils.ts                  # Tailwind class merger (cn utility)
│   └── utils/
│       └── academic-math.ts      # Pure academic computation functions (GPA, ranking)
│
├── constants/
│   └── academic.ts               # UBIT grading scale, passing CGPA, batch metadata
│
├── types/
│   └── index.ts                  # Central type registry — ALL domain interfaces live here
│
└── data/                         # Raw student result data (static, never mutated)
    ├── semester1.ts              # Semester I: courses + per-student results
    └── semester2.ts              # Semester II: courses + per-student results
```

---

## Data Schema

### Raw Data Layer (`src/data/`)

Each semester file exports a single `RawSemesterData` object:

```typescript
// src/types/index.ts
interface RawSemesterData {
  name: string;         // e.g. "BSSE Semester I"
  batch: string;        // e.g. "2025 (Evening Program)"
  university: string;   // e.g. "UBIT - University of Karachi"
  courses: Course[];
  students: RawStudent[];
}

interface Course {
  code: string;         // e.g. "SE-351" — used as key in results map
  name: string;         // e.g. "Programming Fundamentals"
  creditHours: number;  // e.g. 4
}

interface RawStudent {
  name: string;         // UPPERCASE full name
  roll: string;         // e.g. "EB25210106004"
  results: Record<string, SemesterResult>; // key = Course.code
}

interface SemesterResult {
  marks: number;        // 0–100
  gradePoint: number;   // e.g. 3.8 — pre-computed from marks
  grade: string;        // e.g. "A-"
}
```

### Computed Layer (`src/lib/data.ts`)

`getClassData()` builds `StudentProfile` objects by merging all semesters:

```typescript
interface StudentProfile {
  rollNo: string;
  name: string;
  batch: string;
  shift: string;
  semesters: SemesterRecord[];  // one per available semester
  cgpa: number;                 // cumulative across all semesters
  totalCredits: number;
  totalMarks: number;
  cgpaRank?: number;            // tie-aware rank (dense ranking)
}
```

---

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check without emitting (CI)
npx tsc --noEmit

# Production build
npm run build
```

The dev server runs at `http://localhost:3000`.

---

## Adding New Semester Data

This is the step-by-step procedure for adding **Semester III** (or any future semester) to the portal.

### Step 1 — Create the Data File

Create `src/data/semester3.ts`. The file must import `RawSemesterData` from `@/types` and export a single named constant:

```typescript
// src/data/semester3.ts
import type { RawSemesterData } from "@/types";

export const semester3: RawSemesterData = {
  name: "BSSE Semester III",
  batch: "2025 (Evening Program)",
  university: "UBIT - University of Karachi",
  courses: [
    { code: "SE-XXXX", name: "Data Structures & Algorithms", creditHours: 4 },
    { code: "SE-YYYY", name: "Digital Logic Design",         creditHours: 3 },
    // ... add all courses for this semester
  ],
  students: [
    {
      name: "STUDENT FULL NAME",     // UPPERCASE
      roll: "EB25210106XXX",
      results: {
        "SE-XXXX": { marks: 85, gradePoint: 4.0, grade: "A" },
        "SE-YYYY": { marks: 72, gradePoint: 3.0, grade: "B" },
        // ... one entry per course code
      },
    },
    // ... repeat for every student
  ],
};
```

> **Grade Point Rule:** `gradePoint` must be pre-computed from `marks` using the UBIT scale in `src/constants/academic.ts`. Use `getGradeInfo(marks).gradePoint` from `src/lib/utils/academic-math.ts` in your data-generation script if automating.

### Step 2 — Register in the Data Adapter

Open `src/lib/data.ts` and make three changes:

**a) Import the new semester:**
```typescript
import { semester3 } from "@/data/semester3";
```

**b) Add the new roll numbers to the rollSet in `buildStudentProfiles()`:**
```typescript
semester3.students.forEach((s) => rollSet.add(s.roll));
```

**c) Build and merge the Semester 3 record inside the `for (const roll of rollSet)` loop:**
```typescript
const s3 = semester3.students.find((s) => s.roll === roll);
const sem3Record = s3 ? buildSemesterRecord(semester3, 3, s3.results) : null;

if (sem3Record) {
  semesters.push(sem3Record);
  totalQP += sem3Record.qualityPoints;
  totalCr += sem3Record.totalCredits;
  sem3Record.courses.forEach((c) => (totalMarks += c.marks));
}
```

**d) Update the `semesterCount` in `getClassData()`:**
```typescript
_cache = {
  batch: BATCH_INFO.batch,
  shift: BATCH_INFO.shift,
  semesterCount: 3, // ← increment this
  students: buildStudentProfiles(),
};
```

### Step 3 — Update `calculateCGPARankings` (if needed)

The current `calculateCGPARankings` in `src/lib/utils/academic-math.ts` is scoped to two semesters. If you need a 3-semester cumulative ranking for the CGPA leaderboard, extend the function signature to accept a third `RawSemesterData` parameter and repeat the same processing pattern for Semester 3.

### Step 4 — Add a Tab to the Dashboard

Open `src/components/dashboard-tabs.tsx`:

```typescript
import { semester3 } from "@/data/semester3";

// Inside the <TabsList>:
<TabsTrigger value="semester3">Semester III</TabsTrigger>

// Inside the <Tabs> body:
<TabsContent value="semester3">
  <ResultTable data={semester3} allSemData={[semester1, semester2, semester3]} />
</TabsContent>
```

### Step 5 — Update the Cumulative Tab

Pass `semester3` as an additional argument to `CGPATable` if the function signature was updated:

```typescript
<CGPATable sem1Data={semester1} sem2Data={semester2} />
// or, after extending: 
<CGPATable sem1Data={semester1} sem2Data={semester2} sem3Data={semester3} />
```

### Step 6 — Type Check

```bash
npx tsc --noEmit
```

Zero errors expected. If any `Record<string, SemesterResult>` mismatches appear, verify that every `results` key exactly matches a `course.code` in the semester's `courses` array.

---

## Environment

No environment variables are required. All data is static and bundled at build time. This project has no backend, no database, and no authentication.

---

## Notes

- **Data is read-only.** Student records in `src/data/` are never mutated at runtime. All computations (GPA, rankings) happen at server-render time and are cached in module scope.
- **Grading scale is centralized.** Any change to grade boundaries must be made only in `src/constants/academic.ts`. The grading scale is the single source of truth for both the calculator and the result tables.
- **Type safety.** All domain interfaces live in `src/types/index.ts`. Never define structural types inline in components or data files.
