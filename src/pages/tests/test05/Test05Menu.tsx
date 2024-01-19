import { useState } from "react";

import Snb from "@components/common/Snb";
import QuizLinks from "@components/tests/test05/QuizLinks";

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
                  src={
                    currentPage === 1
                      ? `${process.env.PUBLIC_URL}/images/icons/icon_arrow_left_disabled.png`
                      : `${process.env.PUBLIC_URL}/images/icons/icon_arrow_left.png`
                  }
                  alt="Left Arrow Icon"
                  style={{
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? "default" : "pointer",
                  }}
                />
              </button>
              <button onClick={handleRightArrowClick}>
                <img
                  src={
                    currentPage === 2
                      ? `${process.env.PUBLIC_URL}/images/icons/icon_arrow_right_disabled.png`
                      : `${process.env.PUBLIC_URL}/images/icons/icon_arrow_right.png`
                  }
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
