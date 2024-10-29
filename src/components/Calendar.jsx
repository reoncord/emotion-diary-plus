// Calendar.jsx
import React from "react";
import "./Calendar.css"; // Create your CSS for calendar styling

const Calendar = ({ diaryEntries }) => {
  // Function to determine the emotion color for each date
  const getEmotionColor = (date) => {
    const entry = diaryEntries.find(
      (entry) =>
        new Date(entry.createdDate).toLocaleDateString() ===
        date.toLocaleDateString()
    );
    if (!entry) return "white"; // Default color if no entry
    // Example: Change colors based on emotionId
    switch (entry.emotionId) {
      case 1:
        return "rgb(0, 190, 57)"; // 완전 좋음
      case 2:
        return "rgb(176, 245, 34)"; // 좋음
      case 3:
        return "rgb(255, 202, 46)"; // 그러저럭
      case 4:
        return "rgb(255, 119, 57)"; // 나쁨
      case 5:
        return "rgb(255, 82, 91)"; // 최악
      default:
        return "white"; // Fallback
    }
  };

  // Create a month view
  const renderCalendar = () => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const daysInMonth = endDate.getDate();
    const calendar = [];

    // Fill calendar with dates
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const color = getEmotionColor(date);
      calendar.push(
        <div
          key={i}
          className="calendar-day"
          style={{ backgroundColor: color }}
        >
          {i}
        </div>
      );
    }
    return calendar;
  };

  return (
    <div className="calendar">
      <div className="calendar-grid">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
