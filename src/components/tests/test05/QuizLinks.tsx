import { MutableRefObject, memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";

// 개별 퀴즈 링크를 렌더링하는 컴포넌트
type QuizLinkItemProps = {
  itemIndex: number;
};

const QuizLinkItem = memo(({ itemIndex }: QuizLinkItemProps) => (
  <Link to={`/training/part5/${itemIndex + 1}`}>
    퀴즈 <br /> {itemIndex + 1}
  </Link>
));
//

// 한 페이지에 표시될 모든 퀴즈 링크를 렌더링하는 컴포넌트
type QuizPageProps = {
  pageIndex: number;
  itemsPerPage: number;
  totalItems: number;
};

const QuizPage = ({ pageIndex, itemsPerPage, totalItems }: QuizPageProps) => {
  const startItemIndex = pageIndex * itemsPerPage;
  return (
    <div className="quiz-link-container">
      {Array.from({ length: itemsPerPage }, (_, i) => {
        const itemIndex = startItemIndex + i;
        if (itemIndex < totalItems) {
          return <QuizLinkItem key={itemIndex} itemIndex={itemIndex} />;
        }
        return null; // 페이지에 해당하지 않는 퀴즈는 렌더링하지 않음
      })}
    </div>
  );
};
//

type QuizLinksProps = {
  page: number;
  setPage: (page: number) => void;
};

export default function QuizLinks({ page, setPage }: QuizLinksProps) {
  const itemsPerPage = 50;
  const totalItems = 100;
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const swiperRef = useRef<SwiperCore>(null) as MutableRefObject<SwiperCore>;

  const handleSwiper = (swiper: SwiperCore) => {
    const newPage = swiper.activeIndex + 1;
    setPage(newPage);
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(page - 1);
    }
  }, [page, swiperRef]);

  return (
    <Swiper
      onSlideChange={handleSwiper}
      slidesPerView={1}
      onSwiper={(swiper: SwiperCore) => {
        swiperRef.current = swiper;
      }}
      className="quiz-link-container-swiper"
    >
      {Array.from({ length: pageCount }, (_, pageIndex) => (
        <SwiperSlide key={pageIndex} className="quiz-link-slide">
          <QuizPage
            pageIndex={pageIndex}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
