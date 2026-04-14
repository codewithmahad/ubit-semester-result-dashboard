"use client";

import { 
  Users, 
  TrendingUp, 
  AlertTriangle,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  UploadCloud,
  CheckCircle2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

export default function AdminPage() {
  const gpaData = [
    { range: "3.5 - 4.0", count: 45 },
    { range: "3.0 - 3.4", count: 85 },
    { range: "2.5 - 2.9", count: 110 },
    { range: "2.0 - 2.4", count: 64 },
    { range: "Fail ( < 2.0)", count: 12 },
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-10">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Academic Overview
          </h1>
          <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 mt-1">
            Real-time metrics derived from processed semester results.
          </p>
        </div>
      </header>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        {[
          { label: "Total Students", value: "316", icon: Users, trend: "+64 this semester", positive: true },
          { label: "Processed Semesters", value: "8", icon: FileText, trend: "Across active batches", positive: true },
          { label: "Overall Pass Rate", value: "96.2%", icon: TrendingUp, trend: "+1.2% from last sem", positive: true },
          { label: "Failing Records", value: "12", icon: AlertTriangle, trend: "Requires attention", positive: false },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#0F172A]">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] sm:text-[11px] font-black ${stat.positive ? "text-emerald-600" : "text-rose-600"}`}>
                 {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                 {stat.trend}
              </div>
            </div>
            <div>
              <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</span>
              <p className="text-[28px] sm:text-[32px] font-black text-[#0F172A] leading-none mt-1 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* GPA Skew Analytics */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-[17px] sm:text-[18px] font-black text-[#0F172A] tracking-tight">GPA Distribution</h3>
                 <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Aggregated across all batches</p>
              </div>
           </div>
           
           <div className="h-[220px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={gpaData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                       dataKey="range" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip 
                       contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", fontSize: "12px", fontWeight: "700" }}
                       cursor={{ fill: "#f1f5f9" }}
                    />
                    <Bar dataKey="count" fill="#0F172A" radius={[6, 6, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Uploads Feed */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-[15px] sm:text-[16px] font-black text-[#0F172A] tracking-tight">System Events</h3>
           </div>
           <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {[
                { batch: "CR Assigned", sem: "Syed Azfar Abbas (BSCS)", time: "1h ago", status: "Role", icon: Users },
                { batch: "BSSE-2025 Morning", sem: "Semester 2 Result Upload", time: "2h ago", status: "Processed", icon: UploadCloud },
                { batch: "Grade Corrected", sem: "EB25210106004 update", time: "3h ago", status: "Edited", icon: FileText },
              ].map((upload, i) => (
                <div key={i} className="px-5 sm:px-8 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 hover:bg-slate-50 transition-colors cursor-default">
                   <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <upload.icon className="w-5 h-5" />
                   </div>
                   <div className="min-w-0 flex-1">
                      <p className="text-[13px] sm:text-[14px] font-bold text-[#0F172A] truncate leading-snug">{upload.batch}</p>
                      <p className="text-[11px] sm:text-[12px] text-slate-500 font-medium truncate">{upload.sem}</p>
                   </div>
                   <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold text-slate-400 block mb-1">{upload.time}</p>
                      <div className={`inline-flex items-center gap-1 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded ${
                        upload.status === "Edited" ? "bg-amber-50 text-amber-600" :
                        upload.status === "Role" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                      }`}>
                         {upload.status === "Processed" && <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3" />}
                         {upload.status}
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
