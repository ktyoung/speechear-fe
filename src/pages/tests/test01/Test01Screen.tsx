import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import data from "@datas/test01Data.json";
import tabsData from "@datas/swipeableHeaderTabsData.json";

import Snb from "@components/common/Snb";
import ToggleSwitch from "@components/common/ToggleSwitch";
import AnswerButton from "@components/common/AnswerButton";
import SelectTypeButton from "@components/common/SelectTypeButton";
import Pagination from "@components/tests/Pagination";
import InteractiveTestButton from "@components/tests/InteractiveTestButton";

import { useQuestionNavigation } from "@hooks/useQuestionNavigation";
import { useDifficultyMapping } from "@hooks/useDifficultyMapping";
import { useQuizDataFetching } from "@hooks/useQuizDataFetching";
import { useAnswerManagement } from "@hooks/useAnswerManagement";
import SwipeableHeaderTabs from "@components/common/SwipeableHeaderTabs";
import MobileTestController from "@components/common/MobileTestController";

export default function Test01Screen() {
  const [currentContext, setCurrentContext] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { level, quiz } = useParams<{ level: string; quiz: string }>();
  const totalQuestions = 10;

  // 난이도 매핑 로직 (useDifficultyMapping)
  const difficultyMapping = {
    basic: "기초",
    low: "난이도 하",
    medium: "난이도 중",
    high: "난이도 상",
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
  const handleTestFinished = (): void => {
    setIsFinished(true);
  };
  //

  return (
    <div className="main-wrapper bg-gray">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">소음 하 문장 듣기</p>
          <div className="main-select-wrapper visible">
            <SwipeableHeaderTabs tabsDetail={tabsData.mainNavigationTabs} />
            <div className="text-container">
              {!isFinished ? (
                <>
                  <p className="font-bold">다음 문장을 듣고 따라해 보세요.</p>
                  <p className="font-light diffculty">
                    {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
                  </p>
                  {level !== "basic" ? <ToggleSwitch /> : null}
                </>
              ) : (
                <p className="font-bold">오늘의 소음 하 문장 듣기 연습을 마쳤습니다.</p>
              )}
            </div>
            <div className="test-contents">
              {!isFinished ? (
                <>
                  <div className="test-contents__buttons">
                    <InteractiveTestButton
                      text="문장 듣기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                      onClick={handlePlayClick}
                    />
                    <InteractiveTestButton
                      text="문장 보기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
                      onClick={handleContextButtonClick}
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
                  to={"/training/part1"}
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
            <MobileTestController
              guideText="다음 문장을 듣고 따라해 보세요."
              difficultyText={difficultyText}
              quiz={quiz as string}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              quizData={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
