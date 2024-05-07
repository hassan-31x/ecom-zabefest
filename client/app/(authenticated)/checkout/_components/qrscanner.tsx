"use client";

import { useEffect, useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";

import "./scanner.css";

type Product = {
  unitId: string;
  name: string;
  price: number;
  image: string;
  productId: number;
  branchId: number
};

const QrScanner = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [items, setItems] = useState<Product[]>([]);

  const handleResult = (result: string) => {
    if (result) {
      const product = JSON.parse(result) as Product
      const idx = items.findIndex((item) => item.unitId === product.unitId);
      if (idx === -1) {
        setItems([...items, product]);
      }
    }
  };

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

      <div>
          {items.map((item, index) => {
            if (!item) return null;
           return (
            <div key={index} className="flex justify-between items-center w-full gap-4">
              <img src={item.image} className="w-20 h-20" alt="" />
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          
          )})}
      </div>
    </div>
  );
};

export default QrScanner;
