// GeographicAnalysis.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Papa from "papaparse";
import ReactDOMServer from "react-dom/server";
import { SiToyota, SiFord, SiBmw, SiHonda, SiTesla } from "react-icons/si";

// Convert React icon to Leaflet divIcon
const getCarLogoIcon = (brandRaw) => {
  const brand = (brandRaw || "").trim().toUpperCase();

  const logoMap = {
    TOYOTA: <SiToyota color="#E31E24" size={28} />,
    FORD: <SiFord color="#003399" size={28} />,
    BMW: <SiBmw color="#000000" size={28} />,
    HONDA: <SiHonda color="#CC0000" size={28} />,
    TESLA: <SiTesla color="#cc0000" size={28} />,
  };

  const iconHtml = ReactDOMServer.renderToStaticMarkup(
    logoMap[brand] || <SiToyota color="#666" size={28} />
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-car-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const GeographicAnalysis = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    Papa.parse("/data/Electric_Vehicle_Population_Data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const parsed = results.data
          .filter(
            (row) =>
              row["Vehicle Location"] &&
              row["Make"] &&
              row["Model Year"] &&
              row["City"]
          )
          .map((row) => {
            const city = row["City"].trim();
            const make = row["Make"].trim();
            const year = row["Model Year"].trim();
            const loc = row["Vehicle Location"].trim();

            if (city.toLowerCase() !== "seattle") return null;

            const match = loc.match(
              /POINT\s*\(\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\)/
            );
            if (match) {
              const lng = parseFloat(match[1]);
              const lat = parseFloat(match[2]);
              if (!isNaN(lat) && !isNaN(lng)) {
                return { city, lat, lng, make, year };
              }
            }
            return null;
          })
          .filter(Boolean)
          .slice(0, 100);

        console.log("Parsed locations:", parsed);
        setLocations(parsed);
      },
    });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* Title without background */}
      <div
        style={{
          padding: "10px 0",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#124170",
          textAlign: "center",
        }}
      >
        Geographic Distribution of the First 100 Vehicles in Seattle
      </div>

      {/* Map */}
      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[47.6062, -122.3321]}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {locations.map((loc, idx) => (
            <Marker
              key={idx}
              position={[loc.lat, loc.lng]}
              icon={getCarLogoIcon(loc.make)}
            >
              <Popup>
                <b>{loc.city}</b> <br />
                {loc.make.toUpperCase()} ({loc.year})
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default GeographicAnalysis;
