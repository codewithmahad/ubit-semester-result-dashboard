"use client";

import { useState } from "react";
import { 
  Contact, 
  Search, 
  ShieldCheck, 
  MoreVertical, 
  Mail,
  UserCheck
} from "lucide-react";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const AUTH_USERS = [
    { id: "1", name: "Shaikh Mahad", email: "codewithmahad@gmail.com", joined: "Jan 10, 2026", role: "Master Admin" },
    { id: "2", name: "Syed Azfar Abbas", email: "azfar.abbas@gmail.com", joined: "Jan 12, 2026", role: "CR (BSCS)" },
    { id: "3", name: "Kazim Hussain", email: "kazim.hussain@gmail.com", joined: "Feb 05, 2026", role: "CR (BSSE)" },
    { id: "4", name: "Hassan Ali", email: "hassan.ali99@gmail.com", joined: "Mar 01, 2026", role: "Student" },
    { id: "5", name: "Ayesha Noor", email: "ayesha.noor.edu@gmail.com", joined: "Mar 15, 2026", role: "Student" },
  ];

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Google Auth Accounts
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Registered portal users. This data is physically separated from Academic Records.
          </p>
        </div>
      </header>

      {/* Control Rail */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full md:w-[450px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by Google display name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-700 outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-[#0F172A]/5 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2">
           {['All Roles', 'Admins', 'CRs', 'Students'].map((f) => (
             <button key={f} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-500 hover:text-[#0F172A] hover:border-[#0F172A] transition-all">
                {f}
             </button>
           ))}
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto styled-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F172A] text-white h-14">
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em]">Google Identity</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em]">Registered Email</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">First Authorized</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">System Role</th>
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {AUTH_USERS.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold shadow-sm">
                        {user.name[0]}
                      </div>
                      <span className="text-[14px] font-bold text-[#0F172A]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <Mail className="w-4 h-4 text-slate-400" />
                       <span className="text-[13px] font-semibold text-slate-600">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[12px] font-bold text-slate-500">{user.joined}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${
                      user.role === "Master Admin" ? "bg-purple-50 border-purple-100 text-purple-700" :
                      user.role.startsWith("CR") ? "bg-[#8F141B]/10 border-[#8F141B]/20 text-[#8F141B]" : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       {user.role === "Student" && (
                         <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-100 text-[11px] font-bold uppercase tracking-widest">
                            <ShieldCheck className="w-3.5 h-3.5" /> Appoint CR
                         </button>
                       )}
                       <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-[#0F172A] transition-colors border border-slate-200">
                          <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </main>
  );
}
