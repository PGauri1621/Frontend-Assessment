import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
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

  const descriptionMap = {
    "Battery Electric Vehicle (BEV)": [
      "Fully electric vehicles without combustion engines.",
      "Largest share of EVs in the dataset."
    ],
    "Plug-in Hybrid Electric Vehicle (PHEV)": [
      "Combine electric and conventional engines.",
      "Smaller share than BEVs but steadily growing."
    ],
    TESLA: [
      "Leading EV manufacturer with high adoption.",
      "Metrics include average range and MSRP."
    ],
    BMW: [
      "Premium EV options by BMW.",
      "Includes average range and MSRP metrics."
    ]
  };

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true, dynamicTyping: true });
        const data = parsed.data;

        const evCounts = data.reduce((acc, row) => {
          const type = row["Electric Vehicle Type"];
          if (type) acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});
        const totalEV = Object.values(evCounts).reduce((sum, val) => sum + val, 0);

        const evCards = Object.entries(evCounts).map(([type, count]) => ({
          title: type,
          mainValue: `${((count / totalEV) * 100).toFixed(2)}%`,
          icon: iconMap[type],
          descriptionLines: descriptionMap[type] || [],
        }));

        const maxRange = Math.max(...data.map(row => parseFloat(row["Electric Range"]) || 0), 1);
        const maxMSRP = Math.max(...data.map(row => parseFloat(row["Base MSRP"]) || 0), 1);

        const makeStats = trackedMakes.map(make => {
          const rows = data.filter(r => r["Make"]?.trim().toUpperCase() === make);
          const totalRange = rows.reduce((sum, r) => sum + (parseFloat(r["Electric Range"]) || 0), 0);
          const totalMSRP = rows.reduce((sum, r) => sum + (parseFloat(r["Base MSRP"]) || 0), 0);
          const count = rows.length || 1;

          return {
            title: make,
            mainValue: `Avg Range: ${((totalRange / count) / maxRange * 100).toFixed(1)}%`,
            icon: iconMap[make],
            descriptionLines: descriptionMap[make] || [],
          };
        });

        setCards([...evCards, ...makeStats]);
      });
  }, []);

  return (
    <div className="Vehicle-Cards-Container">
      {/* Section Title and Description */}
      <Box mb={3}>
        <Typography
          variant="h5"
          className="Vehicle-Cards-Title"
          gutterBottom
        >
          Electric Vehicle Insights
        </Typography>
        <Typography
          variant="body2"
          className="Vehicle-Cards-Description"
        >
          Overview of EV types and major manufacturers. The main metric is highlighted in each card with additional insights below, providing a snapshot of adoption trends and performance metrics.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="Vehicle-Card" elevation={3}>
              <CardContent className="Vehicle-Card-Content">
                <Box className="Vehicle-Card-Icon">{card.icon}</Box>
                <Box className="Vehicle-Card-Info">
                  <Typography variant="h5" className="Vehicle-Card-MainValue">
                    {card.mainValue}
                  </Typography>
                  {(card.descriptionLines || []).map((line, i) => (
                    <Typography key={i} variant="body2" className="Vehicle-Card-Description">
                      {line}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VehicleOverviewCards;
