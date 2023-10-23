import { useState } from "react";
import { Link } from "react-router-dom";

interface TestListProps {
  _totalPage: number;
  _totalQuestionCount: number;
}

export default function TestList({
  _totalPage,
  _totalQuestionCount,
}: TestListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Array.from({ length: _totalPage }, (_, i) => i + 1);
  const numberArray = Array.from(
    { length: _totalQuestionCount },
    (_, i) => i + 1
  );
  const numbersToDisplay = numberArray.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const _handlePageNumber = (newPageNumber: number) => {
    setCurrentPage(newPageNumber);
  };

  return (
    <div className="functions-wrapper menus flex-column flex-end">
      <div className="menu-header">
        <ul className="page-btn-wrapper">
          {totalPages.map((page) => {
            return (
              <li
                key={page}
                className={`page-btn ${page === currentPage ? "active" : ""}`}
              >
                <button onClick={() => _handlePageNumber(page)}>{page}</button>
              </li>
            );
          })}
        </ul>
      </div>
      <table className="test-list-table">
        <thead>
          <tr>
            <th>구분</th>
            <th>학습률</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {numbersToDisplay.map((number) => (
            <tr key={number}>
              <td>{number}</td>
              <td>
                <progress className="progress" value={0} max={100} />
                <span className="progress-percent">0%</span>
              </td>
              <td>
                <Link className="test-start-btn" to="/test01-menu">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/test/learning_but.png`}
                    alt="Test Start Button"
                  />
                  학습하기
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
