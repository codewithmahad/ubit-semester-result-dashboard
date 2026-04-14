"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Trash2, 
  Edit3, 
  UserPlus, 
  Save,
  X,
  AlertTriangle
} from "lucide-react";

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);

  return (
    <main className="p-6 lg:p-10 relative">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Student Roster
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Directly manage directory records, enrollments, and profiles.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setIsAdding(true)}
             className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-bold hover:bg-[#1a2538] transition-all flex items-center gap-2 shadow-lg"
           >
              <UserPlus className="w-4 h-4" />
              Add Student
           </button>
        </div>
      </header>

      {/* Control Rail */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-[450px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search roster by seat number or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-700 outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-[#0F172A]/5 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto styled-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F172A] text-white h-14">
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em]">Student Name</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em]">Seat No.</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em]">Enrolled Batch</th>
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: "Kazim Hussain", roll: "EB25210106004", batch: "BSSE-25 (E)", id: "1" },
                { name: "Kaaif Ahmed Khan", roll: "EM25210106012", batch: "BSSE-25 (M)", id: "2" },
                { name: "Syed Azfar Abbas", roll: "EM25210106045", batch: "BSCS-24 (M)", id: "3" },
              ].map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-4">
                    <span className="text-[14px] font-bold text-[#0F172A]">{student.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-[12px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      {student.roll}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">{student.batch}</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button 
                         onClick={() => setEditingStudent(student.id)}
                         className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors border border-slate-100"
                       >
                          <Edit3 className="w-4 h-4" />
                       </button>
                       <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors border border-slate-100">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MODALS ────────────────────────────────────────────────── */}

      {/* Add Student Overlay */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
              <div className="p-6 md:p-8">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[20px] font-black text-[#0F172A] tracking-tight">Manual Enrollment</h3>
                    <button onClick={() => setIsAdding(false)} className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-all">
                       <X className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <div className="space-y-5">
                    <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Full Legal Name</label>
                       <input 
                         type="text"
                         placeholder="First Last"
                         className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-[14px] font-semibold text-[#0F172A] outline-none focus:border-[#8F141B] transition-colors shadow-sm"
                       />
                    </div>
                    <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Assigned Seat Number</label>
                       <input 
                         type="text"
                         placeholder="e.g. EB25210106000"
                         className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-[14px] font-mono font-bold text-[#0F172A] outline-none focus:border-[#8F141B] transition-colors shadow-sm uppercase"
                       />
                    </div>
                    <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Target Batch Selection</label>
                       <select className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none focus:border-[#0F172A] transition-all appearance-none cursor-pointer">
                          <option value="">Enroll in Batch...</option>
                          <option value="BSSE_2025_M_A">BSSE 2025 (Morning) - Sec A</option>
                          <option value="BSSE_2025_E_A">BSSE 2025 (Evening) - Sec A</option>
                          <option value="BSCS_2024_M_B">BSCS 2024 (Morning) - Sec B</option>
                       </select>
                    </div>
                 </div>

                 <div className="mt-10 flex gap-3">
                    <button onClick={() => setIsAdding(false)} className="flex-1 py-3.5 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
                    <button className="flex-1 py-3.5 bg-[#8F141B] text-white rounded-xl text-[13px] font-black tracking-widest uppercase hover:bg-[#a01a22] transition-all shadow-xl shadow-[#8F141B]/20">Provisional Save</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Edit Form Drawer / Overlay */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white h-full max-h-full rounded-[32px] w-full max-w-md shadow-2xl overflow-y-auto animate-in slide-in-from-right-8 duration-300 relative flex flex-col">
              
              <div className="p-6 md:p-8 flex-1">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[20px] font-black text-[#0F172A] tracking-tight">Edit Profile</h3>
                    <button onClick={() => setEditingStudent(null)} className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-all">
                       <X className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <div className="space-y-5">
                    <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Name Correction</label>
                       <input 
                         defaultValue="Kazim Hussain"
                         className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-[14px] font-semibold text-[#0F172A] outline-none focus:border-[#0F172A] transition-colors shadow-sm"
                       />
                    </div>
                    <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Seat Number Update</label>
                       <input 
                         defaultValue="EB25210106004"
                         className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-[14px] font-mono font-bold text-[#0F172A] outline-none focus:border-[#0F172A] transition-colors shadow-sm uppercase"
                       />
                    </div>
                    <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Batch Transfer</label>
                       <select className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-[#0F172A] outline-none focus:border-[#0F172A] transition-all appearance-none cursor-pointer">
                          <option value="BSSE_2025_E_A">BSSE 2025 (Evening) - Sec A</option>
                          <option value="BSSE_2025_M_A">BSSE 2025 (Morning) - Sec A</option>
                       </select>
                    </div>
                 </div>

                 {/* Danger Zone */}
                 <div className="mt-12 p-5 bg-rose-50 rounded-2xl border border-rose-100">
                    <p className="text-[11px] font-black text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <AlertTriangle className="w-4 h-4" /> Danger Zone
                    </p>
                    <p className="text-[12px] text-rose-800 font-medium mb-4 leading-relaxed">
                       Deleting a student will irrevocably erase all linked academic records. This requires master admin clearance.
                    </p>
                    <button className="w-full py-2.5 bg-white border border-rose-200 text-rose-600 rounded-xl text-[12px] font-bold hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                       Erase Record Completely
                    </button>
                 </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex gap-3 mt-auto">
                 <button onClick={() => setEditingStudent(null)} className="flex-1 py-3.5 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-600 hover:bg-white transition-all shadow-sm">Discard</button>
                 <button className="flex-1 py-3.5 bg-[#0F172A] text-white rounded-xl text-[13px] font-black tracking-widest uppercase hover:bg-[#1a2538] transition-all shadow-xl shadow-[#0F172A]/20">Update Record</button>
              </div>
           </div>
        </div>
      )}

    </main>
  );
}
