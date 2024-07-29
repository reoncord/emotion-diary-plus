import { useParams, useNavigate } from "react-router-dom"; //브라우저 URL에 명시한 파라미터 가져오는 커스텀 훅
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringedDate";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  const nav = useNavigate();
  const params = useParams();

  const curDiaryItem = useDiary(params.id);
  usePageTitle(`${params.id}번 일기`);

  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));
  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftchild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightchild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};
export default Diary;
