import Link from "next/link";
import Image from "next/image";
import { Bug, Calculator, TrendingUp, CodeSquare, BookOpen, FileText, Info, Shield, ScrollText, Mail } from "lucide-react";

const EXPLORE_LINKS = [
  { href: "/leaderboards", label: "Class Leaderboards", icon: TrendingUp },
  { href: "/calculator", label: "GPA Calculator", icon: Calculator },
  { href: "/developer", label: "About Developer", icon: CodeSquare },
];

const LEGAL_LINKS = [
  { href: "/about", label: "About the Initiative", icon: Info },
  { href: "/privacy", label: "Privacy Policy", icon: Shield },
  { href: "/terms", label: "Terms of Use", icon: ScrollText },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] no-print" aria-label="Site footer">

      {/* ── Crimson accent rule ──────────────────────────────── */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8F141B] via-[#c0272d] to-transparent" />

      {/* ── Main footer body ─────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20">

          {/* ─ Brand column ─────────────────────────────────── */}
          <div className="max-w-sm">
            {/* Logo + name */}
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/ubit-logo.jpg"
                alt="UBIT"
                width={32}
                height={32}
                className="object-contain rounded-sm opacity-90"
              />
              <span className="text-[18px] font-black text-white tracking-tight leading-none">
                UBIT Results
              </span>
            </div>

            {/* Tagline */}
            <p className="text-[13px] text-slate-300 font-medium leading-relaxed mb-8">
              Instant access to academic transcripts, cumulative GPA metrics,
              and class-wide standings for the Department of Computer Science,
              University of Karachi.
            </p>

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Independent student project. Not an official website of the
              University of Karachi or UBIT.
            </p>
          </div>

          {/* ─ Explore column ───────────────────────────────── */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">
              Explore
            </p>
            <ul className="space-y-3.5">
              {EXPLORE_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:codewithmahad@gmail.com?subject=UBIT%20Portal%20Bug%20Report"
                  className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Bug className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                  Report a Bug
                </a>
              </li>
            </ul>
          </div>

          {/* ─ Legal column ─────────────────────────────────── */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">
              Legal
            </p>
            <ul className="space-y-3.5">
              {LEGAL_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:codewithmahad@gmail.com"
                  className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="border-t border-slate-800/80">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center sm:text-left">
            &copy; {new Date().getFullYear()} BSSE &apos;25 Initiative &nbsp;·&nbsp; All rights reserved
          </p>
          <p className="text-[11px] font-medium text-slate-500 text-center sm:text-right">
            Built by{" "}
            <a
              href="https://shaikhmahad.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-300 hover:text-white transition-colors"
            >
              Shaikh Mahad
            </a>
            {" "}· University of Karachi
          </p>
        </div>
      </div>

    </footer>
  );
}
