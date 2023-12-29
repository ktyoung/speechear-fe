import Snb from "@components/common/Snb";
import { useEffect, useState } from "react";
import PlaySound, { RES_URL } from "@hooks/PlaySound";
import { testModalState, trainingData } from "@states/index";
import { useRecoilState } from "recoil";
import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";
import { useMatch, useParams } from "react-router-dom";
import Modal from "@components/common/Modal";
import ToggleSwitch from "@components/common/ToggleSwitch";
import AnswerButton from "@components/common/AnswerButton";

const CARDS_PER_PAGE = 10;

export default function Test01Screen() {
  const [isPlay, setIsPlay] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  // const { quiz } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

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
              <p className="font-light">난이도 하 [3] 2/10</p>
              <ToggleSwitch />
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
                  <button>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_left.png`}
                      alt="Left Arrow Icon"
                      className="left-arrow"
                    />
                  </button>
                  <button>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_right.png`}
                      alt="Right Arrow Icon"
                      className="right-arrow"
                    />
                  </button>
                </div>
                <p
                  className="context"
                  style={isContextVisible ? { opacity: 1 } : { opacity: 0 }}
                >
                  소음 하 문장 듣기
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
              currentPage={currentPage}
              totalPages={CARDS_PER_PAGE}
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
