import Menus from "../../../components/tests/Menus";

export default function Test04Menu() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">04</span>
            문장 순서화 하기
          </p>
        </div>
        <div className="functions-wrapper menus">
          <Menus
            _className="card-wide"
            _to="word3/1"
            _difficulty="3문장 세트"
            _title={"문장 세개를\n순서에 맞게 선택"}
          />
          <Menus
            _className="card-wide"
            _to="word4/1"
            _difficulty="4문장 세트"
            _title={"문장 네개를\n순서에 맞게 선택"}
          />
          <Menus
            _className="card-wide"
            _to="word5/1"
            _difficulty="5문장 세트"
            _title={"문장 다섯개를\n순서에 맞게 선택"}
          />
        </div>
      </div>
    </div>
  );
}
