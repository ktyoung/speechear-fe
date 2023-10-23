import TestList from "../../../components/TestList";

export default function Proverbs() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu no-margin-bottom">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">03</span> 긴
            이야기 듣기
          </p>
        </div>
        <TestList _totalPage={1} _totalQuestionCount={5} />
      </div>
    </div>
  );
}
