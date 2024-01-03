import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";
import { useEffect, useState } from "react";
import Snb from "@components/common/Snb";

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
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">소음 하 문장 듣기</p>
          <div className="main-select-wrapper visible">
            <p className="font-light">듣기연습할 문장 세트를 선택하세요</p>
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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}
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
