"use client";

import {
  FileText,
  Search,
  Terminal,
  Download,
  Trash2,
  ShieldCheck,
  User,
  Activity,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle
} from "lucide-react";

export default function AdminLogsPage() {
  const LOGS = [
    { id: "TXN-902", type: "critical", event: "Portal Locked (Maintenance)", actor: "codewithmahad@gmail.com", role: "Master", time: "10m ago", status: "Executed" },
    { id: "TXN-901", type: "data", event: "Result Upload: BSSE-25-M", actor: "azfar.abbas@gmail.com", role: "CR (BSCS 24)", time: "1h ago", status: "Success" },
    { id: "TXN-900", type: "security", event: "Appointed CR Role", actor: "codewithmahad@gmail.com", role: "Master", time: "2h ago", status: "Success" },
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-10">

      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Security Audit Ledger
          </h1>
          <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 mt-1">
            Immutable chronological record of administrative actions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            Export Ledger
          </button>
        </div>
      </header>

      {/* Control Rail */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative w-full lg:w-[450px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Transaction ID..."
            className="w-full h-11 sm:h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-700 outline-none focus:border-[#0F172A] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 styled-scrollbar-subtle no-scrollbar">
          {['All', 'Results', 'Overrides', 'Security'].map((f) => (
            <button key={f} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-500 whitespace-nowrap">
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl sm:rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto styled-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px] md:min-w-full">
            <thead>
              <tr className="bg-[#0F172A] text-white h-12 md:h-14">
                <th className="px-6 md:px-8 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Transaction</th>
                <th className="px-4 md:px-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Actor</th>
                <th className="px-4 md:px-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-center">Outcome</th>
                <th className="px-6 md:px-8 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-right">ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {LOGS.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-6 md:px-8 py-4 md:py-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${log.type === "critical" ? "bg-rose-50 text-rose-600" :
                          log.type === "security" ? "bg-purple-50 text-purple-600" :
                            log.type === "data" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                        }`}>
                        {log.type === "critical" ? <AlertTriangle className="w-4 h-4" /> :
                          log.type === "security" ? <ShieldCheck className="w-4 h-4" /> :
                            log.type === "data" ? <Activity className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] md:text-[14px] font-bold text-[#0F172A] truncate">{log.event}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{log.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] md:text-[13px] font-bold text-[#0F172A] truncate max-w-[120px] md:max-w-none">{log.actor}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{log.role}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-5 text-center">
                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${log.status === "Executed" || log.status === "Success" ? "bg-green-50 border-green-100 text-green-600" :
                        log.status === "Broadcasted" ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-amber-50 border-amber-100 text-amber-600"
                      }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-4 md:py-5 text-right">
                    <span className="font-mono text-[10px] md:text-[11px] font-bold text-slate-400">
                      {log.id}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Strip */}
        <div className="px-6 md:px-8 py-4 md:py-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap px-4">Ledger Integrity Verified</span>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>

  );
}
