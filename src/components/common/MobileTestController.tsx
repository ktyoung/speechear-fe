import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAnswerManagement } from "@hooks/useAnswerManagement";
import { useQuestionNavigation } from "@hooks/useQuestionNavigation";
import { useQuizDataFetching } from "@hooks/useQuizDataFetching";

import AnswerButton from "./AnswerButton";

type MobileTestControllerProps = {
  guideText: string;
  difficultyText: string;
  quiz: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  quizData: any[];
};

export default function MobileTestController({
  guideText,
  difficultyText,
  quiz,
  // currentQuestionIndex,
  totalQuestions,
  quizData,
}: MobileTestControllerProps) {
  const location = useLocation();
  const [isPlay, setIsPlay] = useState(false);
  const [currentContext, setCurrentContext] = useState("");
  const [isContextVisible, setIsContextVisible] = useState(false);

  const isPart1Url = location.pathname.includes("/part1/");

  // 문제 이동과 관련된 상태 및 함수 관리(useQuestionNavigation)
  const { currentQuestionIndex, handleLeftArrowClick, handleRightArrowClick } =
    useQuestionNavigation({ totalQuestions });
  //

  // 퀴즈 데이터 패칭 및 오디오 재생 로직 (useQuizDataFetching)
  useQuizDataFetching({
    currentQuestionIndex,
    quizDataArray: quizData,
    setContext: setCurrentContext,
    isPlay,
  });

  const handlePlayClick = () => {
    setIsPlay(!isPlay);
  };
  //

  // 선택된 답변을 관리하는 로직 (useAnswerManagement)
  const { selectedAnswers, handleSelect } = useAnswerManagement();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAnswer(selectedAnswers[currentQuestionIndex] || null);
  }, [currentQuestionIndex, selectedAnswers]);

  const handleAnswerSelect = (answer: string) => {
    handleSelect(currentQuestionIndex, answer);
    setSelectedAnswer(answer);
  };
  //

  const handleContextVisible = () => {
    setIsContextVisible(!isContextVisible);
  };

  const audioButtonStyle = {
    width: "100%",
    padding: "12px 32px",
    backgroundColor: isPlay ? "#40A0FF" : "#63b4ff1a",
    borderRadius: "100px",
  };
  const moreIconStyle = {
    transform: isContextVisible ? "rotateX(180deg)" : "rotateX(0deg)",
    transition: "transform 0.4s",
  };

  return (
    <div className="mobile-test-controller-container">
      <p className="mobile__font-bold">{guideText}</p>
      <img
        src={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
        alt="Blue Speaker Icon"
      />

      <div className="context__arrows">
        <button onClick={handleLeftArrowClick}>
          <img
            src={
              currentQuestionIndex === 1
                ? `${process.env.PUBLIC_URL}/images/icons/icon_arrow_left_disabled.png`
                : `${process.env.PUBLIC_URL}/images/icons/icon_arrow_left.png`
            }
            alt="Left Arrow Icon"
            className="left-arrow"
            style={{
              opacity: currentQuestionIndex === 1 ? 0.5 : 1,
              cursor: currentQuestionIndex === 1 ? "default" : "pointer",
            }}
          />
        </button>
        <button onClick={handleRightArrowClick}>
          <img
            src={
              currentQuestionIndex === totalQuestions
                ? `${process.env.PUBLIC_URL}/images/icons/icon_arrow_right_disabled.png`
                : `${process.env.PUBLIC_URL}/images/icons/icon_arrow_right.png`
            }
            alt="Right Arrow Icon"
            className="right-arrow"
            style={{
              opacity: currentQuestionIndex === totalQuestions ? 0.5 : 1,
              cursor: currentQuestionIndex === totalQuestions ? "default" : "pointer",
            }}
          />
        </button>
      </div>

      <div className="controller">
        <div className="controller__title">
          <p className="controller__title-bold">
            {isPart1Url ? "문장듣기" : "이야기듣기"}
          </p>
          <p className="controller__diffculty">
            {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
          </p>
        </div>

        <div className="controller__audio-control">
          <button
            className="controller__audio-btn"
            style={audioButtonStyle}
            onClick={handlePlayClick}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/${
                isPlay ? "icon_pause_white_sm.png" : "icon_play_sm.png"
              }`}
              alt="Small Play Icon"
              style={{ height: "18px" }}
            />
          </button>
        </div>

        <div className="controller__features">
          <button
            className="controller__sentence-view-btn"
            onClick={handleContextVisible}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
              alt="View More Icon"
              style={moreIconStyle}
            />
            <p>{isPart1Url ? "문장 보기" : "이야기 보기"}</p>
          </button>
          <button className="controller__no-noise">
            {!location.pathname.includes("/part1/basic/") && "소음 없이 듣기"}
          </button>
        </div>

        <div className="controller__sentence-wrapper">
          <p
            className="controller__sentence"
            style={
              isContextVisible
                ? { opacity: 1, transition: "opacity 0.2s ease" }
                : { opacity: 0, transition: "opacity 0.2s ease" }
            }
          >
            {currentContext}
          </p>
        </div>
      </div>

      <div className="test-contents__answer mobile">
        <AnswerButton
          label="정답"
          icon="correct"
          isSelected={selectedAnswer === "정답"}
          onSelect={() => handleAnswerSelect("정답")}
        />
        <AnswerButton
          label="오답"
          icon="wrong"
          isSelected={selectedAnswer === "오답"}
          onSelect={() => handleAnswerSelect("오답")}
        />
      </div>
    </div>
  );
}
