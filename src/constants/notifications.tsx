import type React from "react";

// ── Notification data type ─────────────────────────────────────
export type NotificationType = "result" | "system" | "alert";

export interface AppNotification {
  id: string;
  type: NotificationType;
  content: React.ReactNode;
  timestamp: string;
  read: boolean;
}

// ── Centralized notification data (moved from Nav component) ────
// To show a new banner, add an entry here and bump BANNER_ID in
// notification-banner.tsx so users see it again.
export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "1",
    type: "result",
    content: (
      <>
        Admin added the result of{" "}
        <span className="font-bold">morning BSSE 2025</span> batch.
      </>
    ),
    timestamp: "2026-04-13T22:31:00+05:00",
    read: false,
  },
  {
    id: "2",
    type: "result",
    content: (
      <>
        Result for <span className="font-bold">CS sec B morning</span> semester 2 added.
      </>
    ),
    timestamp: "2026-04-12T15:30:00+05:00",
    read: false,
  },
  {
    id: "3",
    type: "system",
    content: (
      <>
        Result portal for{" "}
        <span className="font-bold">Batch 2025 Evening</span> is now live.
      </>
    ),
    timestamp: "2026-04-10T08:00:00+05:00",
    read: true,
  },
];

// ── Relative time formatter ────────────────────────────────────
export function formatRelativeTime(dateString: string, currentTime: Date | null): string {
  if (!currentTime) return "";
  const date = new Date(dateString);
  const seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? "s" : ""} ago`;
}
