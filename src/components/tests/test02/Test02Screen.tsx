import { useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

export default function Test02Screen() {
  const location = useLocation();
  const [isPlay, setIsPlay] = useState(false);
  const [isOpenText, setIsOpenText] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);
  const [quizIndex, setQuizIndex] = useState(1);

  const match = useMatch("/training/part2/:level/:page/:quiz");
  const maxQuizNumber = location.pathname.includes("/culture/") ? 9 : 7;

  let level: string | null = null;
  let page: string | null = null;
  let quiz: string | null = null;
  let currentPage: number | null = null;
  let currentQuiz: number | null = null;

  if (match) {
    ({ level, page, quiz } = match.params as {
      level: string;
      page: string;
      quiz: string;
    });
    currentPage = parseInt(page);
    currentQuiz = parseInt(quiz);
  }

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };
  const toggleOpenText = () => {
    setIsOpenAnswer(false);
    setIsOpenText(!isOpenText);
  };
  const toggleOpenAnswer = () => {
    setIsOpenText(false);
    setIsOpenAnswer(!isOpenAnswer);
  };
  const showPrevQuiz = () => {
    setQuizIndex((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const showNextQuiz = () => {
    setQuizIndex((prev) => (prev < 10 ? prev + 1 : prev));
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
      </div>
      <div className="test-contents">
        <div className="navigation-buttons">
          <button
            onClick={showPrevQuiz}
            className={quizIndex === 1 ? "disabled" : ""}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_left.png`}
              alt="Go to previous question"
            />
          </button>
          <button
            onClick={showNextQuiz}
            className={quizIndex === 10 ? "disabled" : ""}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_right.png`}
              alt="Go to next question"
            />
          </button>
        </div>
        <div className="test-contents__bar">
          <div className={`play-sentence bg-blue ${isPlay ? "playing" : ""}`}>
            <div className="play-sentence__click" onClick={togglePlay}>
              {isPlay ? (
                <img
                  src={`${process.env.PUBLIC_URL}/images/test/pause.png`}
                  alt="Sentence listening pause icon"
                  style={{ marginRight: "20px" }}
                />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/images/test/play_white.png`}
                  alt="Sentence listening icon"
                  style={{ width: "45px" }}
                />
              )}
              <p>이야기 듣기</p>
            </div>
            <div className="view-test-text" onClick={toggleOpenText}>
              <p>이야기 보기</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/test/arrow.png`}
                alt="Up and down arrow"
                style={
                  isOpenText
                    ? { transform: "rotate(0deg)" }
                    : { transform: "rotate(180deg)" }
                }
              />
            </div>
          </div>
          <div
            className={`view-sentence__accordion ${isOpenText ? "open" : ""}`}
          >
            <p className="describe-text">
              짧은 이야기 듣기 테스트 텍스트입니다.
            </p>
          </div>
          <div className="view-sentence" onClick={toggleOpenAnswer}>
            <img
              src={`${process.env.PUBLIC_URL}/images/test/check.png`}
              alt="Sentence viewing icon"
            />
            <p>정답 보기</p>
          </div>
          <div
            className={`view-sentence__accordion ${isOpenAnswer ? "open" : ""}`}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/test/answer.png`}
              alt="Sentence listening icon"
            />
            <p>짧은 이야기 듣기 정답 텍스트입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
