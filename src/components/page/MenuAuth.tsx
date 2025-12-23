import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiLogOut, BiSolidDownArrow } from "react-icons/bi";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const MenuAuth = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-flex items-center gap-1 cursor-pointer">
          <div className="font-semibold text-primary mr-2">
            Hai, {session?.user.name}
          </div>
          <BiSolidDownArrow className="text-sm" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-500 flex items-center gap-4  font-semibold"
        >
          <BiLogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAuth;
