"use client";

export interface RecentStudent {
  roll: string;
  name: string;
  batch: string;
  shift: string;
  viewedAt: number;
}

const STORAGE_KEY = "ubit-portal-recent-views";
const MAX_RECENT = 6;

export function getRecentViews(): RecentStudent[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load recent views", e);
    return [];
  }
}

export function saveToRecentViews(student: Omit<RecentStudent, "viewedAt">) {
  if (typeof window === "undefined") return;
  try {
    const current = getRecentViews();
    
    // Remove if already exists (to move to front)
    const filtered = current.filter(s => s.roll !== student.roll);
    
    const updated = [
      { ...student, viewedAt: Date.now() },
      ...filtered
    ].slice(0, MAX_RECENT);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    // Dispatch a custom event so other components can refresh
    window.dispatchEvent(new Event("recent-views-updated"));
  } catch (e) {
    console.error("Failed to save recent view", e);
  }
}

export function clearRecentViews() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("recent-views-updated"));
}
