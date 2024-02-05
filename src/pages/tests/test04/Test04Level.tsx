import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";

import categories from "@datas/testCategories.json";
import tabsData from "@datas/swipeableHeaderTabsData.json";

import Snb from "@components/common/Snb";
import StatusCard from "@components/tests/StatusCard";
import SwipeableHeaderTabs from "@components/common/SwipeableHeaderTabs";

const CARDS_PER_PAGE = 10;

export default function Test04Level() {
  const testCategories = categories["04"];

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCards, setCurrentCards] = useState<number[]>([]);
  const [request, setRequest] = useState<IRequestType>();
  const { level, page } = useParams<{ level?: string; page?: string }>();
  const result = useAxios(request);

  useEffect(() => {
    console.log("page ", page);
    const currentPage = parseInt(page || "1", 10);
    const requestConfig: IRequestType = {
      url: API_URL + "/training/part2/page/" + currentPage,
      method: "GET",
    };
    setRequest(requestConfig);
    result.fetchData();
  }, [page]);

  useEffect(() => {
    const startNumber: number = (currentPage - 1) * CARDS_PER_PAGE + 1;
    const newCards: number[] = Array.from(
      { length: CARDS_PER_PAGE },
      (_, index) => startNumber + index
    );
    setCurrentCards(newCards);
  }, [currentPage]);

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">문장 순서화 하기</p>
          <div className="main-select-wrapper visible">
            <SwipeableHeaderTabs tabsDetail={tabsData.mainNavigationTabs} />
            <SwipeableHeaderTabs tabsDetail={tabsData.sentenceOrderingTabs} />
            <div className="test-category-lnb">
              {testCategories.map((items, i) => {
                const isActive = location.pathname.includes(items.to);
                const textStyle = isActive
                  ? { color: "#4894FE", fontSize: "22px" }
                  : { fontSize: "22px" };

                return (
                  <Link key={i} to={`/training/part4/${items.to}/1`}>
                    <p style={textStyle}>{items.set}</p>
                  </Link>
                );
              })}
            </div>
            <p className="font-light">듣기연습할 문장 세트를 선택하세요.</p>
            <div className="status-card-wrapper">
              {currentCards.map((number) => (
                <StatusCard key={number} number={number} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
