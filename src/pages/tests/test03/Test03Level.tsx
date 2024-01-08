import { useParams } from "react-router-dom";
import TestList from "../../../components/tests/TestList";
import useAxios, { IRequestType, API_URL } from "@hooks/useAxios";
import { useEffect, useState } from "react";

export default function Test03Level() {
  const { level, page } = useParams<{ level: string; page?: string }>();
  const [request, setRequest] = useState<IRequestType>();
  const result = useAxios(request);

  useEffect(() => {
    console.log("page ", page);
    const currentPage = parseInt(page || "1", 10);
    const requestConfig: IRequestType = {
      url: `${API_URL}/training/part3/chapter/${level}/page/${currentPage}`,
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
            <span className="function-number menu-number-color">03</span>긴 이야기 듣기
          </p>
        </div>
        <TestList
          partNum={3}
          data={result.data}
          _to={`/training/part3/${level}/${page}`}
        />
      </div>
    </div>
  );
}
