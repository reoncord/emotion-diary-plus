import React from "react";
import { emotionColors } from "../util/emotionColors"; // 감정 색상 import
import { PieChart, Pie, Cell, Legend } from "recharts"; // recharts 사용 예시
import "./PieChartComponent.css"; // CSS 파일 import

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
    <div className="pie-chart-container">
      {" "}
      {/* CSS 클래스 적용 */}
      <PieChart width={200} height={250}>
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
    </div>
  );
};

export default PieChartComponent;
