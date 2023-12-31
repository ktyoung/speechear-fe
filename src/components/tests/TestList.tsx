import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { trainingData } from "@states/index";
import type { EntriesType } from "@libs/Types";
import { useState } from "react";

interface TestListProps {
  partNum: number;
  data: any;
  _to: string;
}

function TestList({ partNum, data, _to }: TestListProps) {
  const [training, setTraining] = useRecoilState(trainingData);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { level } = useParams();
  const _handlePageNumber = (newPageNumber: number) => {
    setCurrentPage(newPageNumber);
    navigate(`/training/part${partNum}/${level}/${newPageNumber}`);
  };

  const _handleTestLoad = (traingNumber: string, traingData: Array<any>) => {
    setTraining(traingData);
    navigate(`${_to}/${traingNumber}`);
  };

  if (data == null) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  } else {
    const { totalPage, currentPage, rows } = data;
    const totalPages = Array.from({ length: totalPage }, (_, i) => i + 1);
    const _rows = Object.entries(rows) as EntriesType<typeof rows>;

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
            {_rows.map(([k, v]) => {
              return (
                <tr key={k}>
                  <td>{k}</td>
                  <td>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <span key={index} className="stamp"></span>
                    ))}
                  </td>
                  <td>
                    <button className="test-start-btn">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/test/learning_button.png`}
                        alt="Test Start Button"
                        onClick={() => _handleTestLoad(k, v.results)}
                      />
                      학습하기
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

TestList.__isStatic = true;

export default TestList;
