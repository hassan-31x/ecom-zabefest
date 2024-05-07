"use client"
import React from 'react'
import QrScanner from "@/components/ui/qrscanner";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const page = () => {
  return (
    <div>
      <div className="p-5">
        <Link href="/">
          <Button>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
        </Link>
      </div>
      <div className="mt-5">
        <QrScanner />
      </div>
    </div>
  )
}

export default page