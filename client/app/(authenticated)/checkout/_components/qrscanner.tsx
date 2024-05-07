"use client";

import { useEffect, useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";

import "./scanner.css";

const QrScanner = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState("");

  const handleResult = (result: any) => {
    if (result) {
      setData(result.text);
      const quantityInput = prompt("Enter quantity:");
      console.log(quantityInput);
    }
  };

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;

  return (
    <div className="h-screen flex items-center w-full scanner">
      <div className="h-1/2 lg:h-full w-full">
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
    </div>
  );
};

export default QrScanner;
