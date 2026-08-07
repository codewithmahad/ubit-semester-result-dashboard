"use client";

import { useState } from "react";
import { Lock, ArrowRight, Shield, Loader2 } from "lucide-react";
import { unlockClass } from "@/app/actions";

interface ClassLockScreenProps {
  classId: string;
  classNameTitle: string;
}

export function ClassLockScreen({ classId, classNameTitle }: ClassLockScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await unlockClass(classId, password);
      
      if (res.success) {
        // Refresh the page to let the server component re-read the cookie
        window.location.reload();
      } else {
        setError(res.error || "Incorrect password");
        triggerShake();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background elements for premium feel */}
      <div className="absolute inset-0 bg-[#f5f7f8] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,#8F141B 39px,#8F141B 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,#8F141B 39px,#8F141B 40px)",
        }}
      />
      <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-[#8F141B] opacity-[0.03] blur-3xl pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-[#8F141B] opacity-[0.03] blur-3xl pointer-events-none" />

      <div className={`relative z-10 w-full max-w-md ${shake ? "animate-shake" : ""}`}>
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] text-center relative overflow-hidden">

          <div className="mx-auto w-16 h-16 bg-[#8F141B]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#8F141B]/20 shadow-inner">
            <Lock className="w-8 h-8 text-[#8F141B]" />
          </div>

          <h2 className="text-2xl font-black text-[#1f2432] mb-2 tracking-tight">
            Restricted Access
          </h2>
          <p className="text-[14px] text-gray-500 font-medium mb-8 leading-relaxed">
            The results for <strong className="text-[#1f2432]">{classNameTitle}</strong> have been locked. Please enter the access code provided by your CR or admin to view this class.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative text-left">
              <label htmlFor="password" className="sr-only">Access Code</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Shield className={`w-4 h-4 transition-colors ${error ? "text-red-500" : "text-gray-400 group-focus-within:text-gray-900"}`} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  className={`block w-full pl-11 pr-4 py-3.5 bg-white border ${
                    error ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  } rounded-xl text-[15px] text-[#1f2432] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 transition-all shadow-sm`}
                  placeholder="Enter access code..."
                  required
                />
              </div>
              
              {/* Fixed height error container to prevent layout shift */}
              <div className="h-6 mt-2 flex items-start justify-center">
                {error && (
                  <p className="text-[13px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1">
                    {error}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full relative group overflow-hidden bg-[#8F141B] text-white rounded-xl py-3.5 px-4 flex items-center justify-center font-bold text-[14px] uppercase tracking-wide transition-all hover:bg-[#7a0f16] active:scale-[0.98] disabled:opacity-70 disabled:hover:bg-[#8F141B] disabled:active:scale-100 shadow-md shadow-[#8F141B]/20"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Unlock Results
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-[12px] font-medium text-gray-400">
              Secured by UBIT Semester Result Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
