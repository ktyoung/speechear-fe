import { useState } from "react";
import { Link } from "react-router-dom";

export default function Test03Screen() {
  const [isPlay, setIsPlay] = useState(false);
  const [isViewStory, setIsViewStory] = useState(false);
  const [isViewQuestion, setIsViewQuestion] = useState(false);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };
  const toggleViewStory = () => {
    setIsViewStory(!isViewStory);
    setIsViewQuestion(false);
  };
  const toggleViewQuestion = () => {
    setIsViewQuestion(!isViewQuestion);
    setIsViewStory(false);
  };

  return (
    <div className="test-screen-wrapper">
      <div className="answer-buttons">
        <button className="answer-buttons__opacity_1" onClick={togglePlay}>
          {isPlay ? (
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_pause.png`}
              alt="Stop sound button"
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_play.png`}
              alt="Play sound button"
            />
          )}
        </button>
        <button className="answer-buttons__opacity_1" onClick={toggleViewStory}>
          <img
            className="answer-buttons__opacity_1"
            src={`${process.env.PUBLIC_URL}/images/test/button_view_story.png`}
            alt="View story button"
          />
        </button>
        <button
          className="answer-buttons__opacity_1"
          onClick={toggleViewQuestion}
        >
          <img
            className="answer-buttons__opacity_1"
            src={`${process.env.PUBLIC_URL}/images/test/button_view_question.png`}
            alt="View question button"
          />
        </button>
        <Link to="/home" className="answer-buttons__opacity_1">
          <img
            className="answer-buttons__opacity_1"
            src={`${process.env.PUBLIC_URL}/images/test/button_submit.png`}
            alt="Submit button"
          />
        </Link>
      </div>
      <div className="test-contents test-contents__width-full">
        {!isViewStory && !isViewQuestion && (
          <div className="test-contents__bg">
            <img
              src={`${process.env.PUBLIC_URL}/images/test/sound_bg.png`}
              alt="Background icon"
            />
          </div>
        )}
        {isViewStory && (
          <div className="test-contents__view-story">
            <p>
              긴 이야기 듣기 이야기 텍스트입니다. 긴 이야기 듣기 이야기
              텍스트입니다. 긴 이야기 듣기 이야기 텍스트입니다. 긴 이야기 듣기
              이야기 텍스트입니다. 긴 이야기 듣기 이야기 텍스트입니다. 긴 이야기
              듣기 이야기 텍스트입니다. 긴 이야기 듣기 이야기 텍스트입니다. 긴
              이야기 듣기 이야기 텍스트입니다. 긴 이야기 듣기 이야기
              텍스트입니다. 긴 이야기 듣기 이야기 텍스트입니다. 긴 이야기 듣기
              이야기 텍스트입니다. 긴 이야기 듣기 이야기 텍스트입니다.
            </p>
          </div>
        )}
        {isViewQuestion && (
          <div className="test-contents__view-question">
            <QnA />
            <QnA />
            <QnA />
            <QnA />
          </div>
        )}
      </div>
    </div>
  );
}

function QnA() {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleAnswerVisible = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <ul className="test-contents__qna-wrapper">
      <li>
        <p className="test-contents__questions">
          <span className="test-contents__question-mark">?</span>문제
          텍스트입니다.
        </p>
        <ul className="test-contents__answer-wrapper">
          <li className="test-contents__view-answer">
            <button onClick={handleAnswerVisible}>
              <img
                src={`${process.env.PUBLIC_URL}/images/test/check_1.png`}
                alt="View answer button"
              />
            </button>
          </li>
          <li className="test-contents__answer-list">
            {isAnswerVisible && <p>정답 1, 정답 2, 정답 3, 정답 4, 정답 5</p>}
          </li>
          <ul className="scoring">
            <li className="check-correct">
              <button>O</button>
            </li>
            <li className="check-wrong">
              <button>X</button>
            </li>
          </ul>
        </ul>
      </li>
    </ul>
  );
}
