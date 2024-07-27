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
import useAxios from "@/components/api/use-axios";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { vendorSchema, vendorSchemaArray } from "./schema";
import { vendorFormInterface } from "./interface";

const VendorModule = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [body, setBody] = useState<any>();
  const MAX_FILE_SIZE = 1 * 1024 * 1024;

  const [formVendorCount, setFormVendorCount] = useState(1);
  const [files, setFiles] = useState<File[]>([]);

  const vendorForm = useForm<z.infer<typeof vendorSchemaArray>>({
    resolver: zodResolver(vendorSchemaArray),
  });

  const { setDoFetch: setHitVendor } = useAxios<any>({
    fetchOnRender: false,
    isAuthorized: true,
    method: "post",
    url: "/items/create",
    body,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    callback: {
      onSuccess(data) {
        toast({ title: "Successfully add item." });
        router.push(`/`);
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast({ title: "Failed to add item. Please try again." });
        } else {
          toast({ title: "Failed to add item. Please try again." });
        }
      },
    },
  });

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(",")[1];
        resolve(base64String);
      };
    });

  const onSubmit = async (values: z.infer<typeof vendorSchemaArray>) => {
    const updatedValues = await Promise.all(
      values.vendorArray.map(async (vendor) => {
        if (vendor.illustration) {
          const base64Image = await toBase64(vendor.illustration);
          return { ...vendor, image_base64: base64Image as string };
        }
        return vendor;
      })
    );
    setBody({ items: updatedValues });
    setHitVendor(true);
  };

  const handleAddVendorForm = () => {
    setFormVendorCount((prevCount) => prevCount + 1);
  };

  const handleDeleteVendorForm = (indexToDelete: number) => {
    if (!(formVendorCount === 1)) {
      setFormVendorCount((prevCount) => prevCount - 1);
      const vendorFormArray = vendorForm.getValues()
        .vendorArray as vendorFormInterface[];
      if (vendorFormArray) {
        const updatedVendorForm = vendorFormArray.filter(
          (_, index) => index !== indexToDelete
        );
        vendorForm.reset({
          vendorArray: updatedVendorForm,
        });
      }
    }
  };

  return (
    <div className='flex w-full justify-center items-center h-full'>
      <Tabs defaultValue='Login' className='w-[500px]'>
        <Form {...vendorForm}>
          <form
            className='space-y-8'
            onSubmit={vendorForm.handleSubmit(onSubmit)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Vendor item Form</CardTitle>
                <CardDescription>
                  Add your items. Click save changes when you&apos;re done.
                </CardDescription>
              </CardHeader>
              {[...Array(formVendorCount)].map((_, vendorIndex) => (
                <CardContent className='space-y-2' key={vendorIndex}>
                  <FormField
                    name={`vendorArray.${vendorIndex}.name`}
                    control={vendorForm.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormLabel className='font-bold'>Name</FormLabel>
                        <FormControl>
                          <Input className='font-semibold' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`vendorArray.${vendorIndex}.description`}
                    control={vendorForm.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormLabel className='font-bold'>Description</FormLabel>
                        <FormControl>
                          <Input className='font-semibold' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`vendorArray.${vendorIndex}.price`}
                    control={vendorForm.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormLabel className='font-bold'>Price</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            className='font-semibold'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`vendorArray.${vendorIndex}.illustration`}
                    control={vendorForm.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormLabel className='font-bold'>Image</FormLabel>
                        <FormControl>
                          <Input
                            type='file'
                            className='font-semibold'
                            accept='image/*'
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {formVendorCount > 1 && (
                    <Button
                      data-testid='delete-cp-button'
                      onClick={() => handleDeleteVendorForm(vendorIndex)}
                      type='button'
                      className='bg-red-700 hover:bg-red-700/90 border-b-4 rounded-b-lg border-red-800 active:border-0'
                    >
                      Delete Form
                    </Button>
                  )}
                </CardContent>
              ))}
              <CardFooter className='flex flex-row gap-10'>
                <Button
                  data-testid='add-cp-button'
                  onClick={handleAddVendorForm}
                  type='button'
                  className='bg-accents-blue/80 border-b-4 border-accents-blue active:border-0 hover:bg-accents-blue/90 font-extrabold text-white'
                >
                  Add Form
                </Button>
                <Button
                  data-testid='save-changes-cp-button'
                  className='bg-green-700 border-b-4 border-green-800 active:border-0 hover:bg-green-700/90 font-extrabold text-white'
                >
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default VendorModule;
