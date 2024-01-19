import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import data from "@datas/test02Data.json";

import Snb from "@components/common/Snb";
import ToggleSwitch from "@components/common/ToggleSwitch";
import AnswerButton from "@components/common/AnswerButton";
import SelectTypeButton from "@components/common/SelectTypeButton";
import InteractiveTestButton from "@components/tests/InteractiveTestButton";
import Pagination from "@components/tests/Pagination";

export default function Test02Screen() {
  const [currentContext, setCurrentContext] = useState("");
  const [currentAnswerContext, setCurrentAnswerContext] = useState("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  // const { quiz } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // 현재 문제 풀이 진행도를 출력하기 위한 코드
  const { level, page, quiz } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const totalQuestions = 5;

  interface DifficultyMapping {
    [key: string]: string;
  }
  const difficultyMapping: DifficultyMapping = {
    location: "지역",
    culture: "우리문화",
    food: "음식",
    etc: "기타",
  };
  const difficultyText = level ? difficultyMapping[level] : "난이도 미정";
  //

  // 이전 또는 다음 문제로 이동하기 위한 로직
  const changeQuestionIndex = (direction: "prev" | "next") => {
    if (direction === "prev" && currentQuestionIndex > 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else if (direction === "next" && currentQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleLeftArrowClick =
    currentQuestionIndex > 1 ? () => changeQuestionIndex("prev") : undefined;
  const handleRightArrowClick =
    currentQuestionIndex < totalQuestions ? () => changeQuestionIndex("next") : undefined;
  //

  // 퀴즈 데이터 패칭 로직
  useEffect(() => {
    const currentData = data.find((item) => item.index === currentQuestionIndex);
    if (currentData) {
      setCurrentContext(currentData.questioncontext);
      setCurrentAnswerContext(currentData.answer);
      setCurrentAudioUrl(
        `${process.env.PUBLIC_URL}/sounds/test02/${currentData.questioncode}.mp3`
      );
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    const audio = new Audio(currentAudioUrl);
    if (isPlay) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlay, currentAudioUrl]);
  //

  // 각 문제에 대한 응답을 각각 저장하는 로직
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>(
    {}
  );

  useEffect(() => {
    setSelectedAnswer(selectedAnswers[currentQuestionIndex] || null);
  }, [currentQuestionIndex, selectedAnswers]);

  const handleSelect = (answer: string) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleAnswerSelect = (answer: string) => {
    handleSelect(answer);
    setSelectedAnswer(answer);
  };
  //

  const handlePlayClick = () => {
    setIsPlay(!isPlay);
  };
  const handleContextButtonClick = () => {
    setIsContextVisible(!isContextVisible);
  };
  const handleAnswerButtonClick = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentQuestionIndex(pageNumber);
  };
  const handleTestFinished = (): void => {
    setIsFinished(true);
  };

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
                currentPage={currentQuestionIndex}
                totalPages={totalQuestions}
                onPageChange={handlePageChange}
                handleFinished={handleTestFinished}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
