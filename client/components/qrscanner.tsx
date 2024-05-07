"use client";

import { useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";

import "./scanner.css";

const QrScanner = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  const handleResult = (result: any) => {
    if (result) {
      setData(result.text);
      const quantityInput = prompt("Enter quantity:");
      console.log(quantityInput);
    }
  };

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
        />
      </div>
    </div>
  );
};

export default QrScanner;
