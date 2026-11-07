# Maintaining UBIT Results Portal

[Back to the project overview](../README.md)

## Project layout

| Path | Purpose |
| :--- | :--- |
| [`src/app/`](../src/app/) | Landing page, class leaderboards, student records, calculator, and supporting pages |
| [`src/components/`](../src/components/) | Tables, charts, semester cards, search, print controls, and UI components |
| [`src/data/registry.ts`](../src/data/registry.ts) | Class IDs, section metadata, and ordered `activeSemesters` |
| `src/data/<class-id>/semesterN.ts` | Course definitions and student result records for one class and semester |
| [`src/lib/data.ts`](../src/lib/data.ts) | Dynamic semester loading, profile construction, lookup, and module-level caching |
| [`src/lib/utils/academic-math.ts`](../src/lib/utils/academic-math.ts) | Grade lookup, SGPA/CGPA calculations, and rankings |
| [`src/constants/academic.ts`](../src/constants/academic.ts) | Grade boundaries and academic constants |
| [`src/types/index.ts`](../src/types/index.ts) | Shared raw-data and computed academic types |
| [`src/components/dashboard-tabs.tsx`](../src/components/dashboard-tabs.tsx) | Semester tabs generated from the loaded data |

## Data contracts

Each semester file imports `RawSemesterData` from `@/types` and exports a named object matching its registry entry: for example, `semester3` in `semester3.ts`.

```typescript
interface RawSemesterData {
  name: string;
  batch: string;
  university: string;
  courses: Course[];
  students: RawStudent[];
}

interface Course {
  code: string;
  name: string;
  creditHours: number;
}

interface RawStudent {
  name: string;
  roll: string;
  results: Record<string, SemesterResult>;
}

interface SemesterResult {
  marks: number;
  gradePoint: number;
  grade: string;
}
```

A result key must match a course’s `code`. Keep the student’s seat number exact. The adapter builds `StudentProfile` objects with semester records, credit totals, quality points, CGPA, and a cumulative rank.

SGPA is `Σ(gradePoint × creditHours) / Σ(creditHours)` for courses with recorded results. CGPA applies the same weighting across the available semesters. Rankings compare GPA, then total marks, then names for display order. Equal GPA and total marks share a rank; subsequent rank numbers are skipped (`1, 1, 3`).

## Correct existing results

1. Confirm the class ID, section, semester, and course against the source result sheet.
2. Open the matching file under `src/data/<class-id>/`.
3. Follow [the repository’s result-update rule](../.agents/AGENTS.md): update only students already in the target file’s `students` array. Skip unmatched students and repeater records; do not append them during a result update.
4. Check marks, grades, and grade points against the source. Grade boundaries are defined in `src/constants/academic.ts`; `getGradeInfo()` in the academic utilities provides the code’s lookup. Resolve any source discrepancy before changing stored results.
5. Review the diff for unrelated courses, students, or files, then run the checks below.

An absent result is not a confirmed zero. Do not fill missing records merely to complete a table. The current grade lookup uses inclusive integer ranges; fractional marks near a grade boundary need review against the source grading policy before using that helper to generate stored grades.

## Add a semester or class

1. For an existing class, add `src/data/<class-id>/semesterN.ts`, following a semester file already in that class folder. Use actual course codes, credit hours, and verified records.
2. Export the object as `semesterN`. The filename, export name, and registry entry must agree.
3. Add `"semesterN"` to that class’s `activeSemesters` in `src/data/registry.ts`, preserving chronological order. The adapter derives displayed semester numbers from this order.
4. For a new class, create its data folder and add a registry entry with the same class ID, program, batch, shift, section, and semester names. Establish its roster from the verified source; this is separate from updating an existing roster.
5. The data loader, dashboard tabs, and cumulative table already accept the semester array. A normal semester addition does not require hand-written imports or a new tab in those components.
6. Restart the development server after changing data; computed profiles are cached in module scope. Check the class view and a student record before publishing.

## Validate and preview

From the repository root:

```sh
npx tsc --noEmit --incremental false
npm run build
git diff --check
```

Use `npm run dev` for a local preview. Check semester and cumulative totals, missing results, tie ranks, the calculator, and PDF/print output for the affected class. A successful type check does not validate marks or academic policy.

The current `npm run lint` command uses `next lint`, which is not supported by the installed Next.js 16 version. It needs a separate tooling change; do not treat it as a passing check.

## Runtime boundaries

Results are committed files, not records in a database. Browser actions do not update them. The admin upload/edit screens are prototypes, and class unlock cookies do not provide account authentication or dependable access control. Data intended to remain private requires a different storage and authorization design.
