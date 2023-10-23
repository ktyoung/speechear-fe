import TestList from "../../../components/TestList";

export default function SentenceSetFour() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">04</span> 문장
            순서화 하기
          </p>
        </div>
        <TestList _totalPage={3} _totalQuestionCount={25} />
      </div>
    </div>
  );
}
