import React, { useEffect, useState } from "react";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import Papa from "papaparse";

import "./MarketTrend.css";

const MarketTrend = () => {
  const [data, setData] = useState([]);
  const [yearFilter, setYearFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [tractFilter, setTractFilter] = useState("All");

  const [years, setYears] = useState([]);
  const [cities, setCities] = useState([]);
  const [tracts, setTracts] = useState([]);

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const rawData = parsed.data;
        setData(rawData);

        setYears([...new Set(rawData.map(d => d["Model Year"]).filter(Boolean))].sort());
        setCities([...new Set(rawData.map(d => d["City"]).filter(Boolean))].sort());
        setTracts([...new Set(rawData.map(d => d["2020 Census Tract"]).filter(Boolean))].sort());
      });
  }, []);

  // Growth Over Time
  const growthData = {};
  data.forEach(d => {
    const year = d["Model Year"];
    if (!year) return;
    if (yearFilter !== "All" && year !== yearFilter) return;
    if (cityFilter !== "All" && d["City"] !== cityFilter) return;
    if (tractFilter !== "All" && d["2020 Census Tract"] !== tractFilter) return;

    growthData[year] = (growthData[year] || 0) + 1;
  });
  const growthArray = Object.entries(growthData).map(([year, count]) => ({ year, count }));

  // Top Emerging EV Models
  const modelCount = {};
  data.forEach(d => {
    const model = d["Make"];
    if (!model) return;
    if (yearFilter !== "All" && d["Model Year"] !== yearFilter) return;
    if (cityFilter !== "All" && d["City"] !== cityFilter) return;
    if (tractFilter !== "All" && d["2020 Census Tract"] !== tractFilter) return;

    modelCount[model] = (modelCount[model] || 0) + 1;
  });
  const topModels = Object.entries(modelCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([model, count]) => ({ model, count }));

  // Vehicle Usage by City & Tract
  const usageData = {};
  data.forEach(d => {
    const city = d["City"];
    const tract = d["2020 Census Tract"];
    if (!city || !tract) return;
    if (yearFilter !== "All" && d["Model Year"] !== yearFilter) return;
    if (cityFilter !== "All" && city !== cityFilter) return;
    if (tractFilter !== "All" && tract !== tractFilter) return;

    const key = `${city}-${tract}`;
    usageData[key] = usageData[key] || { city, tract, count: 0 };
    usageData[key].count += 1;
  });
  const usageArray = Object.values(usageData);

  return (
    <Box className="MarketTrend-Container">
      <Typography variant="h4" className="MarketTrend-Title">Market Trends Dashboard</Typography>
      <Typography variant="body2" className="MarketTrend-Description">
        Explore key insights into EV registrations, emerging models, and city-level adoption patterns. Use the filters below to drill down by Year, City, or Census Tract.
      </Typography>

      {/* Filters */}
      <Box className="MarketTrend-Filters">
        <FormControl size="small">
          <InputLabel>Year</InputLabel>
          <Select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} label="Year">
            <MenuItem value="All">All</MenuItem>
            {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>City</InputLabel>
          <Select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} label="City">
            <MenuItem value="All">All</MenuItem>
            {cities.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Census Tract</InputLabel>
          <Select value={tractFilter} onChange={(e) => setTractFilter(e.target.value)} label="Tract">
            <MenuItem value="All">All</MenuItem>
            {tracts.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {/* Growth Over Time */}
      <Box className="MarketTrend-ChartSection MarketTrend-LineChartSection">
        <Typography variant="h6" className="MarketTrend-ChartTitle">Growth Over Time</Typography>
        <Typography variant="body2" className="MarketTrend-ChartDescription">
          Number of EV registrations per year based on selected filters.
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={growthArray}>
            <XAxis dataKey="year" stroke="#124170" />
            <YAxis stroke="#124170" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#124170" strokeWidth={3} dot={{ r: 5, fill: "#26667F" }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Top Emerging EV Models */}
      <Box className="MarketTrend-ChartSection MarketTrend-RadarChartSection">
        <Typography variant="h6" className="MarketTrend-ChartTitle">Top Emerging EV Models</Typography>
        <Typography variant="body2" className="MarketTrend-ChartDescription">
          Models with the highest increase in registrations within the selected filters.
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topModels}>
            <PolarGrid stroke="#67C090" />
            <PolarAngleAxis dataKey="model" stroke="#DDF4E7" />
            <PolarRadiusAxis stroke="#DDF4E7" />
            <Radar name="Registrations" dataKey="count" stroke="#DDF4E7" fill="#124170" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </Box>

      {/* Vehicle Usage by City & Tract */}
      <Box className="MarketTrend-ChartSection MarketTrend-AreaChartSection">
        <Typography variant="h6" className="MarketTrend-ChartTitle">Vehicle Usage by City & Tract</Typography>
        <Typography variant="body2" className="MarketTrend-ChartDescription">
          Number of vehicles in each city and census tract according to selected filters.
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={usageArray}>
            <XAxis dataKey="city" stroke="#DDF4E7" />
            <YAxis stroke="#DDF4E7" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#67C090" fill="#67C090" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MarketTrend;
