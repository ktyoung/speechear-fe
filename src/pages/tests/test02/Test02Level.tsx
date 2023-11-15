import { useParams } from "react-router-dom";
import useAxios, { API_URL, IRequestType } from "@hooks/useAxios";
import TestList from "@components/tests/TestList";
import { useEffect, useState } from "react";

export default function Test02Level() {
  const { level, page } = useParams<{ level: string; page?: string }>();
  const [request, setRequest] = useState<IRequestType>();
  const result = useAxios(request);

  useEffect(() => {
    console.log("page ", page);
    const currentPage = parseInt(page || "1", 10);
    const requestConfig: IRequestType = {
      url: `${API_URL}/training/part2/chapter/${level}/page/${currentPage}`,
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
            <span className="function-number menu-number-color">02</span> 짧은
            이야기 듣기
          </p>
        </div>
        <TestList
          partNum={2}
          data={result.data}
          _to={`/training/part2/${level}/${page}`}
        />
      </div>
    </div>
  );
}
