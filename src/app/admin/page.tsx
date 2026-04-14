"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  Users,
  TrendingUp,
  Activity,
  AlertTriangle,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from "lucide-react";

export default function AdminPage() {
  return (
    <main className="p-6 lg:p-10">

      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[28px] font-black text-[#0F172A] tracking-tighter leading-tight">
            Console Overview
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">
            Real-time monitoring and institutional data management.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            Export Data
          </button>
          <button className="px-5 py-2.5 bg-[#8F141B] text-white rounded-xl text-[13px] font-bold hover:bg-[#a01a22] transition-all flex items-center gap-2 shadow-lg shadow-[#8F141B]/20">
            <Plus className="w-4 h-4" />
            Add Semester
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Students", value: "1,248", icon: Users, trend: "+45 this month", positive: true },
          { label: "Avg. CGPA", value: "3.24", icon: TrendingUp, trend: "+0.12 vs last sem", positive: true },
          { label: "Critical Alerts", value: "12", icon: AlertTriangle, trend: "-2 since yesterday", positive: true },
          { label: "Active Semesters", value: "6", icon: FileText, trend: "Synced across 4 batches", positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-black ${stat.positive ? "text-green-600" : "text-rose-600"}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <span className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</span>
              <p className="text-[32px] font-black text-[#0F172A] leading-none mt-1 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid: Recent Activity & Data Status */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

        {/* Recent Activity Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-[16px] font-black text-[#0F172A] tracking-tight">Recent Administrative Actions</h3>
            <button className="text-[12px] font-bold text-[#8F141B] hover:underline">View all logs</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { action: "Result Uploaded", target: "BSSE-2025 Semester 3", time: "2 hours ago", status: "Success" },
              { action: "Student Record Modified", target: "EB25210106004", time: "5 hours ago", status: "Success" },
              { action: "Broadcast Notification", target: "Maintenance Schedule", time: "Yesterday", status: "Alert" },
              { action: "Batch Re-calculated", target: "BSCS-2024", time: "2 days ago", status: "Success" },
            ].map((act, i) => (
              <div key={i} className="px-8 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <div>
                    <p className="text-[14px] font-bold text-[#0F172A]">{act.action}</p>
                    <p className="text-[12px] text-slate-500 font-medium">Target: {act.target}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-bold text-slate-400 flex items-center gap-1.5 justify-end">
                    <Clock className="w-3 h-3" />
                    {act.time}
                  </p>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${act.status === "Success" ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-700"}`}>
                    {act.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Data Sync Card */}
        <div className="bg-[#0F172A] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8F141B] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" />

          <Activity className="w-10 h-10 text-[#8F141B] mb-6" />
          <h3 className="text-[20px] font-black tracking-tight mb-2">Systems Healthy</h3>
          <p className="text-[14px] text-slate-400 font-medium leading-relaxed mb-8">
            All 6 semesters have been successfully synchronized with the institutional registry. No corruption detected.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-[12px] font-bold">
              <span className="text-slate-400 uppercase tracking-widest">Storage Capacity</span>
              <span>84%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '84%' }} />
            </div>
          </div>

          <button className="w-full mt-10 py-3 bg-[#8F141B] hover:bg-[#a01a22] rounded-xl text-[13px] font-black tracking-widest uppercase shadow-xl transition-all">
            Run Consistency Check
          </button>
        </div>

      </div>

    </main>
  );
}
