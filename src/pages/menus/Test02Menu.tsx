import Menus from "../../components/Menus";

export default function Test02Menu() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">02</span>
            짧은 이야기 듣기
          </p>
        </div>
        <div className="functions-wrapper menus">
          <Menus
            _className="menu02-style"
            _to="test02-area"
            _difficulty="지역"
            _title=""
          />
          <Menus
            _className="menu02-style"
            _to="test02-culture"
            _difficulty="우리문화"
            _title=""
          />
          <Menus
            _className="menu02-style"
            _to="test02-food"
            _difficulty="음식"
            _title=""
          />
          <Menus
            _className="menu02-style"
            _to="test02-other"
            _difficulty="기타"
            _title=""
          />
        </div>
      </div>
    </div>
  );
}
