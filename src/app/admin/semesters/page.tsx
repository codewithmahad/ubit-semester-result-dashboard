"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Database,
  RefreshCcw,
  Users
} from "lucide-react";

export default function AdminSemestersPage() {
  const [search, setSearch] = useState("");

  const SEMESTERS = [
    { id: "1", batch: "2025 (Morning)", program: "BSSE", semester: "Semester 1", courses: 6, students: 64, status: "Published", date: "2 months ago" },
    { id: "2", batch: "2025 (Morning)", program: "BSSE", semester: "Semester 2", courses: 5, students: 64, status: "Published", date: "1 week ago" },
    { id: "3", batch: "2025 (Evening)", program: "BSSE", semester: "Semester 1", courses: 6, students: 58, status: "Under Review", date: "3 days ago" },
    { id: "4", batch: "2025 (Evening)", program: "BSSE", semester: "Semester 2", courses: 5, students: 58, status: "Draft", date: "Today" },
    { id: "5", batch: "2024 (Morning)", program: "BSCS", semester: "Semester 3", courses: 6, students: 120, status: "Archived", date: "4 months ago" },
  ];

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Result Management
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Institutional ledger of semester results and batch records.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <RefreshCcw className="w-4 h-4" />
              Re-sync All
           </button>
           <button className="px-5 py-2.5 bg-[#8F141B] text-white rounded-xl text-[13px] font-bold hover:bg-[#a01a22] transition-all flex items-center gap-2 shadow-lg shadow-[#8F141B]/20">
              <Plus className="w-4 h-4" />
              Ingest New Batch
           </button>
        </div>
      </header>

      {/* Control Rail */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full lg:w-[450px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by program, batch or semester..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-700 outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-[#0F172A]/5 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex bg-[#0F172A]/[0.03] p-1 rounded-2xl border border-[#0F172A]/[0.05]">
           {['Active', 'Review', 'Archived'].map((tab, i) => (
             <button 
               key={tab} 
               className={`px-5 py-2 rounded-xl text-[12px] font-bold transition-all ${
                 i === 0 ? "bg-[#0F172A] text-white shadow-lg" : "text-slate-500 hover:text-[#0F172A]"
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Semesters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SEMESTERS.map((sem) => (
          <div key={sem.id} className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#8F141B]/20 transition-all p-6 relative overflow-hidden flex flex-col h-full">
            {/* Context Pill */}
            <div className="flex items-center justify-between mb-6">
               <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200/50">
                  {sem.program} · {sem.batch}
               </div>
               <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
                 sem.status === "Published" ? "text-green-600" :
                 sem.status === "Under Review" ? "text-amber-600" :
                 sem.status === "Draft" ? "text-slate-400" : "text-slate-500"
               }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    sem.status === "Published" ? "bg-green-600" :
                    sem.status === "Under Review" ? "bg-amber-600" :
                    sem.status === "Draft" ? "bg-slate-300" : "bg-slate-400"
                  }`} />
                  {sem.status}
               </div>
            </div>

            {/* Content */}
            <div className="flex-1">
               <h3 className="text-[20px] font-black text-[#0F172A] tracking-tight mb-2 group-hover:text-[#8F141B] transition-colors">{sem.semester}</h3>
               <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Structure</span>
                     <div className="flex items-center gap-2 text-[14px] font-bold text-[#0F172A]">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {sem.courses} Courses
                     </div>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Population</span>
                     <div className="flex items-center gap-2 text-[14px] font-bold text-[#0F172A]">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {sem.students} Students
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Stats */}
            <div className="pt-6 border-t border-slate-50 mt-auto flex items-center justify-between">
               <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Synced {sem.date}
               </div>
               <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0F172A] hover:text-white transition-all shadow-sm">
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>

            {/* Decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#8F141B]/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
          </div>
        ))}

        {/* Create New Card */}
        <button className="group bg-white rounded-3xl border-2 border-dashed border-slate-200 hover:border-[#8F141B]/40 transition-all p-8 flex flex-col items-center justify-center text-center gap-4 hover:bg-[#8F141B]/[0.02]">
           <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#8F141B]/10 group-hover:text-[#8F141B] transition-all">
              <Plus className="w-8 h-8" />
           </div>
           <div>
              <p className="text-[15px] font-black text-slate-900">Ingest New Dataset</p>
              <p className="text-[12px] text-slate-400 font-medium px-4 mt-1">Upload CSV or processed JSON to sync a new semester.</p>
           </div>
        </button>
      </div>

      {/* Institutional Ledger Component */}
      <div className="mt-16 bg-[#0F172A] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
            <Database className="w-96 h-96 -mr-16 -mb-16" />
         </div>
         
         <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-1.5 h-6 bg-[#8F141B] rounded-full" />
               <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400">Institutional Ledger</h2>
            </div>
            <h3 className="text-[32px] md:text-[42px] font-black tracking-tighter leading-tight mb-6">
               Immutable record of academic excellence.
            </h3>
            <p className="text-[16px] text-slate-400 font-medium leading-relaxed mb-10">
               Every synchronized dataset is cross-referenced with the faculty registry. To ensure integrity, deletions require multi-factor authorization.
            </p>
            <div className="flex flex-wrap items-center gap-8">
               <div className="flex flex-col">
                  <span className="text-[24px] font-black tracking-tight">100%</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Consistency Rate</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[24px] font-black tracking-tight">24-bit</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Checksum Verified</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[24px] font-black tracking-tight">Secure</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Storage Cluster</span>
               </div>
            </div>
         </div>
      </div>

    </main>
  );
}
