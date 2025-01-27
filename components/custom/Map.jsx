"use client";

// components/Map.js
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations from Firebase Firestore
    const fetchLocations = async () => {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const locationsList = querySnapshot.docs.map((doc) => doc.data());
      setLocations(locationsList);
    };

    fetchLocations();

    // Initialize the Leaflet map
    const map = L.map("map").setView([51.505, -0.09], 13); // Default coordinates

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers based on Firebase data
    locations.forEach((location) => {
      const { latitude, longitude, title } = location;
      L.marker([latitude, longitude]).addTo(map).bindPopup(title);
    });

    return () => map.remove();
  }, [locations]);

  return (
    <div>
      <h1>Map</h1>
      {/* <div id="map" style={{ height: "500px", width: "100%" }} />; */}
      <div id="map" className="w-[300px] h-[300px]" />;
    </div>
  );
};

export default Map;
