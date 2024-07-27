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
    url: "/auth/",
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

  const onFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      vendorForm.setError(`vendorSchemaArray.${index}.illustration`, {
        type: "manual",
        message: "File size exceeds 1MB limit",
      });
      return;
    }
    const updatedFiles = [...files];
    updatedFiles[index] = e.target.files[0];
    setFiles(updatedFiles);
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

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
      values.vendorSchemaArray.map(async (vendor, index) => {
        if (files[index]) {
          const base64Image = await toBase64(files[index]);
          return { ...vendor, illustration: base64Image as string };
        }
        return vendor;
      })
    );

    console.log(updatedValues);
    setBody({ vendorSchemaArray: updatedValues });
    setHitVendor(true);
  };

  const handleAddVendorForm = () => {
    setFormVendorCount((prevCount) => prevCount + 1);
  };

  const handleDeleteVendorForm = (indexToDelete: number) => {
    if (formVendorCount === 1) return; // Prevent deleting the last form

    const updatedVendorSchemaArray = vendorForm.getValues()
      .vendorSchemaArray as vendorFormInterface[];
    const newVendorSchemaArray = updatedVendorSchemaArray.filter(
      (_, index) => index !== indexToDelete
    );

    // Update form values
    vendorForm.reset({
      vendorSchemaArray: newVendorSchemaArray,
    });

    // Update the files state
    const updatedFiles = [...files];
    updatedFiles.splice(indexToDelete, 1);
    setFiles(updatedFiles);

    // Update the form vendor count
    setFormVendorCount(formVendorCount - 1);
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
                    name={`vendorSchemaArray.${vendorIndex}.name`}
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
                    name={`vendorSchemaArray.${vendorIndex}.description`}
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
                    name={`vendorSchemaArray.${vendorIndex}.price`}
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
                    name={`vendorSchemaArray.${vendorIndex}.illustration`}
                    control={vendorForm.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormLabel className='font-bold'>Image</FormLabel>
                        <FormControl>
                          <Input
                            type='file'
                            className='font-semibold'
                            accept='image/*'
                            onClick={onClick}
                            onChange={(e) => onFileChange(vendorIndex, e)}
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
