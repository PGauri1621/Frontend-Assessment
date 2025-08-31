import React, { useEffect, useState } from "react";
import { Typography, MenuItem, FormControl, Select } from "@mui/material";
import Papa from "papaparse";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ScatterChart, Scatter,
  LineChart, Line, CartesianGrid, Legend,
  ResponsiveContainer
} from "recharts";
import "./VehicleAnalysis.css";

const colors = ["#DDF4E7", "#67C090", "#26667F", "#124170"];
const pieColors = ["#67C090", "#26667F"];

const topMakes = ["TESLA", "BMW", "NISSAN", "PORSCHE", "AUDI", "FORD"];

const VehicleAnalysis = () => {
  const [data, setData] = useState([]);
  const [selectedMake, setSelectedMake] = useState("ALL");

  useEffect(() => {
    Papa.parse("/data/Electric_Vehicle_Population_Data.csv", {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => setData(results.data),
    });
  }, []);

  const currentYear = new Date().getFullYear();
  const filteredData = data.filter(item => {
    const year = parseInt(item["Model Year"]);
    if (!year) return false;
    const inLast10Years = year >= currentYear - 10;
    const matchMake = selectedMake === "ALL" || item.Make === selectedMake;
    return inLast10Years && matchMake;
  });

  // Prepare chart data
  const makeCounts = {};
  const yearCounts = {};
  const typeCounts = {};
  const rangeMsrpData = [];

  filteredData.forEach((item) => {
    // By Make
    if (item.Make) makeCounts[item.Make] = (makeCounts[item.Make] || 0) + 1;

    // By Model Year
    if (item["Model Year"]) yearCounts[item["Model Year"]] = (yearCounts[item["Model Year"]] || 0) + 1;

    // By Electric Vehicle Type
    if (item["Electric Vehicle Type"]) {
      typeCounts[item["Electric Vehicle Type"]] =
        (typeCounts[item["Electric Vehicle Type"]] || 0) + 1;
    }

    // Range vs MSRP
    if (item["Electric Range"] && item["Base MSRP"]) {
      rangeMsrpData.push({ range: item["Electric Range"], msrp: item["Base MSRP"] });
    }
  });

  const makeData = Object.keys(makeCounts).map(key => ({ name: key, count: makeCounts[key] }));
  const yearData = Object.keys(yearCounts).map(key => ({ year: key, count: yearCounts[key] }));
  const typeData = Object.keys(typeCounts).map(key => ({ name: key, value: typeCounts[key] }));

  return (
    <div className="vehicle-analysis-container">
      {/* Title & Description */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: colors[3], fontWeight: 700, mb: 1, animation: "pulse 2s infinite" }}
      >
        EV Vehicle Insights — Last 10 Years
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{ color: colors[2], marginBottom: "1.5rem" }}
      >
        Explore trends over the past decade: top EV makes, model years, vehicle types, and performance metrics like range vs base MSRP.
        Use the filter below to focus on a specific manufacturer.
      </Typography>

      {/* Dropdown Filter */}
      <FormControl sx={{ minWidth: 180, mb: 2 }}>
        <Select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          displayEmpty
        >
          <MenuItem value="ALL">All Top Makes</MenuItem>
          {topMakes.map(make => (
            <MenuItem key={make} value={make}>{make}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Grid of Charts */}
      <div className="vehicle-analysis-grid">
        {/* By Make */}
        <div className="vehicle-analysis-card">
          <Typography variant="h6" sx={{ color: colors[3], fontWeight: 600 }}>By Make</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={makeData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={colors[1]} />
            </BarChart>
          </ResponsiveContainer>
          <Typography variant="body2" sx={{ color: colors[2], marginTop: 1 }}>
            Number of vehicles grouped by manufacturer.
          </Typography>
        </div>

        {/* By Model Year */}
        <div className="vehicle-analysis-card">
          <Typography variant="h6" sx={{ color: colors[3], fontWeight: 600 }}>By Model Year</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={yearData}>
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke={colors[2]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <Typography variant="body2" sx={{ color: colors[2], marginTop: 1 }}>
            Number of vehicles registered per model year.
          </Typography>
        </div>

        {/* By Type */}
        <div className="vehicle-analysis-card">
          <Typography variant="h6" sx={{ color: colors[3], fontWeight: 600 }}>By Type</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={typeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Typography variant="body2" sx={{ color: colors[2], marginTop: 1 }}>
            Distribution of vehicles by electric vehicle type.
          </Typography>
        </div>

        {/* Range vs MSRP */}
        <div className="vehicle-analysis-card">
          <Typography variant="h6" sx={{ color: colors[3], fontWeight: 600 }}>Range & MSRP</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <XAxis type="number" dataKey="range" name="Electric Range" unit="mi" />
              <YAxis type="number" dataKey="msrp" name="Base MSRP" unit="$" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Vehicles" data={rangeMsrpData} fill={colors[1]} />
              <Legend />
            </ScatterChart>
          </ResponsiveContainer>
          <Typography variant="body2" sx={{ color: colors[2], marginTop: 1 }}>
            Scatter plot of electric range vs base MSRP for filtered vehicles.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VehicleAnalysis;
