"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link: string | null;
  createdAt: string;
}

export default function NotificationsDropdown() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("/api/notifications");
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications);
          setUnreadCount(data.unreadCount);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (session) fetchNotifications();
  }, [session]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = async (notificationId?: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationId ? { notificationId } : { markAll: true }),
      });
      if (notificationId) {
        setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n)));
        setUnreadCount((c) => Math.max(0, c - 1));
      } else {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      application: "description",
      interview: "event",
      message: "chat",
      status: "info",
      default: "notifications",
    };
    return icons[type] || icons.default;
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!session) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-white/10 transition-colors"
      >
        <span className="material-symbols-outlined text-gray-300">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card-dark border border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={() => markAsRead()} className="text-xs text-neon-green hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">notifications_off</span>
                <p className="text-sm text-gray-400">No notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.link || "#"}
                  onClick={() => !notif.read && markAsRead(notif.id)}
                  className={`block p-4 hover:bg-white/5 transition-colors border-b border-white/5 ${!notif.read ? "bg-neon-green/5" : ""}`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!notif.read ? "bg-neon-green/20" : "bg-gray-700"}`}>
                      <span className={`material-symbols-outlined text-sm ${!notif.read ? "text-neon-green" : "text-gray-400"}`}>
                        {getTypeIcon(notif.type)}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={`text-sm font-medium truncate ${!notif.read ? "text-white" : "text-gray-300"}`}>{notif.title}</p>
                      <p className="text-xs text-gray-400 truncate">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTime(notif.createdAt)}</p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 bg-neon-green rounded-full shrink-0 mt-2" />}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
