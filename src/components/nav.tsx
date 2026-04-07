import Link from "next/link";
import Image from "next/image";
import { Calculator, LayoutList } from "lucide-react";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex bg-white items-center justify-center overflow-hidden">
            <Image
              src="/uok-logo.png"
              alt="University of Karachi"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[12px] sm:text-[13px] font-bold tracking-tight text-gray-900 leading-none group-hover:text-blue-700 transition-colors">
              University of Karachi
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
              Results Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/class/2025/evening"
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <LayoutList className="h-3.5 w-3.5 hidden sm:block" />
            <span className="sm:hidden">Board</span>
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>
          <Link
            href="/calculator"
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <Calculator className="h-3.5 w-3.5 hidden sm:block" />
            Calc<span className="hidden sm:inline">ulator</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
