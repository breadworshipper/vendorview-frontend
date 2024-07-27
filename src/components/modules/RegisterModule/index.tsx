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
import { registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import useAxios from "@/components/api/use-axios";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

const RegisterModule = () => {
  const { toast } = useToast();
  const router = useRouter();
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const [body, setBody] = useState<any>();

  const { setDoFetch: setHitRegister } = useAxios<any>({
    fetchOnRender: false,
    isAuthorized: true,
    method: "post",
    url: "/auth/register",
    body,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    callback: {
      onSuccess(data) {
        toast({ title: "Successfully registered account" });
        router.push(`/login`);
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast({ title: "Failed to register account. Please try again." });
        } else {
          toast({ title: "Failed to register account. Please try again." });
        }
      },
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setBody(values);
    setHitRegister(true);
  };

  return (
    <div className='flex w-full justify-center items-center h-full'>
      <Tabs defaultValue='Login' className='w-[500px]'>
        <Form {...registerForm}>
          <form
            onSubmit={(e) => {
              registerForm.handleSubmit(onSubmit)(e);
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Register your account here. Click register when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <FormField
                    name='email'
                    control={registerForm.control}
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
                    name='name'
                    control={registerForm.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormLabel className='font-bold'>Name</FormLabel>
                        <FormControl>
                          <Input className='' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='space-y-1'>
                  <FormField
                    name='password'
                    control={registerForm.control}
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
              </CardContent>
              <CardFooter>
                <Button
                  className='bg-green-700 border-b-4 border-green-800 active:border-0 hover:bg-green-700/90 font-extrabold text-white'
                  type='submit'
                >
                  Register
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default RegisterModule;
