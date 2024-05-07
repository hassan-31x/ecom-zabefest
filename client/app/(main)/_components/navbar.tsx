import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-16 shadow-sm bg-white flex justify-center">
      <div className="w-full max-w-screen-xl px-5 md:px-10 flex h-full items-center justify-center">
        <div className="flex gap-2 items-center">
          <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
            <ShoppingCart className="text-white pr-[2px]" strokeWidth={2.5} size={20} />
          </div>
          <h1 className="font-bold text-xl hidden md:inline">E Mart</h1>
        </div>

        <div className="ml-auto flex items-center gap-x-2">Hello</div>
      </div>
    </nav>
  );
}
