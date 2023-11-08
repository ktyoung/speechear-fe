import { useParams } from "react-router-dom";
import Test01Screen from "../../../components/tests/test01/Test01Screen";

export default function Test01ScreenWrapper() {
  const { quiz } = useParams();

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">01</span> 소음
            하 문장듣기
          </p>
          <p className="quiz-rule">{`${quiz}. 다음 문장을 듣고 따라해 보세요.`}</p>
        </div>
        <Test01Screen />
      </div>
    </div>
  );
}
