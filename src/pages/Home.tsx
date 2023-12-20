import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedNoiseType, setSelectedNoiseType] = useState("");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNoiseType(event.target.value);
  };

  return (
    <div className="main-wrapper">
      <div className="main-contents home">
        <div className="main-contents__left">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo/logo.png`}
            alt="White Logo"
            className="settings-logo"
          />
        </div>
        <div className="main-select-wrapper">
          <p>듣기 연습 선택</p>
          <p className="font-light">실행할 듣기 연습 종류를 선택하세요.</p>
          <ul className="select-type">
            {[
              "소음 하 문장듣기",
              "짧은 이야기 듣기",
              "긴 이야기 듣기",
              "문장 순서화 하기",
              "가로세로 퀴즈",
            ].map((noiseType) => (
              <li key={noiseType} className="select-type__button">
                <input
                  type="radio"
                  id={noiseType}
                  name="noiseType"
                  value={noiseType}
                  checked={selectedNoiseType === noiseType}
                  onChange={handleRadioChange}
                  style={{ display: "none" }}
                />
                <label htmlFor={noiseType}>{noiseType}</label>
              </li>
            ))}
          </ul>
          <div className="select-button-wrapper">
            <Link to="/home" className="refesh">
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/icon_refresh.png`}
                alt="Refresh Icon"
              />
            </Link>
            <Link to="/home" className="check">
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/icon_check.png`}
                alt="Check Icon"
              />
            </Link>
          </div>
        </div>
        <div className="main-logo-bottom">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo/license_logo_bw.png`}
            alt="Monochrome Logo"
          />
        </div>
      </div>
    </div>
  );
}
