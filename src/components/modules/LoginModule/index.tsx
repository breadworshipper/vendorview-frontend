"use client";
import React from "react";
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

const LoginModule = () => {
  const router = useRouter();
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const handleRegisterButton = () => {
    router.push("/login");
  };

  return (
    <div className='flex w-full justify-center items-center h-full'>
      <Tabs defaultValue='Login' className='w-[500px]'>
        <Form {...loginForm}>
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
                  name='name'
                  control={loginForm.control}
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
            </CardContent>
            <CardFooter>
              <Button className='' onClick={handleRegisterButton}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </Tabs>
    </div>
  );
};

export default LoginModule;
