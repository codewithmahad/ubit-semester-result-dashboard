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
    { id: "TXN-902", type: "critical", event: "Portal Locked (Maintenance Mode)", actor: "codewithmahad@gmail.com", role: "Master Admin", time: "10 mins ago", status: "Executed" },
    { id: "TXN-901", type: "data", event: "Result Upload: BSSE-25-M Sem 3", actor: "azfar.abbas@gmail.com", role: "CR (BSCS 24)", time: "1 hour ago", status: "Success" },
    { id: "TXN-900", type: "security", event: "Appointed CR Role", actor: "codewithmahad@gmail.com", role: "Master Admin", time: "2 hours ago", status: "Success" },
    { id: "TXN-899", type: "data", event: "Modified Marks: EB25210106004", actor: "kazim.hussain@gmail.com", role: "CR (BSSE 25)", time: "Yesterday", status: "Override" },
    { id: "TXN-898", type: "broadcast", event: "Sent Semantic Alert", actor: "codewithmahad@gmail.com", role: "Master Admin", time: "Yesterday", status: "Broadcasted" },
  ];

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Security Audit Ledger
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Immutable chronological record of all administrative overrides and updates.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <Download className="w-4 h-4" />
              Export Ledger
           </button>
        </div>
      </header>

      {/* Control Rail */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full lg:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by Transaction ID or Gmail Account..."
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-700 outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-[#0F172A]/5 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
           {['All Transactions', 'Result Uploads', 'Mark Overrides', 'Security Configs'].map((f) => (
             <button key={f} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-500 hover:border-[#0F172A] hover:text-[#0F172A] transition-all">
                {f}
             </button>
           ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto styled-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F172A] text-white h-14">
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em]">Transaction Log</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em]">Responsible Actor</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">Timestamp</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">Outcome</th>
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em] text-right">Identifier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {LOGS.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        log.type === "critical" ? "bg-rose-50 text-rose-600" :
                        log.type === "security" ? "bg-purple-50 text-purple-600" :
                        log.type === "data" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                      }`}>
                         {log.type === "critical" ? <AlertTriangle className="w-4 h-4" /> :
                          log.type === "security" ? <ShieldCheck className="w-4 h-4" /> :
                          log.type === "data" ? <Activity className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#0F172A] tracking-tight">{log.event}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                       <span className="text-[13px] font-bold text-[#0F172A]">{log.actor}</span>
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{log.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                       <span className="text-[13px] font-bold text-[#0F172A]">{log.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${
                      log.status === "Executed" || log.status === "Success" ? "bg-green-50 border-green-100 text-green-600" :
                      log.status === "Broadcasted" ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-amber-50 border-amber-100 text-amber-600"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="font-mono text-[11px] font-bold text-slate-400 group-hover:text-[#0F172A] transition-colors">
                       {log.id}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Strip */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
           <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#0F172A] transition-all shadow-sm">
              <ChevronLeft className="w-4 h-4" />
           </button>
           <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest italic">Encrypted Ledger — Verify Integrity</span>
           <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#0F172A] transition-all shadow-sm">
              <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </main>
  );
}
