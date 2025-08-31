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
import './BarChartComponent.css';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const colors = ['#67C090','#124170','#26667F','#DDF4E7','#124170'];

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true });
        const data = parsed.data;

        const makeCounts = {};
        data.forEach(row => {
          const make = row["Make"];
          if (make) makeCounts[make] = (makeCounts[make] || 0) + 1;
        });

        const sortedMakes = Object.entries(makeCounts)
          .map(([make, count]) => ({ Make: make, Count: count }))
          .sort((a,b) => b.Count - a.Count)
          .slice(0, 5);

        setChartData(sortedMakes);
      });
  }, []);

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
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#124170"/>
            <XAxis dataKey="Make" angle={-30} textAnchor="end" height={50} stroke="#124170"/>
            <YAxis stroke="#124170"/>
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
