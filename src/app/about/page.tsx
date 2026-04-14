import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Initiative | UBIT Results Portal",
  description:
    "The genesis of a modernized, frictionless academic experience for the Department of Computer Science.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
      <Nav />

      <main className="flex-1 w-full max-w-[800px] mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-24">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] font-bold text-gray-500 hover:text-[#8F141B] transition-colors uppercase tracking-widest mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* HERO */}
        <header className="mb-16">
          <h1 className="text-[40px] md:text-[56px] font-black text-[#1f2432] tracking-tight leading-tight mb-6">
            About the Initiative
          </h1>
          <p className="text-[18px] md:text-[22px] font-semibold text-[#8F141B] leading-snug">
            The genesis of a modernized, frictionless academic experience for the Department of Computer Science.
          </p>
        </header>

        {/* CONTENT */}
        <article className="space-y-16">

          <section>
            <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
              The Administrative Problem
            </h2>
            <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
              <p>
                Historically, semester results were restricted to deeply analog mediums. The process for checking academic standings involved searching crowded hallways for physical notice boards, locating the correct paper printout, and searching line-by-line for a specific roll number. Alternatively, results would circulate via compressed, blurry WhatsApp image captures across student groups.
              </p>
              <p>
                This archaic flow introduced severe friction: tracking long-term academic trajectories (CGPA calculations, cumulative rankings, or grade projections) was entirely manual and prone to critical human error.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
              A Digital Solution
            </h2>
            <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
              <p>
                This portal was engineered purely out of an intrinsic need to solve that administrative latency. The UBIT Results Portal successfully parses the university raw data formats and injects them into a high-performance analytical pipeline. It features an instantaneous client search bar, auto-computed CGPA tracking, class-wide metric comparisons, and print-ready digital transcripts.
              </p>
              <p>
                It replaces chaotic WhatsApp threads with a sleek, performant dashboard that honors the data and instantly empowers the student.
              </p>

              {/* Developer Reality Callout perfectly aligned with user feedback */}
              <div className="bg-white border border-gray-200 border-l-[4px] border-l-[#8F141B] rounded-r-xl p-6 mt-8 shadow-sm">
                <p className="text-[12px] font-black uppercase tracking-widest text-[#8F141B] mb-2">Development Reality</p>
                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                  While departmental notice boards provide clean, verified physical prints, the bottleneck arises when students have to photograph these lists to remember them, manually extract their own marks, and calculate cumulative GPAs by hand. This platform aims to bridge that gap. However, as an evolving solution built from the ground up, there remain unhandled edge cases and areas lacking complete automation. These aspects will be iteratively improved and resolved as development continues.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
              Our Mission Standard
            </h2>
            <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
              <p>
                We believe university tooling shouldn&apos;t feel like navigating a bureaucracy. This portal is maintained by students, for the students, designed explicitly to be fast, clear, and perfectly accessible on any device.
              </p>
            </div>
          </section>

        </article>

        {/* CTA */}
        <section className="mt-20 pt-10 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="group flex-1 flex items-center justify-between bg-[#0F172A] text-white px-7 py-5 rounded-xl font-bold text-[15px] hover:bg-black transition-all shadow-sm"
            >
              <span>Open the Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/developer"
              className="group flex-1 flex items-center justify-between bg-white text-[#1f2432] px-7 py-5 rounded-xl font-bold text-[15px] border border-gray-200 hover:border-[#8F141B] hover:shadow-sm transition-all"
            >
              <span>Meet the Developer</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#8F141B] group-hover:translate-x-1 transition-colors" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
