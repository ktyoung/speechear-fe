import { useParams } from "react-router-dom";
import TestScreen from "../../../components/test01/TestScreen";

export default function TestBasic() {
  const { quizNumber } = useParams<{ quizNumber?: string }>();

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">01</span> 소음
            하 문장듣기
          </p>
          <p className="quiz-rule">{`${quizNumber}. 다음 문장을 듣고 따라해 보세요.`}</p>
        </div>
        <TestScreen />
      </div>
    </div>
  );
}
