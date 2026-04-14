"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Shield, Hash, BookOpen, Calendar,
  MapPin, AlertCircle, ChevronDown,
  FileText, Check, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const PROGRAMS = [
  { label: "BS Software Engineering",    value: "Bachelor of Science in Software Engineering",    abbr: "BSSE" },
  { label: "BS Computer Science",        value: "Bachelor of Science in Computer Science",        abbr: "BSCS" },
  { label: "BS Artificial Intelligence", value: "Bachelor of Science in Artificial Intelligence", abbr: "BSAI" },
  { label: "BS Data Science",            value: "Bachelor of Science in Data Science",            abbr: "BSDS" },
];

const BATCHES = Array.from({ length: 8 }, (_, i) => String(2018 + i));

// ── Tiny field wrapper ────────────────────────────────────────
function Field({
  label, children, className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Underline input style — not the generic bordered box ──────
const inputCls =
  "w-full bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#0F172A] pb-2 pt-1 text-[15px] font-semibold text-[#1f2432] outline-none transition-colors placeholder:text-gray-300";

function CustomSelect({
  value,
  options,
  onChange,
  icon: Icon
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  icon?: any;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find(o => o.value === value)?.label || value;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#0F172A] pb-2 pt-1 text-[15px] font-semibold text-[#1f2432] outline-none transition-colors text-left flex justify-between items-center cursor-pointer"
      >
        <span className="truncate pr-4">{selectedLabel}</span>
        <div className="flex gap-3 items-center text-gray-300 pointer-events-none">
          {Icon && <Icon className="w-4 h-4" />}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-[110%] bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-64 overflow-y-auto">
            <div className="py-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3.5 text-[14px] transition-colors flex items-center justify-between ${
                    value === opt.value
                      ? "bg-slate-50 text-[#0F172A] font-bold"
                      : "text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {value === opt.value && <Check className="w-4 h-4 text-[#8F141B]" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [form, setForm] = useState({
    fullName:   "Shaikh Mahad",
    seatNo:     "EB24110106027",
    department: "Bachelor of Science in Software Engineering",
    batch:      "2024",
    section:    "B",
    shift:      "Morning",
  });

  const [saved,  setSaved]  = useState(false);
  const [dirty,  setDirty]  = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ubit-profile");
      if (stored) setForm(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const patch = useCallback((key: keyof typeof form, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setDirty(true);
  }, []);

  function handleSave() {
    localStorage.setItem("ubit-profile", JSON.stringify(form));
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const program = PROGRAMS.find(p => p.value === form.department);
  const initials = form.fullName
    .split(" ").slice(0, 2).map(w => w[0] ?? "").join("").toUpperCase() || "S";

  return (
    <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
      <Nav />

      {/* ── Dev banner ──────────────────────────────────────── */}
      <div className="bg-[#8F141B] text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p className="text-[12px] md:text-[13px] font-bold tracking-tight">
            DEVELOPMENT PHASE — Backend integration pending. Data is stored locally in your browser.
          </p>
        </div>
      </div>

      {/* ── Save toast ──────────────────────────────────────── */}
      {saved && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
          <span className="text-[13px] font-bold">Profile saved</span>
        </div>
      )}

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">

          {/* ── LEFT SIDEBAR — dark identity card ─────────────── */}
          <div className="bg-[#0F172A] rounded-2xl overflow-hidden sticky top-[84px]">

            {/* Avatar section */}
            <div className="flex flex-col items-center pt-10 pb-8 px-6 border-b border-white/[0.07]">
              {/* Monogram */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#8F141B] flex items-center justify-center text-white text-[28px] font-black tracking-tight shadow-lg">
                  {initials}
                </div>
                {/* Academic Verified Badge */}
                <div className="absolute -bottom-1 -right-0.5 w-7 h-7 rounded-full bg-[#0056D2] border-[3px] border-[#0F172A] flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />
                </div>
              </div>

              {/* Name */}
              <h1 className="mt-5 text-[18px] font-black text-white tracking-tight text-center leading-tight">
                {form.fullName || "—"}
              </h1>

              {/* Seat number as code badge */}
              <code className="mt-2 px-3 py-1 bg-white/[0.08] border border-white/10 rounded-full text-[11px] font-mono font-bold text-white tracking-widest shadow-sm">
                {form.seatNo || "Seat No."}
              </code>

              {/* Metadata chips */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {[
                  program?.abbr ?? "—",
                  `Batch ${form.batch}`,
                  `${form.shift} · Sec ${form.section}`,
                ].map(chip => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.08] rounded-full text-[10px] font-bold text-slate-200 uppercase tracking-widest shadow-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="px-5 py-5 space-y-2.5 border-b border-white/[0.07]">
              <Link
                href={form.seatNo ? `/student/${encodeURIComponent(form.seatNo.trim().toUpperCase())}` : "#"}
                className="group w-full flex items-center justify-between px-4 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-xl text-[13px] font-bold text-white transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-slate-300 group-hover:text-[#8F141B] transition-colors" />
                  View My Results
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </Link>

              <Link
                href="/leaderboards"
                className="group w-full flex items-center justify-between px-4 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-xl text-[13px] font-bold text-white transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-300 group-hover:text-[#8F141B] transition-colors" />
                  Class Leaderboard
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </Link>
            </div>

            {/* Storage note */}
            <div className="px-5 py-6">
              <div className="flex items-start gap-3 px-4 py-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                <Shield className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                <p className="text-[11.5px] text-slate-200 font-medium leading-relaxed">
                  Your profile is securely stored locally encoded in your browser. No data is sent to external servers.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT — form ──────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Form header */}
            <div className="px-8 pt-8 pb-6 border-b border-gray-50">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8F141B] mb-1.5">
                Academic Identity
              </p>
              <h2 className="text-[22px] font-black text-[#1f2432] tracking-tight">
                Your profile
              </h2>
              <p className="text-[13px] text-gray-400 font-medium mt-1">
                Used to pre-fill seat number searches and personalise your experience.
              </p>
            </div>

            {/* Fields */}
            <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

              {/* Full Name */}
              <Field label="Full Name">
                <input
                  type="text"
                  className={inputCls}
                  value={form.fullName}
                  onChange={e => patch("fullName", e.target.value)}
                  placeholder="Your full name"
                />
              </Field>

              {/* Seat Number */}
              <Field label="Seat Number">
                <div className="relative">
                  <input
                    type="text"
                    className={`${inputCls} font-mono tracking-wider`}
                    value={form.seatNo}
                    onChange={e => patch("seatNo", e.target.value.toUpperCase())}
                    placeholder="e.g. EB24110106027"
                    spellCheck={false}
                  />
                  <Hash className="absolute right-0 bottom-3 w-3.5 h-3.5 text-gray-300 pointer-events-none" />
                </div>
              </Field>

              {/* Program — full width */}
              <Field label="Degree Program" className="md:col-span-2">
                <CustomSelect
                  value={form.department}
                  options={PROGRAMS.map(p => ({ label: p.label, value: p.value }))}
                  onChange={v => patch("department", v)}
                  icon={BookOpen}
                />
              </Field>

              {/* Batch */}
              <Field label="Batch Year">
                <CustomSelect
                  value={form.batch}
                  options={BATCHES.map(b => ({ label: b, value: b }))}
                  onChange={v => patch("batch", v)}
                  icon={Calendar}
                />
              </Field>

              {/* Section */}
              <Field label="Class Section">
                <input
                  type="text"
                  className={inputCls}
                  value={form.section}
                  onChange={e => patch("section", e.target.value.toUpperCase().slice(0, 2))}
                  placeholder="A, B, C..."
                  maxLength={2}
                />
              </Field>

              {/* Shift — pill toggle, not a dropdown */}
              <Field label="Study Shift" className="md:col-span-2">
                <div className="flex gap-3 pt-1">
                  {(["Morning", "Evening"] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => patch("shift", s)}
                      className={`px-6 py-2.5 rounded-full text-[13px] font-bold border-2 transition-all ${
                        form.shift === s
                          ? "bg-[#0F172A] border-[#0F172A] text-white shadow-sm"
                          : "bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                      }`}
                    >
                      {s} Shift
                    </button>
                  ))}
                </div>
              </Field>

            </div>

            {/* Form footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-5 bg-gray-50/70 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[12px] text-gray-400 font-medium">
                <Shield className="w-3.5 h-3.5 shrink-0" />
                Data stored in this browser only — never uploaded.
              </div>
              <button
                onClick={handleSave}
                disabled={!dirty && !saved}
                className={`flex-shrink-0 flex items-center gap-2 h-11 px-7 rounded-xl text-[14px] font-bold transition-all active:scale-[0.97] ${
                  saved
                    ? "bg-emerald-500 text-white shadow-sm"
                    : dirty
                    ? "bg-[#0F172A] text-white hover:bg-[#1e2940] shadow-md"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {saved
                  ? <><Check className="w-4 h-4" /> Saved</>
                  : "Save Changes"}
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
