import { useParams } from "react-router-dom";
import Snb from "@components/common/Snb";
import { useState } from "react";

const CARDS_PER_PAGE = 10;

export default function Test01Screen() {
  // const { quiz } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onPageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
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
            <p className="font-light">다음 문장을 듣고 따라해 보세요.</p>
            <div className="test-contents">
              <div className="test-contents__buttons">
                <CustomButton
                  text="문장 듣기"
                  defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                  blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                  whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                />
                <CustomButton
                  text="문장 보기"
                  defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                  blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                  whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
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
                <p className="context">소음 하 문장 듣기 문제입니다.</p>
              </div>
              <div className="test-contents__answer">
                <label className="custom-radio-button">
                  <input type="radio" name="option" value="left" />
                  <span className="checkmark"></span>
                  <span className="label-text">정답</span>
                </label>
                <label className="custom-radio-button">
                  <input type="radio" name="option" value="right" />
                  <span className="checkmark"></span>
                  <span className="label-text">오답</span>
                </label>
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
}
function CustomButton({ text, defaultIcon, blueIcon, whiteIcon }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

  const backgroundColor = isClicked
    ? "#40A0FF"
    : isHovered
    ? "rgba(99, 180, 255, 0.10)"
    : "#fff";
  const textColor = isClicked ? "#fff" : "#4894fe";
  const iconSrc = isClicked ? whiteIcon : isHovered ? blueIcon : defaultIcon;

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
      <img
        src={iconSrc}
        alt={text}
        style={text === "문장 보기" ? { marginRight: "17px" } : {}}
      />
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
