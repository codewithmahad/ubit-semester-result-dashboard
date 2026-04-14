"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";

/**
 * AdminLayout — Shared wrapper for all /admin routes.
 * Ensures the Sidebar is always visible and provides a consistent base background.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Persistent Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area — shifted for Sidebar width */}
      <div className="md:ml-64 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
