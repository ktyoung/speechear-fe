import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";

import tabsData from "@datas/swipeableHeaderTabsData.json";

import Snb from "@components/common/Snb";
import StatusCard from "@components/tests/StatusCard";
import SwipeableHeaderTabs from "@components/common/SwipeableHeaderTabs";

const TOTAL_CARDS = 100;
const CARDS_PER_PAGE = 10;

export default function Test01Level() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCards, setCurrentCards] = useState<number[]>([]);
  const navigate = useNavigate();
  const [request, setRequest] = useState<IRequestType>();
  const { level, page } = useParams<{ level?: string; page?: string }>();
  const result = useAxios(request);

  useEffect(() => {
    console.log("page ", page);
    const currentPage = parseInt(page || "1", 10);
    const requestConfig: IRequestType = {
      url: API_URL + "/training/part1/page/" + currentPage,
      method: "GET",
    };
    setRequest(requestConfig);
    result.fetchData();
  }, [page]);

  const onPageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    navigate(`/training/part1/${level}/${pageNumber}`);
  };

  useEffect(() => {
    const startNumber: number = (currentPage - 1) * CARDS_PER_PAGE + 1;
    const newCards: number[] = Array.from(
      { length: CARDS_PER_PAGE },
      (_, index) => startNumber + index
    );
    setCurrentCards(newCards);
  }, [currentPage]);

  return (
    <div className="main-wrapper bg-gray">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">소음 하 문장 듣기</p>
          <SwipeableHeaderTabs tabsDetail={tabsData.mainNavigationTabs} />
          <div className="main-select-wrapper visible sm">
            <p className="font-light">듣기연습할 문장 세트를 선택하세요.</p>
            <div className="status-card-wrapper">
              {currentCards.map((number) => (
                <StatusCard key={number} number={number} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={TOTAL_CARDS / CARDS_PER_PAGE}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};
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
