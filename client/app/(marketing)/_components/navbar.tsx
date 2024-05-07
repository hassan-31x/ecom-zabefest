import UserButton from "@/components/user-button";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-16 shadow-sm bg-[#F0ECE5] flex justify-center">
      <div className="w-full max-w-screen-xl px-2 md:px-10 flex h-full items-center justify-center">
        <div className="flex gap-2 items-center">
          <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
            <ShoppingCart className="text-white pr-[2px]" strokeWidth={2.5} size={20} />
          </div>
          <h1 className="font-bold text-xl hidden md:inline">E Mart</h1>
        </div>

        <div className="ml-auto">
            <UserButton />
        </div>
      </div>
    </nav>
  );
}
