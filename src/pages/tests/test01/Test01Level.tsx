import { useParams } from "react-router-dom";
import useAxios, {
  API_URL,
  IRequestType,
  IResponseType,
} from "../../../hooks/useAxios";

import TestList from "../../../components/TestList";

export default function Test01Level() {
  const { level, page } = useParams();

  const requestConfig: IRequestType = {
    url: API_URL + "/training/part1/page/" + page,
    method: "GET",
  };

  const res: IResponseType | undefined = useAxios(requestConfig);

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
          _totalPage={10}
          _totalQuestionCount={100}
          _to={`/training/part1/${level}/${page}`}
        />
      </div>
    </div>
  );
}
