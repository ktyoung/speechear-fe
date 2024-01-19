import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";

import categories from "@datas/testCategories.json";

import Snb from "@components/common/Snb";
import StatusCard from "@components/tests/StatusCard";

const CARDS_PER_PAGE = 7;

export default function Test03Level() {
  const testCategories = categories["03"];

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
      url: API_URL + "/training/part3/page/" + currentPage,
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
          <p className="mb pb">짧은 이야기 듣기</p>
          <div className="main-select-wrapper visible">
            <div className="test-category-lnb narrow">
              {testCategories.map((items, i) => {
                const isActive = location.pathname.includes(items.icon);
                const iconUrl = `${process.env.PUBLIC_URL}/images/icons/icon_${
                  items.icon
                }${isActive ? "_sm" : "_sm_off"}.png`;
                const textStyle = isActive ? { color: "#4894FE" } : {};

                return (
                  <Link key={i} to={`/training/part3/${items.icon}/1`}>
                    <img
                      src={iconUrl}
                      alt={`${isActive ? "" : "Black"} ${items.icon} Icon`}
                    />
                    <p style={textStyle}>{items.children}</p>
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
