import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Papa from "papaparse";

import "./VehicleOverviewCards.css";

const VehicleOverviewCards = () => {
  const [cards, setCards] = useState([]);
  const trackedMakes = ["TESLA", "BMW"];
  const iconMap = {
    "Battery Electric Vehicle (BEV)": <ElectricCarIcon fontSize="large" color="primary" />,
    "Plug-in Hybrid Electric Vehicle (PHEV)": <BatteryChargingFullIcon fontSize="large" color="secondary" />,
    TESLA: <ElectricCarIcon fontSize="large" color="primary" />,
    BMW: <BatteryChargingFullIcon fontSize="large" color="secondary" />,
  };

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true, dynamicTyping: true });
        const data = parsed.data;

        // 1️⃣ Count EV types (BEV, PHEV)
        const evCounts = data.reduce((acc, row) => {
          const type = row["Electric Vehicle Type"];
          if (type) acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});
        const totalEV = Object.values(evCounts).reduce((sum, val) => sum + val, 0);

        const evCards = Object.entries(evCounts).map(([type, count]) => ({
          title: type,
          value: `${((count / totalEV) * 100).toFixed(2)}%`,
          icon: iconMap[type] || null,
        }));

        // 2️⃣ Compute Tesla and BMW averages
        const maxRange = Math.max(...data.map(row => parseFloat(row["Electric Range"]) || 0), 1);
        const maxMSRP = Math.max(...data.map(row => parseFloat(row["Base MSRP"]) || 0), 1);

        const makeStats = trackedMakes.map(make => {
          const rows = data.filter(r => r["Make"]?.trim().toUpperCase() === make);
          const totalRange = rows.reduce((sum, r) => sum + (parseFloat(r["Electric Range"]) || 0), 0);
          const totalMSRP = rows.reduce((sum, r) => sum + (parseFloat(r["Base MSRP"]) || 0), 0);
          const count = rows.length || 1;

          return {
            title: make,
            value: `Avg Electric Range: ${((totalRange / count) / maxRange * 100).toFixed(1)}% | Avg Base MSRP: ${((totalMSRP / count) / maxMSRP * 100).toFixed(1)}%`,
            icon: iconMap[make],
          };
        });

        // Combine all cards: BEV, PHEV + Tesla/BMW stats
        setCards([...evCards, ...makeStats]);
      });
  }, []);

  return (
    <div className="Vehicle-Cards-Container">
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="Vehicle-Card" elevation={3}>
              <CardContent className="Vehicle-Card-Content">
                <div className="Vehicle-Card-Icon">{card.icon}</div>
                <div className="Vehicle-Card-Info">
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {card.value}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VehicleOverviewCards;
