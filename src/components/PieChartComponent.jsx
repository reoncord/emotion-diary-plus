// PieChartComponent.jsx
import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const emotionColors = {
  1: "#4caf50", // 완전 좋음
  2: "#ffeb3b", // 좋음
  3: "#ff9800", // 그러저럭
  4: "#f44336", // 나쁨
  5: "#d32f2f", // 최악
};

const PieChartComponent = ({ diaryEntries }) => {
  const emotionCounts = {};

  diaryEntries.forEach((entry) => {
    if (emotionCounts[entry.emotionId]) {
      emotionCounts[entry.emotionId]++;
    } else {
      emotionCounts[entry.emotionId] = 1;
    }
  });

  const data = Object.entries(emotionCounts).map(([emotionId, count]) => ({
    name: `감정 ${emotionId}`,
    count,
    emotionId,
  }));

  return (
    <div>
      <h3>감정 분포</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry) => (
            <Cell
              key={`cell-${entry.emotionId}`}
              fill={emotionColors[entry.emotionId]}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
