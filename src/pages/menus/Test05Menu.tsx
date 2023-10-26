import { useState } from "react";
import { Link } from "react-router-dom";

export default function Test05Menu() {
  const [pageNumber, setPageNumber] = useState(1);
  const numberArray = Array.from({ length: 100 }, (_, i) => i + 1);
  const numbersToDisplay = numberArray.slice(
    (pageNumber - 1) * 50,
    pageNumber * 50
  );

  const _handlePageNumber = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">05</span>
            가로세로퀴즈
          </p>
        </div>
        <div className="functions-wrapper menus flex-column">
          <div className="menu-header">
            <p>오늘 풀어볼 퀴즈를 고르세요.</p>
            <ul className="page-btn-wrapper">
              <li className={`page-btn ${pageNumber === 1 ? "active" : ""}`}>
                <button onClick={() => _handlePageNumber(1)}>1</button>
              </li>
              <li className={`page-btn ${pageNumber === 2 ? "active" : ""}`}>
                <button onClick={() => _handlePageNumber(2)}>2</button>
              </li>
            </ul>
          </div>
          <ul className="grid grid-small">
            {numbersToDisplay.map((number) => {
              return (
                <li key={number} className="test-card-small">
                  <Link
                    to={`/test05-menu/test05-quiz/${number}`}
                  >{`퀴즈 ${number}`}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
