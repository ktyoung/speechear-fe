import TestList from "../../../components/TestList";

export default function SentenceSetFive() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">04</span> 문장
            순서화 하기
          </p>
        </div>
        <TestList
          _totalPage={2}
          _totalQuestionCount={11}
          _to="/test04-menu/test04-set05/0"
        />
      </div>
    </div>
  );
}
