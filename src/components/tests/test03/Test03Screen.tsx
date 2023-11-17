import PlaySound, { RES_URL } from "@hooks/PlaySound";
import useAxios, { IRequestType, API_URL } from "@hooks/useAxios";
import { trainingData } from "@states/index";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function Test03Screen() {
  const { level, page } = useParams<{ level: string; page?: string }>();
  const [isPlay, setIsPlay] = useState(false);
  const [isViewStory, setIsViewStory] = useState(false);
  const [isViewQuestion, setIsViewQuestion] = useState(false);
  const [qnaCount, setQnaCount] = useState(1);
  const [qnaScores, setQnaScores] = useState(Array(4).fill(false));
  const [quizIndex, setQuizIndex] = useState(1);
  const [soundFile, setSoundFile] = useState<string>("");
  const [context, setContext] = useState<string>("");
  // const [answer, setAnswer] = useState<string>("");
  const [training, setTraining] = useRecoilState(trainingData);

  console.log("training", training);

  const requestConfig: IRequestType = {
    url: `${API_URL}/training/part3/chapter/${level}/page/${page}`,
    method: "GET",
  };

  const res = useAxios(requestConfig);

  useEffect(() => {
    if (
      Array.isArray(training) &&
      training.length > 0 &&
      quizIndex >= 1 &&
      quizIndex <= training.length
    ) {
      const currentFilename = training[quizIndex - 1].speechcode;
      const newSoundFile = `${RES_URL}/function3/${currentFilename}.mp3`;
      setSoundFile(newSoundFile);
    }
  }, [training, quizIndex]);

  useEffect(() => {
    if (training.length > 0 && quizIndex >= 1 && quizIndex <= training.length) {
      const currentContext = training[quizIndex - 1].speechcontext;
      setContext(currentContext);
    }
  }, [training, quizIndex]);

  // useEffect(() => {
  //   if (training.length > 0 && quizIndex >= 1 && quizIndex <= training.length) {
  //     const currentAnswer = training[quizIndex - 1].answer;
  //     setAnswer(currentAnswer);
  //   }
  // }, [training, quizIndex]);

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
  const handleScore = (index: number) => {
    setQnaScores((scores) => scores.map((scored, i) => (i === index ? true : scored)));
    if (qnaCount < 4) {
      setQnaCount(qnaCount + 1);
    }
  };

  return (
    <div className="test-screen-wrapper">
      {isPlay && (
        <PlaySound mp3={soundFile} volume={100} onEnd={() => setIsPlay(false)} />
      )}
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
        <button className="answer-buttons__opacity_1" onClick={toggleViewQuestion}>
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
            <p>{context}</p>
          </div>
        )}
        {isViewQuestion && (
          <div className="test-contents__view-question">
            {Array.from({ length: qnaCount }, (_, i) => (
              <QnA
                key={i}
                quizNumber={i + 1}
                onScore={() => handleScore(i)}
                isScored={qnaScores[i]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface QnAProps {
  quizNumber: number;
  onScore: () => void;
  isScored: boolean;
}
function QnA({ quizNumber, onScore, isScored }: QnAProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleAnswerVisible = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setSelectedOption(e.target.value);
    onScore();
  };

  const handleLabelClick = (option: string) => {
    if (!isScored) {
      setSelectedOption(option);
      onScore();
    }
  };

  return (
    <ul className="test-contents__qna-wrapper">
      <li>
        <p className="test-contents__questions">
          <span className="test-contents__question-mark">?</span>
          {quizNumber}번 문제 텍스트입니다.
        </p>
        <ul className="test-contents__answer-wrapper">
          <li className={`test-contents__view-answer `}>
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
            <li
              className={`check-correct ${selectedOption === "correct" ? "active" : ""}`}
            >
              <input
                type="radio"
                name={`score-${quizNumber}`}
                value="correct"
                onChange={handleRadioChange}
                disabled={isScored}
                hidden
              />
              <label onClick={() => handleLabelClick("correct")}>O</label>
            </li>
            <li className={`check-wrong ${selectedOption === "wrong" ? "active" : ""}`}>
              <input
                type="radio"
                name={`score-${quizNumber}`}
                value="wrong"
                onChange={handleRadioChange}
                disabled={isScored}
                hidden
              />
              <label onClick={() => handleLabelClick("wrong")}>X</label>
            </li>
          </ul>
        </ul>
      </li>
    </ul>
  );
}
