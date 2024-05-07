import { ShoppingCart } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center">
      <ShoppingCart className="text-white pr-[2px]" strokeWidth={2.5} />
    </div>
  );
};

export default Logo;
