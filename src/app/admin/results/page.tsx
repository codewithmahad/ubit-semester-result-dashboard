"use client";

import { useState } from "react";
import { 
  UploadCloud, 
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Save,
  ArrowRight,
  Database,
  PlusCircle,
  FolderOpen,
  X
} from "lucide-react";

type UploadScenario = "update" | "new_semester" | "new_class" | null;

export default function AdminResultsPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "edit">("upload");
  const [editingStudent, setEditingStudent] = useState<string | null>(null);

  // WIZARD STATE
  const [scenario, setScenario] = useState<UploadScenario>(null);
  const [step, setStep] = useState(1);

  // MOCK EDIT DATA
  const STUDENT_MARKS = [
    { subject: "Introduction to Software Engineering", marks: 85, grade: "A", gp: 4.0 },
    { subject: "Discrete Mathematics", marks: 72, grade: "B", gp: 3.0 },
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Result Operations Engine
          </h1>
          <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 mt-1">
            Ingest batches or perform precise data corrections.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row bg-[#0F172A]/[0.03] p-1 md:p-1.5 rounded-2xl border border-[#0F172A]/[0.05] w-full md:w-auto">
           <button 
             onClick={() => { setActiveTab("upload"); setScenario(null); setStep(1); }}
             className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[12px] md:text-[13px] font-bold transition-all ${
               activeTab === "upload" ? "bg-[#0F172A] text-white shadow-lg" : "text-slate-500 hover:text-[#0F172A]"
             }`}
           >
             Processing Wizard
           </button>
           <button 
             onClick={() => setActiveTab("edit")}
             className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[12px] md:text-[13px] font-bold transition-all ${
               activeTab === "edit" ? "bg-[#0F172A] text-white shadow-lg" : "text-slate-500 hover:text-[#0F172A]"
             }`}
           >
             Quick Correction
           </button>
        </div>
      </header>

      {/* ── 3-STEP WIZARD MODE ─────────────────────────────────── */}
      {activeTab === "upload" && (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
           
           {/* Scenario Selection Cards */}
           {!scenario && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                 {[
                   { id: "update", icon: Database, color: "text-blue-600", title: "Update Result", desc: "Append incremental marks (e.g. labs) to existing semester payload." },
                   { id: "new_semester", icon: FolderOpen, color: "text-amber-400", title: "New Semester", desc: "Initialize a brand new semester record for a batch.", dark: true },
                   { id: "new_class", icon: PlusCircle, color: "text-[#8F141B]", title: "New Class", desc: "Establish institutional structure for a new batch from scratch." }
                 ].map((opt) => (
                   <button 
                     key={opt.id}
                     onClick={() => { setScenario(opt.id as UploadScenario); setStep(2); }} 
                     className={`text-left p-6 md:p-8 rounded-3xl border-2 transition-all group shadow-sm flex flex-col h-full ${
                       opt.dark ? "bg-[#0F172A] border-transparent hover:ring-4 hover:ring-[#0F172A]/20" : "bg-white border-slate-200 hover:border-[#0F172A]"
                     }`}
                   >
                      <opt.icon className={`w-8 h-8 ${opt.color} mb-6 group-hover:scale-110 transition-transform`} />
                      <h3 className={`text-[16px] font-black mb-2 ${opt.dark ? "text-white" : "text-[#0F172A]"}`}>{opt.title}</h3>
                      <p className={`text-[12px] font-medium leading-relaxed mb-6 ${opt.dark ? "text-slate-400" : "text-slate-500"}`}>
                        {opt.desc}
                      </p>
                      <div className={`mt-auto text-[11px] font-black uppercase tracking-widest flex items-center gap-2 ${opt.dark ? "text-amber-400" : "text-[#0F172A]"}`}>
                         Select Pipeline <ArrowRight className="w-3 h-3" />
                      </div>
                   </button>
                 ))}
              </div>
           )}

           {/* Step 2: Context Configuration */}
           {scenario && step === 2 && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm animate-in slide-in-from-right-4 duration-300">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                    <div>
                       <h3 className="text-[18px] md:text-[20px] font-black text-[#0F172A]">
                          {scenario === "update" ? "Incremental Append" :
                           scenario === "new_semester" ? "Semester Initialization" : "Master Record Creation"}
                       </h3>
                       <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                          Step 2 of 3: Registry Mapping
                       </p>
                    </div>
                    <button onClick={() => { setScenario(null); setStep(1); }} className="text-[11px] font-bold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 px-4 py-2 rounded-xl transition-all self-start">
                       Abort Pipeline
                    </button>
                 </div>

                 <div className="space-y-6">
                    {(scenario === "update" || scenario === "new_semester") && (
                      <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Target Verified Batch</label>
                         <select className="w-full h-11 md:h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none">
                            <option value="">Select an existing class...</option>
                            <option value="BSSE_2025_M_A">BSSE 2025 (Morning) - Sec A</option>
                         </select>
                      </div>
                    )}

                    {scenario === "new_class" && (
                      <div className="p-5 md:p-6 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                          <div className="sm:col-span-2">
                             <h4 className="text-[13px] md:text-[14px] font-black text-[#0F172A] uppercase tracking-widest">Master Record</h4>
                          </div>
                          <div>
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Program</label>
                             <select className="w-full h-11 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-[#0F172A]">
                                <option>BS Software Engineering</option>
                             </select>
                          </div>
                          <div>
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Batch</label>
                             <input type="number" defaultValue="2026" className="w-full h-11 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-[#0F172A] px-4" />
                          </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Semester</label>
                          <select className="w-full h-11 md:h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A]">
                             <option value="">Select Semester...</option>
                             <option value="1">Semester 1</option>
                          </select>
                       </div>
                       {scenario === "update" && (
                          <div>
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Subject Payload</label>
                             <select className="w-full h-11 md:h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A]">
                                <option value="">Select subject(s)...</option>
                                <option value="oop">OOP (Lab)</option>
                             </select>
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="mt-8 flex justify-end">
                    <button onClick={() => setStep(3)} className="w-full sm:w-auto px-8 py-3.5 bg-[#0F172A] text-white rounded-xl text-[12px] font-black tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl">
                       Next: Upload <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
           )}

           {/* Step 3: Engine Upload */}
           {scenario && step === 3 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                 <div className="bg-white p-8 md:p-12 rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#0F172A]/40 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white transition-all mb-6 relative">
                       <UploadCloud className="w-8 h-8 md:w-10 md:h-10" />
                       <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-100">
                          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                       </div>
                    </div>
                    <h3 className="text-[18px] md:text-[20px] font-black text-[#0F172A]">OCR Payload Drop</h3>
                    <p className="text-[13px] text-slate-500 mt-2 max-w-[280px] md:max-w-md">
                       Extraction engine will automatically map JSON data to mapped sequence.
                    </p>
                    <button className="mt-6 px-6 py-2.5 bg-white border border-slate-200 text-[#0F172A] rounded-xl text-[11px] font-black tracking-widest uppercase">
                       Browse Local
                    </button>
                 </div>
              </div>
           )}
        </div>
      )}

      {/* ── DIRECT CORRECTION MODE ────────────────────────────── */}
      {activeTab === "edit" && (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
           
           <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-5 md:gap-6">
              <div className="flex-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Student ID</label>
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="e.g. EB2521010..."
                      className="w-full h-11 md:h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-mono font-bold text-[#0F172A] outline-none transition-all uppercase"
                    />
                 </div>
              </div>
              <div className="flex-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Semester</label>
                 <select className="w-full h-11 md:h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none appearance-none cursor-pointer">
                    <option value="">Select Semester...</option>
                    <option value="1">Semester 1</option>
                 </select>
              </div>
              <div className="flex items-end">
                 <button onClick={() => setEditingStudent("show")} className="w-full h-11 md:h-12 px-8 bg-[#8F141B] text-white rounded-xl text-[12px] font-black uppercase tracking-widest shadow-lg">
                    Fetch
                 </button>
              </div>
           </div>

           {editingStudent && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                 {/* Header Strip */}
                 <div className="bg-[#0F172A] p-5 md:p-8 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-lg shrink-0">K</div>
                       <div className="min-w-0">
                          <h2 className="text-[18px] md:text-[20px] font-black tracking-tight truncate">Kazim Hussain</h2>
                          <p className="text-[11px] font-mono text-slate-400 truncate">EB25210106004 • BSSE 2025 (E)</p>
                       </div>
                    </div>
                    <div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-[#8F141B] bg-red-500/10 px-2.5 py-1.5 rounded border border-red-500/20 inline-flex items-center gap-1.5">
                          <AlertCircle className="w-3 h-3" /> Correction Protocol
                       </span>
                    </div>
                 </div>

                 {/* Editable Data Grid */}
                 <div className="p-4 sm:p-6 lg:p-10 bg-slate-50/50">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                           <tr className="bg-slate-50 border-b border-slate-200 h-11">
                              <th className="px-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Subject</th>
                              <th className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Marks</th>
                              <th className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Grade</th>
                              <th className="px-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">GP</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {STUDENT_MARKS.map((m, i) => (
                              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                                 <td className="px-5 py-3 md:py-4">
                                    <span className="text-[12px] md:text-[13px] font-bold text-[#0F172A]">{m.subject}</span>
                                 </td>
                                 <td className="px-4 py-3 md:py-4 text-center">
                                    <input 
                                      defaultValue={m.marks} 
                                      className="w-14 h-9 mx-auto text-center bg-white border border-slate-300 rounded-lg text-[13px] md:text-[14px] font-black text-[#0F172A] outline-none font-mono"
                                    />
                                 </td>
                                 <td className="px-4 py-3 md:py-4 text-center">
                                    <span className="text-[12px] md:text-[13px] font-black text-slate-500">{m.grade}</span>
                                 </td>
                                 <td className="px-5 py-3 md:py-4 text-right">
                                    <span className="text-[12px] md:text-[13px] font-bold text-slate-400">{m.gp.toFixed(1)}</span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-8 flex items-center justify-end gap-3 sm:gap-4">
                       <button 
                         onClick={() => setEditingStudent(null)}
                         className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-200 text-[12px] font-bold text-slate-600"
                       >
                          Discard
                       </button>
                       <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0F172A] text-white rounded-xl text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <Save className="w-4 h-4" />
                          Commit
                       </button>
                    </div>
                 </div>
              </div>
           )}

        </div>
      )}

    </main>
  );
}
