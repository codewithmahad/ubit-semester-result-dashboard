/**
 * @file src/data/registry.ts
 * @description Centralized registry of all active class sections in the portal.
 */

export interface ClassMetadata {
  id: string; // e.g. "bscs-2025-morning-b"
  program: string; // e.g. "BSCS"
  batch: string;
  shift: string;
  section: string; // e.g. "Section B"
  degree: string;
  cr: string;
  activeSemesters: string[];
}

export const CLASS_REGISTRY: ClassMetadata[] = [
  {
    id: "bsse-2025-evening-a",
    program: "BSSE",
    batch: "2025",
    shift: "Evening",
    section: "Section A",
    degree: "Software Engineering",
    cr: "Kazim Hussain",
    activeSemesters: ["semester1", "semester2"],
  },
  {
    id: "bscs-2025-morning-b",
    program: "BSCS",
    batch: "2025",
    shift: "Morning",
    section: "Section B",
    degree: "Computer Science", // Adjust if another string is preferred
    cr: "Syed Azfar Abbas",
    activeSemesters: ["semester1", "semester2"],
  },
];
