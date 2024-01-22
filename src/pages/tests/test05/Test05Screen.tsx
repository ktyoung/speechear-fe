import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import crosswordData from "@datas/test05Data.json";

import Snb from "@components/common/Snb";
import CoachMark from "@components/tests/CoachMark";
import CrosswordGrid from "@components/tests/test05/CrosswordGrid";
import NavigationButton from "@components/tests/test05/NavigationButton";
import SpeechBubble from "@components/tests/test05/SpeechBubble";

export default function Test05Screen() {
  const [quizNavIndex, setQuizNavIndex] = useState(1);
  const [isCoachMarkVisible, setIsCoachMarkVisible] = useState(true);
  const { quiz } = useParams<{ quiz?: string }>();
  const quizNum = parseInt(quiz ?? "1", 10);
  const [showAnswers, setShowAnswers] = useState(false);

  // 퀴즈 데이터 패칭 로직
  type QuizData = {
    quiz: number;
    rows: number;
    columns: number;
    hintRows: number;
    disabledCells: Array<{ row: number; col: number }>;
    horizontalHints: Array<{ number: number; row: number; col: number }>;
    verticalHints: Array<{ number: number; row: number; col: number }>;
    answers: { [key: string]: string };
  };

  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    const currentQuizData = crosswordData.find((data) => data.quiz === quizNum);
    setQuizData(currentQuizData ?? null);
  }, [quizNum]);
  //

  // 퀴즈 네비게이션 렌더링 로직
  useEffect(() => {
    const newQuizNavIndex = Math.floor((quizNum - 1) / 10) * 10 + 1;
    setQuizNavIndex(newQuizNavIndex);
  }, [quizNum]);
  //

  // 상태 관리 로직: 사용자 상호작용에 따른 UI 상태 변경
  const handlePrevious = () => {
    setQuizNavIndex((prevIndex) => (prevIndex > 10 ? prevIndex - 10 : 1));
  };
  const handleNext = () => {
    setQuizNavIndex((prevIndex) => (prevIndex < 91 ? prevIndex + 10 : 91));
  };
  const handleCoachMarkVisible = () => {
    setIsCoachMarkVisible(false);
  };
  const handleShowAnswer = () => {
    setShowAnswers(!showAnswers);
  };
  //

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">가로세로 퀴즈</p>
          {isCoachMarkVisible && (
            <CoachMark handleVisible={handleCoachMarkVisible} isRightFinger={true} />
          )}
          <div className="main-select-wrapper visible">
            <div className="quiz-navigation-container">
              <button onClick={handlePrevious} disabled={quizNavIndex === 1}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_left.png`}
                  alt="Prev Arrow Icon"
                  style={{
                    opacity: quizNavIndex === 1 ? 0.5 : 1,
                    cursor: quizNavIndex === 1 ? "default" : "pointer",
                  }}
                />
              </button>
              <div className="navigation">
                {Array.from({ length: 10 }, (_, i) => (
                  <NavigationButton key={i} quizNumber={quizNavIndex + i} />
                ))}
              </div>
              <button onClick={handleNext} disabled={quizNavIndex === 91}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_right.png`}
                  alt="Next Arrow Icon"
                  style={{
                    opacity: quizNavIndex === 91 ? 0.5 : 1,
                    cursor: quizNavIndex === 91 ? "default" : "pointer",
                  }}
                />
              </button>
            </div>
            <div className="test-contents flex-start">
              <SpeechBubble showAnswer={handleShowAnswer} />
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
          </div>
        </div>
      </div>
    </div>
  );
}
