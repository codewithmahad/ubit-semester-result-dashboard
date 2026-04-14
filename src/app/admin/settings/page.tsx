"use client";

import { useState } from "react";
import { 
  Settings, 
  Shield, 
  Palette, 
  Globe, 
  Lock, 
  Bell, 
  Database,
  Save,
  Moon,
  Sun,
  Key
} from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Portal Configuration
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Manage system security, branding, and global operational settings.
          </p>
        </div>
        <button className="px-6 py-3 bg-[#0F172A] text-white rounded-2xl text-[14px] font-black tracking-widest uppercase hover:bg-[#1a2538] transition-all shadow-xl shadow-[#0F172A]/20 flex items-center gap-3">
          <Save className="w-4 h-4" />
          Commit Changes
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Navigation Sidebar (Internal) */}
        <div className="lg:col-span-3 space-y-2">
           {[
             { label: "General", icon: Globe, active: true },
             { label: "Institutional Branding", icon: Palette, active: false },
             { label: "Security & MFA", icon: Lock, active: false },
             { label: "Notifications", icon: Bell, active: false },
             { label: "Data Integrity", icon: Database, active: false },
           ].map((item) => (
             <button 
               key={item.label}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
                 item.active 
                   ? "bg-white border border-slate-200 text-[#0F172A] shadow-sm" 
                   : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
               }`}
             >
               <item.icon className="w-4 h-4" />
               {item.label}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-8">
           
           {/* Section: General */}
           <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
              <h3 className="text-[18px] font-black text-[#0F172A] mb-6 flex items-center gap-3">
                 <Globe className="w-5 h-5 text-slate-400" />
                 Global Environment
              </h3>
              
              <div className="space-y-6">
                 <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                    <div>
                       <p className="text-[14px] font-bold text-[#0F172A]">Maintenance Mode</p>
                       <p className="text-[12px] text-slate-500 font-medium">Disable student access for scheduled updates.</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                       <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                 </div>

                 <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                    <div>
                       <p className="text-[14px] font-bold text-[#0F172A]">Transcript Anonymity</p>
                       <p className="text-[12px] text-slate-500 font-medium">Mask student names on global leaderboards by default.</p>
                    </div>
                    <div className="w-12 h-6 bg-[#0F172A] rounded-full relative p-1 cursor-pointer flex justify-end">
                       <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[14px] font-bold text-[#0F172A]">Result Indexing</p>
                       <p className="text-[12px] text-slate-500 font-medium">Allow search engines to index public result pages.</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                       <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section: API / Data Keys */}
           <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
              <h3 className="text-[18px] font-black text-[#0F172A] mb-6 flex items-center gap-3">
                 <Lock className="w-5 h-5 text-slate-400" />
                 Institutional Keys
              </h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">System Encryption Key</label>
                    <div className="flex gap-2">
                       <input 
                         type="password" 
                         value="••••••••••••••••••••••••••••••••" 
                         readOnly
                         className="flex-1 h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm outline-none" 
                       />
                       <button className="w-12 h-12 bg-[#0F172A] text-white rounded-xl flex items-center justify-center hover:bg-[#1a2538] transition-all">
                          <RefreshCcw className="w-4 h-4" />
                       </button>
                    </div>
                    <p className="text-[11px] text-[#8F141B] font-bold mt-2 flex items-center gap-1.5">
                       <Shield className="w-3 h-3" />
                       Rotating this key will require re-syncing all batch logs.
                    </p>
                 </div>
              </div>
           </div>

           {/* Appearance */}
           <div className="bg-[#0F172A] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <Palette className="w-6 h-6 text-[#8F141B]" />
                    <h3 className="text-[18px] font-black tracking-tight">Institutional Aesthetic</h3>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-2xl border-2 border-white/20 bg-white/5 flex items-center justify-between group hover:border-[#8F141B]/50 transition-all">
                       <div className="flex items-center gap-3">
                          <Sun className="w-4 h-4 text-amber-400" />
                          <span className="text-[13px] font-black uppercase tracking-widest">Light Protocol</span>
                       </div>
                       <div className="w-4 h-4 rounded-full border-2 border-white/40 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                       </div>
                    </button>

                    <button className="p-4 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between group opacity-50">
                       <div className="flex items-center gap-3">
                          <Moon className="w-4 h-4 text-blue-400" />
                          <span className="text-[13px] font-black uppercase tracking-widest">Dark Slate</span>
                       </div>
                       <div className="w-4 h-4 rounded-full border border-white/20" />
                    </button>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </main>
  );
}

// ── Shared Icons ───────────────────────────────────────────────
function RefreshCcw(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>
    </svg>
  );
}
