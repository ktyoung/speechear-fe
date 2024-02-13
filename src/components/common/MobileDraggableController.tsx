import { useState } from "react";
import { useLocation } from "react-router-dom";

import DraggableQuestion from "@components/tests/test04/DraggableQuestion";

import { useQuestionNavigation } from "@hooks/useQuestionNavigation";

type MobileDraggableControllerProps = {
  guideText: string;
  difficultyText: string;
  quiz: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  questionData: { question: string }[];
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
};

export default function MobileDraggableController({
  guideText,
  difficultyText,
  quiz,
  // currentQuestionIndex,
  totalQuestions,
  questionData,
  moveQuestion,
}: MobileDraggableControllerProps) {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isStartOrdering, setIsStartOrdering] = useState(false);

  // 문제 이동과 관련된 상태 및 함수 관리(useQuestionNavigation)
  const { currentQuestionIndex, handleLeftArrowClick, handleRightArrowClick } =
    useQuestionNavigation({ totalQuestions });
  //

  // 퀴즈 데이터 패칭 및 오디오 재생 로직 (useQuizDataFetching)
  // useQuizDataFetching({
  //   currentQuestionIndex,
  //   quizDataArray: quizData,
  //   setContext: setCurrentContext,
  //   isPlay,
  // });

  const handlePlayClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  //

  // URL에 따른 문제 개수 조절
  const path = location.pathname;
  let numComponents = 5; // 기본값
  if (path.includes("/word3/")) numComponents = 3;
  else if (path.includes("/word4/")) numComponents = 4;
  else if (path.includes("/word5/")) numComponents = 5;
  //

  // 상태 관리 로직: 사용자 상호작용에 따른 UI 상태 변경
  const handleStartOrdering = () => {
    setIsStartOrdering(true);
  };
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
        <div
          className="controller__title"
          style={{ justifyContent: "center", border: "none", margin: "0 0 24px 0" }}
        >
          <p className="controller__diffculty">
            {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
          </p>
        </div>

        <div className="controller__audio-control">
          {!isStartOrdering ? (
            Array.from({ length: numComponents }, (_, index) => (
              <AudioController
                key={index}
                index={index}
                isPlaying={index === activeIndex}
                onClick={handlePlayClick}
              />
            ))
          ) : (
            <div className="draggable-questions-list">
              {questionData.map((item, index) => (
                <DraggableQuestion
                  key={index}
                  index={index}
                  item={item}
                  moveQuestion={moveQuestion}
                />
              ))}
            </div>
          )}
        </div>

        <div className="controller__order-sentence-wrapper"></div>
      </div>

      <div className="test-contents__answer" style={{ margin: "24px 0 0 0" }}>
        {isStartOrdering ? (
          <button className="view-answer-btn" onClick={handleStartOrdering}>
            <p>정답 보기</p>
          </button>
        ) : (
          <button className="start-ordering-btn" onClick={handleStartOrdering}>
            <p>순서 맞추기</p>
          </button>
        )}
      </div>
    </div>
  );
}

type AudioControllerProps = {
  index: number;
  isPlaying: boolean;
  onClick: (index: number) => void;
};
function AudioController({ index, isPlaying, onClick }: AudioControllerProps) {
  const audioButtonStyle = {
    width: "100%",
    padding: "12px 32px",
    backgroundColor: isPlaying ? "#40A0FF" : "#63b4ff1a",
    borderRadius: "100px",
  };

  return (
    <div className="audio-controller-container">
      <p
        className="controller__title-bold"
        style={{
          margin: "0 0 10px 0",
          padding: "0 0 10px 0",
          borderBottom: "1px solid #f5f5f5",
        }}
      >
        {index + 1}번째 문장 듣기
      </p>
      <button
        className="controller__audio-btn"
        style={audioButtonStyle}
        onClick={() => onClick(index)}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/${
            isPlaying ? "icon_pause_white_sm.png" : "icon_play_sm.png"
          }`}
          alt="Small Play Icon"
          style={{ height: "18px" }}
        />
      </button>
    </div>
  );
}
