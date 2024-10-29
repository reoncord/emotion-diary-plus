import { useState } from "react";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";

const emotionSettings = {
  1: { className: "button_1", label: "완전 좋음" },
  2: { className: "button_2", label: "좋음" },
  3: { className: "button_3", label: "그러저럭" },
  4: { className: "button_4", label: "나쁨" },
  5: { className: "button_5", label: "최악" },
};

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [emotionFilter, setEmotionFilter] = useState(null);

  const onChangeSortType = (e) => setSortType(e.target.value);
  const onChangeEmotionFilter = (emotionId) => setEmotionFilter(emotionId);

  const getSortedData = () => {
    const filteredData = emotionFilter
      ? data.filter((item) => item.emotionId === emotionFilter)
      : data;

    return filteredData.toSorted((a, b) => {
      return sortType === "oldest"
        ? Number(a.createdDate) - Number(b.createdDate)
        : Number(b.createdDate) - Number(a.createdDate);
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="emotion_filter">
        {Object.entries(emotionSettings).map(
          ([emotionId, { className, label }]) => (
            <button
              key={emotionId}
              onClick={() => onChangeEmotionFilter(Number(emotionId))}
              className={className}
            >
              {label}
            </button>
          )
        )}
        <button onClick={() => setEmotionFilter(null)} className="button_all">
          모두 보기
        </button>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
