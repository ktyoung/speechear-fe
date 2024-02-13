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
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const isPart1Url = location.pathname.includes("/part1/");
  const isPart3Url = location.pathname.includes("/part3/");

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

  // 상태 관리 로직: 사용자 상호작용에 따른 UI 상태 변경
  const handleContextVisible = () => {
    setIsContextVisible(!isContextVisible);
    setIsQuestionVisible(false);
  };

  const handleQuestionVisible = () => {
    setIsQuestionVisible(!isQuestionVisible);
    setIsContextVisible(false);
  };

  const handleAnswerVisible = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };
  //

  // 요소 스타일 정의
  const audioButtonStyle = {
    width: "100%",
    padding: "12px 32px",
    backgroundColor: isPlay ? "#40A0FF" : "#63b4ff1a",
    borderRadius: "100px",
  };

  const createRotationStyle = (isVisible: boolean) => ({
    transform: isVisible ? "rotateX(180deg)" : "rotateX(0deg)",
    transition: "transform 0.4s",
  });
  const contextMoreIconStyle = createRotationStyle(isContextVisible);
  const questionMoreIconStyle = createRotationStyle(isQuestionVisible);

  const activeButtonStyle = (isActive: boolean) => ({
    color: isActive ? "#4894fe" : "#8696bb",
  });
  const contextButtonActiveStyle = activeButtonStyle(isContextVisible);
  const questionButtonActiveStyle = activeButtonStyle(isQuestionVisible);
  //

  // 긴 이야기 듣기(Test03) 로직 및 문제 더미 데이터
  const [subQuestionIndex, setSubQuestionIndex] = useState(0);

  const handlePrevSubQuestion = () => {
    if (subQuestionIndex > 0) {
      setSubQuestionIndex(subQuestionIndex - 1);
    }
  };

  const handleNextSubQuestion = () => {
    if (subQuestionIndex < 4) {
      setSubQuestionIndex(subQuestionIndex + 1);
    }
  };

  const questionData = [
    { question: "기억나는 단어를 나열해 보세요.", answer: "스포츠 등" },
    { question: "무엇에 관한 이야기입니까?", answer: "축구" },
    { question: "축구에서의 한 팀은 몇 명입니까?", answer: "11명" },
    { question: "일반적인 축구의 경기 시간은 얼만큼입니까?", answer: "90분" },
    { question: "반칙을 당한 상대방에게 주어지는 기회는 무엇입니까?", answer: "프리킥" },
  ];
  //

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
            style={contextButtonActiveStyle}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
              alt="View More Icon"
              style={contextMoreIconStyle}
            />
            <p>{isPart1Url ? "문장 보기" : "이야기 보기"}</p>
          </button>
          {!location.pathname.includes("/part1/basic/") && !isPart3Url && (
            <button className="controller__no-noise">소음 없이 듣기</button>
          )}
          {isPart3Url && (
            <button
              className="controller__question-view-btn"
              onClick={handleQuestionVisible}
              style={questionButtonActiveStyle}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                alt="View More Icon"
                style={questionMoreIconStyle}
              />
              <p>문제 보기</p>
            </button>
          )}
        </div>

        <div
          className="controller__sentence-wrapper"
          style={isPart3Url ? { height: "260px" } : { height: "50px" }}
        >
          <div
            className="controller__sentence"
            style={
              isContextVisible || isQuestionVisible
                ? { opacity: 1, transition: "opacity 0.2s ease" }
                : { opacity: 0, transition: "opacity 0.2s ease" }
            }
          >
            {isContextVisible && <p>{currentContext}</p>}
            {isQuestionVisible && (
              <>
                <div className="question-navigation-container">
                  <button
                    onClick={handlePrevSubQuestion}
                    disabled={subQuestionIndex === 0}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_left${
                        subQuestionIndex === 0 ? "_disabled" : ""
                      }.png`}
                      alt="Left Arrow Icon"
                      className="left-arrow"
                    />
                    <p style={{ color: subQuestionIndex === 0 ? "#D9D9D9" : "" }}>
                      이전 문제
                    </p>
                  </button>
                  <button
                    onClick={handleNextSubQuestion}
                    disabled={subQuestionIndex === 4}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_right${
                        subQuestionIndex === 4 ? "_disabled" : ""
                      }.png`}
                      alt="Right Arrow Icon"
                      className="right-arrow"
                    />
                    <p style={{ color: subQuestionIndex === 4 ? "#D9D9D9" : "" }}>
                      다음 문제
                    </p>
                  </button>
                </div>
                <p>
                  Q{subQuestionIndex + 1}. {questionData[subQuestionIndex].question}
                </p>
                {isAnswerVisible && (
                  <p className="answer">{questionData[subQuestionIndex].answer}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="test-contents__answer mobile">
        {isPart3Url && (
          <div
            className="answer-checkbox"
            style={{
              whiteSpace: "nowrap",
              border: "2px solid transparent",
              backgroundColor: isAnswerVisible ? "#63B4FF1A" : "#F3F3F3",
            }}
            onClick={handleAnswerVisible}
          >
            <p style={{ margin: "0", color: isAnswerVisible ? "#40a0ff" : "#85888A" }}>
              정답 보기
            </p>
          </div>
        )}
        <AnswerButton
          label="정답"
          icon="correct"
          isSelected={selectedAnswer === "정답"}
          onSelect={() => handleAnswerSelect("정답")}
          labelClassName={isPart3Url ? "hidden" : ""}
        />
        <AnswerButton
          label="오답"
          icon="wrong"
          isSelected={selectedAnswer === "오답"}
          onSelect={() => handleAnswerSelect("오답")}
          labelClassName={isPart3Url ? "hidden" : ""}
        />
      </div>
    </div>
  );
}
