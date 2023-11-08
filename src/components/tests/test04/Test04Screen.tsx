import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Test04Screen() {
  const [isPlay, setIsPlay] = useState([false]);
  const [sequencing, setSequencing] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);

  const { level } = useParams();
  const count = parseInt(level?.charAt(level.length - 1) ?? "0", 10);

  const togglePlay = (index: number) => {
    const updatedIsPlay = isPlay.map(() => false);

    if (!isPlay[index]) {
      updatedIsPlay[index] = true;
    }
    setIsPlay(updatedIsPlay);
  };

  const toggleSequencing = () => {
    setSequencing(!sequencing);
  };
  const toggleOpenAnswer = () => {
    setIsOpenAnswer(!isOpenAnswer);
  };

  const listItems = Array.from({ length: count }, (_, index) => (
    <li key={index} className="test-screen__select-item">
      <p>{index + 1}번째 문장 듣기</p>
      <button
        onClick={() => togglePlay(index)}
        className={isPlay[index] ? "playing" : ""}
      >
        {isPlay[index] ? (
          <img
            src={`${process.env.PUBLIC_URL}/images/test/pause.png`}
            alt="Sentence listening pause button"
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/images/test/play_white.png`}
            alt="Sentence listening button"
          />
        )}
      </button>
    </li>
  ));

  const quizListItems = Array.from({ length: count }, (_, index) => (
    <li key={index} className="test-screen__sequencing-item">
      <input
        type="text"
        maxLength={1}
        className="test-screen__sequencing-input"
      />
      <p>문장 순서화 하기 {index + 1}번 문제</p>
    </li>
  ));

  const answerListItems = Array.from({ length: count }, (_, index) => (
    <li key={index} className="test-screen__sequencing-item">
      <p>
        {index + 1}. 문장 순서화 하기 {index + 1}번 정답
      </p>
    </li>
  ));

  return (
    <div className="test-screen-wrapper__main">
      <div className="answer-buttons">
        <button
          onClick={toggleSequencing}
          style={sequencing ? { display: "none" } : { opacity: 1 }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/test/button_sequencing.png`}
            alt="Sequencing button"
          />
        </button>
        {sequencing && (
          <div className="answer-buttons__sequencing">
            <button style={{ opacity: 1 }} onClick={toggleOpenAnswer}>
              <img
                src={`${process.env.PUBLIC_URL}/images/test/show_answer.png`}
                alt="Show answer button"
              />
            </button>
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
            <button style={{ opacity: 1 }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/test/button_next_quiz.png`}
                alt="Go to next quiz button"
              />
            </button>
          </div>
        )}
      </div>
      <div className="test-screen__content">
        {sequencing ? (
          <div className="test-screen__select">
            {isOpenAnswer ? (
              <ul className="test-screen__select-list">{answerListItems}</ul>
            ) : (
              <ul className="test-screen__select-list">{quizListItems}</ul>
            )}
          </div>
        ) : (
          <div className="test-screen__select">
            <ul className="test-screen__select-list">{listItems}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
