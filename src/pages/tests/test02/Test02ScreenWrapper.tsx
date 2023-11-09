import { useParams } from "react-router-dom";
import Test02Screen from "../../../components/tests/test02/Test02Screen";

export default function Test02ScreenWrapper() {
  const { quizNumber } = useParams();

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">02</span> 짧은
            이야기 듣기
          </p>
          <p className="quiz-rule">{`${quizNumber}. 다음 문장을 듣고 따라해 보세요.`}</p>
        </div>
        <Test02Screen />
      </div>
    </div>
  );
}
