"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { NOTIFICATIONS, formatRelativeTime } from "@/constants/notifications";

interface NavNotificationsPanelProps {
  show: boolean;
  onClose: () => void;
  currentTime: Date | null;
}

/**
 * NavNotificationsPanel — renders both:
 * - Desktop: absolute-positioned dropdown (hidden on mobile via CSS)
 * - Mobile: fixed bottom-sheet (hidden on desktop via CSS)
 *
 * Both are controlled by the same `show` boolean from the parent Nav.
 */
export function NavNotificationsPanel({ show, onClose, currentTime }: NavNotificationsPanelProps) {
  if (!show) return null;

  return (
    <>
      {/* ── Desktop dropdown ─────────────────────────────────── */}
      <>
        <div
          className="fixed inset-0 z-40 hidden md:block"
          onClick={onClose}
        />
        <div className="hidden md:block absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <span className="font-bold text-[13px] text-[#1f2432]">Notifications</span>
            <button onClick={onClose} className="text-[11px] text-[#0056D2] font-semibold hover:underline">
              Mark all read
            </button>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer">
                <div className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? "bg-gray-300" : "bg-blue-500"}`} />
                  <div>
                    <p className="text-[13px] text-[#1f2432] font-medium leading-snug">{n.content}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{formatRelativeTime(n.timestamp, currentTime)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>

      {/* ── Mobile bottom sheet ──────────────────────────────── */}
      <div className="md:hidden">
        <div
          className="fixed inset-0 bg-black/50 z-[60] animate-in fade-in"
          onClick={onClose}
        />
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[70] flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-full duration-300">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <span className="font-bold text-[20px] text-[#1f2432]">Notifications</span>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pb-6">
            {NOTIFICATIONS.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">No notifications</h3>
                <p className="text-[14px] text-gray-500">
                  We&apos;ll let you know when deadlines are approaching, or there is a course update
                </p>
              </div>
            ) : (
              NOTIFICATIONS.map((n) => (
                <div key={n.id} className="px-5 py-4 hover:bg-gray-50 border-b border-gray-100/50 flex gap-4 cursor-pointer">
                  <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${n.read ? "bg-gray-200" : "bg-[#0056D2]"}`} />
                  <div>
                    <p className="text-[15px] font-medium text-[#1f2432] leading-snug mb-1">{n.content}</p>
                    <p className="text-[12px] text-gray-400">{formatRelativeTime(n.timestamp, currentTime)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
