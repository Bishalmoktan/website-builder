"use client";

import {
  ArchiveRestore,
  ChevronDown,
  LogOut,
  UserCircle,
  UserCircle2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/use-user-store";
import { logout } from "@/lib/service/auth.service";

export default function UserProfile() {
  const { user, clearUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    clearUser();
    window.location.href = "/";
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild onClick={() => setIsOpen(true)}>
        <div className="flex gap-2 items-center bg-secondary rounded-full p-2 cursor-pointer">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              JD
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:block max-w-[110px]">
            <h3 className="text-base font-bold truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {user?.name}
            </h3>
            <p className="text-sm truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {user?.email}
            </p>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 hidden md:block ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
