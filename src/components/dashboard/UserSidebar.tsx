"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavItem { label: string; href: string; icon: string; }

const mainMenuItems: NavItem[] = [
  { label: "Overview", href: "/dashboard/user", icon: "dashboard" },
  { label: "My Applications", href: "/dashboard/user/applications", icon: "description" },
  { label: "Saved Jobs", href: "/dashboard/user/saved-jobs", icon: "bookmark" },
  { label: "Interviews", href: "/dashboard/user/interviews", icon: "event" },
  { label: "Messages", href: "/dashboard/user/messages", icon: "chat" },
];

const configMenuItems: NavItem[] = [
  { label: "Job Alerts", href: "/dashboard/user/alerts", icon: "notifications" },
  { label: "My Profile", href: "/dashboard/user/profile", icon: "person" },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/dashboard/user" ? pathname === "/dashboard/user" : pathname.startsWith(href);

  return (
    <aside className="w-64 border-r border-accent-dark flex flex-col h-full bg-[#161c14]">
      <div className="p-6 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-neon-green flex items-center justify-center text-background-dark shrink-0 shadow-[0_0_15px_rgba(73,230,25,0.4)]">
            <span className="material-symbols-outlined font-bold" style={{ fontSize: "20px" }}>terminal</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">hired.io</h1>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 space-y-1">
        <div className="px-4 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Search</div>
        {mainMenuItems.map((item) => (
          <Link key={item.href} href={item.href} className={`sidebar-link flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-white transition-colors ${isActive(item.href) ? "active" : ""}`}>
            <span className={`material-symbols-outlined ${isActive(item.href) ? "text-neon-green" : ""}`}>{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}

        <div className="px-4 mt-8 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Settings</div>
        {configMenuItems.map((item) => (
          <Link key={item.href} href={item.href} className={`sidebar-link flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-white transition-colors ${isActive(item.href) ? "active" : ""}`}>
            <span className={`material-symbols-outlined ${isActive(item.href) ? "text-neon-green" : ""}`}>{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}

        <div className="px-4 mt-8">
          <Link href="/find-jobs" className="flex items-center gap-3 px-4 py-3 bg-neon-green/10 border border-neon-green/30 rounded-xl text-neon-green hover:bg-neon-green/20 transition-all">
            <span className="material-symbols-outlined">search</span>
            <span className="text-sm font-bold">Browse Jobs</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-accent-dark">
        <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full bg-card-dark p-3 rounded-xl flex items-center gap-3 border border-white/5 cursor-pointer hover:border-red-500/30 hover:bg-red-500/5 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">U</div>
          <div className="overflow-hidden text-left flex-1">
            <p className="text-sm font-bold truncate">Sign Out</p>
            <p className="text-xs text-gray-400 truncate">Exit Dashboard</p>
          </div>
          <span className="material-symbols-outlined text-gray-500 text-sm">logout</span>
        </button>
      </div>
    </aside>
  );
}
