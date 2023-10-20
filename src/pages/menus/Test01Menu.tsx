import Menus from "../../components/Menus";

export default function Test01Menu() {
  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">01</span> 소음
            하 문장듣기
          </p>
        </div>
        <div className="functions-wrapper menus">
          <Menus
            _className=""
            _to="test01-basic"
            _difficulty="기초"
            _title={"소음이 없는\n조용한 상황\n(Quite 상황)"}
          />
          <Menus
            _className=""
            _to="test01-low"
            _difficulty="난이도 하"
            _title={
              "소음이 조금 있는 상황\n(선풍기, 에어컨\n소리 정도의 소음)\n(6 dB SNR)"
            }
          />
          <Menus
            _className=""
            _to="test01-medium"
            _difficulty="난이도 중"
            _title={
              "소음이 조금 있는 상황\n(생활환경에서의\n소음 정도)\n(3 dB SNR)"
            }
          />
          <Menus
            _className=""
            _to="test01-high"
            _difficulty="난이도 상"
            _title={"소음이 조금 있는 상황\n(찻길 정도의 소음\n(0 dB SNR)"}
          />
        </div>
      </div>
    </div>
  );
}
