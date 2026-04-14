"use client";

import { useState } from "react";
import { 
  Settings, 
  ShieldAlert, 
  Power,
  AlertTriangle,
  Globe,
  Lock,
  Save
} from "lucide-react";

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Security & Controls
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Master override switches and global platform configuration.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Maintenance / Lockdown Panel */}
        <div className={`p-8 rounded-[32px] border-2 transition-all relative overflow-hidden ${
           maintenanceMode 
             ? "bg-rose-50 border-rose-200" 
             : "bg-white border-transparent shadow-xl"
        }`}>
           
           {maintenanceMode && (
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 opacity-10 rounded-full blur-3xl" />
           )}

           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${maintenanceMode ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500"}`}>
                    <Power className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-[18px] font-black text-[#0F172A] tracking-tight">Emergency Protocol</h3>
                    <p className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mt-1">Portal Accessibility</p>
                 </div>
              </div>

              <div className="p-5 bg-white/50 border border-slate-200 rounded-2xl mb-8">
                 <div className="flex items-center justify-between mb-2">
                    <p className="text-[14px] font-bold text-[#0F172A]">Global Maintenance Lock</p>
                    <div 
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                      className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${maintenanceMode ? "bg-rose-600" : "bg-slate-300"}`}
                    >
                       <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${maintenanceMode ? "translate-x-6" : ""}`} />
                    </div>
                 </div>
                 <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                    Instantly terminate all active student sessions. The portal will display an "Under Maintenance" block page. Use this exclusively during mass institutional data ingestion.
                 </p>
              </div>

              {maintenanceMode && (
                <div className="flex items-start gap-3 p-4 bg-rose-100/50 border border-rose-200 text-rose-800 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
                   <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                   <div>
                      <p className="text-[13px] font-black">Warning: Portal is fully locked.</p>
                      <p className="text-[12px] font-medium mt-1">
                         No student can view their results or login. Admin & CR API routes remain active over internal channels.
                      </p>
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* Visibility Configurations */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-[16px] font-black text-[#0F172A] mb-6 flex items-center gap-2">
                 <Globe className="w-5 h-5 text-[#8F141B]" />
                 Result Visibility Protocols
              </h3>
              
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[13px] font-bold text-[#0F172A]">Public Web Indexing</p>
                       <p className="text-[11px] text-slate-500 font-medium mt-1">Allow Google & search engines to cache result PDFs.</p>
                    </div>
                    <div className="w-10 h-5 bg-slate-300 rounded-full relative p-1 cursor-not-allowed opacity-50">
                       <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[13px] font-bold text-[#0F172A]">Force Anonymity Mode</p>
                       <p className="text-[11px] text-slate-500 font-medium mt-1">Scrub exact student names from global rank boards.</p>
                    </div>
                    <div className="w-10 h-5 bg-[#0F172A] rounded-full relative p-1 cursor-pointer flex justify-end">
                       <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                    </div>
                 </div>
              </div>
           </div>

           <button className="w-full h-14 bg-[#0F172A] text-white rounded-2xl text-[14px] font-black tracking-widest uppercase hover:bg-[#1a2538] transition-all shadow-xl shadow-[#0F172A]/20 flex items-center justify-center gap-3">
              <Save className="w-5 h-5" /> Commit Configuration Updates
           </button>
        </div>

      </div>
    </main>
  );
}
