import Snb from "@components/common/Snb";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../../../data/test03Data.json";
import AnswerButton from "@components/common/AnswerButton";

export default function Test03Screen() {
  const [activeButton, setActiveButton] = useState(null);
  const [currentContext, setCurrentContext] = useState("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [isPlayActive, setIsPlayActive] = useState(false);
  const [isContextActive, setIsContextActive] = useState(false);
  const [isQuestionActive, setIsQuestionActive] = useState(false);
  // const { quiz } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 현재 문제 풀이 진행도를 출력하기 위한 코드
  const { level, page, quiz } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const totalQuestions = 5;

  interface DifficultyMapping {
    [key: string]: string;
  }
  const difficultyMapping: DifficultyMapping = {
    cook: "요리",
    orient_culture: "전통문화",
    sport: "스포츠",
    party: "세계의 잔치",
    proverb: "속담",
    location: "지역",
    heritage: "세계유산",
    nation: "나라",
    health: "건강",
    person: "인물",
    etc: "기타",
  };
  const difficultyText = level ? difficultyMapping[level] : "난이도 미정";
  //

  // 문제 더미 데이터
  const questionData = [
    { question: "기억나는 단어를 나열해 보세요." },
    { question: "무엇에 관한 이야기입니까?" },
    { question: "축구에서의 한 팀은 몇 명입니까?" },
    { question: "일반적인 축구의 경기 시간은 얼만큼입니까?" },
    { question: "반칙을 당한 상대방에게 주어지는 기회는 무엇입니까?" },
  ];
  //

  // 이전 또는 다음 문제로 이동하기 위한 로직
  const changeQuestionIndex = (direction: "prev" | "next") => {
    if (direction === "prev" && currentQuestionIndex > 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else if (direction === "next" && currentQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // const handleLeftArrowClick =
  //   currentQuestionIndex > 1 ? () => changeQuestionIndex("prev") : undefined;
  // const handleRightArrowClick =
  //   currentQuestionIndex < totalQuestions ? () => changeQuestionIndex("next") : undefined;
  //

  // 퀴즈 데이터 패칭 로직
  useEffect(() => {
    const currentData = data.find((item) => item.index === currentQuestionIndex);
    if (currentData) {
      setCurrentContext(currentData.speechcontext);
      setCurrentAudioUrl(
        `${process.env.PUBLIC_URL}/sounds/test03/${currentData.speechcode}.mp3`
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

  const handlePlayClick = () => {
    setIsPlayActive(!isPlayActive);
    setIsContextActive(false);
    setIsQuestionActive(false);
    setIsPlay(!isPlay);
    setIsContextVisible(false);
    setIsQuestionVisible(false);
  };

  const handleContextButtonClick = () => {
    setIsPlayActive(false);
    setIsContextActive(!isContextActive);
    setIsQuestionActive(false);
    setIsPlay(false);
    setIsContextVisible(!isContextVisible);
    setIsQuestionVisible(false);
  };

  const handleAnswerButtonClick = () => {
    setIsPlayActive(false);
    setIsContextActive(false);
    setIsQuestionActive(!isQuestionActive);
    setIsPlay(false);
    setIsContextVisible(false);
    setIsQuestionVisible(!isQuestionVisible);
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
          <p className="mb pb">긴 이야기 듣기</p>
          <div className="main-select-wrapper visible">
            <div className="text-container">
              {!isFinished ? (
                <>
                  <p className="font-bold">다음 긴 이야기를 듣고 문제에 답해보세요.</p>
                  <p className="font-light diffculty">
                    {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
                  </p>
                </>
              ) : (
                <p className="font-bold">오늘의 긴 이야기 듣기 연습을 마쳤습니다.</p>
              )}
            </div>
            <div className="test-contents flex-start">
              {!isFinished ? (
                <>
                  <div className="test-contents__buttons row border">
                    <CustomButton
                      text="이야기 듣기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                      onClick={handlePlayClick}
                      isActive={isPlayActive}
                    />
                    <CustomButton
                      text="이야기 보기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
                      onClick={handleContextButtonClick}
                      isActive={isContextActive}
                    />
                    <CustomButton
                      text="문제 보기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
                      onClick={handleAnswerButtonClick}
                      isActive={isQuestionActive}
                    />
                  </div>
                  {isPlay && (
                    <div className="test-contents__waves">
                      <figure>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/test/waves.png`}
                          alt="Waves Image"
                        />
                      </figure>
                    </div>
                  )}
                  {isContextVisible && (
                    <div className="test-contents__context">
                      {/* <div className="context__arrows">
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
                    </div> */}
                      <p
                        className="context font-small"
                        style={isContextVisible ? { opacity: 1 } : { opacity: 0 }}
                      >
                        {currentContext}
                      </p>
                    </div>
                  )}
                  {isQuestionVisible && (
                    <div className="test-contents__question-context">
                      {questionData.map((items, i) => {
                        return (
                          <div key={i} className="question-list">
                            <p>
                              Q{i + 1}. {items.question}
                            </p>
                            <div className="question-answer">
                              <input className="answer-input" type="text" />
                              <div className="test-contents__answer">
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
                                {/* <AnswerButton
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
                                /> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {/* <p
                        className="context answer"
                        style={isQuestionVisible ? { opacity: 1 } : { opacity: 0 }}
                      ></p> */}
                    </div>
                  )}
                  {/* <div className="test-contents__answer">
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
                  to={"/training/part3"}
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
  isActive: boolean;
}
function CustomButton({
  text,
  defaultIcon,
  blueIcon,
  whiteIcon,
  onClick,
  isActive,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
    onClick();
  };

  const backgroundColor = isActive
    ? "#40A0FF"
    : isHovered
    ? "rgba(99, 180, 255, 0.10)"
    : "#fff";
  const textColor = isActive ? "#fff" : "#4894fe";
  const iconSrc = isActive ? whiteIcon : isHovered ? blueIcon : defaultIcon;
  const imageStyle = {
    transform: text !== "이야기 듣기" && isActive ? "rotateX(180deg)" : "rotateX(0deg)",
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
