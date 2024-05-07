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
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect } from "react";
import API from "@/config/api";

const UserButton = () => {
    const { user, setUser } = useAuth();
    console.log("🚀 ~ UserButton ~ user:", user)

  const fetchUserDetails = async () => {
    try {
      const response = await API.get("/auth/current-user");
      setUser(response.data?.data);
    } catch (error) {
      console.error(error);
    //   router.push("/login");
    }
  }


  useEffect(() => {
    if(!user) {
        fetchUserDetails()
    }
  }, [])

  if (!user) {
    return <span>Login</span>
  }

  console.log(user.name?.[0], `${user.name?.split(' ')?.[0]?.[0]}${user.name?.split(' ')?.[user.name?.split(' ')?.length-1]?.[0]}`)


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
          <AvatarFallback>{user.name?.split(' ')?.length === 1 ? user.name?.[0] : `${user.name?.split(' ')?.[0]?.[0]}${user.name?.split(' ')?.[user.name?.split(' ')?.length-1]?.[0]}`}</AvatarFallback>
        </Avatar>
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="bg-bg">
      <DropdownMenuLabel className="text-text">My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-text hover:!bg-neutral-800 hover:!text-white">
        <Link href="/orders">My Orders</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="text-text hover:!bg-neutral-800 hover:!text-text">
        {/* <LogoutBtn /> */}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default UserButton