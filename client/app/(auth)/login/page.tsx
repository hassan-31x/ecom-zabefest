'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormData {
    email: string;
    password: string;
  }
const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required'),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', data);
      if (response.status === 200) {
        alert('Login successful!');
        form.reset();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
    </div>
  );
};

export default LoginForm;