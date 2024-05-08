"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import Success from "./_components/success";
const SuccessPage = () => {
  return (
    <div className="relative">
      <Link href="/" className="p-4 z-[40] flex items-center justify-center rounded-full bg-primary absolute top-5 left-5">
        <ArrowLeft size={25} className="" />
      </Link>
      <div>
        <Success />
      </div>
    </div>
  )
}

export default SuccessPage