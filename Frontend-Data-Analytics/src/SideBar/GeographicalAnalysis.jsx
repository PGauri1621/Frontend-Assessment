// GeographicAnalysis.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Papa from "papaparse";

const GeographicAnalysis = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    Papa.parse("/vehicles.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const parsed = results.data
          .filter(
            (row) => row["Vehicle Location"] && row["City"]?.toLowerCase() === "seattle"
          )
          .slice(0, 100) // ✅ limit to first 100 rows
          .map((row) => {
            const match = row["Vehicle Location"].match(
              /POINT \((-?\d+\.\d+) (-?\d+\.\d+)\)/
            );
            if (match) {
              return {
                city: row["City"],
                lat: parseFloat(match[2]),
                lng: parseFloat(match[1]),
                make: row["Make"],
                year: row["Model Year"],
              };
            }
            return null;
          })
          .filter(Boolean);
        setLocations(parsed);
      },
    });
  }, []);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[47.6062, -122.3321]} // ✅ Centered on Seattle
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {locations.map((loc, idx) => (
          <CircleMarker
            key={idx}
            center={[loc.lat, loc.lng]}
            radius={5}
            fillColor="#26667F"
            color="#124170"
            weight={1}
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup>
              <b>{loc.city}</b> <br />
              {loc.make} ({loc.year})
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeographicAnalysis;
