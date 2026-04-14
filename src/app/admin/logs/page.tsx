"use client";

import { 
  FileText, 
  Search, 
  Terminal, 
  Download, 
  Trash2, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  User,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AdminLogsPage() {
  const LOGS = [
    { id: "L1024", type: "audit", event: "Admin Login", user: "Shaikh Mahad", ip: "192.168.1.1", time: "10 mins ago", status: "Success" },
    { id: "L1023", type: "data", event: "Result Sync: BSSE-25-M", user: "System", ip: "Internal", time: "1 hour ago", status: "Success" },
    { id: "L1022", type: "security", event: "MFA Token Generated", user: "Guest Admin", ip: "110.23.45.12", time: "2 hours ago", status: "Failed" },
    { id: "L1021", type: "broadcast", event: "Semantic Notification Sent", user: "Shaikh Mahad", ip: "192.168.1.1", time: "3 hours ago", status: "Success" },
    { id: "L1020", type: "data", event: "Batch DB Backup", user: "Automated Task", ip: "Internal", time: "5 hours ago", status: "Success" },
    { id: "L1019", type: "audit", event: "Password Change", user: "Admin-02", ip: "45.12.33.102", time: "Yesterday", status: "Success" },
    { id: "L1018", type: "error", event: "API Threshold Exceeded", user: "System", ip: "Internal", time: "Yesterday", status: "Warning" },
  ];

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            System Audit Logs
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Secure chronological record of all administrative and system events.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <Download className="w-4 h-4" />
              Archive Logs
           </button>
           <button className="px-5 py-2.5 bg-[#8F141B]/10 text-[#8F141B] rounded-xl text-[13px] font-bold hover:bg-[#8F141B]/20 transition-all flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Clear Buffer
           </button>
        </div>
      </header>

      {/* Control Rail */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full lg:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by ID, User, or Event..."
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-700 outline-none focus:border-[#0F172A] focus:ring-4 focus:ring-[#0F172A]/5 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
           {['All Logs', 'Audits', 'Data', 'Security', 'Errors'].map((f) => (
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
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em]">Log Entry</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">User</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">Timestamp</th>
                <th className="px-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">Status</th>
                <th className="px-8 text-[11px] font-black uppercase tracking-[0.2em] text-right">Identifier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {LOGS.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        log.type === "audit" ? "bg-blue-50 text-blue-600" :
                        log.type === "security" ? "bg-rose-50 text-rose-600" :
                        log.type === "data" ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600"
                      }`}>
                         {log.type === "audit" ? <Terminal className="w-4 h-4" /> :
                          log.type === "security" ? <ShieldCheck className="w-4 h-4" /> :
                          log.type === "data" ? <Activity className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#0F172A] tracking-tight">{log.event}</p>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{log.ip}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                       <User className="w-3 h-3 text-slate-400" />
                       <span className="text-[12px] font-bold text-slate-600">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                       <span className="text-[13px] font-bold text-[#0F172A]">{log.time}</span>
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          UTC+5
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      log.status === "Success" ? "bg-green-50 border-green-100 text-green-600" :
                      log.status === "Warning" ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-rose-50 border-rose-100 text-rose-600"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="font-mono text-[11px] font-bold text-slate-300 group-hover:text-[#0F172A] transition-colors uppercase tracking-widest">
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
           <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest italic">Encrypted Buffer — Node 0x718</span>
           <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#0F172A] transition-all shadow-sm">
              <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Terminal View Footer */}
      <div className="mt-12 bg-black rounded-[32px] p-8 font-mono text-[12px] text-green-400/80 shadow-2xl relative overflow-hidden group">
         <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
            <span className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               LIVE_STREAMING: AUDIT_DAEMON_V2
            </span>
            <span className="text-white/20">0x0F172A_BSSE</span>
         </div>
         <div className="space-y-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <p>[SYSTEM] Initializing audit buffer scan...</p>
            <p>[AUTH] Verified root access for Shaikh Mahad.</p>
            <p>[DATA] Received 12 packets from semester_registry.ts</p>
            <p>[SECURITY] Integrity check passed (SHA-256 matched).</p>
            <p className="animate-pulse">_</p>
         </div>
      </div>
    </main>
  );
}
