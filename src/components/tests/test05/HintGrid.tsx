import AnswerButton from "@components/common/AnswerButton";
import { useEffect, useRef, useState } from "react";

interface HintGridProps {
  rows: number;
}

export default function HintGrid({ rows }: HintGridProps) {
  const [value, setValue] = useState(1); // 슬라이더의 현재 값
  const sliderRef = useRef<HTMLInputElement>(null); // 슬라이더의 ref
  const labelRef = useRef<HTMLSpanElement>(null); // 레이블의 ref

  useEffect(() => {
    if (sliderRef.current && labelRef.current) {
      const slider = sliderRef.current;
      const label = labelRef.current;

      const max = parseInt(slider.max);
      const min = parseInt(slider.min);
      const percent = ((value - min) / (max - min)) * 100;
      const thumbWidth = slider.offsetWidth / (max - min);
      label.style.left = `calc(${percent}% - ${thumbWidth / 2}px)`;
    }
  }, [value]);

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
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={value}
                  className="hint-slider"
                  onChange={(e) => setValue(parseInt(e.target.value, 10))}
                />
                <div
                  className="slider-thumb-label"
                  style={{ left: value === 1 ? "6%" : value === 2 ? "43%" : "79.5%" }}
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
