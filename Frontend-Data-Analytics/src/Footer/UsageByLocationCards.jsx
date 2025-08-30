import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import "./UsageByLocationCards.css";

const UsageByLocationSummary = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [urbanPct, setUrbanPct] = useState(0);

  const urbanCities = [
    "Seattle","Spokane","Tacoma","Vancouver","Bellevue","Kent","Everett",
    "Renton","Spokane Valley","Federal Way","Yakima","Kirkland","Bellingham",
    "Kennewick","Auburn","Pasco","Redmond","Sammamish","Shoreline","Olympia",
    "Lacey","Lakewood","Burien"
  ];
  const urbanCitiesNormalized = urbanCities.map(c => c.toLowerCase());

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true });
        const data = parsed.data;

        let urbanCount = 0;
        let ruralCount = 0;

        data.forEach(row => {
          let city = row["City"];
          if (!city) return;

          city = city.trim().toLowerCase();
          if (urbanCitiesNormalized.includes(city)) urbanCount++;
          else ruralCount++;
        });

        const total = urbanCount + ruralCount;
        const urbanPercentage = total > 0 ? Math.round((urbanCount / total) * 100) : 0;

        setSummaryData([
          { name: "Urban", value: urbanCount },
          { name: "Rural", value: ruralCount }
        ]);
        setUrbanPct(urbanPercentage);
      });
  }, []);

  const COLORS = ["#7c3aed", "#10b981"]; // purple (Urban), green (Rural)

  return (
    <div className="UsageByLocation-Container">
      {/* Headings */}
      <h2>Electric Vehicle Distribution</h2>
      <h3>Usage by Location</h3>

      {/* Pie Chart */}
      {summaryData.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={summaryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              label
            >
              {summaryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      )}

      {/* Info below chart */}
      <p>
        <span className="urban">{urbanPct}%</span> of registered EVs are located in{" "}
        <span className="urban">Urban</span> areas, while the rest are in{" "}
        <span className="rural">Rural</span> areas.
      </p>
    </div>
  );
};

export default UsageByLocationSummary;
