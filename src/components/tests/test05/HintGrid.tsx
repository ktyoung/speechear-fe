import { useState } from "react";

interface HintGridProps {
  rows: number;
  onShowAnswer: () => void;
}

export default function HintGrid({ rows, onShowAnswer }: HintGridProps) {
  // 각 슬라이더의 상태 관리
  const [sliderValues, setSliderValues] = useState(Array(rows).fill(1));

  const handleSliderChange = (index: number, newValue: number) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = newValue;
    setSliderValues(newSliderValues);
  };
  //

  // 각 문제의 응답 상태 관리
  const [selectedAnswers, setSelectedAnswers] = useState(Array(rows).fill(null));

  const handleSelect = (index: number, answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer;
    setSelectedAnswers(newAnswers);
  };
  //

  // 반응형 슬라이더
  const calculateLeftPosition = (sliderValue: number, screenWidth: number) => {
    if (screenWidth <= 1280) {
      // 반응형 화면 크기에 대한 계산
      return sliderValue === 1 ? "8.5%" : sliderValue === 2 ? "38.5%" : "68.5%";
    } else {
      // 기존 화면 크기에 대한 계산
      return sliderValue === 1 ? "7%" : sliderValue === 2 ? "42%" : "77%";
    }
  };
  //

  return (
    <div className="hint-grid-container">
      {Array(rows)
        .fill(null)
        .map((_, i) => {
          return (
            <div className="hint__slider-answer">
              <div className="hint-slider-container">
                <div className="slider-marks">
                  <span className="slider-mark" style={{ left: "6%" }}></span>
                  <span className="slider-mark" style={{ left: "50%" }}></span>
                  <span className="slider-mark" style={{ left: "94%" }}></span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={sliderValues[i]}
                  className="hint-slider"
                  onChange={(e) => handleSliderChange(i, parseInt(e.target.value, 10))}
                />
                <div
                  className="slider-thumb-label"
                  style={{
                    left: calculateLeftPosition(sliderValues[i], window.innerWidth),
                  }}
                >
                  힌트 {i + 1}
                </div>
              </div>
              <div className="hint-answer">
                <button className="button__answer">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icons/icon_answer_correct.png`}
                    alt="Correct Answer"
                  />
                </button>
                <button className="button__answer">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icons/icon_answer_wrong.png`}
                    alt="Wrong Answer"
                  />
                </button>
              </div>
            </div>
          );
        })}
      <div className="hint__view-listen">
        <button>정답듣기</button>
        <button onClick={onShowAnswer}>정답 모두보기</button>
      </div>
    </div>
  );
}
