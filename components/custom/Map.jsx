"use client";

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import L from "leaflet"; // Import Leaflet for marker-related functionality

const Map = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Initial marker position

  // Dynamically import React-Leaflet Map container to prevent SSR issues
  const MapComponent = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    // To avoid warning in server-side rendering (SSR)
    if (typeof window !== "undefined") {
      require("leaflet/dist/leaflet.css");
    }
  }, []);

  // Handle marker drag event
  const handleDragEnd = (e) => {
    const newPosition = e.target.getLatLng(); // Get the new position of the marker
    setPosition([newPosition.lat, newPosition.lng]); // Update state with new position
  };

  // Create a custom marker icon
  const customIcon = new L.Icon({
    iconUrl: "marker.svg", // Path to your custom icon (can be from public folder)
    iconSize: [32, 32], // Set the size of the icon
    iconAnchor: [16, 32], // Anchor point to place the icon correctly
    popupAnchor: [0, -32], // Adjust the popup position
  });

  return (
    <MapComponent
      center={position}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{ dragend: handleDragEnd }} // Attach the dragend event handler
        icon={customIcon} // Use the custom icon
      >
        <Popup>
          You are here: {position[0]}, {position[1]}
        </Popup>
      </Marker>
    </MapComponent>
  );
};

export default Map;
