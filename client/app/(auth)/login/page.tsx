"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";

interface FormData {
  email: string;
  password: string;
}
const LoginForm = () => {

  const router = useRouter()
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, data);
      toast.success("Login successfull!");
      form.reset();
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message?.response?.data?.message || error?.message || "Login failed. Try again later!");
    }
  };

  return (
    <div className="w-1/2 lg:w-3/4 2xl:w-1/2 max-w-[380px] flex flex-col items-center">
      <div className="mb-10 space-y-1">

      <h2 className="font-bold text-3xl md:text-4xl text-center">Welcome Back</h2>
      <p className="text-xs md:text-sm text-center text-customGray">
        Login to your account</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput className="mb-5"
                    placeholder="testpassword123?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full h-12 text-[13px] rounded-xl">
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>

        <span className="text-xs text-customGray">New to platform? <Link href='/register' className="text-primary hover:underline">Create an account</Link></span>
      </Form>
    </div>
  );
};

export default LoginForm;
