import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | UBIT Results Portal",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
      <Nav />
      
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] font-bold text-gray-500 hover:text-[#8F141B] transition-colors uppercase tracking-widest mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        
        {/* HERO */}
        <header className="mb-16">
          <h1 className="text-[40px] md:text-[56px] font-black text-[#1f2432] tracking-tight leading-tight mb-6">
            Terms of Use
          </h1>
          <p className="text-[18px] md:text-[22px] font-semibold text-[#8F141B] leading-snug">
            Understanding the legal scope and official standing of this student-led utility.
          </p>
        </header>

        {/* LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-20 items-start">
          
          {/* STICKY TOC */}
          <aside className="hidden lg:block sticky top-[100px] border-l-2 border-gray-200 pl-6 py-2">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6">Contents</h3>
            <nav className="space-y-4">
              <a href="#unofficial" className="block text-[14px] font-bold text-gray-500 hover:text-[#1f2432] transition-colors">1. Unofficial Utility</a>
              <a href="#liability" className="block text-[14px] font-bold text-gray-500 hover:text-[#1f2432] transition-colors">2. Liability Disclaimer</a>
              <a href="#truth" className="block text-[14px] font-bold text-gray-500 hover:text-[#1f2432] transition-colors">3. Arbiter of Truth</a>
              <a href="#agreement" className="block text-[14px] font-bold text-gray-500 hover:text-[#1f2432] transition-colors">4. Usage Agreement</a>
            </nav>
          </aside>

          {/* CONTENT */}
          <article className="space-y-16">
            
            <section id="unofficial" className="scroll-mt-[100px]">
              <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
                1. Unofficial Estimation Utility
              </h2>
              <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
                <p>
                  The UBIT Results Portal is an <strong>unofficial, independent</strong> student project designed to aggregate and visualize freely available academic batch results. This portal is <strong>not</strong> officially endorsed, affiliated with, or recognized by the University of Karachi administration.
                </p>
              </div>
            </section>

            <section id="liability" className="scroll-mt-[100px]">
              <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
                2. Liability & Discrepancies
              </h2>
              <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
                <p>
                  We employ robust parsing algorithms to maintain a 1:1 match with official university result postings. The built-in GPA logic closely mirrors the officially provided grading brackets. However, optical character recognition (OCR) parsing, manual entry, or mathematical rounding algorithms may occasionally produce unintended discrepancies.
                </p>
                <p>
                  The developers of this portal assume no liability whatsoever for inaccuracies relating to GPA offsets, ranking placements, or absent academic entries.
                </p>
              </div>
            </section>

            <section id="truth" className="scroll-mt-[100px]">
              <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
                3. The Final Arbiter of Truth
              </h2>
              <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
                <p>
                  Under absolutely all circumstances, the <strong>Official University of Karachi Administrative Office</strong> remains the final, legal arbiter of truth regarding academic standing.
                </p>
                <p>
                  Print-ready transcripts generated via this platform are solely for personal organizational utility. They are strictly informational and hold zero legal weight. They cannot be utilized for official university transfers, job applications requiring verified educational documents, or scholarship submissions.
                </p>
              </div>
            </section>

            <section id="agreement" className="scroll-mt-[100px]">
              <div className="bg-white border border-gray-200 border-l-[4px] border-l-[#8F141B] rounded-r-xl p-6 md:p-8 shadow-sm">
                <p className="text-[12px] font-black uppercase tracking-widest text-[#8F141B] mb-3">Binding Agreement</p>
                <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
                  By continued usage of this platform, you explicitly agree that you understand this tool is a supplementary aid and waive any right to hold the student developers liable for any resulting academic misunderstandings or external complications resulting from parsed data errors.
                </p>
              </div>
            </section>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
