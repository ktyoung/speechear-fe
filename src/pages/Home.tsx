import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title">
          <p className="select-function">듣기연습 선택</p>
          <p className="select-function small-text">연습할 듣기 종류를 고르세요.</p>
        </div>
        <div className="functions-wrapper">
          <ul>
            <FunctionList _to="/training/part1" _num="01" _title={`소음 하\n문장 듣기`} />
            <FunctionList _to="/training/part2" _num="02" _title={`짧은 이야기\n듣기`} />
            <FunctionList _to="/training/part3" _num="03" _title={`긴 이야기\n듣기`} />
            <FunctionList _to="/training/part4" _num="04" _title={`문장\n순서화 하기`} />
            <FunctionList _to="/training/part5" _num="05" _title={`가로세로\n퀴즈`} />
          </ul>
        </div>
      </div>
    </div>
  );
}

interface FunctionListProps {
  _to: string;
  _num: string;
  _title: string;
}

function FunctionList({ _to, _num, _title }: FunctionListProps) {
  return (
    <li>
      <Link to={_to}>
        <p className="function-number">{_num}</p>
        <p className="function-title">{_title}</p>
      </Link>
    </li>
  );
}
