import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Initiative | UBIT Results Portal",
  description: "Learn why the UBIT Results Portal was built to digitalize administrative academic results.",
};

export default function AboutPage() {
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
          About the Initiative
        </h1>
        <p className="text-[14px] md:text-[16px] text-gray-500 font-medium leading-relaxed mb-10 pb-6 border-b border-gray-200">
          The genesis of a modernized, frictionless academic experience for the Department of Computer Science.
        </p>

        <article className="prose prose-zinc max-w-none prose-headings:text-[#1f2432] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-loose">
          <h2 className="text-xl md:text-2xl font-bold mb-4">The Administrative Problem</h2>
          <p className="mb-6">
            Historically, semester results were restricted to deeply analog mediums. The process for checking academic standings involved searching crowded hallways for physical notice boards, locating the correct paper printout, and searching line-by-line for a specific roll number. Alternatively, results would circulate via compressed, blurry WhatsApp image captures across student groups. 
          </p>
          <p className="mb-8">
            This archaic flow introduced severe friction: tracking long-term academic trajectories (CGPA calculations, cumulative rankings, or grade projections) was entirely manual and prone to critical human error.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4">A Digital Solution</h2>
          <p className="mb-6">
            This portal was engineered purely out of an intrinsic need to solve that administrative latency. The UBIT Results Portal successfully parses the university's raw data formats and injects them into a high-performance analytical pipeline. It features an instantaneous client search bar, auto-computed CGPA tracking, class-wide metric comparisons, and print-ready digital transcripts.
          </p>
          <p className="mb-8">
            It replaces chaotic WhatsApp threads with a sleek, performant dashboard that honors the data and instantly empowers the student.
          </p>

          <div className="bg-[#1f2432] p-6 md:p-8 rounded-xl shadow-lg mt-10">
            <h3 className="text-white text-lg font-bold mb-2">Our Mission Standard</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-0 font-medium">
              We believe university tooling shouldn't feel like navigating a bureaucracy. This portal is maintained by students, for the students, designed explicitly to be fast, clear, and perfectly accessible on any device.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
