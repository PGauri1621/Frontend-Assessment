import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import ElectricCarIcon from "@mui/icons-material/ElectricCar"; 
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; 
import Papa from "papaparse";

import "./VehicleOverviewCards.css";

const VehicleOverviewCards = () => {
  const [cards, setCards] = useState([]);

  const iconMap = {
    "Battery Electric Vehicle (BEV)": <ElectricCarIcon fontSize="large" color="primary" />,
    "Plug-in Hybrid Electric Vehicle (PHEV)": <BatteryChargingFullIcon fontSize="large" color="secondary" />,
    "Clean Alternative Fuel Vehicle (CAFV) Eligibility": <DirectionsCarIcon fontSize="large" color="info" />, // icon for CAFV summary
  };

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then((res) => res.text())
      .then((csvText) => {
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

        // 2️⃣ Compute CAFV eligibility summary
        const cafvCounts = data.reduce((acc, row) => {
          const eligibility = row["Make & Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
          if (eligibility) acc[eligibility] = (acc[eligibility] || 0) + 1;
          return acc;
        }, {});

        const totalCAFV = Object.values(cafvCounts).reduce((sum, val) => sum + val, 0);

        // Decide how to summarize CAFV: show **most frequent category**
        const mostFrequentCAFV = Object.entries(cafvCounts).reduce((prev, current) =>
          current[1] > prev[1] ? current : prev
        , ["", 0]);

        const cafvCard = {
          title: "CAFV Eligibility",
          value: `${mostFrequentCAFV[0]} (${((mostFrequentCAFV[1] / totalCAFV) * 100).toFixed(2)}%)`,
          icon: iconMap["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
        };

        // 3️⃣ Combine cards: EV cards + CAFV card
        setCards([...evCards, cafvCard]);
      });
  }, []);

  return (
    <div className="Vehicle-Cards-Container">
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
