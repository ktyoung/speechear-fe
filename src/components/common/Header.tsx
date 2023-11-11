import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  myPageModalState,
  globalConfigModalState,
  gConfigState,
} from "@states/index";

export default function Header() {
  const [myPageModal, setMyPageModal] = useRecoilState(myPageModalState);
  const [globalConfigModal, setGlobalConfigModal] = useRecoilState(
    globalConfigModalState
  );

  return (
    <>
      {myPageModal && <MyPageModal setMyPageModal={setMyPageModal} />}
      {globalConfigModal && (
        <GlobalConfigModal setGlobalConfigModal={setGlobalConfigModal} />
      )}
      <header className="header-wrapper">
        <div className="header">
          <div className="nav">
            <h2 className="app-title">말귀연습</h2>
            <Link to="/home" className="link-home">
              HOME
            </Link>
          </div>
          <div className="nav">
            <figure
              className="config-figure"
              onClick={() => setGlobalConfigModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </figure>
            <Link to="/" className="logout-btn">
              로그아웃
            </Link>
            <figure onClick={() => setMyPageModal(true)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/home/user.png`}
                alt="User Icon"
              />
            </figure>
          </div>
        </div>
      </header>
    </>
  );
}

function MyPageModal({ setMyPageModal }: any) {
  return (
    <div className="modal-wrapper" onClick={() => setMyPageModal(false)}>
      <div className="modal">
        <img
          src={`${process.env.PUBLIC_URL}/images/home/user.png`}
          alt="User Icon"
          className="modal-image"
        />
        <p className="modal-name">test</p>
        <Link to="/myPage" className="btn-style gradient-btn modal-btn">
          마이페이지
        </Link>
        <Link to="/" className="btn-style gray-btn modal-btn">
          로그아웃
        </Link>
      </div>
    </div>
  );
}

function GlobalConfigModal({ setGlobalConfigModal }: any) {
  const [globalConfig, setGlobalconfig] = useRecoilState(gConfigState);

  const [volume, setVolume] = useState(globalConfig.volume);
  const [playSpeed, setPlaySpeed] = useState(globalConfig.playSpeed);
  const [noise, setNoise] = useState(globalConfig.noise);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handlePlaySpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaySpeed(Number(e.target.value));
  };

  const handleNoiseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNoise(e.target.value);
  };

  const handleSave = () => {
    setGlobalconfig({
      volume: volume,
      playSpeed: playSpeed,
      noise: noise,
    });
    setGlobalConfigModal(false);
  };

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <p className="modal-name">전역 설정</p>
        <ul>
          <li>
            <div>볼륨</div>
            <div>
              0
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={globalConfig.volume}
                onChange={handleSliderChange}
              />
              100
            </div>
          </li>
          <li>
            <div>재생속도</div>
            <div>
              <select
                defaultValue={globalConfig.playSpeed}
                onChange={handlePlaySpeedChange}
              >
                <option value="0.8">느리게</option>
                <option value="0.9">조금느리게</option>
                <option value="1">보통</option>
                <option value="1.1">조금빠르게</option>
                <option value="1.2">빠르게</option>
              </select>
            </div>
          </li>
          <li>
            <div>노이즈종류</div>
            <div>
              <select
                defaultValue={globalConfig.noise}
                onChange={handleNoiseChange}
              >
                <option value="noise1">기본</option>
                <option value="noise2">길거리</option>
                <option value="noise3">식당</option>
                <option value="noise4">와글와글</option>
              </select>
            </div>
          </li>
        </ul>
        <button className="config-save-btn" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
}