import { Link } from "react-router-dom";
import CrosswordGrid from "../../../components/CrosswordGrid";

interface CrosswordQuizProps {
  quizNumber: number;
}

export default function CrosswordQuiz({ quizNumber }: CrosswordQuizProps) {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main crossword">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">05</span>
            가로세로 퀴즈
          </p>
          <p className="quiz-rule">{`${quizNumber}. 파란색 번호는 가로, 녹색 번호는 세로 문제입니다.`}</p>
        </div>
        <div className="quiz-btn-wrapper">
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/test/show_answer.png`}
              alt="Show Answer Button"
            />
          </Link>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/test/next_quiz.png`}
              alt="Next Quiz Button"
            />
          </Link>
        </div>
      </div>
      <CrosswordGrid
        rows={5}
        columns={5}
        hintRows={5}
        disabledCells={[
          { row: 1, col: 2 },
          { row: 3, col: 4 },
        ]}
      />
    </div>
  );
}
