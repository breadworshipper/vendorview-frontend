"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import Loading from "./Loading";
import { useTheme } from "next-themes";
import { useToast } from "./ui/use-toast";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useAtom } from "jotai";
import {
  currentSelectedVendor,
  currentSelectedVendorAtom,
  NearbyVendor,
  vendor,
} from "./jotai/vendor";
import useAxios from "./api/use-axios";

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
  const handleLocationChange = (location: GeolocationPosition) => {
    setLocation(location);
  };

  const [nearbyVendor, setNearbyVendor] = useState<NearbyVendor[] | null>(null);

  const [currentVendor, setCurrentVendor] = useState<vendor | null>(null);

  const [currentSelectedVendor, setCurrentSelectedVendor] = useAtom(
    currentSelectedVendorAtom
  );

  const [vendorId, setVendorId] = useState<number | null>(null);

  const { setDoFetch: setHitGetItem } = useAxios<any>({
    method: "get",
    url: `/items/get-by-vendor/${vendorId}`,
    fetchOnRender: false,
    isAuthorized: true,
    callback: {
      onSuccess(data: any) {
        console.log(data);
        if (!currentVendor) {
          return;
        }
        const newVendor: currentSelectedVendor = {
          id: currentVendor?.id,
          name: currentVendor?.name,
          tag: currentVendor?.tag,
          tagId: currentVendor?.tagId,
          menu: data.map((item: any) => {
            const vendorItem = {
              id: item.id,
              price: item.price,
              image_base64: item.image_base64,
              street_vendor_id: item.street_vendor_id,
              name: item.name,
              description: item.description,
            };
            return vendorItem;
          }),
        };

        setCurrentSelectedVendor(newVendor);
      },
      onError(error) {
        setCurrentSelectedVendor(null);
      },
    },
  });

  const { setDoFetch: setHitGetNearby } = useAxios<any>({
    method: "post",
    url: `/tracking/get-nearby`,
    body: location
      ? {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        }
      : {
          lat: center.lat,
          lon: center.lng,
        },
    fetchOnRender: false,
    isAuthorized: true,
    callback: {
      onSuccess(data) {
        console.log(data);
        setNearbyVendor(
          data.map((item: any) => {
            const vendor: NearbyVendor = {
              id: parseInt(item[0].split(";")[0]),
              name: item[0].split(";")[1],
              tag: item[0].split(";")[2],
              tagId: parseInt(item[0].split(";")[3]),
              distance: item[1],
              lat: item[2][0],
              lng: item[2][1],
            };
            return vendor;
          })
        );
      },
      onError(error) {
        setNearbyVendor(null);
      },
    },
  });

  useEffect(() => {
    // Function to trigger the axios call
    if (location) {
      const fetchNearbyVendors = () => {
        setHitGetNearby(true);
      };

      // Fetch immediately on mount
      fetchNearbyVendors();

      // Set up interval to fetch every 5 minutes
      const interval = setInterval(fetchNearbyVendors, 5 * 60 * 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [location, center]);

  const { theme } = useTheme();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [nearbyVendor]
  );

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="size-full flex items-center justify-center">
        <Loading size="w-10 h-10" />
      </div>
    );
  }

  function toTitleCase(str: string): string {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <GoogleMap
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerStyle={containerStyle}
      center={
        location
          ? {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            }
          : center
      }
      zoom={15}
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
      {nearbyVendor?.map((item, index) => {
        console.log(item);
        return (
          <OverlayView
            key={`${index}-vendor-marker`}
            position={{
              lat: item.lat,
              lng: item.lng,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  className="w-max p-2 shadow-xl"
                  onClick={() => {
                    setCurrentVendor(item);
                    setVendorId(item.id);
                    setHitGetItem(true);
                    console.log(item);
                  }}
                >
                  <span className="text-md">{item.name}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent asChild>
                <div className="w-max h-10">{toTitleCase(item.tag)}</div>
              </TooltipContent>
            </Tooltip>
          </OverlayView>
        );
      })}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
