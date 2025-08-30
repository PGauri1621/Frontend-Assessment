/*import React from 'react'; => CAN USE TO DISPLAY SOMETHING ELSE IN SIDEBAR
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './VehicleByTypeTitle.css';

const VehicleByTypeTitle = () => {
  const data = [
    { metric: 'Speed', Cars: 80, Bikes: 90, Trucks: 70 },
    { metric: 'Efficiency', Cars: 75, Bikes: 85, Trucks: 60 },
    { metric: 'Comfort', Cars: 90, Bikes: 60, Trucks: 70 },
    { metric: 'Safety', Cars: 85, Bikes: 70, Trucks: 80 },
    { metric: 'Cost', Cars: 70, Bikes: 80, Trucks: 60 },
  ];

  return (
    <div className="radar-card">
      <h3 className="radar-title">Vehicle Performance</h3>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Radar name="Cars" dataKey="Cars" stroke="#26667F" fill="#26667F" fillOpacity={0.6} />
          <Radar name="Bikes" dataKey="Bikes" stroke="#67C090" fill="#67C090" fillOpacity={0.6} />
          <Radar name="Trucks" dataKey="Trucks" stroke="#124170" fill="#124170" fillOpacity={0.6} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleByTypeTitle;*/
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Typography, Tooltip, Chip, Stack } from '@mui/material';
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

        // Count urban and rural for each make
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

        // Prepare array for lanes
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
      FORD: "#0072C6"  // new Ford color
    };
    return colorMap[make] || "#888";
  };

  return (
    <div className="vehicle-card">
         <Typography  variant="h5"
        align="center"
        sx={{ fontWeight: 700, color: "#124170", mb: 2 }}>
        Top EV's drove in most Urban and Rural areas of USA
      </Typography>
      <div className="vehicle-card-header">
        <Typography variant="h6" className="vehicle-card-title">
          Vehicles by type and location
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
              {/* Car icon */}
              <DirectionsCarIcon style={{ color: v.color, fontSize: 36 }} />

              {/* Road */}
              <div className="road-line"></div>

              {/* Counts */}
              <Stack direction="row" spacing={0.5} className="vehicle-label-container">
                <Chip
                  label={v.make}
                  size="small"
                  sx={{ fontWeight: 500, bgcolor: v.color, color: "#fff" }}
                />
                <Chip
                  label={`Urban: ${v.urbanCount}`}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "#67C090", color: "#67C090", fontWeight: 500 }}
                />
                <Chip
                  label={`Rural: ${v.ruralCount}`}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "#124170", color: "#124170", fontWeight: 500 }}
                />
              </Stack>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VehicleByTypeTitle;

