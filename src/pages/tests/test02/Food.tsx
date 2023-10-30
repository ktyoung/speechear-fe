import TestList from "../../../components/TestList";

export default function Food() {
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
          _totalPage={1}
          _totalQuestionCount={7}
          _to="/test02-menu/test02-food/0"
        />
      </div>
    </div>
  );
}