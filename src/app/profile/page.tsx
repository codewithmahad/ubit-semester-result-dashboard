"use client";

import { useState } from "react";
import { 
  User, Mail, Hash, BookOpen, Calendar, 
  MapPin, Clock, Shield, AlertCircle,
  Camera, Share2, ExternalLink, GraduationCap, ChevronDown
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "Shaikh Mahad",
    seatNo: "EB24110106027",
    department: "Bachelor of Science in Software Engineering",
    batch: "2024",
    section: "B",
    shift: "Morning"
  });

  const programs = [
    "Bachelor of Science in Software Engineering",
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Artificial Intelligence",
    "Bachelor of Science in Data Science"
  ];

  const shifts = ["Morning", "Evening"];
  const batches = Array.from({ length: 11 }, (_, i) => (2020 + i).toString());

  function handleSeatNoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toUpperCase();
    setFormData({ ...formData, seatNo: val });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* ── Disclaimer Banner ─────────────────────────────────── */}
      <div className="bg-[#8F141B] text-white py-4 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-[14px] md:text-[15px] font-bold tracking-tight">
            DEVELOPMENT PHASE: Backend integration and Google Login system will be implemented in a future update.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── Left Sidebar: Profile Summary ──────────────────────── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-ubit-navy to-[#1e293b]" />
              <div className="px-6 pb-8 -mt-12 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-ubit-navy flex items-center justify-center text-white text-3xl font-bold">
                      S
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-400">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <h1 className="mt-4 text-2xl font-bold text-gray-900 leading-tight">
                  {formData.fullName}
                </h1>
                <p className="text-[14px] font-medium text-gray-500 mt-1 uppercase tracking-wider">
                  Seat No: {formData.seatNo}
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  <button className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-[#0056D2] text-[#0056D2] text-[14px] font-bold hover:bg-blue-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share profile link
                  </button>
                  <button className="text-[13px] font-semibold text-[#0056D2] py-2 hover:underline">
                    Update profile visibility
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-[16px] font-bold text-gray-900 border-b border-gray-50 pb-4">
                Work preferences
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-medium text-gray-400 uppercase">Desired roles</span>
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-gray-700">
                    <User className="w-4 h-4 text-blue-500" />
                    Full Stack Developer
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Main Content: Academic Identity ────────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Academic Identity</h2>
                  <p className="text-gray-500 text-[14px] mt-1">Manage your official university credentials.</p>
                </div>
                <GraduationCap className="w-8 h-8 text-ubit-navy opacity-10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full h-12 pl-11 pr-4 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-ubit-navy/40 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Seat Number */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Seat Number (Official)</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text"
                      value={formData.seatNo}
                      onChange={handleSeatNoChange}
                      placeholder="e.g. EB24..."
                      className="w-full h-12 pl-11 pr-4 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-bold outline-none focus:border-ubit-navy/40 focus:bg-white transition-all tracking-wider uppercase"
                    />
                  </div>
                </div>

                {/* Program/Field */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Degree Program</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select 
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full h-12 pl-11 pr-10 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-ubit-navy/40 focus:bg-white transition-all appearance-none"
                    >
                      {programs.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Batch */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Batch Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select 
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                      className="w-full h-12 pl-11 pr-10 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-ubit-navy/40 focus:bg-white transition-all appearance-none"
                    >
                      {batches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Section */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Class Section</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text"
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value.toUpperCase()})}
                      placeholder="e.g. A"
                      className="w-full h-12 pl-11 pr-4 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-ubit-navy/40 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Shift */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Study Shift</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select 
                      value={formData.shift}
                      onChange={(e) => setFormData({...formData, shift: e.target.value})}
                      className="w-full h-12 pl-11 pr-10 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium outline-none focus:border-ubit-navy/40 focus:bg-white transition-all appearance-none"
                    >
                      {shifts.map(s => <option key={s} value={s}>{s} Shift</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between pt-8 border-t border-gray-50">
                <div className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
                  <Shield className="w-4 h-4" />
                  All data is currently stored locally in your browser session.
                </div>
                <button className="h-11 px-8 bg-ubit-navy text-white text-[14px] font-bold rounded-xl hover:opacity-90 transition-all shadow-md active:scale-[0.98]">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Experience Placeholder */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
               <h3 className="text-xl font-bold text-gray-900 mb-6">Experience</h3>
               <div className="p-8 border-2 border-dashed border-gray-100 rounded-2xl text-center">
                  <p className="text-gray-400 text-[14px]">Your professional experience will appear here.</p>
                  <button className="mt-4 text-[13px] font-bold text-[#0056D2] hover:underline">
                    + Add work experience
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
