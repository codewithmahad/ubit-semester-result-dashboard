"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Bell, 
  Settings, 
  LogOut,
  ShieldCheck,
  TrendingUp,
  FileText
} from "lucide-react";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/semesters", label: "Semesters", icon: BookOpen },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/analytics", label: "Analytics", icon: TrendingUp },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0F172A] text-white border-r border-slate-800 z-50 hidden md:flex flex-col">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/50">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
           <img src="/ubit-logo.jpg" alt="UBIT" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[14px] font-black tracking-tight">ADMIN PORTAL</span>
          <span className="text-[9px] font-bold text-[#8F141B] uppercase tracking-[0.2em]">Institutional Control</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 py-6 px-4 space-y-8 overflow-y-auto">
        <div>
          <p className="px-2 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Management</p>
          <nav className="space-y-1">
            {ADMIN_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                    active 
                      ? "bg-[#8F141B] text-white shadow-lg" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-500"}`} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-2 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">System</p>
          <nav className="space-y-1">
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              Settings
            </Link>
            <Link
              href="/admin/logs"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              System Logs
            </Link>
          </nav>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 px-2 py-3 rounded-xl">
           <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold shadow-xl">
              A
           </div>
           <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-white truncate">Administrator</span>
              <span className="text-[11px] text-slate-500 font-medium">Full Access</span>
           </div>
        </div>
        <button className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-[11px] font-bold text-slate-400 hover:text-[#8F141B] transition-colors uppercase tracking-widest">
           <LogOut className="w-3.5 h-3.5" />
           Exit Portal
        </button>
      </div>
    </aside>
  );
}
