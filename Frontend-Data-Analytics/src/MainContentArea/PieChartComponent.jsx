import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "./PieChartComponent.css";

const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const colors = ["#67C090", "#26667F", "#124170", "#DDF4E7", "#E6A157"];

  useEffect(() => {
    fetch("/data/Electric_Vehicle_Population_Data.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        const data = parsed.data;

        const counts = {};
        data.forEach((row) => {
          const val = row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
          if (val) counts[val] = (counts[val] || 0) + 1;
        });

        const chartArray = Object.entries(counts).map(([name, value]) => ({
          name,
          value
        }));
        setChartData(chartArray);
      });
  }, []);

  // Custom label to display numbers inside pie slices
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="Website-PieChart-Component">
      <h3>CAFV Eligibility</h3>
      <p className="Chart-Description">
        This pie chart illustrates the proportion of vehicles eligible for the
        Clean Alternative Fuel Vehicle program. It helps understand how many
        vehicles qualify for incentives and supports policy analysis.
      </p>
      {chartData.length === 0 ? (
        <p>Loading pie chart data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              labelLine={false}
              label={renderCustomizedLabel}
              startAngle={90}
              endAngle={-270} // ensures full circle clockwise
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
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
