"use client";

import { Button } from "@/components/ui/button";
import API from "@/config/api";
import getLocation from "@/lib/getLocation";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Main() {
  const [location, setLocation] = useState(null);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const loc = await getLocation();
      const res = await API.post("/products/verify-location", loc);

      if (res.status === 200) {
        setLocation(res.data.location)
        router.push("/checkout");
      } else {
        toast.error("You are not allowed to checkout from this location");
      }
    } catch (err) {
      console.log(err);
      toast.error("You are not allowed to checkout from this location");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[95vw] mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 flex items-center border shadow-sm py-3 px-4 rounded-full text-uppercase bg-accent text-primary font-medium">
          <ShoppingCart className="h-6 w-6 mr-2" />
          No 1 Shopping Experience
        </div>

        <h1 className="font-semibold max-w-screen-lg text-3xl md:text-6xl text-center mb-3 md:leading-[1.2]">
          Revolutionize Your Retail Experience
          <span className="text-primary"> with E Mart</span>
        </h1>
      </div>

      <div className="text-sm md:text-lg md:leading-[1.5rem] mt-0 max-w-xs md:max-w-2xl text-center mx-auto text-customGray mb-6">
        Welcome to E Mart - Where Convenience Meets Innovation. Our cutting-edge online POS system empowers shoppers and retailers alike with lightning-fast transactions, real-time
        inventory management, and intuitive scanning technology.
      </div>
      {/* <Button size="lg" className="hover:bg-orange-600 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out" asChild> */}
      {/* <Link href="/checkout">Begin Checkout</Link> */}
      <Button size="lg" className="hover:bg-orange-600 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out" onClick={handleCheckout}>
        Begin Chekcout
      </Button>
    </div>
  );
}
