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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterModule = () => {
  const { toast } = useToast();
  const router = useRouter();
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      category: "",
      streetVendorName: "",
    },
  });

  const categories = [
    { name: "Food and Beverages", value: 1 },
    { name: "Clothing and Accessories", value: 2 },
    { name: "Fruits and Vegetables", value: 3 },
    { name: "Secondhand and Antique Items", value: 4 },
    { name: "Children's Toys", value: 5 },
    { name: "Services", value: 6 },
    { name: "Handicrafts", value: 7 },
    { name: "Health and Beauty Products", value: 8 },
    { name: "Household Equipment", value: 9 },
    { name: "Electronics", value: 10 },
  ];

  const [role, setRole] = useState("");

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

  const { setDoFetch: setHitRegisterVendor } = useAxios<any>({
    fetchOnRender: false,
    isAuthorized: true,
    method: "post",
    url: "/auth/register-vendor",
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
    if (role == "vendor") {
      const categoryValue = values.category
        ? parseInt(values.category, 10)
        : NaN;
      const updatedRegister = {
        email: values.email,
        name: values.name,
        password: values.password,
        is_street_vendor: true,
        street_vendor_category: categoryValue,
        street_vendor_name: values.streetVendorName,
      };
      setBody(updatedRegister);
      setHitRegisterVendor(true);
    } else {
      const updatedRegister = {
        email: values.email,
        name: values.name,
        password: values.password,
      };
      setBody(updatedRegister);
      setHitRegister(true);
    }
  };

  const handleChange = (event: any) => {
    setRole(event);
    registerForm.reset({
      email: "",
      name: "",
      password: "",
      category: event === "vendor" ? "" : "1",
      streetVendorName: event === "vendor" ? "" : "Default Vendor Name",
    });
  };

  return (
    <div className='flex w-full justify-center items-center h-full'>
      <Tabs className='w-[500px]'>
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
                  <RadioGroup
                    className='flex flex-row items-center'
                    value={role}
                    onValueChange={handleChange}
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='customer' />
                      <Label>Customer</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='vendor' />
                      <Label>Vendor</Label>
                    </div>
                  </RadioGroup>
                </div>
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
                {role === "vendor" && (
                  <>
                    <div className='space-y-1'>
                      <FormField
                        name='category'
                        control={registerForm.control}
                        render={({ field }) => (
                          <FormItem className='space-y-1'>
                            <FormLabel className='font-bold '>
                              Category
                            </FormLabel>
                            <Select
                              {...field}
                              value={field.value || ""}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select a category' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.value}
                                    value={category.value.toString()}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='space-y-1'>
                      <FormField
                        name='streetVendorName'
                        control={registerForm.control}
                        render={({ field }) => (
                          <FormItem className='space-y-1'>
                            <FormLabel className='font-bold '>
                              Street Vendor Name
                            </FormLabel>
                            <FormControl>
                              <Input className='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                <Button
                  className='bg-green-700 border-b-4 border-green-800 active:border-0 hover:bg-green-700/90 font-extrabold text-white'
                  type='submit'
                >
                  Register
                </Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default RegisterModule;
