"use client"

import Link from 'next/link';
import QrScanner from './_components/qrscanner';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
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

export default CheckoutPage