import Snb from "@components/common/Snb";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ToggleSwitch from "@components/common/ToggleSwitch";
import AnswerButton from "@components/common/AnswerButton";
import data from "../../../data/test02Data.json";

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
  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);
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
                    <CustomButton
                      text="이야기 듣기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                      onClick={handlePlayClick}
                    />
                    <CustomButton
                      text="이야기 보기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
                      onClick={handleContextButtonClick}
                    />
                    <CustomButton
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
                          src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_left.png`}
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
                          src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_right.png`}
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
                      onSelect={() => handleSelect("정답")}
                    />
                    <AnswerButton
                      label="오답"
                      icon="wrong"
                      isSelected={selectedAnswer === "오답"}
                      onSelect={() => handleSelect("오답")}
                    />
                  </div>
                </>
              ) : (
                <SelectTypeButton children="한번 더 연습하기" to={"/training/part2"} />
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

interface ButtonProps {
  text: string;
  defaultIcon: string;
  blueIcon: string;
  whiteIcon: string;
  onClick: () => void;
}
function CustomButton({ text, defaultIcon, blueIcon, whiteIcon, onClick }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
    onClick();
  };

  const backgroundColor = isClicked
    ? "#40A0FF"
    : isHovered
    ? "rgba(99, 180, 255, 0.10)"
    : "#fff";
  const textColor = isClicked ? "#fff" : "#4894fe";
  const iconSrc = isClicked ? whiteIcon : isHovered ? blueIcon : defaultIcon;
  const imageStyle = {
    transform: text !== "이야기 듣기" && isClicked ? "rotateX(180deg)" : "rotateX(0deg)",
    transition: "transform 0.4s",
  };

  return (
    <button
      className="btn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleButtonClick}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <p>{text}</p>
      <img src={iconSrc} alt={text} style={imageStyle} />
    </button>
  );
}

function SelectTypeButton({ to, children }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);
  const buttonStyle = {
    backgroundColor: isClicked
      ? "#40A0FF"
      : isHovered
      ? "rgba(99, 180, 255, 0.1)"
      : "#fff",
    color: isClicked ? "#fff" : "#4894fe",
    border: isHovered ? "3px solid transparent" : "3px solid #4894fe",
  };

  return (
    <Link
      className="select-type__button"
      to={to}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </Link>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  handleFinished: () => void;
}
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  handleFinished,
}: PaginationProps) {
  return (
    <div className="pagination-wrapper">
      <ul>
        {[...Array(totalPages)].map((_, index) => {
          const number = index + 1;
          return (
            <li
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <button onClick={() => onPageChange(number)}>{number}</button>
            </li>
          );
        })}
        <li className="finish-button">
          <button onClick={handleFinished}>연습 마치기</button>
        </li>
      </ul>
    </div>
  );
}
