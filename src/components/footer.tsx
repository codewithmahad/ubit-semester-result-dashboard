import Link from "next/link";
import Image from "next/image";
import { Bug, Calculator, CodeSquare, TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-10 px-4 sm:px-6 md:px-8 mt-auto no-print">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 lg:gap-6">
        
        {/* Left Side: Branding & Details */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <Image src="/ubit-logo.jpg" alt="UBIT" width={22} height={22} className="object-contain" />
            <h4 className="font-bold text-[#8F141B] text-[15px]">UBIT Results</h4>
          </div>
          
          <p className="text-[12px] font-medium text-gray-700 leading-relaxed overflow-wrap-normal">
            A fast, accessible student-built portal for academic results, transcripts, and standing metrics.
          </p>
          <p className="text-[11px] font-semibold text-gray-600 mt-1 mb-4">
            Disclaimer: Independent student project. Not an official University of Karachi website.
          </p>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-4 mb-0.5">
          <Link 
            href="/leaderboards" 
            className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 hover:text-[#0056D2] transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            Class Leaderboards
          </Link>
          <Link 
            href="/calculator" 
            className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 hover:text-[#0056D2] transition-colors"
          >
            <Calculator className="w-4 h-4" />
            GPA Calculator
          </Link>
          
          <Link 
            href="/developer" 
            className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 hover:text-[#0056D2] transition-colors"
          >
            <CodeSquare className="w-4 h-4" />
            About Developer
          </Link>
          
          <a 
            href="mailto:issue@example.com?subject=UBIT%20Portal%20Issue" 
            className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 hover:text-[#0056D2] transition-colors"
          >
            <Bug className="w-4 h-4" />
            Report Issue
          </a>
        </div>
      </div>
      
      {/* Bottom Legal Utilities Bar */}
      <div className="max-w-[1800px] mx-auto mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest text-center md:text-left">
          &copy; {new Date().getFullYear()} BSSE &#39;25 Initiative
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[12px] font-bold text-gray-600">
          <Link href="/about" className="hover:text-[#0056D2] transition-colors">About the Initiative</Link>
          <Link href="/privacy" className="hover:text-[#0056D2] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#0056D2] transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
