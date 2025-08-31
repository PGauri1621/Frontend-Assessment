import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Papa from "papaparse";
import ReactDOMServer from "react-dom/server";
import { SiToyota, SiFord, SiBmw, SiHonda, SiTesla } from "react-icons/si";
import "./GeographicalAnalysis.css";

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

const GeographicalAnalysis = () => {
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Seattle");

  const cities = ["Seattle", "Bellevue", "Tacoma", "Spokane", "Olympia"];

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
          .filter(Boolean);

        setLocations(parsed);
      },
    });
  }, []);

  const filteredLocations = locations
    .filter((loc) => loc.city.toLowerCase() === selectedCity.toLowerCase())
    .slice(0, 100);

  // Define default centers for cities
  const cityCenters = {
    Seattle: [47.6062, -122.3321],
    Bellevue: [47.6101, -122.2015],
    Tacoma: [47.2529, -122.4443],
    Spokane: [47.6588, -117.4260],
    Olympia: [47.0379, -122.9007],
  };

  return (
    <div className="geographic-analysis-container">
      {/* Title */}
      <div className="geo-title">Geographic Distribution of Vehicles in top 5 cities of WA</div>

      {/* Dropdown */}
      <div className="city-selector">
        <label htmlFor="city-dropdown">Select City:</label>
        <select
          id="city-dropdown"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Map */}
      <div className="map-wrapper">
        <MapContainer
          center={cityCenters[selectedCity]}
          zoom={11}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {filteredLocations.map((loc, idx) => (
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

export default GeographicalAnalysis;
