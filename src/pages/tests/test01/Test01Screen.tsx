import Snb from "@components/common/Snb";
import { useEffect, useState } from "react";
import PlaySound, { RES_URL } from "@hooks/PlaySound";
import { testModalState, trainingData } from "@states/index";
import { useRecoilState } from "recoil";
import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import Modal from "@components/common/Modal";
import ToggleSwitch from "@components/common/ToggleSwitch";
import AnswerButton from "@components/common/AnswerButton";

const totalQuestions = 10;

export default function Test01Screen() {
  const [isPlay, setIsPlay] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  // const { quiz } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // 현재 문제 풀이 진행도를 출력하기 위한 코드
  const { level, page, quiz } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const totalQuestions = 10;

  interface DifficultyMapping {
    [key: string]: string;
  }
  const difficultyMapping: DifficultyMapping = {
    basic: "기초",
    low: "난이도 하",
    medium: "난이도 중",
    high: "난이도 상",
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

  const handlePlayClick = () => {
    setIsPlay(!isPlay);
  };
  const handleContextButtonClick = () => {
    setIsContextVisible(!isContextVisible);
  };
  const onPageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };
  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">소음 하 문장 듣기</p>
          <div className="main-select-wrapper visible">
            <div className="text-container">
              <p className="font-bold">다음 문장을 듣고 따라해 보세요.</p>
              <p className="font-light">
                {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
              </p>
              {level !== "basic" ? <ToggleSwitch /> : null}
            </div>
            <div className="test-contents">
              <div className="test-contents__buttons">
                <CustomButton
                  text="문장 듣기"
                  defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                  blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                  whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                  onClick={handlePlayClick}
                />
                <CustomButton
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
                          currentQuestionIndex === totalQuestions ? "default" : "pointer",
                      }}
                    />
                  </button>
                </div>
                <p
                  className="context"
                  style={isContextVisible ? { opacity: 1 } : { opacity: 0 }}
                >
                  소음 하 문장 듣기 ({difficultyText})
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
            </div>
            <Pagination
              currentPage={currentQuestionIndex}
              totalPages={totalQuestions}
              onPageChange={onPageChange}
            />
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
    marginRight: text === "문장 보기" ? "17px" : undefined,
    transform: text === "문장 보기" && isClicked ? "rotateX(180deg)" : "rotateX(0deg)",
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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}
function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
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
      </ul>
    </div>
  );
}
