"use client"
import Lottie from 'lottie-react';
import success from './success.json';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie
        animationData={success}
        style={{ height: '250px' }}
      />
      <h2 className="text-3xl font-semibold text-orange-600">Payment Successful!</h2>
    </div>
  );
};

export default Success;
