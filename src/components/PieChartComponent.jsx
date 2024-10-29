import React from "react";
import { emotionColors } from "../util/emotionColors"; // 감정 색상 import
import { PieChart, Pie, Cell, Legend } from "recharts"; // recharts 사용 예시

const PieChartComponent = ({ diaryEntries }) => {
  const data = Object.entries(emotionColors)
    .map(([emotionId, { color, label }]) => {
      const count = diaryEntries.filter(
        (entry) => entry.emotionId === Number(emotionId)
      ).length;
      return { name: label, value: count, color }; // 색상 추가
    })
    .filter((item) => item.value > 0); // 0인 항목은 제외

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color} /> // 감정 색상 사용
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
