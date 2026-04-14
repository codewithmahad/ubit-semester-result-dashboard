"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Menu, Bell } from "lucide-react";
import Link from "next/link";

/**
 * AdminLayout — Shared wrapper for all /admin routes.
 * Enhanced with mobile responsiveness:
 * 1. Mobile Header with hamburger toggle.
 * 2. Responsive Sidebar (handled via props).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-[55]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-800 rounded-lg text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center p-0.5">
               <img src="/ubit-logo.jpg" alt="UBIT" className="w-full h-full object-contain" />
            </div>
            <span className="text-[14px] font-black text-white tracking-tight uppercase">Admin</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
           </button>
           <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-[12px] font-bold">
              A
           </div>
        </div>
      </header>

      {/* Persistent Admin Sidebar (Handles its own mobile visibility via props) */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area — shifted for Sidebar width on desktop */}
      <div className="flex-1 md:ml-64 transition-all duration-300 min-h-screen">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
