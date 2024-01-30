import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";

export default function SwipeableHeaderTabs() {
  const location = useLocation();
  const swiperRef = useRef<SwiperCore | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabsDetail = [
    { title: "소음 하 문장듣기", to: "/training/part1" },
    { title: "짧은 이야기 듣기", to: "/training/part2" },
    { title: "긴 이야기 듣기", to: "/training/part3" },
    { title: "문장 순서화 하기", to: "/training/part4" },
    { title: "가로세로 퀴즈", to: "/training/part5" },
  ];

  useEffect(() => {
    const tabIndex = tabsDetail.findIndex((tab) => location.pathname.includes(tab.to));
    if (tabIndex !== -1 && swiperRef.current) {
      swiperRef.current.slideTo(tabIndex, 500);
      setActiveIndex(tabIndex);
    }
  }, [location, tabsDetail]);

  return (
    <Swiper
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={10}
      onSwiper={(swiper: SwiperCore) => {
        swiperRef.current = swiper;
      }}
      className="swipe-header-tabs-container"
    >
      {tabsDetail.map((tab, i) => {
        return (
          <SwiperSlide key={i} style={{ width: "200px" }}>
            <Link
              to={tab.to}
              className="header-tabs"
              style={{
                background: i === activeIndex ? "rgba(99, 180, 255, 0.10)" : "",
                color: i === activeIndex ? "#4894FE" : "",
              }}
            >
              {tab.title}
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
