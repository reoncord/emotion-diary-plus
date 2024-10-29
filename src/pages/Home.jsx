import { useState, useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Calendar from "../components/Calendar"; // 캘린더 컴포넌트 추가
import PieChartComponent from "../components/PieChartComponent"; // 원형차트 컴포넌트 추가
import { DiaryStateContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

// 현재 달에 해당하는 일기 데이터만 추출
const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setpivotDate] = useState(new Date());
  usePageTitle("감정 일기장");

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setpivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setpivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftchild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightchild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: "1", marginRight: "20px" }}>
          <DiaryList data={monthlyData} />
          <PieChartComponent diaryEntries={monthlyData} />
        </div>
      </div>
      <Calendar diaryEntries={monthlyData} /> {/* 캘린더를 맨 아래에 위치 */}
    </div>
  );
};

export default Home;
