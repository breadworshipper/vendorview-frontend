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
import { registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const RegisterModule = () => {
  const router = useRouter();
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegisterButton = () => {
    router.push("/login");
  };

  return (
    <div className='flex w-full justify-center items-center h-full'>
      <Tabs defaultValue='Login' className='w-[500px]'>
        <Form {...registerForm}>
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
                  name='name'
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel className='font-bold'>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Dave' className='' {...field} />
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
              <div className='space-y-1'>
                <FormField
                  name='confirmPassword'
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel className='font-bold'>
                        Confirm Password
                      </FormLabel>
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
              <Button onClick={handleRegisterButton}>Register</Button>
            </CardFooter>
          </Card>
        </Form>
      </Tabs>
    </div>
  );
};

export default RegisterModule;
