# UBIT Semester Result Dashboard

A modern web dashboard for visualizing semester results and GPA rankings for students at the **Department of Computer Science (UBIT), University of Karachi**.

This project solves a practical problem faced by UBIT students: semester results are released **course by course at different times**, making it difficult to track overall GPA and ranking during the semester.
The dashboard generates a structured result sheet with **automatic SGPA calculation, dynamic ranking, and PDF export**, allowing results to be shared easily with students.

The system is intentionally designed as a **frontend-only static application** so it can be deployed quickly on **Vercel** without any backend or database.

---

## Live Demo

<https://ubit-results.vercel.app>

---

## Features

* Automatic **SGPA calculation** based on course credit hours
* Dynamic **student ranking system**
* Support for **partial results** (when only some courses are released)
* Clean and responsive **result dashboard**
* **Search and sort** students
* **PDF export** that preserves the visual layout of the result sheet
* Data-driven architecture using a structured data file
* Fully static and deployable on **Vercel**

---

## Technology Stack

**Framework**

* Next.js (App Router)
* React
* TypeScript

**UI**

* TailwindCSS
* shadcn/ui
* Component-based architecture

**Utilities**

* GPA calculation engine
* Ranking algorithm
* PDF export system (html2pdf.js)

---

## Project Architecture

The project is intentionally structured to keep **data, logic, and UI separated**.

```
src/
├── app/
├── components/
├── data/
├── lib/
```

**Key responsibilities**

* `src/data/`
  Contains structured semester data including courses, credit hours, and student results.

* `src/lib/`
  Contains reusable logic such as SGPA calculation, CGPA calculation, and ranking algorithms.

* `src/components/`
  Reusable UI components such as the result table, tabs, and layout elements.

* `src/app/`
  Next.js application routes and page structure.

---

## Data Structure

All semester information is defined inside a data file.

Example:

```ts
export const semester = {
  name: "BSSE Semester I",
  batch: "2025",

  courses: [
    { code: "SE-351", creditHours: 4 },
    { code: "SE-353", creditHours: 3 },
    { code: "SE-355", creditHours: 3 }
  ],

  students: [
    {
      name: "Student Name",
      roll: "EB25210106113",
      results: {
        "SE-351": { marks: 97, gradePoint: 4.0, grade: "A+" },
        "SE-353": { marks: 86, gradePoint: 4.0, grade: "A" }
      }
    }
  ]
}
```

The system automatically:

* calculates SGPA
* calculates Final Cumulative GPA (CGPA)
* generates rankings
* renders the result dashboard

---

## SGPA Calculation

SGPA is calculated using the standard weighted GPA formula based on official UBIT grading rules.

```
SGPA = Σ(gradePoint × creditHours) / Σ(creditHours)
```

Important rules:

* Only courses with available results are included
* Supports partial result releases
* SGPA values are rounded to two decimal places

---

## Ranking System

Student ranking is determined using the following rules:

1. Higher SGPA (or CGPA) ranks higher
2. If SGPA/CGPA is equal, higher total marks ranks higher
3. If still tied, alphabetical order is used

The ranking updates automatically whenever the dataset changes.

---

## Deployment

This project is designed to be deployed as a **static application**.

Deployment platform:

**Vercel**

Typical workflow:

1. Push repository to GitHub
2. Import the repository into Vercel
3. Deploy

No backend configuration is required.

---

## Use Case

This dashboard is intended for **UBIT students** to easily track semester results and GPA standings while results are being released.

It also provides a convenient way to generate **clean result sheets that can be shared with students**.

---

## Future Improvements

Possible future extensions include:

* Additional Multi-semester result pages
* Automated data import and scraping utilities
* Batch comparison analytics

---

## License

This project is intended for educational and community use within UBIT.
