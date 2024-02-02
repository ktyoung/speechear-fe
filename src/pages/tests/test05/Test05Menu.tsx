import { useRef, useState } from "react";

import tabsData from "@datas/swipeableHeaderTabsData.json";

import Snb from "@components/common/Snb";
import SwipeableHeaderTabs from "@components/common/SwipeableHeaderTabs";
import QuizLinks from "@components/tests/test05/QuizLinks";

import SwiperCore from "swiper";

export default function Test05Menu() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 2;
  const swiperRef = useRef<SwiperCore | null>(null);

  // 이전 또는 다음 페이지로 이동하기 위한 로직
  const goToPage = (page: number) => {
    setCurrentPage(page);
    if (swiperRef.current) {
      swiperRef.current.slideTo(page - 1);
    }
  };
  //

  return (
    <div className="main-wrapper bg-gray">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">가로세로 퀴즈</p>
          <SwipeableHeaderTabs tabsDetail={tabsData.mainNavigationTabs} />
          <div className="main-select-wrapper visible relative">
            <div className="pagination-arrows">
              <button onClick={() => goToPage(currentPage - 1)}>
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
              <button onClick={() => goToPage(currentPage + 1)}>
                <img
                  src={
                    currentPage === totalPage
                      ? `${process.env.PUBLIC_URL}/images/icons/icon_arrow_right_disabled.png`
                      : `${process.env.PUBLIC_URL}/images/icons/icon_arrow_right.png`
                  }
                  alt="Right Arrow Icon"
                  style={{
                    opacity: currentPage === totalPage ? 0.5 : 1,
                    cursor: currentPage === totalPage ? "default" : "pointer",
                  }}
                />
              </button>
            </div>
            <QuizLinks page={currentPage} setPage={goToPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
