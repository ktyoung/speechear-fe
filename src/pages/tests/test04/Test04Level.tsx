import { Link, useLocation, useParams } from "react-router-dom";
import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";
import { useEffect, useState } from "react";
import Snb from "@components/common/Snb";

const CARDS_PER_PAGE = 10;

export default function Test04Level() {
  const testCategories = [
    {
      to: "word3",
      set: "3문장 세트",
    },
    {
      to: "word4",
      set: "4문장 세트",
    },
    {
      to: "word5",
      set: "5문장 세트",
    },
  ];
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

interface StatusCardProps {
  number: number;
}
function StatusCard({ number }: StatusCardProps) {
  const [progress, setProgress] = useState(50);
  const location = useLocation();

  const testScreenPath = `${location.pathname}/${number}`;

  return (
    <Link to={testScreenPath} className="status-card">
      <p className="status-card__number">{number}</p>
      <div className="status-card__progress-bar">
        <div
          className="status-card__progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="status-card__percentage">{progress}%</div>
      <div className="status-card__complete">
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon_progress_check_white.png`}
          alt="White Check Icon"
        />
      </div>
    </Link>
  );
}
