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
  FileText,
  Contact,
  Terminal,
  X
} from "lucide-react";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/directory", label: "Academic Directory", icon: BookOpen },
  { href: "/admin/users", label: "Google Auth Users", icon: Contact },
  { href: "/admin/results", label: "Result Engine", icon: FileText },
  { href: "/admin/notifications", label: "Broadcasts", icon: Bell },
  { href: "/admin/roles", label: "Roles & Access", icon: ShieldCheck },
  { href: "/admin/audit-logs", label: "System Audit", icon: Terminal },
  { href: "/admin/settings", label: "Portal Settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] md:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed left-0 top-0 bottom-0 w-64 bg-[#0F172A] text-white border-r border-slate-800 z-[70] 
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg text-[#0F172A]">
               <img src="/ubit-logo.jpg" alt="UBIT" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[14px] font-black tracking-tight">ADMIN PORTAL</span>
              <span className="text-[9px] font-bold text-[#8F141B] uppercase tracking-[0.2em]">Institutional Control</span>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 py-6 px-4 space-y-8 overflow-y-auto">
          <div>
            <p className="px-2 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Management</p>
            <nav className="space-y-1">
              {ADMIN_LINKS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
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
          <Link href="/" className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-[11px] font-bold text-slate-400 hover:text-[#8F141B] transition-colors uppercase tracking-widest">
             <LogOut className="w-3.5 h-3.5" />
             Exit Portal
          </Link>
        </div>
      </aside>
    </>
  );
}
