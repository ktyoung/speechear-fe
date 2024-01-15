import Snb from "@components/common/Snb";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Test05Menu() {
  const [currentPage, setCurrentPage] = useState(1);

  // 이전 또는 다음 페이지로 이동하기 위한 로직
  const handleLeftArrowClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleRightArrowClick = () => {
    if (currentPage < 2) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  //

  console.log(currentPage);

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">가로세로 퀴즈</p>
          <div className="main-select-wrapper visible relative">
            <div className="pagination-arrows">
              <button onClick={handleLeftArrowClick}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_left.png`}
                  alt="Left Arrow Icon"
                  style={{
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? "default" : "pointer",
                  }}
                />
              </button>
              <button onClick={handleRightArrowClick}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icons/icon_arrow_right.png`}
                  alt="Right Arrow Icon"
                  style={{
                    opacity: currentPage === 2 ? 0.5 : 1,
                    cursor: currentPage === 2 ? "default" : "pointer",
                  }}
                />
              </button>
            </div>
            <QuizLinks page={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuizLinksProps {
  page: number;
}
function QuizLinks({ page }: QuizLinksProps) {
  const start = (page - 1) * 50 + 1;
  const end = page * 50;

  return (
    <div className="quiz-link-container">
      {Array.from({ length: end - start + 1 }, (_, i) => i + start).map((quizNumber) => (
        <Link key={quizNumber} to={`/training/part5/${quizNumber}`}>
          퀴즈 <br /> {quizNumber}
        </Link>
      ))}
    </div>
  );
}
