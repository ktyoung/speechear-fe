import { useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import PlaySound, { RES_URL } from "@hooks/PlaySound";

export default function Test01Screen() {
  const location = useLocation();
  const [isPlay, setIsPlay] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);

  const match = useMatch("/training/part1/:level/:page/:quiz");
  const soundFile = `${RES_URL}/function1/A01013.mp3`;

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
  const toggleOpenAnswer = () => {
    setIsOpenAnswer(!isOpenAnswer);
  };

  return (
    <div className="test-screen-wrapper">
      {isPlay && (
        <PlaySound
          mp3={soundFile}
          volume={100}
          onEnd={() => setIsPlay(false)}
        />
      )}
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
          <Link
            to={`/training/part1/${level}/${
              currentQuiz ? currentQuiz - 1 : quiz
            }`}
            className={currentQuiz === 1 ? "disabled" : ""}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_left.png`}
              alt="Go to previous question"
            />
          </Link>
          <Link
            to={`/training/part1/${level}/${
              currentQuiz ? currentQuiz + 1 : quiz
            }`}
            className={currentQuiz === 100 ? "disabled" : ""}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_right.png`}
              alt="Go to next question"
            />
          </Link>
        </div>
        <div className="test-contents__bar">
          <div className={`play-sentence ${isPlay ? "playing" : ""}`}>
            <div className="play-sentence__click" onClick={togglePlay}>
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
                  style={{ width: "45px" }}
                />
              )}
              <p style={isPlay ? { color: "#fff" } : { color: "#63a4db" }}>
                문장 듣기
              </p>
            </div>
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
            <p>소음 하 문장 듣기 정답 텍스트입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
