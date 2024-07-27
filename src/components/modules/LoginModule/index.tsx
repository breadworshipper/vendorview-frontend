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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginModule = () => {
  return (
    <div className='flex w-full justify-center items-center h-full'>
      <Tabs defaultValue='Login' className='w-[400px]'>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login to your account here. Click login when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' defaultValue='Pedro Duarte' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='username'>Password</Label>
              <Input id='username' defaultValue='@peduarte' />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  );
};

export default LoginModule;
