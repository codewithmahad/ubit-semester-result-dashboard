"use client";

import { AlertCircle } from "lucide-react";

interface DevBannerProps {
  message?: string;
  className?: string;
}

/**
 * DevBanner — A high-visibility indicator that a feature or portal is in development.
 * Uses institutional Maroon (#8F141B) as requested.
 */
export function DevBanner({ 
  message = "DEVELOPMENT PHASE — Backend integration pending. Data is stored locally in your browser.",
  className = ""
}: DevBannerProps) {
  return (
    <div className={`bg-[#8F141B] text-white py-3 px-4 w-full z-[45] relative ${className}`}>
      <div className="max-w-[1600px] mx-auto flex items-center justify-center gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <p className="text-[12px] md:text-[13px] font-bold tracking-tight text-center">
          {message}
        </p>
      </div>
    </div>
  );
}
