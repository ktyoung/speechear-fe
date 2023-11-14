import { useParams } from "react-router-dom";
import TestList from "../../../components/tests/TestList";

export default function Test04Level() {
  const { level, page } = useParams();

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">04</span>문장
            순서화 하기
          </p>
        </div>
        <TestList data={{}} _to={`/training/part4/${level}/${page}`} />
      </div>
    </div>
  );
}
