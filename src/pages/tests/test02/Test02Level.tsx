import { useLocation, useParams } from "react-router-dom";
import TestList from "../../../components/tests/TestList";

export default function Test02Level() {
  const { level, page } = useParams<{ level: string; page?: string }>();
  const location = useLocation();

  const isCultureRoute = location.pathname.includes("/culture/");
  const _totalQuestionCount = isCultureRoute ? 9 : 7;

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">02</span> 짧은
            이야기 듣기
          </p>
        </div>
        <TestList
          _totalPage={1}
          _totalQuestionCount={_totalQuestionCount}
          _to={`/training/part2/${level}/${page}`}
          partNum={2}
        />
      </div>
    </div>
  );
}
