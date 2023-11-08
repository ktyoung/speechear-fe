import { useParams } from "react-router-dom";
import Test04Screen from "../../../components/tests/test04/Test04Screen";

export default function Test04ScreenWrapper() {
  const { quiz } = useParams();

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">04</span>문장
            순서화 하기
          </p>
          <p className="quiz-rule">{`${quiz}. 다음 문장을 다 듣고 순서를 맞춰보세요.`}</p>
        </div>
        <Test04Screen />
      </div>
    </div>
  );
}
