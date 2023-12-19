import { useState } from "react";

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
      <div className="settings-wrapper">
        <div className="settings-contents">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo/logo.png`}
            alt="White Logo"
            className="settings-logo"
          />
          <div className="listening-setting-wrapper">
            <p>듣기 설정</p>
            <ul className="noise-type">
              <p>소음 종류</p>
              {["기본", "식당", "거리", "와글와글"].map((noiseType) => (
                <li key={noiseType} className="noise-type__button">
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
          </div>
          <div className="license-logo-bottom">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo/license_logo_bw.png`}
              alt="Monochrome Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}
