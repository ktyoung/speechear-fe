import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import data from "@datas/test02Data.json";

import Snb from "@components/common/Snb";
import ToggleSwitch from "@components/common/ToggleSwitch";
import AnswerButton from "@components/common/AnswerButton";
import SelectTypeButton from "@components/common/SelectTypeButton";
import InteractiveTestButton from "@components/tests/InteractiveTestButton";
import Pagination from "@components/tests/Pagination";

import { useQuestionNavigation } from "@hooks/useQuestionNavigation";
import { useDifficultyMapping } from "@hooks/useDifficultyMapping";
import { useQuizDataFetching } from "@hooks/useQuizDataFetching";
import { useAnswerManagement } from "@hooks/useAnswerManagement";

export default function Test02Screen() {
  const [currentContext, setCurrentContext] = useState("");
  const [currentAnswerContext, setCurrentAnswerContext] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { level, quiz } = useParams();
  const totalQuestions = 5;

  // 난이도 매핑 로직 (useDifficultyMapping)
  const difficultyMapping = {
    location: "지역",
    culture: "우리문화",
    food: "음식",
    etc: "기타",
  };
  const difficultyText = useDifficultyMapping({ level, mapping: difficultyMapping });
  //

  // 문제 이동과 관련된 상태 및 함수 관리(useQuestionNavigation)
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    handleLeftArrowClick,
    handleRightArrowClick,
  } = useQuestionNavigation({ totalQuestions });
  //

  // 퀴즈 데이터 패칭 및 오디오 재생 로직 (useQuizDataFetching)
  useQuizDataFetching({
    currentQuestionIndex,
    quizDataArray: data,
    setContext: setCurrentContext,
    setAdditionalData: (currentData) => {
      setCurrentAnswerContext(currentData.answer);
    },
    isPlay,
  });

  const handlePlayClick = () => {
    setIsPlay(!isPlay);
  };
  //

  // 선택된 답변을 관리하는 로직 (useAnswerManagement)
  const { selectedAnswers, handleSelect } = useAnswerManagement();

  useEffect(() => {
    setSelectedAnswer(selectedAnswers[currentQuestionIndex] || null);
  }, [currentQuestionIndex, selectedAnswers]);

  const handleAnswerSelect = (answer: string) => {
    handleSelect(currentQuestionIndex, answer);
    setSelectedAnswer(answer);
  };
  //

  // 상태 관리 로직: 사용자 상호작용에 따른 UI 상태 변경
  const handleContextButtonClick = () => {
    setIsContextVisible(!isContextVisible);
  };
  const handleAnswerButtonClick = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };
  const handleTestFinished = (): void => {
    setIsFinished(true);
  };
  //

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">짧은 이야기 듣기</p>
          <div className="main-select-wrapper visible">
            <div className="text-container">
              {!isFinished ? (
                <>
                  <p className="font-bold">다음 문장과 질문을 듣고 답해 보세요.</p>
                  <p className="font-light diffculty">
                    {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
                  </p>
                  {level !== "basic" ? <ToggleSwitch /> : null}
                </>
              ) : (
                <p className="font-bold">오늘의 짧은 이야기 듣기 연습을 마쳤습니다.</p>
              )}
            </div>
            <div className="test-contents">
              {!isFinished ? (
                <>
                  <div className="test-contents__buttons row">
                    <InteractiveTestButton
                      text="이야기 듣기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                      onClick={handlePlayClick}
                    />
                    <InteractiveTestButton
                      text="이야기 보기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
                      onClick={handleContextButtonClick}
                    />
                    <InteractiveTestButton
                      text="정답 보기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
                      onClick={handleAnswerButtonClick}
                    />
                  </div>
                  <div className="test-contents__context">
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
                            cursor:
                              currentQuestionIndex === totalQuestions
                                ? "default"
                                : "pointer",
                          }}
                        />
                      </button>
                    </div>
                    <p
                      className="context"
                      style={isContextVisible ? { opacity: 1 } : { opacity: 0 }}
                    >
                      {currentContext}
                    </p>
                  </div>
                  <div className="test-contents__answer-context">
                    <p
                      className="context answer"
                      style={isAnswerVisible ? { opacity: 1 } : { opacity: 0 }}
                    >
                      정답: {currentAnswerContext}
                    </p>
                  </div>
                  <div className="test-contents__answer">
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
                </>
              ) : (
                <SelectTypeButton
                  children="한번 더 연습하기"
                  to={"/training/part2"}
                  className=""
                />
              )}
            </div>
            {!isFinished && (
              <Pagination
                className="hidden"
                currentPage={currentQuestionIndex}
                totalPages={totalQuestions}
                onPageChange={setCurrentQuestionIndex}
                handleFinished={handleTestFinished}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
