"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Runtime UI Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-[#e2e6ea] p-8 md:p-12 max-w-xl w-full text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-[#1f2432] tracking-tight mb-4">
          Application Error
        </h1>
        
        <p className="text-gray-500 font-medium mb-8 leading-relaxed">
          The portal encountered an unexpected runtime error. We've logged the issue. You can try recovering the layout or returning to the safe home dashboard.
        </p>

        <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 mb-8 text-left overflow-hidden">
          <p className="text-xs font-mono text-gray-400 mb-1">Error Digest</p>
          <p className="text-sm font-medium text-gray-700 truncate">{error.message || "Unknown rendering exception"}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1f2432] hover:bg-black text-white font-bold rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-[#e2e6ea] hover:border-gray-300 text-[#1f2432] font-bold rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
