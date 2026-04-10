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
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />
      
      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 py-8 md:py-16 md:px-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[13px] font-bold text-gray-400 hover:text-[#0056D2] transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <h1 className="text-[28px] md:text-[36px] font-black text-[#1f2432] tracking-tight leading-tight mb-3">
          Terms of Use & Disclaimer
        </h1>
        <p className="text-[14px] md:text-[16px] text-gray-500 font-medium leading-relaxed mb-8 pb-6 border-b border-gray-200">
          Understanding the legal scope and official standing of this student-led utility.
        </p>

        <article className="prose prose-zinc max-w-none prose-headings:text-[#1f2432] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-loose">
          <h2 className="text-xl md:text-2xl font-bold mb-4">1. Unofficial Estimation Utility</h2>
          <p className="mb-6">
            The UBIT Results Portal is an <strong>unofficial, independent</strong> student project designed to aggregate and visualize freely available academic batch results. This portal is <strong>not</strong> officially endorsed, affiliated with, or recognized by the University of Karachi administration.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4">2. Liability & Discrepancies</h2>
          <p className="mb-6">
            We employ robust parsing algorithms to maintain a 1:1 match with official university result postings. The built-in GPA logic closely mirrors the officially provided grading brackets. However, optical character recognition (OCR) parsing, manual entry, or mathematical rounding algorithms may occasionally produce unintended discrepancies.
          </p>
          <p className="mb-6">
            The developers of this portal assume no liability whatsoever for inaccuracies relating to GPA offsets, ranking placements, or absent academic entries. 
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4">3. The Final Arbiter of Truth</h2>
          <p className="mb-6">
            Under absolutely all circumstances, the <strong>Official University of Karachi Administrative Office</strong> remains the final, legal arbiter of truth. 
          </p>
          <p className="mb-8">
            Print-ready transcripts generated via this platform are solely for personal organizational utility. They are strictly informational and hold zero legal weight. They cannot be utilized for official university transfers, job applications requiring verified educational documents, or scholarship submissions.
          </p>

          <div className="flex gap-4 p-5 bg-red-50 border border-red-100 rounded-xl items-start">
            <span className="text-red-500 font-black text-xl leading-none mt-1">!</span>
            <p className="text-red-900 text-[13px] leading-relaxed mb-0 font-medium">
              By continued usage of this platform, you explicitly agree that you understand this tool is a supplementary aid and waive any right to hold the student developers liable for any resulting academic misunderstandings.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
