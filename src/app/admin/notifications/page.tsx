"use client";

import { useState } from "react";
import { 
  Bell, 
  Send, 
  Trash2, 
  AlertCircle, 
  Settings, 
  FileText,
  Clock,
  CheckCircle2,
  Info
} from "lucide-react";

export default function AdminNotificationsPage() {
  const [notifType, setNotifType] = useState<"alert" | "system" | "result">("result");

  return (
    <main className="p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Broadcast Center
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Dispatch system-wide alerts and result updates to students.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-10">
        
        {/* Broadcaster Form */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-[18px] font-black text-[#0F172A] mb-6 flex items-center gap-3">
               <Send className="w-5 h-5 text-[#8F141B]" />
               Create New Broadcast
            </h3>

            <div className="space-y-6">
              {/* Type Selector */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Notification Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "result", label: "Result", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                    { id: "system", label: "System", icon: Settings, color: "text-slate-600", bg: "bg-slate-50" },
                    { id: "alert", label: "Alert", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setNotifType(t.id as any)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${
                        notifType === t.id 
                          ? "border-[#0F172A] bg-white shadow-lg scale-[1.02]" 
                          : "border-transparent bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <t.icon className={`w-5 h-5 ${t.color}`} />
                      <span className="text-[12px] font-bold text-[#0F172A]">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Message Content</label>
                <textarea 
                  placeholder="e.g. Result for Morning BSSE 2025 batch has been updated..."
                  className="w-full h-32 p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F172A] focus:ring-4 focus:ring-[#0F172A]/5 outline-none font-medium text-[14px] text-slate-700 transition-all resize-none"
                />
              </div>

              {/* Action */}
              <button className="w-full py-4 bg-[#0F172A] hover:bg-[#1a2538] text-white rounded-2xl text-[14px] font-black tracking-widest uppercase transition-all shadow-xl shadow-[#0F172A]/20 flex items-center justify-center gap-3">
                <Send className="w-4 h-4" />
                Dispatch to Portal
              </button>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="bg-[#8F141B]/[0.02] border border-[#8F141B]/10 p-6 rounded-2xl flex items-start gap-4">
             <Info className="w-5 h-5 text-[#8F141B] mt-0.5" />
             <div>
                <p className="text-[13px] font-bold text-[#8F141B]">Pro Tip: Semantic Icons</p>
                <p className="text-[13px] text-slate-600 leading-relaxed mt-1">
                  The portal automatically assigns context-aware icons (Cogs for System, Bell for Alerts) based on the type you select. Use **Global Alerts** sparingly for maintenance or urgent policy changes.
                </p>
             </div>
          </div>
        </div>

        {/* History Feed */}
        <div className="space-y-6">
           <h3 className="text-[18px] font-black text-[#0F172A] flex items-center gap-3 px-2">
              <Clock className="w-5 h-5 text-slate-400" />
              Broadcast History
           </h3>
           
           <div className="space-y-4">
              {[
                { type: "result", content: "Result for Morning BSSE 2025 added.", time: "2 hours ago", reach: "184 students" },
                { type: "system", content: "Semester registration is now locking.", time: "1 day ago", reach: "Global" },
                { type: "alert", content: "Campus maintenance scheduled for Sunday.", time: "3 days ago", reach: "Global" },
              ].map((h, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-start justify-between group">
                   <div className="flex items-start gap-4 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        h.type === "result" ? "bg-blue-50 text-blue-600" :
                        h.type === "system" ? "bg-slate-50 text-slate-600" : "bg-rose-50 text-rose-600"
                      }`}>
                         {h.type === "result" ? <FileText className="w-5 h-5" /> :
                          h.type === "system" ? <Settings className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                         <p className="text-[13px] font-bold text-[#0F172A] leading-tight truncate">{h.content}</p>
                         <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h.time}</span>
                            <span className="text-slate-200">•</span>
                            <span className="text-[11px] font-bold text-[#8F141B] uppercase tracking-widest">{h.reach}</span>
                         </div>
                      </div>
                   </div>
                   <button className="p-2 text-slate-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              ))}
           </div>
        </div>

      </div>
    </main>
  );
}
