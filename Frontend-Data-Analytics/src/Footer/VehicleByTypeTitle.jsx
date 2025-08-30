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
import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import InfoIcon from '@mui/icons-material/Info';
import './VehicleByTypeTitle.css';

// Sample vehicle data
const vehicleList = [
  { make: 'Tesla', type: 'car', color: '#67C090', status: 'Active' },
  { make: 'BMW', type: 'truck', color: '#124170', status: 'Idle' },
  { make: 'Nissan', type: 'bike', color: '#26667F', status: 'Moving' },
];

// Map vehicle type to MUI icon
const iconMap = {
  car: DirectionsCarIcon,
  truck: LocalShippingIcon,
  bike: TwoWheelerIcon,
};

const VehicleByTypeTitle = () => {
  return (
    <div className="vehicle-card">
      <div className="vehicle-card-header">
        <Typography variant="h6" className="vehicle-card-title">
          Vehicles by Type
        </Typography>
        <Tooltip title="Shows current vehicle status and lane position">
          <InfoIcon className="info-icon" />
        </Tooltip>
      </div>

      <div className="road-container">
        {vehicleList.map((v, idx) => {
          const Icon = iconMap[v.type];
          return (
            <div key={idx} className="vehicle-lane">
              <div className="vehicle-icon">
                <Icon style={{ color: v.color, fontSize: 36 }} />
              </div>
              <div className="road-line">
                <div className={`vehicle-status ${v.status.toLowerCase()}`}></div>
              </div>
              <Typography className="vehicle-label">{v.make}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleByTypeTitle;

