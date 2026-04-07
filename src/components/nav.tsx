import Link from "next/link";
import Image from "next/image";
import { Calculator, LayoutList } from "lucide-react";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/uok-logo.png"
            alt="University of Karachi"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col justify-center">
            <span className="text-sm sm:text-base font-bold text-gray-900 leading-tight uppercase tracking-wide">
              University of Karachi
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
              Official Results Portal
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/class/2025/evening"
            className="text-[11px] sm:text-sm font-semibold text-gray-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
          >
            Leaderboard
          </Link>
          <Link
            href="/calculator"
            className="text-[11px] sm:text-sm font-semibold text-gray-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
          >
            GPA Calculator
          </Link>
        </div>
      </div>
    </nav>
  );
}
