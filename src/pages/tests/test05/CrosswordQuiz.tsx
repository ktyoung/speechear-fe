import { Link, useParams } from "react-router-dom";
import CrosswordGrid from "../../../components/tests/test05/CrosswordGrid";
import crosswordData from "../../../data/crosswordData.json";
import { useEffect, useState } from "react";
import CustomInputButton from "@components/tests/CustomInputButton";
import { testModalState } from "@states/index";
import { useRecoilState } from "recoil";
import Modal from "@components/common/Modal";

interface QuizData {
  quiz: number;
  rows: number;
  columns: number;
  hintRows: number;
  disabledCells: Array<{ row: number; col: number }>;
  horizontalHints: Array<{ number: number; row: number; col: number }>;
  verticalHints: Array<{ number: number; row: number; col: number }>;
  answers: { [key: string]: string };
}

export default function CrosswordQuiz() {
  const { quiz } = useParams<{ quiz?: string }>();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const quizNum = parseInt(quiz ?? "1", 10);
  const [testModal, setTestModal] = useRecoilState(testModalState);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const currentQuizData = crosswordData.find((data) => data.quiz === quizNum);
    setQuizData(currentQuizData ?? null);
  }, [quizNum]);

  return (
    <div className="contents-wrapper main">
      {testModal && <Modal setModal={setTestModal} modalText="훈련을 마쳤습니다." />}
      <div className="contents-main crossword">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">05</span>
            가로세로 퀴즈
          </p>
          <p className="quiz-rule">{`${quiz}. 파란색 번호는 가로, 녹색 번호는 세로 문제입니다.`}</p>
        </div>
        <div className="quiz-btn-wrapper">
          <CustomInputButton
            type="radio"
            id="nextQuiz"
            imageName="next_quiz"
            name="nextQuiz"
            className="answer-buttons__opacity_1"
            onClick={() => {
              setTestModal(true);
            }}
          />
          <CustomInputButton
            type="radio"
            id="showAnswer"
            imageName="show_answer"
            name="showAnswer"
            className="answer-buttons__opacity_1"
            onClick={() => {
              setShowAnswers(!showAnswers);
            }}
          />
        </div>
      </div>
      {quizData && (
        <CrosswordGrid
          rows={quizData.rows}
          columns={quizData.columns}
          hintRows={quizData.hintRows}
          disabledCells={quizData.disabledCells}
          horizontalHints={quizData.horizontalHints}
          verticalHints={quizData.verticalHints}
          answers={showAnswers ? quizData.answers : {}}
        />
      )}
    </div>
  );
}
