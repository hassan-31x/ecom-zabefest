"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

const UserButton = () => {
    const { user, setUser } = useAuth();
  const router = useRouter();


  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full bg-bg text-text border-text border-2 hover:bg-bg/50"
      >
        <Avatar>
          <AvatarImage
            src={user?.avatar?.url || "/images/user.webp"}
            alt={user?.username || "user"}
            className="object-cover"
          />
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="bg-bg">
      <DropdownMenuLabel className="text-text">My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-text hover:!bg-neutral-800 hover:!text-text">
        <Link href="/settings">Settings</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="text-text hover:!bg-neutral-800 hover:!text-text">
        {/* <LogoutBtn /> */}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default UserButton