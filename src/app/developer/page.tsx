import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Github, Linkedin, Mail, ArrowUpRight, Globe } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shaikh Mahad — Developer",
  description:
    "Software engineer and system architect. Built the UBIT Results Portal to solve a real institutional problem for 200+ students at the University of Karachi.",
};

// ── Stack items — shown as code, not icon boxes ────────────────
const FRONTEND_STACK = [
  "Next.js 15 (App Router)",
  "TypeScript (strict mode)",
  "Tailwind CSS v3",
  "TanStack Table v8",
  "@tanstack/react-table",
  "Lucide React",
  "html2pdf.js",
];

const BACKEND_PLANNED = [
  "Java 25 + Project Loom",
  "Spring Boot 4",
  "PostgreSQL",
  "JWT (stateless auth)",
  "Maven build system",
  "REST API (JSON:API spec)",
];

const METRICS = [
  { value: "200+",   label: "students tracked" },
  { value: "4",      label: "classes indexed" },
  { value: "2",      label: "semesters of live data" },
  { value: "~3k",    label: "lines of TypeScript" },
];

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
      <Nav />

      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-10 md:py-14">

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">

            {/* ── LEFT — sticky identity panel ─────────────────── */}
            <div className="bg-[#0F172A] rounded-2xl overflow-hidden lg:sticky lg:top-[84px]">

              {/* Top: identity */}
              <div className="px-7 pt-9 pb-7 border-b border-white/[0.07]">
                {/* Monogram */}
                <div className="w-16 h-16 rounded-full bg-[#8F141B] flex items-center justify-center text-white text-[26px] font-black mb-5">
                  SM
                </div>

                <h1 className="text-[22px] font-black text-white tracking-tight leading-tight mb-1">
                  Shaikh Mahad
                </h1>
                <p className="text-[13px] font-mono text-slate-300 mb-5">
                  @codewithmahad
                </p>

                <div className="space-y-2">
                  {[
                    "Software Engineer",
                    "Department of Computer Science",
                    "University of Karachi",
                  ].map(line => (
                    <p key={line} className="text-[13px] font-bold text-white">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="px-5 py-5 space-y-2">
                {[
                  {
                    href: "https://shaikhmahad.vercel.app/",
                    icon: <Globe className="w-4 h-4" />,
                    label: "shaikhmahad.vercel.app",
                    external: true,
                  },
                  {
                    href: "https://github.com/codewithmahad",
                    icon: <Github className="w-4 h-4" />,
                    label: "github.com/codewithmahad",
                    external: true,
                  },
                  {
                    href: "https://linkedin.com/in/codewithmahad",
                    icon: <Linkedin className="w-4 h-4" />,
                    label: "in/codewithmahad",
                    external: true,
                  },
                  {
                    href: "mailto:codewithmahad@gmail.com",
                    icon: <Mail className="w-4 h-4" />,
                    label: "codewithmahad@gmail.com",
                    external: false,
                  },
                ].map(({ href, icon, label, external }) => (
                  <a
                    key={href}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.08] transition-colors"
                  >
                    <span className="text-slate-300 group-hover:text-white transition-colors shrink-0">
                      {icon}
                    </span>
                    <span className="text-[12px] font-medium text-slate-100 group-hover:text-white transition-colors truncate">
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Status */}
              <div className="px-7 pb-8">
                <div className="flex flex-col gap-2 pt-6 border-t border-white/[0.07]">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                    Current Status
                  </p>
                  <div className="flex items-center gap-2.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                    </span>
                    <span className="text-[12px] font-bold text-white tracking-wide">
                      Accepting New Roles
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT — substance ─────────────────────────────── */}
            <div className="space-y-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">

              {/* What I shipped ───────────────────────────────── */}
              <section className="px-8 py-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8F141B] mb-5">
                  What I shipped
                </p>

                <h2 className="text-[26px] font-black text-[#1f2432] tracking-tight leading-tight mb-3">
                  UBIT Results Portal
                </h2>

                <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-xl mb-7">
                  A full-stack academic analytics platform built to replace blurry WhatsApp
                  screenshots and hallway notice boards. Parses raw institutional result data
                  into a live, searchable dashboard with auto-computed CGPA, class rankings,
                  and print-ready transcripts.
                </p>

                {/* Metrics strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                  {METRICS.map(({ value, label }) => (
                    <div
                      key={label}
                      className="bg-white flex flex-col items-center justify-center py-5 px-3 text-center"
                    >
                      <span className="text-[28px] font-black text-[#1f2432] tabular-nums leading-none mb-1">
                        {value}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#0056D2] hover:underline"
                  >
                    Open the portal
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </section>

              {/* Frontend stack ───────────────────────────────── */}
              <section className="px-8 py-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">
                  Current stack
                </p>

                <div className="flex flex-wrap gap-2">
                  {FRONTEND_STACK.map(tech => (
                    <code
                      key={tech}
                      className="px-3 py-1.5 bg-[#F3F4F6] text-[#1f2432] text-[12px] font-mono font-bold rounded-lg border border-gray-200"
                    >
                      {tech}
                    </code>
                  ))}
                </div>
              </section>

              {/* Backend roadmap ──────────────────────────────── */}
              <section className="px-8 py-8">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Next build
                  </p>
                  <span className="px-2.5 py-1 bg-[#8F141B] rounded-full text-[9px] font-black uppercase tracking-widest text-white shrink-0">
                    In progress
                  </span>
                </div>

                <h3 className="text-[18px] font-black text-[#1f2432] tracking-tight mb-2">
                  Enterprise Backend Migration
                </h3>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6 max-w-lg">
                  Replacing the static data layer with a production Java/Spring Boot API.
                  JWT authentication, relational persistence, and a fully typed REST
                  contract between client and server.
                </p>

                <div className="flex flex-wrap gap-2">
                  {BACKEND_PLANNED.map(tech => (
                    <code
                      key={tech}
                      className="px-3 py-1.5 bg-[#F8F9FF] text-[#00255d] text-[12px] font-mono font-bold rounded-lg border border-blue-100"
                    >
                      {tech}
                    </code>
                  ))}
                </div>
              </section>

              {/* Contact ──────────────────────────────────────── */}
              <section className="px-8 py-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">
                  Get in touch
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:codewithmahad@gmail.com"
                    className="group flex items-center justify-center gap-2.5 h-11 px-6 bg-[#0F172A] text-white text-[13px] font-bold rounded-xl hover:bg-black transition-all shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    codewithmahad@gmail.com
                  </a>
                  <a
                    href="https://shaikhmahad.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2.5 h-11 px-6 bg-white text-[#1f2432] text-[13px] font-bold rounded-xl border border-gray-200 hover:border-gray-400 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    Full portfolio
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
