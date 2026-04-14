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
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Result Operations Engine
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Ingest semester batches or perform precise data corrections.
          </p>
        </div>
        <div className="flex bg-[#0F172A]/[0.03] p-1.5 rounded-2xl border border-[#0F172A]/[0.05]">
           <button 
             onClick={() => { setActiveTab("upload"); setScenario(null); setStep(1); }}
             className={`px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
               activeTab === "upload" ? "bg-[#0F172A] text-white shadow-lg" : "text-slate-500 hover:text-[#0F172A]"
             }`}
           >
             Result Processing Wizard
           </button>
           <button 
             onClick={() => setActiveTab("edit")}
             className={`px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
               activeTab === "edit" ? "bg-[#0F172A] text-white shadow-lg" : "text-slate-500 hover:text-[#0F172A]"
             }`}
           >
             Data Correction
           </button>
        </div>
      </header>

      {/* ── 3-STEP WIZARD MODE ─────────────────────────────────── */}
      {activeTab === "upload" && (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
           
           {/* Scenario Selection Cards - Only show if not selected */}
           {!scenario && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <button onClick={() => { setScenario("update"); setStep(2); }} className="text-left bg-white p-8 rounded-3xl border-2 border-slate-200 hover:border-[#0F172A] transition-all group shadow-sm flex flex-col h-full">
                    <Database className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-[16px] font-black text-[#0F172A] mb-2">Update Existing Result</h3>
                    <p className="text-[12px] font-medium text-slate-500 leading-relaxed mb-6">
                       Upload an incremental subject result (e.g., OOP lab marks) to a semester payload that already exists.
                    </p>
                    <div className="mt-auto text-[11px] font-black uppercase tracking-widest text-[#0F172A] flex items-center gap-2">
                       Select Pipeline <ArrowRight className="w-3 h-3" />
                    </div>
                 </button>

                 <button onClick={() => { setScenario("new_semester"); setStep(2); }} className="text-left bg-[#0F172A] p-8 rounded-3xl border-2 border-transparent hover:ring-4 hover:ring-[#0F172A]/20 transition-all group shadow-xl flex flex-col h-full">
                    <FolderOpen className="w-8 h-8 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-[16px] font-black text-white mb-2">Initialize New Semester</h3>
                    <p className="text-[12px] font-medium text-slate-400 leading-relaxed mb-6">
                       A brand new semester result has been announced for a batch that is already verified on the portal.
                    </p>
                    <div className="mt-auto text-[11px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                       Select Pipeline <ArrowRight className="w-3 h-3" />
                    </div>
                 </button>

                 <button onClick={() => { setScenario("new_class"); setStep(2); }} className="text-left bg-white p-8 rounded-3xl border-2 border-slate-200 hover:border-[#8F141B] transition-all group shadow-sm flex flex-col h-full">
                    <PlusCircle className="w-8 h-8 text-[#8F141B] mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-[16px] font-black text-[#0F172A] mb-2">Register Brand New Class</h3>
                    <p className="text-[12px] font-medium text-slate-500 leading-relaxed mb-6">
                       You are establishing a deeply-nested institutional structure (e.g., BSCS Evening 2026 Section C) from scratch.
                    </p>
                    <div className="mt-auto text-[11px] font-black uppercase tracking-widest text-[#8F141B] flex items-center gap-2">
                       Select Pipeline <ArrowRight className="w-3 h-3" />
                    </div>
                 </button>
              </div>
           )}

           {/* Step 2: Context Configuration */}
           {scenario && step === 2 && (
             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                   <div>
                      <h3 className="text-[20px] font-black text-[#0F172A]">
                         {scenario === "update" ? "Incremental Result Append" :
                          scenario === "new_semester" ? "Semester Initialization Phase" : "Master Record Creation"}
                      </h3>
                      <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                         Step 2 of 3: Registry Mapping
                      </p>
                   </div>
                   <button onClick={() => { setScenario(null); setStep(1); }} className="text-[12px] font-bold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 px-4 py-2 rounded-xl transition-all">
                      Abort Pipeline
                   </button>
                </div>

                <div className="space-y-6">
                   {/* Scenario A & B: Need to select an Existing Class */}
                   {(scenario === "update" || scenario === "new_semester") && (
                     <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Target Verified Batch</label>
                        <select className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none focus:border-[#0F172A] transition-all appearance-none cursor-pointer">
                           <option value="">Select an existing class...</option>
                           <option value="BSSE_2025_M_A">BSSE 2025 (Morning) - Sec A</option>
                           <option value="BSSE_2025_E_A">BSSE 2025 (Evening) - Sec A</option>
                        </select>
                     </div>
                   )}

                   {/* Scenario C: Need completely new fields */}
                   {scenario === "new_class" && (
                     <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">
                         <div className="sm:col-span-2">
                            <h4 className="text-[14px] font-black text-[#0F172A] uppercase tracking-widest mb-1">Define Master Record</h4>
                            <p className="text-[12px] text-slate-500 font-medium mb-4">You are committing a new architectural node to the database.</p>
                         </div>
                         <div>
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Degree Program</label>
                            <select className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none">
                               <option>BS Software Engineering</option>
                               <option>BS Computer Science</option>
                            </select>
                         </div>
                         <div>
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Batch Year</label>
                            <input type="number" defaultValue="2026" className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none" />
                         </div>
                         <div>
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Shift Selection</label>
                            <select className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none">
                               <option>Morning</option>
                               <option>Evening</option>
                            </select>
                         </div>
                         <div>
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Academic Section</label>
                            <select className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none">
                               <option>Section A</option>
                               <option>Section B</option>
                               <option>Section C</option>
                            </select>
                         </div>
                     </div>
                   )}

                   {/* All Scenarios: Need Semester Identification */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                      <div>
                         <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Semester Target</label>
                         <select className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none focus:border-[#0F172A] transition-all appearance-none cursor-pointer">
                            <option value="">Select Semester...</option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                            <option value="3">Semester 3</option>
                         </select>
                      </div>
                      
                      {/* Only Scenario A needs to select WHICH subjects they are appending */}
                      {scenario === "update" && (
                         <div>
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Subjects Contained in Payload</label>
                            <select className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none focus:border-[#0F172A] transition-all appearance-none cursor-pointer">
                               <option value="">Select subject(s)...</option>
                               <option value="oop">Object Oriented Programming (Only)</option>
                               <option value="dm">Discrete Mathematics (Only)</option>
                            </select>
                         </div>
                      )}
                   </div>
                </div>

                <div className="mt-10 flex justify-end">
                   <button onClick={() => setStep(3)} className="px-8 py-3.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-black tracking-widest uppercase hover:bg-[#1a2538] transition-all shadow-xl shadow-[#0F172A]/20 flex items-center gap-3">
                      Proceed to Upload <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
           )}

           {/* Step 3: Engine Upload */}
           {scenario && step === 3 && (
             <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#0F172A]/40 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer shadow-sm">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white transition-all mb-6 relative shadow-lg group-hover:shadow-[0_10px_40px_-10px_rgba(15,23,42,0.4)]">
                      <UploadCloud className="w-10 h-10" />
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-slate-100 group-hover:border-transparent">
                         <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                      </div>
                   </div>
                   <h3 className="text-[20px] font-black text-[#0F172A]">Drop OCR Payload Here</h3>
                   <p className="text-[14px] font-medium text-slate-500 mt-2 max-w-md">
                      The internal parser will automatically extract JSON structured data matching your predefined mapping sequence.
                   </p>
                   <button className="mt-8 px-8 py-3 bg-white border border-slate-200 text-[#0F172A] rounded-xl text-[13px] font-black tracking-widest uppercase hover:bg-slate-50 transition-all shadow-sm">
                      Browse Local Drive
                   </button>
                </div>
                
                <div className="mt-6 flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                   <CheckCircle2 className="w-5 h-5 shrink-0" />
                   <p className="text-[12px] font-bold leading-tight">
                      Pipeline integrity verified. Ready to compute results against the institutional registry.
                   </p>
                </div>
             </div>
           )}
        </div>
      )}

      {/* ── DIRECT CORRECTION MODE ────────────────────────────── */}
      {activeTab === "edit" && (
        <div className="space-y-8 animate-in fade-in duration-300">
           
           <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Student Seat Number</label>
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="e.g. EB25210106004"
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-mono font-bold text-[#0F172A] outline-none focus:border-[#8F141B] transition-all uppercase"
                    />
                 </div>
              </div>
              <div className="flex-1">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Target Semester</label>
                 <select className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none focus:border-[#8F141B] transition-all appearance-none cursor-pointer">
                    <option value="">Select Semester...</option>
                    <option value="1">Semester 1</option>
                 </select>
              </div>
              <div className="flex items-end">
                 <button onClick={() => setEditingStudent("show")} className="h-12 px-8 bg-[#8F141B] text-white rounded-xl text-[13px] font-black tracking-widest uppercase hover:bg-[#a01a22] transition-all shadow-xl shadow-[#8F141B]/20">
                    Fetch Record
                 </button>
              </div>
           </div>

           {editingStudent && (
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                 {/* Header Strip */}
                 <div className="bg-[#0F172A] p-6 lg:px-10 flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-lg">K</div>
                       <div>
                          <h2 className="text-[20px] font-black tracking-tight">Kazim Hussain</h2>
                          <p className="text-[12px] font-mono text-slate-400">EB25210106004 • BSSE 2025 (E)</p>
                       </div>
                    </div>
                    <div className="hidden sm:block text-right">
                       <span className="text-[11px] font-black uppercase tracking-widest text-[#8F141B] bg-red-500/10 px-3 py-1.5 rounded border border-red-500/20 flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5" /> Correction Protocol Active
                       </span>
                    </div>
                 </div>

                 {/* Editable Data Grid */}
                 <div className="p-6 lg:p-10 bg-slate-50/50">
                    <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                       <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 h-12">
                             <th className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 w-[50%]">Subject</th>
                             <th className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Marks</th>
                             <th className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Grade</th>
                             <th className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">GP</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {STUDENT_MARKS.map((m, i) => (
                             <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                                <td className="px-6 py-4">
                                   <span className="text-[13px] font-bold text-[#0F172A]">{m.subject}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                   <input 
                                     defaultValue={m.marks} 
                                     className="w-16 h-10 mx-auto text-center bg-white border border-slate-300 rounded-lg text-[14px] font-black text-[#0F172A] outline-none focus:border-[#8F141B] focus:ring-4 focus:ring-[#8F141B]/10 transition-all font-mono"
                                   />
                                </td>
                                <td className="px-6 py-4 text-center">
                                   <span className="text-[13px] font-black text-slate-500">{m.grade}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <span className="text-[13px] font-bold text-slate-400">{m.gp.toFixed(1)}</span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>

                    {/* Action Bar */}
                    <div className="mt-8 flex items-center justify-end gap-4">
                       <button 
                         onClick={() => setEditingStudent(null)}
                         className="px-6 py-3 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
                       >
                          Discard
                       </button>
                       <button className="px-8 py-3 bg-[#0F172A] text-white rounded-xl text-[13px] font-black tracking-widest uppercase hover:bg-[#1a2538] transition-all shadow-xl shadow-[#0F172A]/20 flex items-center gap-2">
                          <Save className="w-4 h-4" />
                          Commit Override
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
