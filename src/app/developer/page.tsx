import { Nav } from "@/components/nav";
import {
  Terminal,
  Database,
  Server,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Cpu,
  Layers,
  ShieldCheck,
  PenLine,
  GitBranch,
  Rocket,
  Braces
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Shaikh Mahad — Engineering Portfolio",
  description:
    "Software Engineer & System Architect. Builder of the UBIT Results Portal",
};

export default function DeveloperPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f8] selection:bg-[#0056D2] selection:text-white">
      <Nav />

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* ════════════════════════════════════════════════════════════════
            HERO — Portal Theme
        ════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-[24px] border border-[#e2e6ea] shadow-sm p-8 md:p-12 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f0f4f9] w-fit mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0056D2] animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#1f2432]">Software Engineer</span>
              </div>
              
              <h1 className="text-[36px] md:text-[52px] font-black tracking-tight leading-[1.1] text-[#1f2432] mb-4">
                Shaikh Mahad
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                 <p className="text-[15px] font-mono text-gray-500 font-medium tracking-tight">@codewithmahad</p>
                 <span className="hidden sm:inline text-gray-300">|</span>
                 <p className="text-[15px] text-[#0056D2] font-bold">System Architect · BSSE Batch 2025</p>
              </div>

              <p className="text-[16px] md:text-[18px] font-medium text-gray-600 leading-relaxed max-w-2xl border-l-2 border-[#8F141B] pl-5">
                Engineered to eliminate institutional friction. I built this architecture to dynamically track, compute, and persist academic analytics for all of UBIT Batch 2025.
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <a 
                href="mailto:codewithmahad@gmail.com" 
                className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-[14px] text-white bg-[#1f2432] transition-colors hover:bg-black shadow-sm"
              >
                <Mail className="w-5 h-5" /> Let&apos;s Talk Architecture
              </a>
              <a 
                href="https://shaikhmahad.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-[14px] text-[#0056D2] bg-[#f0f4f9] border border-[#e2e6ea] transition-all hover:border-[#0056D2] hover:bg-blue-50"
              >
                <Rocket className="w-5 h-5" /> View Official Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            BENTO GRID
        ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          
          {/* Card 1: Frontend Stack */}
          <div className="md:col-span-5 bg-white rounded-[24px] border border-[#e2e6ea] shadow-sm p-8 flex flex-col hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#f0f4f9] text-[#0056D2] flex items-center justify-center border border-[#e2e6ea]">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Live Stack</span>
            </div>
            <h2 className="text-[22px] font-black text-[#1f2432] mb-6 leading-tight">Current Production Architecture</h2>
            
            <div className="space-y-4 mt-auto">
              {[
                { name: "Next.js 15 App Router", icon: <Layers className="w-4 h-4" /> },
                { name: "Strict TypeScript Domain", icon: <Braces className="w-4 h-4" /> },
                { name: "Tailwind CSS v3 Design", icon: <Terminal className="w-4 h-4" /> },
                { name: "Pure Math Computing Utilities", icon: <Cpu className="w-4 h-4" /> },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                    {item.icon}
                  </div>
                  <span className="font-bold text-[14px] text-[#1f2432]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Enterprise Roadmap */}
          <div className="md:col-span-7 bg-[#00255d] text-white rounded-[24px] border border-[#001d4a] shadow-sm p-8 md:p-10 flex flex-col relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-md transition-all">
            {/* Subtle background element */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#0056D2] to-[#00255d] rounded-bl-[130px] opacity-60 -mr-14 -mt-14 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                 <span className="bg-[#8F141B] text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded">Enterprise</span>
              </div>
              <h2 className="text-[24px] md:text-[28px] font-black tracking-tight mb-4 text-white hover:text-amber-400 transition-colors">
                Upcoming Backend Migration
              </h2>
              <p className="text-blue-100 font-medium text-[15px] leading-relaxed mb-8 max-w-lg">
                Transitioning this platform to an enterprise-grade backend powered by Java 25, Spring Boot 4, and PostgreSQL, utilizing Maven and strict JWT security infrastructure.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-auto">
                {[
                  { title: "Java 25 Core", desc: "Project Loom threads" },
                  { title: "Spring Boot 4", desc: "RESTful architecture" },
                  { title: "PostgreSQL", desc: "Relational persistence" },
                ].map((item) => (
                  <div key={item.title} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <p className="font-bold text-white text-[14px] leading-tight mb-1">{item.title}</p>
                    <p className="text-blue-200 text-[12px] font-medium leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            FOOTER GRID
        ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Technical Writing */}
          <div className="md:col-span-2 bg-white rounded-[24px] border border-[#e2e6ea] shadow-sm p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex-1 max-w-sm">
               <h2 className="text-[20px] font-black text-[#1f2432] mb-2 leading-tight">Engineering Log</h2>
               <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
                 Publishing deep-dive technical articles scaling from React render optimization to full-stack scaling strategies.
               </p>
            </div>
            <div className="bg-[#f0f4f9] rounded-xl border border-[#e2e6ea] p-4 flex items-center gap-4 shrink-0">
               <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#0056D2] shadow-sm">
                  <PenLine className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0056D2] mb-0.5">Medium</p>
                  <p className="font-bold text-[#1f2432] text-[14px]">Every Saturday</p>
               </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1 bg-white rounded-[24px] border border-[#e2e6ea] shadow-sm p-8 flex flex-col justify-center">
             <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6 text-center">Connect</p>
             <div className="flex gap-4 justify-center">
               <a 
                 href="https://github.com/codewithmahad" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-14 h-14 rounded-2xl bg-gray-50 border border-[#e2e6ea] flex items-center justify-center text-[#1f2432] hover:bg-black hover:text-white transition-colors"
               >
                 <Github className="w-6 h-6" />
               </a>
               <a 
                 href="https://linkedin.com/in/codewithmahad" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-14 h-14 rounded-2xl bg-gray-50 border border-[#e2e6ea] flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
               >
                 <Linkedin className="w-6 h-6" />
               </a>
             </div>
          </div>

        </div>

      </div>
    </main>
  );
}
