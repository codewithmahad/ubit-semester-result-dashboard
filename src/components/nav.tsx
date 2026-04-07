import Link from "next/link";
import Image from "next/image";
import { Calculator, LayoutList } from "lucide-react";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-50">
            <Image
              src="/ubit-logo.jpg"
              alt="UBIT"
              width={28}
              height={28}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-bold tracking-tight text-gray-900 group-hover:text-black transition-colors">
            UBIT Results
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-2">
          <Link
            href="/class/2025/evening"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <LayoutList className="h-3.5 w-3.5" />
            Leaderboard
          </Link>
          <Link
            href="/calculator"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <Calculator className="h-3.5 w-3.5" />
            Calculator
          </Link>
        </div>
      </div>
    </nav>
  );
}
