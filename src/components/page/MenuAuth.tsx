"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuAuth = () => {
  const { data: session } = useSession();

  // Determine dashboard URL based on user role
  const dashboardUrl = session?.user?.role === "company"
    ? "/dashboard"
    : "/dashboard/user";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-card-dark border border-accent-dark hover:border-neon-green/50 transition-colors">
          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-green to-blue-500 flex items-center justify-center text-background-dark text-xs font-bold">
            {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span className="hidden sm:block text-sm font-semibold text-white max-w-[100px] truncate">
            {session?.user?.name}
          </span>
          <span className="material-symbols-outlined text-gray-400 text-sm">
            expand_more
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-card-dark border-accent-dark"
      >
        <div className="px-3 py-2 border-b border-accent-dark">
          <p className="text-sm font-semibold text-white truncate">
            {session?.user?.name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {session?.user?.email}
          </p>
        </div>

        <DropdownMenuItem asChild>
          <Link
            href={dashboardUrl}
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={`${dashboardUrl}/profile`}
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">person</span>
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-accent-dark" />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAuth;

