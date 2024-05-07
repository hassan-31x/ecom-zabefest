"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";

interface FormData {
  name: string;
  phoneNumber: string;
  cnicNumber: string;
  bankAccountNumber: string;
  email: string;
  password: string;
}
const RegisterForm = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name should be in alphabets")
      .required("Name is required"),
    phoneNumber: Yup.string()
      .matches(/^03[0-9]{9}$/, "Invalid phone number format")
      .required("Phone Number is required"),
    cnicNumber: Yup.string()
      .matches(/^[0-9]{13}$/, "CNIC must be exactly 13 digits")
      .required("CNIC Number is required"),
    bankAccountNumber: Yup.string()
      .matches(/^[0-9]{16}$/, "Bank Account must be exactly 16 digits")
      .required("Bank Account Number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Registered Successfully!");
      form.reset();
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message?.response?.data?.message || error?.message || "Registeration failed. Try again later!");
    }
  };

  return (
    <div className="w-2/3 md:w-[85%] lg:w-[95%] xl:w-[85%] flex flex-col items-center">
      <div className="mb-10 space-y-1">
        <h2 className="font-bold text-3xl md:text-4xl text-center">Welcome to E Mart 👋</h2>
        <p className="text-xs md:text-sm text-center text-customGray">Create your account & shop effortlessly!</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 flex-col items-center w-full mb-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-2 lg:gap-2 xl:gap-4 items-center w-3/4 md:w-full md:max-w-[590px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+92XXX-XXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-2 xl:gap-4 items-center w-3/4 md:w-full md:max-w-[590px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="testpassword123?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-2 xl:gap-4 items-center !mb-5 w-3/4 md:w-full md:max-w-[590px]">
            <FormField
              control={form.control}
              name="cnicNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CNIC Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+92XXX-XXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankAccountNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bank Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+92XXX-XXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-3/4 md:w-full md:max-w-[590px] mx-auto h-12 text-[13px] rounded-xl">
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <span className="text-xs text-customGray">
          Already Registered?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login instead
          </Link>
        </span>
      </Form>
    </div>
  );
};

export default RegisterForm;
