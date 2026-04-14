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
      <main className="p-4 sm:p-6 lg:p-10">

         {/* Page Header */}
         <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
            <div>
               <h1 className="text-[24px] sm:text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
                  Security & Controls
               </h1>
               <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 mt-1">
                  Master override switches and global configurations.
               </p>
            </div>
         </header>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">

            {/* Maintenance / Lockdown Panel */}
            <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-[32px] border-2 transition-all relative overflow-hidden ${maintenanceMode
                  ? "bg-rose-50 border-rose-200"
                  : "bg-white border-transparent shadow-xl"
               }`}>

               {maintenanceMode && (
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-rose-500 opacity-10 rounded-full blur-3xl" />
               )}

               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${maintenanceMode ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500"}`}>
                        <Power className="w-5 h-5 sm:w-6 sm:h-6" />
                     </div>
                     <div>
                        <h3 className="text-[17px] sm:text-[18px] font-black text-[#0F172A] tracking-tight">Emergency Protocol</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Portal Status</p>
                     </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-white/50 border border-slate-200 rounded-2xl mb-8">
                     <div className="flex items-center justify-between mb-2">
                        <p className="text-[13px] sm:text-[14px] font-bold text-[#0F172A]">Maintenance Lock</p>
                        <div
                           onClick={() => setMaintenanceMode(!maintenanceMode)}
                           className={`w-11 h-5.5 sm:w-12 sm:h-6 rounded-full relative p-1 cursor-pointer transition-colors ${maintenanceMode ? "bg-rose-600" : "bg-slate-300"}`}
                        >
                           <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-sm transition-transform ${maintenanceMode ? "translate-x-5.5 sm:translate-x-6" : ""}`} />
                        </div>
                     </div>
                     <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                        Terminate sessions and show maintenance block. Use only during major ingestion.
                     </p>
                  </div>

                  {maintenanceMode && (
                     <div className="flex items-start gap-3 p-4 bg-rose-100/50 border border-rose-200 text-rose-800 rounded-xl">
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                        <div>
                           <p className="text-[12px] sm:text-[13px] font-black">Warning: Portal is locked.</p>
                           <p className="text-[11px] sm:text-[12px] font-medium mt-1">
                              Students cannot login. API remains active for internal channels.
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Visibility Configurations */}
            <div className="space-y-6">
               <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-[15px] sm:text-[16px] font-black text-[#0F172A] mb-6 flex items-center gap-2">
                     <Globe className="w-5 h-5 text-[#8F141B]" />
                     Result Visibility Protocols
                  </h3>

                  <div className="space-y-6">
                     <div className="flex items-center justify-between gap-4">
                        <div>
                           <p className="text-[13px] font-bold text-[#0F172A]">Public Indexing</p>
                           <p className="text-[11px] text-slate-500 font-medium mt-0.5">Control search engine caching.</p>
                        </div>
                        <div className="w-10 h-5 bg-slate-300 rounded-full shrink-0 opacity-50">
                           <div className="w-3 h-3 m-1 bg-white rounded-full" />
                        </div>
                     </div>

                     <div className="flex items-center justify-between gap-4">
                        <div>
                           <p className="text-[13px] font-bold text-[#0F172A]">Anonymity Mode</p>
                           <p className="text-[11px] text-slate-500 font-medium mt-0.5">Scrub names from rank boards.</p>
                        </div>
                        <div className="w-10 h-5 bg-[#0F172A] rounded-full shrink-0 flex justify-end">
                           <div className="w-3 h-3 m-1 bg-white rounded-full shadow-sm" />
                        </div>
                     </div>
                  </div>
               </div>

               <button className="w-full h-12 sm:h-14 bg-[#0F172A] text-white rounded-xl sm:rounded-2xl text-[13px] sm:text-[14px] font-black tracking-widest uppercase shadow-lg flex items-center justify-center gap-3">
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" /> Commit Updates
               </button>
            </div>

         </div>
      </main>


   );
}
