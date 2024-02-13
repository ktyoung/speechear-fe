import { useState } from "react";

interface HintGridProps {
  rows: number;
  onShowAnswer: () => void;
}

export default function MobileHintGrid({ rows, onShowAnswer }: HintGridProps) {
  // 각 문제의 응답 상태 관리
  const [selectedAnswers, setSelectedAnswers] = useState(Array(rows).fill(null));

  const handleSelect = (index: number, answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer;
    setSelectedAnswers(newAnswers);
  };
  //

  return (
    <div className="hint-grid-container sm">
      {Array(rows)
        .fill(null)
        .map((_, i) => {
          return (
            <div className="hint__answers-container">
              <div className="hint__buttons">
                <button className="play-hint__btn">{i + 1} 힌트 1/3</button>
                <button className="play-answer__btn">정답</button>
              </div>
              <div className="check-answers">
                <p>채점</p>
                <button className="button__answer">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icons/icon_answer_correct_sm.png`}
                    alt="Correct Answer"
                  />
                </button>
                <button className="button__answer">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icons/icon_answer_wrong_sm.png`}
                    alt="Wrong Answer"
                  />
                </button>
              </div>
            </div>
          );
        })}
      <div className="hint__feature">
        <button onClick={onShowAnswer}>전체 정답 보기</button>
      </div>
    </div>
  );
}
