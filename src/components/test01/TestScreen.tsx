import { useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

export default function TestScreen() {
  const location = useLocation();
  const [isPlay, setIsPlay] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);

  const match = useMatch("/test01-menu/:testLevel/:quizNumber");

  let testLevel: string | null = null;
  let quizNumber: string | null = null;
  let currentQuizNumber: number | null = null;

  if (match) {
    ({ testLevel, quizNumber } = match.params as {
      testLevel: string;
      quizNumber: string;
    });
    currentQuizNumber = parseInt(quizNumber);
  }

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };
  const toggleOpenAnswer = () => {
    setIsOpenAnswer(!isOpenAnswer);
  };

  return (
    <div className="test-screen-wrapper">
      <div className="answer-buttons">
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/images/test/button_correct.png`}
            alt="Correct answer button"
          />
        </button>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/images/test/button_wrong.png`}
            alt="Wrong answer button"
          />
        </button>
        {!location.pathname.includes("/test01-basic/") && (
          <button>
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_without_noise.png`}
              alt="Listen without noise button"
            />
          </button>
        )}
      </div>
      <div className="test-contents">
        <Link
          to={`/test01-menu/${testLevel}/${
            currentQuizNumber ? currentQuizNumber - 1 : quizNumber
          }`}
          className={currentQuizNumber === 1 ? "disabled" : ""}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/test/button_left.png`}
            alt="Go to previous question"
          />
        </Link>
        <div className="test-contents__bar">
          <div
            className={`play-sentence ${isPlay && "playing"}`}
            onClick={togglePlay}
          >
            {isPlay ? (
              <img
                src={`${process.env.PUBLIC_URL}/images/test/pause.png`}
                alt="Sentence listening pause icon"
                style={{ marginRight: "20px" }}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/images/test/play_small.png`}
                alt="Sentence listening icon"
              />
            )}
            <p>문장 듣기</p>
          </div>
          <div className="view-sentence" onClick={toggleOpenAnswer}>
            <img
              src={`${process.env.PUBLIC_URL}/images/test/check.png`}
              alt="Sentence viewing icon"
            />
            <p>문장 보기</p>
            {isOpenAnswer && (
              <div className="view-sentence__accordion">
                <img
                  src={`${process.env.PUBLIC_URL}/images/test/play_small.png`}
                  alt="Sentence listening icon"
                />
                <p>테스트 텍스트입니다.</p>
              </div>
            )}
          </div>
        </div>
        <Link
          to={`/test01-menu/${testLevel}/${
            currentQuizNumber ? currentQuizNumber + 1 : quizNumber
          }`}
          className={currentQuizNumber === 100 ? "disabled" : ""}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/test/button_right.png`}
            alt="Go to next question"
          />
        </Link>
      </div>
    </div>
  );
}
