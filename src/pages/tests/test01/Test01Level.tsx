import { useParams } from "react-router-dom";
import useAxios, {
  API_URL,
  IRequestType,
  IResponseType,
} from "@hooks/useAxios";

import TestList from "@components/tests/TestList";
import { useEffect, useState } from "react";

export default function Test01Level() {
  const { level, page } = useParams<{ level: string; page?: string }>();
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(page || "1", 10)
  );

  const requestConfig: IRequestType = {
    url: API_URL + "/training/part1/page/" + currentPage,
    method: "GET",
  };

  const res: IResponseType | undefined = useAxios(requestConfig);

  useEffect(() => {
    setCurrentPage(parseInt(page || "1", 10));
  }, [page]);

  console.log(res);

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">01</span> 소음
            하 문장듣기
          </p>
        </div>
        <TestList
          _totalPage={res?.data.totalPage}
          _totalQuestionCount={Object.keys(res?.data.rows || {}).length * 10}
          _to={`/training/part1/${level}/${page}`}
          partNum={1}
        />
      </div>
    </div>
  );
}
