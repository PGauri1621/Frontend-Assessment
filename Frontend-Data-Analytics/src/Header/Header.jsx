import React from "react";
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

import "./Header.css";

const Header = () => {
  return (
    <AppBar position="static" className="Header-AppBar">
      <Toolbar className="Header-Toolbar">

        {/* Left Section: Logo + Title */}
        <div className="Header-Left">
          <IconButton color="inherit" className="Header-Logo" aria-label="Home">
            <EvStationIcon className="Header-LogoIcon" />
          </IconButton>
          <div className="Header-TitleBlock">
            <span className="Header-Title">EV Analytics Dashboard</span>
            <span className="Header-Tagline">Insights into the future of mobility</span>
          </div>
        </div>

        {/* Center Section: Metrics */}
        <div className="Header-Center">
          <Tooltip title="Total Electric Vehicles in dataset">
            <span className="Header-Metric">EVs: 12,345</span>
          </Tooltip>
          <span className="Header-Metric-Seperator">|</span>
          <Tooltip title="Average charging stations per city">
            <span className="Header-Metric">Stations/City: 152</span>
          </Tooltip>
          <span className="Header-Metric-Seperator">|</span>
          <Tooltip title="Vehicles analyzed in last week">
            <span className="Header-Metric">Vehicles Analyzed: 3,210</span>
          </Tooltip>
        </div>

        {/* Right Section: Actions */}
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
