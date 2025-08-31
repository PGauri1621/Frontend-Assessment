import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";
import "./BarChartComponent.css";

const BarChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  // Theme colors (unique for each bar)
  const colors = [
    "#124170", "#26667F", "#67C090", "#DDF4E7", "#E6A157",
    "#FFB347", "#FF7F50", "#8E44AD", "#1ABC9C", "#F39C12"
  ];

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        const data = parsed.data;

        const makeCounts = {};
        data.forEach((row) => {
          let make = row["Make"];
          if (make) {
            // Format: first letter uppercase, rest lowercase
            make = make.charAt(0).toUpperCase() + make.slice(1).toLowerCase();
            makeCounts[make] = (makeCounts[make] || 0) + 1;
          }
        });

        const sortedMakes = Object.entries(makeCounts)
          .map(([make, count]) => ({ Make: make, Count: count }))
          .sort((a, b) => b.Count - a.Count)
          .slice(0, 5);

        setChartData(sortedMakes);
      });
  }, []);

  // Custom legend for top-right "Count"
  const renderCustomLegend = () => (
    <g transform="translate(300,0)">
      <rect x={0} y={0} width={12} height={12} fill="#000000" />
      <text x={16} y={12} fill="#124170" fontSize={12} fontWeight="600">
        Count
      </text>
    </g>
  );

  return (
    <div className="Website-BarChart-Component">
      <h3>Top 5 Vehicle Makes</h3>
      <p className="Chart-Description">
        The bar chart shows the top 5 electric vehicle manufacturers in the dataset,
        indicating their relative contribution to the EV population. This helps identify
        key players in the EV market.
      </p>
      {chartData.length === 0 ? (
        <p>Loading chart data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 40, right: 80, left: 40, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#124170" />
            <XAxis
              dataKey="Make"
              angle={-30}
              textAnchor="end"
              height={50}
              stroke="#124170"
            />
            <YAxis
              stroke="#124170"
              label={{
                value: "Vehicle Count",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                fill: "#124170",
                fontSize: 12,
                fontWeight: "600"
              }}
            />
            <Tooltip />
            <Bar dataKey="Count">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChartComponent;
