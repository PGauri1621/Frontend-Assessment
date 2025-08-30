import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import EvStationIcon from "@mui/icons-material/EvStation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DownloadIcon from "@mui/icons-material/Download";

import "./Header.css";

const Header = () => {
  return (
    <AppBar position="sticky" className="Header-AppBar">
      <Toolbar className="Header-Toolbar">
        {/* Left: EV Logo + Fancy Title + Tagline */}
        <div className="Header-Left">
          <IconButton
            color="inherit"
            className="Header-Logo"
            aria-label="Home"
            edge="start"
          >
            <EvStationIcon className="Header-LogoIcon" />
          </IconButton>
          <div className="Header-TitleBlock">
            <span className="Header-Title">EV Analytics Dashboard</span>
            <span className="Header-Tagline">
              Insights into the future of mobility
            </span>
          </div>
        </div>

        {/* Center: Key metric (example) */}
        <div className="Header-Center">
          <span className="Header-Metric" title="Current total EVs in dataset">
            Total EVs: 12,345
          </span>
        </div>

        {/* Right: Actions */}
        <div className="Header-Right">
          <IconButton
            color="inherit"
            className="Header-Action"
            aria-label="Download report"
          >
            <DownloadIcon className="Header-ActionIcon" />
          </IconButton>
          <IconButton
            color="inherit"
            className="Header-Action"
            aria-label="Profile"
            edge="end"
          >
            <AccountCircleIcon className="Header-ActionIcon" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
