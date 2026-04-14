"use client";

import Link from "next/link";
import { X, FileText, Settings, AlertCircle, BellOff } from "lucide-react";
import { NOTIFICATIONS, formatRelativeTime, type AppNotification } from "@/constants/notifications";

function getIconForType(type: AppNotification["type"], read: boolean) {
  const colorClass = read ? "text-gray-400" : "text-white";
  const bgClass = read ? "bg-gray-100 border border-gray-200" : "bg-[#8F141B] shadow-sm";

  return (
    <div className={`mt-0.5 flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${bgClass}`}>
      {type === "result" && <FileText className={`w-4 h-4 ${colorClass}`} />}
      {type === "system" && <Settings className={`w-4 h-4 ${colorClass}`} />}
      {type === "alert" && <AlertCircle className={`w-4 h-4 ${colorClass}`} />}
    </div>
  );
}

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
        <div className="hidden md:block absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-5 py-4 bg-[#0F172A] flex justify-between items-center">
            <span className="font-bold text-[14px] text-white">Notifications</span>
            <button onClick={onClose} className="text-[11px] text-gray-300 font-semibold hover:text-white transition-colors">
              Mark all read
            </button>
          </div>
          <div className="max-h-[340px] overflow-y-auto python-scrollbar">
            {NOTIFICATIONS.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                <BellOff className="w-8 h-8 text-gray-300 mb-3" />
                <h3 className="text-[14px] font-bold text-[#1f2432] mb-1">All caught up!</h3>
                <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                  We'll let you know when deadlines approach or when academic results are published here.
                </p>
              </div>
            ) : (
              NOTIFICATIONS.map((n) => (
                <div key={n.id} className={`p-4 transition-colors border-b border-gray-100/70 cursor-pointer ${n.read ? "bg-white hover:bg-gray-50" : "bg-red-50/30 hover:bg-red-50"}`}>
                  <div className="flex gap-3.5">
                    {getIconForType(n.type, n.read)}
                    <div>
                      <p className={`text-[13px] leading-snug ${n.read ? "text-gray-600 font-medium" : "text-[#1f2432] font-semibold"}`}>{n.content}</p>
                      <p className="text-[11px] text-gray-400 mt-1.5 font-medium uppercase tracking-wider">{formatRelativeTime(n.timestamp, currentTime)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </>

      {/* ── Mobile bottom sheet ──────────────────────────────── */}
      <div className="md:hidden">
        <div
          className="fixed inset-0 bg-black/50 z-[60] animate-in fade-in"
          onClick={onClose}
        />
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[70] flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="flex justify-between items-center p-5 bg-[#0F172A] border-b border-[#1e293b]">
            <span className="font-bold text-[18px] text-white">Notifications</span>
            <button onClick={onClose} className="p-1 hover:bg-[#1e293b] rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pb-6 bg-[#F5F7F8]">
            {NOTIFICATIONS.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <BellOff className="w-10 h-10 text-gray-300 mb-4" />
                <h3 className="text-[16px] font-bold text-[#1f2432] mb-1.5">All caught up!</h3>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[250px]">
                  We'll let you know when deadlines approach or academic results drop.
                </p>
              </div>
            ) : (
              NOTIFICATIONS.map((n) => (
                <div key={n.id} className={`px-5 py-5 border-b border-gray-200/60 flex gap-4 cursor-pointer transition-colors ${n.read ? "bg-white" : "bg-white hover:bg-gray-50"}`}>
                  {getIconForType(n.type, n.read)}
                  <div>
                    <p className={`text-[15px] leading-snug mb-1.5 ${n.read ? "text-gray-600 font-medium" : "text-[#1f2432] font-semibold"}`}>{n.content}</p>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{formatRelativeTime(n.timestamp, currentTime)}</p>
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
