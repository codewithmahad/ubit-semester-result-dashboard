"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight, 
  Mail, 
  ShieldCheck,
  Download,
  Award
} from "lucide-react";

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Student Directory
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Browse and manage records for 1,248 registered students.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <Download className="w-4 h-4" />
              Download CSV
           </button>
           <button className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-bold hover:bg-[#1a2538] transition-all flex items-center gap-2 shadow-lg">
              Batch Actions
           </button>
        </div>
      </header>

      {/* Control Rail */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full lg:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by seat number or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-700 outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-[#0F172A]/5 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 no-scrollbar">
          {['All Batches', 'Morning', 'Evening', 'Section A', 'Section B'].map((filter) => (
            <button 
              key={filter}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-500 whitespace-nowrap hover:border-[#0F172A] hover:text-[#0F172A] transition-all"
            >
              {filter}
            </button>
          ))}
          <button className="p-2.5 bg-[#0F172A] text-white rounded-xl shadow-lg">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto styled-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F172A] text-white h-14">
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em]">Student Profile</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">Seat No.</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">CGPA</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">Batch</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">Status</th>
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: "Kazim Hussain", roll: "EB25210106004", cgpa: 3.84, batch: "2025 (E)", status: "Active", medalist: true },
                { name: "Kaaif Ahmed Khan", roll: "EM25210106012", cgpa: 3.72, batch: "2025 (M)", status: "Active", medalist: false },
                { name: "Syed Azfar Abbas", roll: "EM25210106045", cgpa: 3.91, batch: "2024 (M)", status: "Active", medalist: true },
                { name: "Hassan Ali", roll: "EB24210106089", cgpa: 2.45, batch: "2024 (E)", status: "Pending", medalist: false },
                { name: "Ayesha Noor", roll: "EM25210106102", cgpa: 3.65, batch: "2025 (M)", status: "Active", medalist: false },
                { name: "Mohammad Ahmed", roll: "EB25210106115", cgpa: 1.85, batch: "2025 (E)", status: "Warning", medalist: false },
              ].map((student, i) => (
                <tr key={i} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#0F172A] shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform">
                        {student.name[0]}
                        {student.medalist && (
                          <div className="absolute top-0 right-0 w-3 h-3 bg-ubit-gold" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#0F172A] group-hover:text-[#8F141B] transition-colors">{student.name}</span>
                        <div className="flex items-center gap-2">
                           {student.medalist && <Award className="w-3 h-3 text-ubit-gold" />}
                           <span className="text-[11px] text-slate-400 font-medium">Software Engineering</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="font-mono text-[12px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-widest">
                      {student.roll}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className={`inline-flex items-center justify-center w-14 py-1 rounded-lg text-[13px] font-black tabular-nums shadow-sm ${
                      student.cgpa >= 3.5 ? "bg-green-50 text-green-700" :
                      student.cgpa >= 2.0 ? "bg-slate-50 text-slate-700" : "bg-rose-50 text-rose-700"
                    }`}>
                      {student.cgpa.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">{student.batch}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      student.status === "Active" ? "bg-green-50 border-green-100 text-green-600" :
                      student.status === "Warning" ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-amber-50 border-amber-100 text-amber-600"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-300 hover:text-[#0F172A] transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-300 hover:text-rose-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <button className="ml-2 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#8F141B] group-hover:text-white transition-all shadow-sm">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Strip */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
           <p className="text-[12px] font-bold text-slate-400">Showing 1-10 of 1,248 Institutional Records</p>
           <div className="flex items-center gap-2">
              <button disabled className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-black text-slate-300 uppercase tracking-widest">Prev</button>
              <button className="px-3 py-1.5 rounded-lg bg-[#0F172A] text-[11px] font-black text-white uppercase tracking-widest shadow-lg">Next</button>
           </div>
        </div>
      </div>
    </main>
  );
}
