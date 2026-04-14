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
            Privacy Policy
          </h1>
          <p className="text-[18px] md:text-[22px] font-semibold text-[#8F141B] leading-snug">
            A clear commitment to zero-telemetry data ethics and total transparency.
          </p>
        </header>

        {/* LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-20 items-start">
          
          {/* STICKY TOC */}
          <aside className="hidden lg:block sticky top-[100px] border-l-2 border-gray-200 pl-6 py-2">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6">Contents</h3>
            <nav className="space-y-4">
              <a href="#tldr" className="block text-[14px] font-bold text-gray-500 hover:text-[#1f2432] transition-colors">TL;DR Statement</a>
              <a href="#information" className="block text-[14px] font-bold text-gray-500 hover:text-[#1f2432] transition-colors">1. Information We Collect</a>
              <a href="#source" className="block text-[14px] font-bold text-gray-500 hover:text-[#1f2432] transition-colors">2. Source of Data</a>
              <a href="#storage" className="block text-[14px] font-bold text-gray-500 hover:text-[#1f2432] transition-colors">3. Local Storage</a>
            </nav>
          </aside>

          {/* CONTENT */}
          <article className="space-y-16">
            
            <section id="tldr" className="scroll-mt-[100px]">
              <div className="bg-white border border-gray-200 border-l-[4px] border-l-[#0F172A] rounded-r-xl p-6 shadow-sm">
                <p className="text-[12px] font-black uppercase tracking-widest text-[#0F172A] mb-3">TL;DR</p>
                <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
                  We do not track you. We do not use cookies. We do not require accounts, passwords, or emails. We do not sell data. The UBIT Results Portal is a zero-telemetry, static application.
                </p>
              </div>
            </section>

            <section id="information" className="scroll-mt-[100px]">
              <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
                1. Information We Collect
              </h2>
              <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
                <p>
                  We collect absolutely <strong>nothing</strong>. As a user navigating this site, your browsing habits, device information, IP address, and keystrokes are completely invisible to us. The portal is strictly an interface functioning on your client device.
                </p>
              </div>
            </section>

            <section id="source" className="scroll-mt-[100px]">
              <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
                2. Source of Academic Data
              </h2>
              <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
                <p>
                  All records, marks, and academic rankings displayed on this platform are strictly derived from the official PDF results publicly released by the administrative office of the Department of Computer Science (UBIT), University of Karachi. 
                </p>
                <p>
                  The data is scraped, parsed, and tabulated solely to improve accessibility and formatting. The creators of this portal do not possess direct backend access to any internal university grading software.
                </p>
              </div>
            </section>

            <section id="storage" className="scroll-mt-[100px]">
              <h2 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-[#1f2432] mb-6 border-b-2 border-gray-200 pb-3">
                3. Local Storage
              </h2>
              <div className="space-y-5 text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">
                <p>
                  Certain features (like the GPA Calculator and your personal profile mapping) use non-persistent local client memory (RAM) or standard browser <code className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[13px]">localStorage</code> strictly to save your temporary preferences within your own browser. This data never crosses a network and is never stored on our servers.
                </p>
              </div>
            </section>

            {/* CTA/Contact box */}
            <div className="mt-12 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-[13px] font-black uppercase tracking-widest text-[#8F141B] mb-3">Have specific concerns?</h3>
              <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
                If you discover an aggregation error concerning your personal academic record and wish to request a manual synchronization from the official printed batch list, please reach out to the platform administrator.
              </p>
            </div>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
