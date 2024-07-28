"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import Loading from "./Loading";
import { useTheme } from "next-themes";
import { useToast } from "./ui/use-toast";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useAtom } from "jotai";
import { currentSelectedVendorAtom } from "./jotai/vendor";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -6.29463,
  lng: 106.785598,
};

const GoogleMapComponent = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const { toast } = useToast();
  const handleLocationChange = (location: GeolocationPosition) => {
    setLocation(location);
  };

  const [currentSelectedVendor, setCurrentSelectedVendor] = useAtom(
    currentSelectedVendorAtom
  );
  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocationChange, () => {
          toast({
            title: "Location is not available",
            description: "Using default starting location",
          });
        });
      } else {
        toast({
          title: "Error",
          description: "Location is not available",
        });
      }
    }
    getLocation();
  }, []);
  const { theme } = useTheme();
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      loadingElement={
        <div className='size-full flex items-center justify-center'>
          <Loading size='w-10 h-10' />
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          location
            ? {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              }
            : center
        }
        zoom={30}
        options={{
          styles:
            theme == "light"
              ? null
              : theme == "dark"
              ? [
                  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#242f3e" }],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#746855" }],
                  },
                  {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#263c3f" }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#6b9a76" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#38414e" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212a37" }],
                  },
                  {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9ca5b3" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#746855" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#1f2835" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#f3d19c" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#2f3948" }],
                  },
                  {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#17263c" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#515c6d" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#17263c" }],
                  },
                ]
              : null,
          disableDefaultUI: true,
        }}
        // disableDefaultUI={true}
      >
        <Marker
          position={
            location
              ? {
                  lat: location.coords.latitude,
                  lng: location.coords.longitude,
                }
              : center
          }
        />
        {/* insert loop later for locations */}
        <OverlayView
          position={
            location
              ? {
                  lat: location.coords.latitude,
                  lng: location.coords.longitude,
                }
              : center
          }
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className="w-max p-2 shadow-xl"
                onClick={() => {
                  setCurrentSelectedVendor({
                    name: "234",
                    tag: "adsfaf",
                  });
                }}
              >
                <span className="text-md">Vendor name</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent asChild>
              <div className="w-56 h-10">asdofij</div>
            </TooltipContent>
          </Tooltip>
        </OverlayView>
        <OverlayView
          position={
            location
              ? {
                  lat: location.coords.latitude + 0.0001,
                  lng: location.coords.longitude,
                }
              : center
          }
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className="w-max p-2 shadow-xl"
                onClick={() => {
                  setCurrentSelectedVendor({
                    name: "adsf",
                    tag: "3242",
                  });
                }}
              >
                <span className="text-md">Vendor name</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent asChild>
              <div className="w-56 h-10">asdofij</div>
            </TooltipContent>
          </Tooltip>
        </OverlayView>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
