import { useParams } from "react-router-dom";
import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";

import TestList from "@components/tests/TestList";
import { useEffect, useState } from "react";

export default function Test01Level() {
  const { level, page } = useParams<{ level: string; page?: string }>();
  const [request, setRequest] = useState<IRequestType>();
  const result = useAxios(request);

  // test loading
  // useEffect(() => {
  //   console.log("result?.loading ", result?.loading);
  // }, [result?.loading]);

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

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">01</span> 소음
            하 문장듣기
          </p>
        </div>
        <TestList data={result.data} _to={`/training/part1/${level}/${page}`} />
      </div>
    </div>
  );
}
