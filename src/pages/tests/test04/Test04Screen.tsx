import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import tabsData from "@datas/swipeableHeaderTabsData.json";

import Snb from "@components/common/Snb";
import SelectTypeButton from "@components/common/SelectTypeButton";
import Pagination from "@components/tests/Pagination";
import CoachMark from "@components/tests/CoachMark";
import Test04InteractiveButton from "@components/tests/test04/Test04InteractiveButton";
import DraggableQuestion from "@components/tests/test04/DraggableQuestion";
import MobileDraggableController from "@components/common/MobileDraggableController";
import SwipeableHeaderTabs from "@components/common/SwipeableHeaderTabs";

import { useDifficultyMapping } from "@hooks/useDifficultyMapping";

export default function Test04Screen() {
  const [isPlay, setIsPlay] = useState(false);
  const [activeButtonId, setActiveButtonId] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);
  const [isCoachMarkVisible, setIsCoachMarkVisible] = useState(true);
  const { level, quiz } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const totalQuestions = 5;

  // 문제 더미 데이터
  const questionData = [
    { question: "농구는 손을 주로 사용하는 스포츠입니다." },
    { question: "농구는 3m 높이의 골대에 공을 넣으면 점수를 얻습니다." },
    { question: "농구의 한 팀은 5명으로 양팀 10명이 시합을 합니다." },
    { question: "테니스는 라켓 스포츠의 한 종류입니다." },
    { question: "테니스는 혼자 혹은 둘이서 한 팀을 이룹니다." },
  ];
  //

  // 난이도 매핑 로직 (useDifficultyMapping)
  const difficultyMapping = {
    word3: "3문장 세트",
    word4: "4문장 세트",
    word5: "5문장 세트",
  };
  const difficultyText = useDifficultyMapping({ level, mapping: difficultyMapping });
  //

  // URL에 따른 문제 개수 조절
  const location = useLocation();
  const currentPath = location.pathname;

  let numQuestions = 5;
  if (currentPath.includes("word3")) {
    numQuestions = 3;
  } else if (currentPath.includes("word4")) {
    numQuestions = 4;
  }

  const [visibleQuestions, setVisibleQuestions] = useState(
    questionData.slice(0, numQuestions)
  );
  //

  // 드래그된 요소의 위치를 변경하는 로직
  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    const dragItem = visibleQuestions[dragIndex];
    const newVisibleQuestions = [...visibleQuestions];
    newVisibleQuestions.splice(dragIndex, 1);
    newVisibleQuestions.splice(hoverIndex, 0, dragItem);

    setVisibleQuestions(newVisibleQuestions); // 상태 업데이트
  };
  //

  // 상태 관리 로직: 사용자 상호작용에 따른 UI 상태 변경
  const handlePlayClick = (buttonId: number) => {
    const isActivating = activeButtonId !== buttonId || !isPlay;
    setActiveButtonId(isActivating ? buttonId : -1);
    setIsPlay(isActivating);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentQuestionIndex(pageNumber);
  };
  const handleTestFinished = (): void => {
    setIsFinished(true);
  };
  const handleCoachMarkVisible = () => {
    setIsCoachMarkVisible(false);
  };
  //

  // 모바일 감지 로직
  const [isTouchDevice, setIsTouchDevice] = useState(
    window.innerWidth <= 1024 || "ontouchstart" in window
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTouchDevice(window.innerWidth <= 1024 || "ontouchstart" in window);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backend = isTouchDevice ? TouchBackend : HTML5Backend;
  //

  return (
    <DndProvider backend={backend}>
      <div className="main-wrapper bg-gray">
        <div className="main-contents home test h-auto">
          <div className="snb">
            <Snb />
          </div>
          <div className="main-contents__column  relative">
            <p className="mb pb">문장 순서화 하기</p>
            {isCoachMarkVisible && (
              <CoachMark handleVisible={handleCoachMarkVisible} isRightFinger={false} />
            )}
            <div className="main-select-wrapper visible">
              <SwipeableHeaderTabs tabsDetail={tabsData.mainNavigationTabs} />
              <SwipeableHeaderTabs tabsDetail={tabsData.sentenceOrderingTabs} />
              <div className="text-container">
                {!isFinished ? (
                  <>
                    <p className="font-bold">다음 문장을 다 듣고 순서를 맞춰보세요.</p>
                    <p className="font-light diffculty">
                      {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
                    </p>
                  </>
                ) : (
                  <p className="font-bold">
                    오늘의 문장 순서화 하기 듣기 연습을 마쳤습니다.
                  </p>
                )}
              </div>
              <div className="test-contents flex-start">
                {!isFinished ? (
                  <>
                    <p className="guide-text">순서 맞추기</p>
                    {visibleQuestions.map((item, i) => {
                      return (
                        <div key={i} className="test-contents__section">
                          <div className="test-contents__buttons margin-left btn__sm">
                            <Test04InteractiveButton
                              text={`${i + 1}번째 문장 듣기`}
                              defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                              blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                              whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                              onClick={() => handlePlayClick(i)}
                              isActive={activeButtonId === i}
                            />
                          </div>
                          <DraggableQuestion
                            index={i}
                            item={item}
                            moveQuestion={moveQuestion}
                          />
                          <div className="test-contents__answer sm">
                            <button className="button__answer">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icons/icon_answer_correct.png`}
                                alt="Correct Answer"
                              />
                            </button>
                            <button className="button__answer">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icons/icon_answer_wrong.png`}
                                alt="Wrong Answer"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <SelectTypeButton
                    className="position"
                    children="한번 더 연습하기"
                    to={"/training/part4"}
                  />
                )}
              </div>
              {!isFinished && (
                <Pagination
                  className="hidden"
                  currentPage={currentQuestionIndex}
                  totalPages={totalQuestions}
                  onPageChange={handlePageChange}
                  handleFinished={handleTestFinished}
                />
              )}
              <MobileDraggableController
                guideText="다음 문장을 다 듣고 순서를 맞춰보세요."
                difficultyText={difficultyText}
                quiz={quiz as string}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                questionData={visibleQuestions}
                moveQuestion={moveQuestion}
              />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
