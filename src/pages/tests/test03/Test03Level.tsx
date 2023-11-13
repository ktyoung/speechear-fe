import { useParams } from "react-router-dom";
import TestList from "../../../components/tests/TestList";

export default function Test03Level() {
  const { level, page } = useParams<{ level: string; page?: string }>();

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">03</span>긴
            이야기 듣기
          </p>
        </div>
        <TestList
          _totalPage={1}
          _totalQuestionCount={5}
          _to={`/training/part3/${level}/${page}`}
          partNum={3}
        />
      </div>
    </div>
  );
}
