import FunctionList from "../components/FunctionList";

export default function Home() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title">
          <p className="select-function">듣기연습 선택</p>
          <p className="select-function small-text">
            실행할 듣기 연습 종류를 선택하세요.
          </p>
        </div>
        <div className="functions-wrapper">
          <ul>
            <FunctionList
              _to="/training/part1"
              _num="01"
              _title={`소음 하\n문장 듣기`}
            />
            <FunctionList
              _to="/test02-menu"
              _num="02"
              _title={`짧은 이야기\n듣기`}
            />
            <FunctionList
              _to="/test03-menu"
              _num="03"
              _title={`긴 이야기\n듣기`}
            />
            <FunctionList
              _to="/test04-menu"
              _num="04"
              _title={`문장\n순서화 하기`}
            />
            <FunctionList
              _to="/test05-menu"
              _num="05"
              _title={`가로세로\n퀴즈`}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
