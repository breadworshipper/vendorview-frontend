"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "./schema";
import useAxios from "@/components/api/use-axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Link from "next/link";

const LoginModule = () => {
  const router = useRouter();
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const [body, setBody] = useState<any>();

  const { setDoFetch: setHitLogin } = useAxios<any>({
    fetchOnRender: false,
    isAuthorized: true,
    method: "post",
    url: "/auth/login",
    body,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    callback: {
      onSuccess(data) {
        toast("Successfully signed in to account");
        localStorage.setItem("accessToken", data.access_token);
        router.push(`/`);
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast(error.response?.data?.responseMessage);
        } else {
          toast("Failed to log in. Please try again.");
        }
      },
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setBody(values);
    setHitLogin(true);
  };

  return (
    <div className='flex w-full justify-center items-center h-full'>
      <Tabs defaultValue='Login' className='w-[500px]'>
        <Form {...loginForm}>
          <form
            onSubmit={(e) => {
              loginForm.handleSubmit(onSubmit)(e);
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login to your account here. Click login when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <FormField
                    name='email'
                    control={loginForm.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormLabel className='font-bold'>Email</FormLabel>
                        <FormControl>
                          <Input className='' {...field} type='email' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='space-y-1'>
                  <FormField
                    name='password'
                    control={loginForm.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormLabel className='font-bold '>Password</FormLabel>
                        <FormControl>
                          <Input className='' {...field} type='password' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=''>
                  <span className='text-sm font-medium font-satoshi'>
                    Want to register?{" "}
                    <Link
                      data-testid='register-hyperlink'
                      href={"register"}
                      className='font-extrabold text-dark-secondary'
                    >
                      Register here.
                    </Link>
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className='bg-dark-secondary/80 border-b-4 border-dark-secondary active:border-0 hover:bg-dark-secondary/90 font-extrabold text-white'
                  type='submit'
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default LoginModule;
