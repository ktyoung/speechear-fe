import { useParams } from "react-router-dom";
import Test03Screen from "../../../components/tests/test03/Test03Screen";

export default function Test03ScreenWrapper() {
  const { quiz } = useParams();

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">03</span>긴
            이야기 듣기
          </p>
          <p className="quiz-rule">{`${quiz}. 다음 긴 이야기를 듣고 문제에 답해 보세요.`}</p>
        </div>
        <Test03Screen />
      </div>
    </div>
  );
}
