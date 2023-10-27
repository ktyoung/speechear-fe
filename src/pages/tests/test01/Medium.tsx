import TestList from "../../../components/TestList";

export default function Medium() {
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
          _to="/test01-menu/test01-medium/0"
        />
      </div>
    </div>
  );
}
