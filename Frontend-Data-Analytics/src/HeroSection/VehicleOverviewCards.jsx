import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import "./VehicleOverviewCards.css";

const VehicleOverviewCards = () => {
  const cards = [
    {
      title: "Cars",
      value: "35%",
      icon: <DirectionsCarIcon fontSize="large" color="primary" />,
    },
    {
      title: "Two-Wheelers",
      value: "40%",
      icon: <TwoWheelerIcon fontSize="large" color="secondary" />,
    },
    {
      title: "Trucks & Lorries",
      value: "25%",
      icon: <LocalShippingIcon fontSize="large" color="success" />,
    },
  ];

  return (
    <div className="Vehicle-Cards-Container">
      {cards.map((card, index) => (
        <Card key={index} className="Vehicle-Card" elevation={3}>
          <CardContent>
            <Box className="Vehicle-Card-Content">
              <div className="Vehicle-Card-Icon">{card.icon}</div>
              <div className="Vehicle-Card-Info">
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {card.value}
                </Typography>
              </div>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VehicleOverviewCards;
