import Snb from "@components/common/Snb";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AnswerButton from "@components/common/AnswerButton";

export default function Test04Screen() {
  // const [currentContext, setCurrentContext] = useState("");
  // const [currentAnswerContext, setCurrentAnswerContext] = useState("");
  // const [currentAudioUrl, setCurrentAudioUrl] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  // const [isContextVisible, setIsContextVisible] = useState(false);
  // const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  // const { quiz } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // 문제 더미 데이터
  const questionData = [
    { question: "농구는 손을 주로 사용하는 스포츠입니다." },
    { question: "농구는 3m 높이의 골대에 공을 넣으면 점수를 얻습니다." },
    { question: "농구의 한 팀은 5명으로 양팀 10명이 시합을 합니다." },
    { question: "테니스는 라켓 스포츠의 한 종류입니다." },
    { question: "테니스는 혼자 혹은 둘이서 한 팀을 이룹니다." },
  ];
  //

  // 현재 문제 풀이 진행도를 출력하기 위한 코드
  const { level, page, quiz } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const totalQuestions = 5;

  interface DifficultyMapping {
    [key: string]: string;
  }
  const difficultyMapping: DifficultyMapping = {
    word3: "3문장 세트",
    word4: "4문장 세트",
    word5: "5문장 세트",
  };
  const difficultyText = level ? difficultyMapping[level] : "난이도 미정";
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

  const visibleQuestions = questionData.slice(0, numQuestions);
  //

  // 각 문제의 응답 상태 관리
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questionData.length).fill(null)
  );

  const handleSelect = (index: number, answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer;
    setSelectedAnswers(newAnswers);
  };
  //

  // 이전 또는 다음 문제로 이동하기 위한 로직
  // const changeQuestionIndex = (direction: "prev" | "next") => {
  //   if (direction === "prev" && currentQuestionIndex > 1) {
  //     setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  //   } else if (direction === "next" && currentQuestionIndex < totalQuestions) {
  //     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  //   }
  // };

  // const handleLeftArrowClick =
  //   currentQuestionIndex > 1 ? () => changeQuestionIndex("prev") : undefined;
  // const handleRightArrowClick =
  //   currentQuestionIndex < totalQuestions ? () => changeQuestionIndex("next") : undefined;
  //

  // 퀴즈 데이터 패칭 로직
  // useEffect(() => {
  //   const currentData = data.find((item) => item.index === currentQuestionIndex);
  //   if (currentData) {
  //     setCurrentContext(currentData.questioncontext);
  //     setCurrentAnswerContext(currentData.answer);
  //     setCurrentAudioUrl(
  //       `${process.env.PUBLIC_URL}/sounds/test02/${currentData.questioncode}.mp3`
  //     );
  //   }
  // }, [currentQuestionIndex]);

  // useEffect(() => {
  //   const audio = new Audio(currentAudioUrl);
  //   if (isPlay) {
  //     audio.play();
  //   } else {
  //     audio.pause();
  //   }

  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, [isPlay, currentAudioUrl]);
  //

  const handlePlayClick = () => {
    setIsPlay(!isPlay);
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
          <p className="mb pb">문장 순서화 하기</p>
          <div className="main-select-wrapper visible">
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
                        <div className="test-contents__buttons margin-left">
                          <CustomButton
                            text={`${i + 1}번째 문장 듣기`}
                            defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                            blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                            whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                            onClick={handlePlayClick}
                          />
                        </div>
                        <div className="context-container">
                          <p>{item.question}</p>
                        </div>
                        <div className="test-contents__answer sm">
                          <AnswerButton
                            label="정답"
                            icon="correct"
                            isSelected={selectedAnswers[i] === "정답"}
                            onSelect={() => handleSelect(i, "정답")}
                          />
                          <AnswerButton
                            label="오답"
                            icon="wrong"
                            isSelected={selectedAnswers[i] === "오답"}
                            onSelect={() => handleSelect(i, "오답")}
                          />
                        </div>
                      </div>
                    );
                  })}

                  {/*                   
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
                  </div> */}
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
    // transform: text !== "이야기 듣기" && isClicked ? "rotateX(180deg)" : "rotateX(0deg)",
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

function SelectTypeButton({ to, children, className }: any) {
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
      className={`select-type__button ${className}`}
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
