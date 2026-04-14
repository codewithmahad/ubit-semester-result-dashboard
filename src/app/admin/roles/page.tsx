"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  Trash2, 
  UserPlus, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminRolesPage() {
  const [search, setSearch] = useState("");

  const CURRENT_CRS = [
    { name: "Syed Azfar Abbas", email: "azfar.abbas@gmail.com", classAssigned: "BSCS 2024 Morning (Sec B)", assignedBy: "Admin", date: "Jan 12, 2026" },
    { name: "Kazim Hussain", email: "kazim.hussain@gmail.com", classAssigned: "BSSE 2025 Evening (Sec A)", assignedBy: "System", date: "Feb 05, 2026" },
    { name: "Kaaif Ahmed Khan", email: "kaaif.khan@gmail.com", classAssigned: "BSSE 2025 Morning (Sec A)", assignedBy: "System", date: "Feb 05, 2026" },
  ];

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Role Delegation
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Elevate verified Google Auth users to Class Representatives.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10">
        
        {/* Current Active Roles */}
        <div className="space-y-6">
           <h3 className="text-[16px] font-black text-[#0F172A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Active Representatives
           </h3>
           
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto styled-scrollbar">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-[#0F172A] text-white h-12">
                          <th className="px-6 text-[10px] font-black uppercase tracking-[0.2em]">Authorized User</th>
                          <th className="px-6 text-[10px] font-black uppercase tracking-[0.2em]">Bound Batch</th>
                          <th className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-right">Revoke</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {CURRENT_CRS.map((cr, i) => (
                          <tr key={i} className="group hover:bg-slate-50 transition-colors">
                             <td className="px-6 py-4">
                                <div className="flex flex-col">
                                   <span className="text-[14px] font-bold text-[#0F172A]">{cr.name}</span>
                                   <span className="text-[11px] font-medium text-slate-500 mt-0.5">{cr.email}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <span className="inline-flex items-center text-[11px] font-black text-[#0F172A] bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                                   {cr.classAssigned}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <button className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-transparent hover:border-rose-100 shadow-sm">
                                   <Trash2 className="w-4 h-4" />
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Assign New Role Form */}
        <div>
           <div className="bg-[#0F172A] p-8 rounded-3xl text-white shadow-2xl sticky top-6">
              <h3 className="text-[18px] font-black mb-6 flex items-center gap-3 tracking-tight">
                 <UserPlus className="w-5 h-5 text-[#8F141B]" />
                 Appoint CR
              </h3>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Search Google Auth User</label>
                    <div className="relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input 
                         type="text"
                         placeholder="e.g. j.doe@gmail.com"
                         className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl text-[14px] font-semibold text-white outline-none focus:border-[#8F141B] transition-all placeholder:text-slate-500"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Target Batch Binding</label>
                    <select className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-[14px] font-bold text-white outline-none focus:border-[#8F141B] transition-all appearance-none cursor-pointer">
                       <option value="" className="text-black hidden">Select a batch to bind to this user...</option>
                       <option value="BSSE_2025_M_A" className="text-black">BSSE 2025 (Morning) - Sec A</option>
                       <option value="BSSE_2025_E_A" className="text-black">BSSE 2025 (Evening) - Sec A</option>
                       <option value="BSCS_2024_M_B" className="text-black">BSCS 2024 (Morning) - Sec B</option>
                    </select>
                 </div>

                 <div className="bg-[#8F141B]/10 border border-[#8F141B]/20 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#8F141B] shrink-0 mt-0.5" />
                    <div>
                       <p className="text-[12px] font-bold text-[#8F141B]">Isolated Scope Alert</p>
                       <p className="text-[11px] font-medium text-slate-400 mt-1 leading-relaxed">
                          This Google Account will gain power to upload and edit results STRICTLY for the selected batch. They will have NO access to master configurations or other batches.
                       </p>
                    </div>
                 </div>

                 <button className="w-full py-4 bg-[#8F141B] hover:bg-[#a01a22] text-white rounded-xl text-[13px] font-black tracking-widest uppercase transition-all shadow-xl shadow-[#8F141B]/20">
                    Authorize Binding
                 </button>
              </div>
           </div>
        </div>

      </div>
    </main>
  );
}
