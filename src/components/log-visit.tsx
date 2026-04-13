"use client";

import { useEffect } from "react";
import { saveToRecentViews } from "@/lib/recent-views";

interface LogVisitProps {
  student: {
    roll: string;
    name: string;
    batch: string;
    shift: string;
  };
}

export function LogVisit({ student }: LogVisitProps) {
  useEffect(() => {
    saveToRecentViews(student);
  }, [student]);

  return null;
}
