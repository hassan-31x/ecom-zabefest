"use client";

import { useEffect, useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";
import { toast as sonnerToast } from "sonner";
import { toast } from "react-toastify";
import getStripe from "@/lib/getStripe";

import "./scanner.css";
import { Button } from "@/components/ui/button";
import API from "@/config/api";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";

type Product = {
  unitId: number;
  name: string;
  price: number;
  image: string;
  productId: number;
  branchId: number;
};

type ProductCart = Product & {
  quantity: number;
};

const QrScanner = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [items, setItems] = useState<ProductCart[]>([
    {
      unitId: 1,
      name: "Test Product",
      price: 100,
      image: "https://via.placeholder.com/150",
      productId: 1,
      quantity: 1,
      branchId: 1,
    }, {
      unitId: 2,
      name: "Test Product 2",
      price: 200,
      image: "https://via.placeholder.com/150",
      productId: 2,
      quantity: 1,
      branchId: 1,
    }, {
      unitId: 3,
      name: "Test Product 3",
      price: 300,
      image: "https://via.placeholder.com/150",
      productId: 3,
      quantity: 1,
      branchId: 1,
    }
  ]);
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const handleResult = (result: string) => {
    if (result) {
      const product = JSON.parse(result) as Product;
      const idx = items.findIndex((item) => item.unitId === product.unitId);
      if (idx === -1) {
        setItems([...items, {
          ...product,
          quantity: 1,
        }]);
        sonnerToast.success(`${product.name} added to cart`);
      } else {
        const newItems = [...items];
        newItems[idx].quantity += 1;
        setItems(newItems);
        sonnerToast.success(`${product.name} added to cart`);
      }
    }
  };

  const checkout = async () => {
    // Handle form submission here
    // ... (rest of your existing code)

    // Create a new applicant in Sanity
    setLoading(true);
    try {
      const checkoutSession = await API.post("/checkout", {
        items: items.map((item) => {
          return {
            name: item.name,
            image: item.image,
            price: item.price,
            productId: item.productId,
            branchId: item.branchId,
          };
        }),
      });

      console.log(checkoutSession);
      const checkoutSessionData = checkoutSession.data;



      // Redirect to checkout
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: checkoutSessionData?.id, //This is is used as the query parameter to the success page.
      });
      
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.log("ERROR OCCURED");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center w-full scanner">
      <div className="h-1/2 lg:h-full md:w-1/2 w-full">
        <Scanner
          styles={{
            container: {
              height: "100vh",
              paddingTop: 0,
            },
            video: {
              height: "100vh",
            },
          }}
          onResult={(text, result) => handleResult(text)}
          onError={(error) => toast.error(error?.message)}
          components={{
            audio: false,
          }}
        />
      </div>

      <div className="flex flex-col gap-4 md:w-1/2 w-full items-center">
        <div className="w-full flex flex-col items-center">
          {items.map((item, index) => {
            if (!item) return null;
            return (
              <div key={index} className="flex justify-between items-center w-full max-w-[500px] gap-4">
                <img src={item.image} className="w-20 h-20" alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
                {/* <Button size='icon' className="text-white" onClick={() => {
                  const newItems = [...items];
                  newItems.splice(index, 1);
                  setItems(newItems);
                }}> */}

                {/* <Trash2 className="text-destructive" /> */}
                {/* </Button> */}
                <span className="text-destructive font-medium text-sm cursor-pointer" onClick={() => {
                  const newItems = [...items];
                  newItems.splice(index, 1);
                  setItems(newItems);
                }}>

                Delete
                </span>
              </div>
            );
          })}
        </div>

        {items?.length>0 && <Button className="w-full max-w-[500px]" onClick={checkout}>{loading ? 'Loading..' : 'Checkout'}</Button>}
      </div>
    </div>
  );
};

export default QrScanner;
