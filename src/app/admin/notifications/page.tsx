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
    <main className="p-4 sm:p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Broadcast Center
          </h1>
          <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 mt-1">
            Dispatch system alerts and updates to students.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6 md:gap-10">
        
        {/* Broadcaster Form */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-[17px] sm:text-[18px] font-black text-[#0F172A] mb-6 flex items-center gap-3">
               <Send className="w-5 h-5 text-[#8F141B]" />
               Create New Broadcast
            </h3>

            <div className="space-y-6">
              {/* Type Selector */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Category</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: "result", label: "Result", icon: FileText, color: "text-blue-600" },
                    { id: "system", label: "System", icon: Settings, color: "text-slate-600" },
                    { id: "alert", label: "Alert", icon: AlertCircle, color: "text-rose-600" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setNotifType(t.id as any)}
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all gap-1.5 sm:gap-2 ${
                        notifType === t.id 
                          ? "border-[#0F172A] bg-white shadow-md sm:shadow-lg" 
                          : "border-transparent bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <t.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${t.color}`} />
                      <span className="text-[11px] sm:text-[12px] font-bold text-[#0F172A]">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Message Content</label>
                <textarea 
                  placeholder="Type your message here..."
                  className="w-full h-28 sm:h-32 p-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none font-medium text-[14px] text-slate-700 transition-all resize-none"
                />
              </div>

              {/* Action */}
              <button className="w-full py-3.5 sm:py-4 bg-[#0F172A] text-white rounded-xl sm:rounded-2xl text-[13px] sm:text-[14px] font-black tracking-widest uppercase shadow-xl">
                Dispatch to Portal
              </button>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="bg-[#8F141B]/[0.02] border border-[#8F141B]/10 p-5 sm:p-6 rounded-2xl flex items-start gap-3 sm:gap-4">
             <Info className="w-5 h-5 text-[#8F141B] mt-0.5 shrink-0" />
             <p className="text-[12px] sm:text-[13px] text-slate-600 leading-relaxed font-medium">
               The portal automatically assigns context-aware icons (Cogs for System, Bell for Alerts) based on selection.
             </p>
          </div>
        </div>

        {/* History Feed */}
        <div className="space-y-4 md:space-y-6">
           <h3 className="text-[16px] sm:text-[18px] font-black text-[#0F172A] flex items-center gap-3 px-2">
              <Clock className="w-5 h-5 text-slate-400" />
              Recent Broadcasts
           </h3>
           
           <div className="space-y-3 sm:space-y-4">
              {[
                { type: "result", content: "Result for Morning BSSE 2025 added.", time: "2h ago", reach: "184 students" },
                { type: "system", content: "Registration is now locking.", time: "1d ago", reach: "Global" },
                { type: "alert", content: "Campus maintenance on Sunday.", time: "3d ago", reach: "Global" },
              ].map((h, i) => (
                <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm flex items-start justify-between group">
                   <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        h.type === "result" ? "bg-blue-50 text-blue-600" :
                        h.type === "system" ? "bg-slate-50 text-slate-600" : "bg-rose-50 text-rose-600"
                      }`}>
                         {h.type === "result" ? <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> :
                          h.type === "system" ? <Settings className="w-4 h-4 sm:w-5 sm:h-5" /> : <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </div>
                      <div className="min-w-0">
                         <p className="text-[13px] font-bold text-[#0F172A] leading-tight truncate">{h.content}</p>
                         <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.time}</span>
                            <span className="hidden sm:inline text-slate-200">•</span>
                            <span className="text-[10px] font-bold text-[#8F141B] uppercase tracking-widest">{h.reach}</span>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </main>
  );
}
