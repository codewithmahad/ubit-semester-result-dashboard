# UBIT Results Portal

I built this student-run portal to make UBIT semester results easier to find and understand. Students can look up their academic record, compare semester results, calculate GPA, and print a transcript from one place.

**[Open the live portal →](https://ubit-results.vercel.app/)** · [Features](#features) · [Run locally](#run-locally) · [Data and maintenance](#data-and-maintenance)

This is an independent student project. University result sheets remain the source of truth; the portal’s GPA calculations and transcripts are for reference.

## Features

- **Student lookup:** open a record by seat number, with course marks, grades, and semester summaries.
- **Class leaderboards:** search and sort semester and cumulative results, with SGPA/CGPA rankings.
- **Academic summaries:** view grade distributions and performance trends alongside the result tables.
- **GPA calculator:** estimate SGPA from course marks and credit hours.
- **Print and export:** print student transcripts and export leaderboard tables as PDFs.
- **Shareable records:** copy a seat number or share a student’s result link.

## Run locally

Use **Node.js 20.9 or newer** and npm. No environment variables or database setup are required for the current app.

```sh
git clone https://github.com/codewithmahad/ubit-semester-result-dashboard.git
cd ubit-semester-result-dashboard
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To check types and create a production build:

```sh
npx tsc --noEmit --incremental false
npm run build
npm start
```

The build downloads Inter through `next/font/google`, so it needs access to Google Fonts.

## Data and maintenance

The current [class registry](src/data/registry.ts) covers four Batch 2025 sections: BSSE Morning A, BSSE Evening A and B, and BSCS Morning B, each with Semesters I–III configured.

Results are stored as typed TypeScript files under `src/data/<class-id>/`. The [data adapter](src/lib/data.ts) loads the registered semesters and builds student profiles; [academic utilities](src/lib/utils/academic-math.ts) calculate GPA and rankings. There is no automatic connection to university records. Calculations use the course results available in the files, so missing entries can affect comparisons.

**[Maintenance guide →](docs/MAINTENANCE.md)** — project layout, data contracts, grading rules, and the current procedure for adding or correcting semester records.

<details>
<summary>Technology and implementation notes</summary>

| Area | Implementation |
| :--- | :--- |
| Application | Next.js 16 App Router, React 18, strict TypeScript |
| Interface | Tailwind CSS 3, shadcn/ui components, Radix UI |
| Tables and charts | TanStack Table 8, Recharts |
| PDF and print | Dynamically loaded html2pdf.js for tables; browser printing for transcripts |
| Data | Repository-managed semester files and a module-level profile cache |
| Typography | Inter through `next/font/google` |

The app uses Next.js server rendering and a server action for class unlocks, but has no database or account authentication. Class locks are a convenience gate, not an authorization system. The admin pages are interface prototypes; their upload and editing controls do not persist changes to the result files.

</details>

Maintained by [Shaikh Mahad](https://github.com/codewithmahad) as part of [The UBIT Hub](https://github.com/codewithmahad/the-ubit-hub-resources).
