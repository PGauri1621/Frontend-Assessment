import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  ElectricCar,
  Map,
  TrendingUp,
  EvStation,
} from "@mui/icons-material";
import { Link } from "react-router-dom"; // ⬅️ import router Link
import "./LogoList.css";

const LogoList = () => {
  const [open, setOpen] = useState(true);

  // Menu items now have a "path"
  const menuItems = [
    { text: "Vehicle Analysis", icon: <ElectricCar />, path: "/vehicle-analysis" },
    { text: "Geographic Analysis", icon: <Map />, path: "/geographic-analysis" },
    { text: "Market Trends", icon: <TrendingUp />, path: "/trends" },
    { text: "Infrastructure", icon: <EvStation />, path: "/infrastructure" },
  ];

  return (
    <div
      className={`logo-list ${open ? "open" : "collapsed"}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <Tooltip
            key={index}
            title={!open ? item.text : ""}
            placement="right"
            arrow
          >
            <ListItem
              button
              component={Link}   // ⬅️ makes it a router link
              to={item.path}     // ⬅️ navigates to path
              className="logo-list-item"
            >
              <ListItemIcon className="logo-list-icon">{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider className="logo-list-divider" />
    </div>
  );
};

export default LogoList;
