import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Tooltip } from '@mui/material';
import { Home, Settings, Info } from '@mui/icons-material';
import './LogoList.css';

const LogoList = () => {
  const [open, setOpen] = useState(true); // always open in sidebar

  const menuItems = [
    { text: 'Home', icon: <Home /> },
    { text: 'Settings', icon: <Settings /> },
    { text: 'About', icon: <Info /> },
    { text: 'Help', icon: <Info /> },
  ];

  return (
    <div
      className={`logo-list ${open ? 'open' : 'collapsed'}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <Tooltip
            key={index}
            title={!open ? item.text : ''}
            placement="right"
            arrow
          >
            <ListItem button className="logo-list-item">
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
