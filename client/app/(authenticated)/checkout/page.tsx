"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import QrScanner from "./_components/qrscanner";

const CheckoutPage = () => {
  return (
    <div className="relative">
      <Link href="/" className="p-4 z-[40] flex items-center justify-center rounded-full bg-primary absolute top-1 left-5">
        <ArrowLeft size={25} className="" />
      </Link>
      <div className="mt-5">
        <QrScanner />
      </div>
    </div>
  );
};

export default CheckoutPage;
