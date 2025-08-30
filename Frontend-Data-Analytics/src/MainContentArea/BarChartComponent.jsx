import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Cell } from "recharts";
import './BarChartComponent.css';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  const colors = ['salmon','pink','lightgreen','gold','darkgreen'];

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv") // adjust path
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true });
        const data = parsed.data;

        // Count all Makes
        const makeCounts = {};
        data.forEach(row => {
          const make = row["Make"];
          if (make) makeCounts[make] = (makeCounts[make] || 0) + 1;
        });

        // Convert to array and sort descending
        const sortedMakes = Object.entries(makeCounts)
          .map(([make, count]) => ({ Make: make, Count: count }))
          .sort((a,b) => b.Count - a.Count)
          .slice(0, 5); // top 5 makes

        setChartData(sortedMakes);
      });
  }, []);

  return (
    <div className="Website-BarChart-Component">
      <h3>Top 5 Vehicle Makes</h3>
      {chartData.length === 0 ? (
        <p>Loading chart data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Make" angle={-30} textAnchor="end" interval={0} height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Count">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChartComponent;
