import AnswerButton from "@components/common/AnswerButton";
import { useState } from "react";

interface HintGridProps {
  rows: number;
}

export default function HintGrid({ rows }: HintGridProps) {
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
                    left:
                      sliderValues[i] === 1
                        ? "7%"
                        : sliderValues[i] === 2
                        ? "42%"
                        : "78%",
                  }}
                >
                  힌트 {i + 1}
                </div>
              </div>
              <div className="hint-answer">
                <AnswerButton
                  label="정답"
                  icon="correct"
                  isSelected={selectedAnswers[i] === "정답"}
                  onSelect={() => handleSelect(i, "정답")}
                />
                <AnswerButton
                  label="오답"
                  icon="wrong"
                  isSelected={selectedAnswers[i] === "오답"}
                  onSelect={() => handleSelect(i, "오답")}
                />
              </div>
            </div>
          );
        })}
      <div className="hint__view-listen">
        <button>정답듣기</button>
        <button>정답 모두보기</button>
      </div>
    </div>
  );
}
