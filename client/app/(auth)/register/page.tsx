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
  const [submitting, setSubmitting] = useState(false);

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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
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
                  <PasswordInput placeholder="testpassword123?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+92XXX-XXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnicNumber"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormLabel>Bank Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="+92XXX-XXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <span>
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
