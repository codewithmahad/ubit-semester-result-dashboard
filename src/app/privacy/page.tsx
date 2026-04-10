import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | UBIT Results Portal",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-[14px] md:text-[16px] text-gray-500 font-medium leading-relaxed mb-8 pb-6 border-b border-gray-200">
          Last updated: January 2026. A clear commitment to data ethics and transparency.
        </p>

        <article className="prose prose-zinc max-w-none prose-headings:text-[#1f2432] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-loose">
          <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
            <p className="text-[15px] text-blue-900 font-medium leading-relaxed m-0">
              <strong className="text-blue-950 font-black tracking-wide">TL;DR:</strong> We do not track you. We do not use cookies. We do not require accounts, passwords, or emails. We do not sell data. The UBIT Results Portal is a zero-telemetry, static application.
            </p>
          </div>

          <h2 className="text-xl md:text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="mb-6">
            We collect absolutely <strong>nothing</strong>. As a user navigating this site, your browsing habits, device information, IP address, and keystrokes are completely invisible to us. The portal is strictly an interface functioning on your client device.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4">2. Source of Academic Data</h2>
          <p className="mb-6">
            All records, marks, and academic rankings displayed on this platform are strictly derived from the official PDF results publicly released by the administrative office of the Department of Computer Science (UBIT), University of Karachi. 
          </p>
          <p className="mb-6">
            The data is scraped, parsed, and tabulated solely to improve accessibility and formatting. The creator of this portal does not possess direct backend access to any internal university grading software.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4">3. Local Storage</h2>
          <p className="mb-8">
            Certain features (like the GPA Calculator) use non-persistent local client memory (RAM) or standard browser `localStorage` strictly to save your temporary preferences within your own browser. This data never crosses a network and is never stored on our servers.
          </p>

          <div className="bg-[#eef2f6] p-6 rounded-xl border border-[#d1dce8]">
            <h3 className="text-[#0056D2] text-sm font-bold uppercase tracking-widest mb-2">Have specific concerns?</h3>
            <p className="text-gray-600 text-[13px] font-medium leading-relaxed mb-0">
              If you discover an aggregation error concerning your personal academic record and wish to request a manual synchronization from the official printed batch list, please utilize the Report Issue link located in the footer.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
