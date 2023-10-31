import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function TestScreen() {
  const { quizNumber } = useParams<{ quizNumber?: string }>();
  const location = useLocation();
  const [isPlay, setIsPlay] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);

  const currentQuizNumber = quizNumber ? parseInt(quizNumber) : 0;
  console.log(currentQuizNumber);

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
        {location.pathname.includes("/test01-basic/") && (
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
          to={`/test01-menu/test01-basic/${currentQuizNumber - 1}`}
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
          to={`/test01-menu/test01-basic/${currentQuizNumber + 1}`}
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
