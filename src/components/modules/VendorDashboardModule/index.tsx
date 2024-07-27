"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const VendorDashboardModule = () => {
  const router = useRouter();

  const handleMenuRoute = () => {
    router.push("/vendor-form");
  };

  const handleSellingRoute = () => {
    router.push("/");
  };

  return (
    <div className='flex flex-row justify-center items-center w-full h-full gap-10'>
      <Button
        onClick={handleMenuRoute}
        className='bg-accents-blue/80 border-b-4 border-accents-blue active:border-0 hover:bg-accents-blue/90 font-extrabold text-white'
      >
        Add Menu
      </Button>
      <Button
        onClick={handleSellingRoute}
        className='bg-accents-light/80 border-b-4 border-accents-light active:border-0 hover:bg-accents-light/90 font-extrabold text-white'
      >
        Start Selling
      </Button>
    </div>
  );
};

export default VendorDashboardModule;
