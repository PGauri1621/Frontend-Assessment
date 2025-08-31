import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Typography, Tooltip, Chip, Stack, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import './VehicleByTypeTitle.css';

const carMakes = ["TESLA", "BMW", "NISSAN", "PORSCHE", "AUDI", "FORD"];

const urbanCities = [
  "Seattle","Spokane","Tacoma","Vancouver","Bellevue","Kent","Everett",
  "Renton","Spokane Valley","Federal Way","Yakima","Kirkland","Bellingham",
  "Kennewick","Auburn","Pasco","Redmond","Sammamish","Shoreline","Olympia",
  "Lacey","Lakewood","Burien"
];
const urbanCitiesNormalized = urbanCities.map(c => c.toLowerCase());

const VehicleByTypeTitle = () => {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true });
        const data = parsed.data;

        const makeCounts = {};
        carMakes.forEach(make => makeCounts[make] = { urban: 0, rural: 0 });

        data.forEach(row => {
          const make = row["Make"]?.trim();
          const city = row["City"]?.trim()?.toLowerCase();
          if (make && carMakes.includes(make)) {
            if (urbanCitiesNormalized.includes(city)) makeCounts[make].urban++;
            else makeCounts[make].rural++;
          }
        });

        const vehicles = Object.keys(makeCounts).map(make => {
          const { urban, rural } = makeCounts[make];
          return {
            make,
            urbanCount: urban,
            ruralCount: rural,
            color: getColorForMake(make)
          };
        });

        setVehicleData(vehicles);
      });
  }, []);

  const getColorForMake = (make) => {
    const colorMap = {
      TESLA: "#E82127",
      BMW: "#124170",
      NISSAN: "#F1A208",
      PORSCHE: "#67C090",
      AUDI: "#7c3aed",
      FORD: "#0072C6"
    };
    return colorMap[make] || "#888";
  };

  return (
    <div className="vehicle-card">
      <Typography variant="h5" align="center" className="title">
        Top EV Makes in Urban vs Rural Areas
      </Typography>
      <Typography variant="subtitle1" align="center" className="subtitle">
        Comparison of most popular EV brands across locations
      </Typography>
      <Divider className="divider" />

      <div className="vehicle-card-header">
        <Typography variant="h6" className="vehicle-card-title">
          Vehicles by Type & Location
        </Typography>
        <Tooltip title="Shows number of cars in Urban vs Rural areas">
          <InfoIcon className="info-icon" />
        </Tooltip>
      </div>

      <div className="road-container">
        {vehicleData.length === 0 ? (
          <Typography>Loading data...</Typography>
        ) : (
          vehicleData.map((v, idx) => (
            <div key={idx} className="vehicle-lane">
              <DirectionsCarIcon style={{ color: v.color, fontSize: 36 }} />
              <div className="road-line"></div>
              <Stack direction="row" spacing={0.5} className="vehicle-label-container">
                <Chip label={v.make} size="small"
                  sx={{ fontWeight: 600, bgcolor: v.color, color: "#fff" }} />
                <Chip label={`Urban: ${v.urbanCount}`} size="small"
                  variant="outlined" sx={{ borderColor: "#67C090", color: "#06794f" }} />
                <Chip label={`Rural: ${v.ruralCount}`} size="small"
                  variant="outlined" sx={{ borderColor: "#124170", color: "#124170" }} />
              </Stack>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VehicleByTypeTitle;
