import BottomNavigationBar from "@components/common/BottomNavigationBar";
import Header from "@components/common/Header";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [selectedNoiseType, setSelectedNoiseType] = useState("기본");
  const [speechSpeed, setSpeechSpeed] = useState(3);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNoiseType(event.target.value);
  };
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeechSpeed(Number(event.target.value));
  };

  return (
    <>
      <Header className="settings" />
      <div className="main-wrapper settings">
        <div className="main-contents settings">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo/logo.png`}
            alt="White Logo"
            className="settings-logo"
          />
          <div className="main-select-wrapper settings">
            <p>듣기 설정</p>
            <ul className="select-type">
              <p>소음 종류</p>
              {["기본", "식당", "거리", "와글와글"].map((noiseType) => (
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
            <div className="speech-speed-slider">
              <p>말하기 속도</p>
              <div className="speech-speed-slider__column">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={speechSpeed}
                  onChange={handleSliderChange}
                  className="speech-rate-slider"
                />
                <ul className="speech-rate-labels">
                  <li className="rate-slow">느리게</li>
                  <li className="rate-normal">·</li>
                  <li className="rate-medium">보통</li>
                  <li className="rate-fast">·</li>
                  <li className="rate-fast">빠르게</li>
                </ul>
              </div>
            </div>
            <div className="select-button-wrapper">
              <Link to="/settings" className="refesh">
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
      <BottomNavigationBar className="settings" />
    </>
  );
}
