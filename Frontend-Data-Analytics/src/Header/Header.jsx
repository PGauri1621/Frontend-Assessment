import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";

import EvStationIcon from "@mui/icons-material/EvStation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TuneIcon from "@mui/icons-material/Tune";
import RefreshIcon from "@mui/icons-material/Refresh";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import FilterListIcon from "@mui/icons-material/FilterList";

import Papa from "papaparse";
import "./Header.css";

const Header = () => {
  const [metrics, setMetrics] = useState({
    totalEVs: 0,
    stationsPerCity: 0,
    vehiclesAnalyzed: 0
  });

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const data = parsed.data;

        if (!data || data.length === 0) return;

        // Count rows for each column
        const totalEVs = data.filter(row => row["Electric Vehicle Type"]).length;
        const totalStations = data.filter(row => row["Electric Utility"]).length;
        const totalVehicles = data.filter(row => row["Make"]).length;

        setMetrics({
          totalEVs,
          stationsPerCity: totalStations,
          vehiclesAnalyzed: totalVehicles
        });
      })
      .catch(err => console.error("CSV parsing error:", err));
  }, []);

  return (
    <AppBar position="static" className="Header-AppBar">
      <Toolbar className="Header-Toolbar">

        {/* Left Section */}
        <div className="Header-Left">
          <IconButton color="inherit" className="Header-Logo" aria-label="Home">
            <EvStationIcon className="Header-LogoIcon" />
          </IconButton>
          <div className="Header-TitleBlock">
            <span className="Header-Title">EV Analytics</span>
            <span className="Header-Tagline">Insights into the future of mobility</span>
          </div>
        </div>

        {/* Center Metrics */}
        <div className="Header-Center">
          <Tooltip title="Total Electric Vehicles in dataset">
            <span className="Header-Metric">EVs: {metrics.totalEVs.toLocaleString()}</span>
          </Tooltip>
          <span className="Header-Metric-Seperator">|</span>
          <Tooltip title="Average charging stations per city">
            <span className="Header-Metric">Stations/City: {metrics.stationsPerCity.toLocaleString()}</span>
          </Tooltip>
          <span className="Header-Metric-Seperator">|</span>
          <Tooltip title="Vehicles analyzed in last week">
            <span className="Header-Metric">Vehicles Analyzed: {metrics.vehiclesAnalyzed.toLocaleString()}</span>
          </Tooltip>
        </div>

        {/* Right Section */}
        <div className="Header-Right">
          <Tooltip title="Notifications">
            <IconButton color="inherit" aria-label="Notifications">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon className="Header-ActionIcon" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Refresh Data">
            <IconButton color="inherit" aria-label="Refresh">
              <RefreshIcon className="Header-ActionIcon" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Customize Dashboard">
            <IconButton color="inherit" aria-label="Settings">
              <TuneIcon className="Header-ActionIcon" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Toggle Theme">
            <IconButton color="inherit" aria-label="Theme Toggle">
              <Brightness4Icon className="Header-ActionIcon" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Filters">
            <IconButton color="inherit" aria-label="Filters">
              <FilterListIcon className="Header-ActionIcon" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton color="inherit" aria-label="Profile">
              <AccountCircleIcon className="Header-ActionIcon" />
            </IconButton>
          </Tooltip>
        </div>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
