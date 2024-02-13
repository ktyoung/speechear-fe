import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";

type TabDetail = {
  title: string;
  to: string;
};

type SwipeableHeaderTabsProps = {
  tabsDetail: TabDetail[];
};

export default function SwipeableHeaderTabs({ tabsDetail }: SwipeableHeaderTabsProps) {
  const location = useLocation();
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const findInitialSlideIndex = (pathname: string, tabsDetail: TabDetail[]): number => {
    let index = tabsDetail.findIndex((tab) => pathname === tab.to);

    if (index === -1) {
      index = tabsDetail.findIndex((tab) => pathname.startsWith(tab.to));
    }

    return index;
  };

  useEffect(() => {
    const tabIndex = findInitialSlideIndex(location.pathname, tabsDetail);
    if (swiperRef.current && tabIndex !== activeIndex) {
      swiperRef.current.slideTo(tabIndex);
      setActiveIndex(tabIndex);
    }
  }, [location.pathname]);

  return (
    <Swiper
      initialSlide={findInitialSlideIndex(location.pathname, tabsDetail)}
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={10}
      loop={false}
      onSwiper={(swiper: SwiperCore) => {
        swiperRef.current = swiper;
      }}
      className="swipe-header-tabs-container"
    >
      {tabsDetail.map((tab, index) => (
        <SwiperSlide key={index} style={{ width: "200px" }}>
          <Link
            to={tab.to}
            className="header-tabs"
            style={{
              background: index === activeIndex ? "rgba(99, 180, 255, 0.10)" : "",
              color: index === activeIndex ? "#4894FE" : "",
            }}
          >
            {tab.title}
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
