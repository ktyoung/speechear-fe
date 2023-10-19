import Menus from "../../components/Menus";

export default function Test02Menu() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu">
          <p className="select-function menu-title color-test01-title">
            <span className="function-number color-test01-number">02</span>
            짧은 이야기 듣기
          </p>
        </div>
        <div className="functions-wrapper menus">
          <Menus
            _className="menu02-style"
            _to="test01-basic"
            _difficulty="기초"
            _title={"소음이 없는\n조용한 상황\n(Quite 상황)"}
          />
          <Menus
            _className="menu02-style"
            _to="test01-low"
            _difficulty="난이도 하"
            _title={
              "소음이 조금 있는 상황\n(선풍기, 에어컨\n소리 정도의 소음)\n(6 dB SNR)"
            }
          />
          <Menus
            _className="menu02-style"
            _to="test01-medium"
            _difficulty="난이도 중"
            _title={
              "소음이 조금 있는 상황\n(생활환경에서의\n소음 정도)\n(3 dB SNR)"
            }
          />
          <Menus
            _className="menu02-style"
            _to="test01-high"
            _difficulty="난이도 상"
            _title={"소음이 조금 있는 상황\n(찻길 정도의 소음\n(0 dB SNR)"}
          />
        </div>
      </div>
    </div>
  );
}
