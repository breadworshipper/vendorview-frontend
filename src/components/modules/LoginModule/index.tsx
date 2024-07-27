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
import { AxiosError } from "axios";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

const LoginModule = () => {
  const { toast } = useToast();
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
        localStorage.setItem("accessToken", data.access_token);
        toast({ title: "Successfully signed in to account" });
        router.push(`/`);
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast({ title: "Failed to log in. Please try again." });
        } else {
          toast({ title: "Failed to log in. Please try again." });
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
                  className='bg-green-700 border-b-4 border-green-800 active:border-0 hover:bg-green-700/90 font-extrabold text-white'
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
