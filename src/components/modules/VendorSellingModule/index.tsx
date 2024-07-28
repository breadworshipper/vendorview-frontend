"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Loading from "@/components/Loading";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import useAxios from "@/components/api/use-axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";

const VendorSellingModule = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSelling, setIsSelling] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const [location, setLocation] = useState<GeolocationPosition | null>(null);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const WS_URL =
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracking/street-vendor?token=${jwt}` as string;

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  const { setDoFetch: setHitDisconnect } = useAxios<any>({
    fetchOnRender: false,
    isAuthorized: true,
    method: "delete",
    url: `/tracking/disconnect-street-vendor`,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: jwt,
      },
    },
    callback: {
      onSuccess(data) {
        router.push("/vendor-dashboard");
        toast({ title: "Succesfully disconect from server" });
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast({
            title: "Failed to disconect from server. Please try again.",
          });
        } else {
          toast({
            title: "Failed to disconect from server. Please try again.",
          });
        }
      },
    },
  });

  const sendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          sendJsonMessage({
            event: "locationUpdate",
            lat: position?.coords.latitude,
            lon: position?.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (readyState === ReadyState.OPEN && !isMoving && !isSelling) {
      sendLocation();
      interval = setInterval(sendLocation, 300000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [readyState, isMoving, isSelling]);

  const handleStopSelling = () => {
    setIsSelling(true);
    setHitDisconnect(true);
  };

  const handleToggleMoving = () => {
    setIsMoving(!isMoving);
  };

  const center = {
    lat: -6.29463,
    lng: 106.785598,
  };

  const containerStyle = {
    width: "40%",
    height: "40%",
  };

  const { theme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-10">
      <div>
        <h1 className="text-4xl font-extrabold">
          {isMoving ? "Idling...." : "Broadcasting...."}
        </h1>
      </div>
      <div className="flex flex-row gap-10">
        <Button
          onClick={handleStopSelling}
          className="bg-accents-blue/80 border-b-4 border-accents-blue active:border-0 hover:bg-accents-blue/90 font-extrabold text-white"
        >
          Stop Selling
        </Button>
        <Button
          onClick={handleToggleMoving}
          className="bg-accents-light/80 border-b-4 border-accents-light active:border-0 hover:bg-accents-light/90 font-extrabold text-white"
        >
          {isMoving ? "Start Moving " : "Stop Moving"}
        </Button>
      </div>
    </div>
  );
};

export default VendorSellingModule;
