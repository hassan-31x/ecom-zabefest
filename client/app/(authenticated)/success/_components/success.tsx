"use client";
//@ts-ignore
import Lottie from "lottie-react";
import success from "./success.json";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/config/api";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type OrderDetails = {
  data: {
    id: string;
    description: string;
    amount_total: number;
    quantity: number;
  }[];
};

const Success = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({ data: [] });

  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const getSession = async () => {
    try {
      const session = await API.get(`/checkout/${sessionId}`);
      setOrderDetails(session.data);
      console.log("🚀 ~ getSession ~ session:", session);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while fetching order details");
    }
  };

  useEffect(() => {
    if (sessionId) {
      getSession();
    }
  }, [sessionId]);

  if (!sessionId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={success} style={{ height: "250px" }} />
      <h2 className="text-3xl font-semibold text-orange-600">Payment Successful!</h2>

      <Button size="lg" className="hover:bg-orange-600 font-bold py-3 px-8 my-5 rounded-full shadow-lg transition duration-300 ease-in-out" asChild>
        <Link href='/'>

        Go Back To Home
        </Link>
      </Button>

      {orderDetails?.data?.length > 0 && (
        <Dialog>
          <DialogTrigger className="pt-2 underline cursor-pointer">View Order</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl mb-2">These are your Order Details</DialogTitle>
              <DialogDescription>
                {orderDetails?.data?.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center w-full gap-4">
                      <div className="flex items-center gap-2">
                        {/* <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md" /> */}
                        <div>
                          <p className="font-semibold text-base">{item.description}</p>
                          <p className="text-customGray text-sm">Rs. {item?.amount_total/100}</p>
                        </div>
                      </div>
                      <p>{item?.quantity}x</p>
                    </div>

                    {index !== orderDetails.data.length - 1 && <Separator className="my-1" />}
                  </div>
                ))}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Success;
