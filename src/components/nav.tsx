"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Bell, User } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function Nav() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim().length === 0) return;
    const seatNo = searchQuery.trim().toUpperCase();
    setSearchQuery("");
    startTransition(() => {
      router.push(`/student/${seatNo}`);
    });
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e2e6ea] bg-white h-[72px] flex items-center">
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-4 sm:px-8">
        
        {/* Left Section: Logo & Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/ubit-logo.jpg"
              alt="UBIT"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-[18px] sm:text-[22px] font-bold text-[#8F141B] tracking-tight leading-none mt-1">
              UBIT Results
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <Link
              href="/leaderboards"
              className="text-[14px] font-medium text-[#1f2432] hover:text-[#0056D2] transition-colors"
            >
              Leaderboards
            </Link>
            <Link
              href="/calculator"
              className="text-[14px] font-medium text-[#1f2432] hover:text-[#0056D2] transition-colors"
            >
              GPA Calculator
            </Link>
          </div>
        </div>

        {/* Right Section: Fake Search & Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <form onSubmit={handleSearch} className="hidden md:flex relative items-center w-[300px] xl:w-[400px]">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search seat number..." 
              className="w-full h-10 pl-4 pr-10 rounded-full border border-[#1f2432] text-[14px] outline-none text-gray-900 bg-white"
            />
            <button type="submit" disabled={isPending} className="absolute right-0 h-10 w-10 flex items-center justify-center bg-[#0056D2] rounded-full text-white hover:bg-blue-700 transition cursor-pointer disabled:opacity-75">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-4 text-[#1f2432]">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="hover:text-[#0056D2] transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white"></span>
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-[#e2e6ea] shadow-xl rounded-lg overflow-hidden flex flex-col z-50">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="font-bold text-[13px] text-[#1f2432]">Notifications</span>
                    <span className="text-[11px] text-[#0056D2] font-semibold cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-[13px] text-[#1f2432] font-medium leading-tight">Admin added the <span className="font-bold">OOPs results</span> and updated the class GPA.</p>
                        <p className="text-[11px] text-gray-500 mt-1.5">14 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-[13px] text-[#1f2432] leading-tight">Result portal for Batch 2025 Evening is now live.</p>
                        <p className="text-[11px] text-gray-500 mt-1.5">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="h-8 w-8 rounded-full border border-gray-300 bg-gray-50 text-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
        
      </div>
    </nav>
  );
}
