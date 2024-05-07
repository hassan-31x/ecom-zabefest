"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import API from "@/config/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserButton = () => {
  const { user, setUser, loading } = useAuth();
  const router = useRouter();
  

  if (loading) return <span>loading</span>;

  if (!user && !loading) {
    return <Link href="/login">Login</Link>;
  }

  const handleLogout = async () => {
    try {
      const res = await API.post("/auth/logout");
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      setUser(null);
      router.refresh();
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full bg-bg text-black border-text border-2 hover:bg-bg/50">
          <Avatar>
            <AvatarImage src={user?.avatar?.url || "/images/user.webp"} alt={user?.username || "user"} className="object-cover" />
            <AvatarFallback>
              {user.name?.split(" ")?.length === 1 ? user.name?.[0] : `${user.name?.split(" ")?.[0]?.[0]}${user.name?.split(" ")?.[user.name?.split(" ")?.length - 1]?.[0]}`}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel className="text-text">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-black hover:!bg-white hover:text-black cursor-default">{user.name}</DropdownMenuItem>
        <DropdownMenuItem className="text-black hover:!bg-neutral-800 hover:!text-white">
          <Link href="/orders">My Orders</Link>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem className="text-black hover:!bg-neutral-800 hover:!text-white cursor-pointer" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
