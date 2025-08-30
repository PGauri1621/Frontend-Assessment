import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './PieChartComponent.css';

const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  const colors = ['skyblue', 'salmon', 'lightgreen', 'gold', 'lightcoral'];

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv") // adjust path
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true });
        const data = parsed.data;

        // Count values for CAFV Eligibility
        const counts = {};
        data.forEach(row => {
          const val = row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
          if (val) counts[val] = (counts[val] || 0) + 1;
        });

        // Convert to array for Recharts
        const chartArray = Object.entries(counts).map(([name, value]) => ({ name, value }));

        setChartData(chartArray);
      });
  }, []);

  return (
    <div className="Website-PieChart-Component">
      <h3>CAFV Eligibility</h3>
      {chartData.length === 0 ? (
        <p>Loading pie chart data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
              startAngle={140}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartComponent;
