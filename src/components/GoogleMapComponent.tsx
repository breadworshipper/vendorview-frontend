"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Loading from "./Loading";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -6.29463,
  lng: 106.785598,
};

const GoogleMapComponent = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      loadingElement={
        <div className="size-full flex items-center justify-center">
          <Loading size="w-10 h-10" />
        </div>
      }
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={30}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
