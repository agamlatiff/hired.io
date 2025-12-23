"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

const mainMenuItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Job Listings", href: "/dashboard/jobs", icon: "list_alt" },
];

const configMenuItems: NavItem[] = [
  { label: "Post a Job", href: "/dashboard/post-job", icon: "post_add" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 border-r border-accent-dark flex flex-col h-full bg-[#161c14]">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-neon-green flex items-center justify-center text-background-dark shrink-0 shadow-[0_0_15px_rgba(73,230,25,0.4)]">
            <span
              className="material-symbols-outlined font-bold"
              style={{ fontSize: "20px" }}
            >
              terminal
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">
            hired.io
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-1">
        <div className="px-4 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
          Main Menu
        </div>
        {mainMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-white transition-colors ${isActive(item.href) ? "active" : ""
              }`}
          >
            <span
              className={`material-symbols-outlined ${isActive(item.href) ? "text-neon-green" : ""}`}
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-neon-purple/20 text-neon-purple text-xs font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        <div className="px-4 mt-8 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
          Configuration
        </div>
        {configMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-white transition-colors ${isActive(item.href) ? "active" : ""
              }`}
          >
            <span
              className={`material-symbols-outlined ${isActive(item.href) ? "text-neon-green" : ""}`}
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Company Profile */}
      <div className="p-4 border-t border-accent-dark">
        <div className="bg-card-dark p-3 rounded-xl flex items-center gap-3 border border-white/5 cursor-pointer hover:border-neon-green/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-blue-500 flex items-center justify-center text-black font-bold">
            TC
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">TechCorp Inc.</p>
            <p className="text-xs text-gray-400 truncate">Pro Plan</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-gray-500 text-sm">
            unfold_more
          </span>
        </div>
      </div>
    </aside>
  );
}
