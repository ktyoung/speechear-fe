import PlaySound, { RES_URL } from "@hooks/PlaySound";
import useAxios, { IRequestType, API_URL } from "@hooks/useAxios";
import { testModalState, trainingData } from "@states/index";
import { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import CustomInputButton from "../CustomInputButton";
import Modal from "@components/common/Modal";

export default function Test02Screen() {
  const { level, page } = useParams<{ level: string; page?: string }>();
  const [isPlay, setIsPlay] = useState(false);
  const [isOpenText, setIsOpenText] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);
  const [quizIndex, setQuizIndex] = useState(1);
  const [soundFile, setSoundFile] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [training, setTraining] = useRecoilState(trainingData);
  const [testModal, setTestModal] = useRecoilState(testModalState);

  const match = useMatch("/training/part2/:level/:page/:quiz");

  let quiz: string | null = null;
  let currentQuiz: number | null = null;

  if (match) {
    ({ quiz } = match.params as {
      quiz: string;
    });
    currentQuiz = parseInt(quiz);
  }

  console.log("training", training);

  const requestConfig: IRequestType = {
    url: `${API_URL}/training/part2/chapter/${level}/page/${page}`,
    method: "GET",
  };

  const res = useAxios(requestConfig);

  useEffect(() => {
    if (quizIndex === 5) {
      setTestModal(true);
    }
  }, [quizIndex]);

  useEffect(() => {
    if (
      Array.isArray(training) &&
      training.length > 0 &&
      quizIndex >= 1 &&
      quizIndex <= training.length
    ) {
      const currentFilename = training[quizIndex - 1].speechcode;
      const newSoundFile = `${RES_URL}/function2/${currentFilename}.mp3`;
      setSoundFile(newSoundFile);
    }
  }, [training, quizIndex]);

  useEffect(() => {
    if (training.length > 0 && quizIndex >= 1 && quizIndex <= training.length) {
      const currentContext = training[quizIndex - 1].speechcontext;
      setContext(currentContext);
    }
  }, [training, quizIndex]);

  useEffect(() => {
    if (training.length > 0 && quizIndex >= 1 && quizIndex <= training.length) {
      const currentAnswer = training[quizIndex - 1].answer;
      setAnswer(currentAnswer);
    }
  }, [training, quizIndex]);

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
      {testModal && <Modal setModal={setTestModal} modalText="마지막 페이지입니다." />}
      {isPlay && (
        <PlaySound mp3={soundFile} volume={100} onEnd={() => setIsPlay(false)} />
      )}
      <div className="answer-buttons">
        <CustomInputButton
          type="radio"
          id="correctButton"
          name="answer"
          className=""
          imageName="button_correct"
          onClick={() => {}}
        />
        <CustomInputButton
          type="radio"
          id="wrongButton"
          name="answer"
          className=""
          imageName="button_wrong"
          onClick={() => {}}
        />
      </div>
      <div className="test-contents">
        <div className="navigation-buttons">
          <button onClick={showPrevQuiz} className={quizIndex === 1 ? "disabled" : ""}>
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_left.png`}
              alt="Go to previous question"
            />
          </button>
          <button onClick={showNextQuiz} className={quizIndex === 5 ? "disabled" : ""}>
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
          <div className={`view-sentence__accordion ${isOpenText ? "open" : ""}`}>
            <p className="describe-text">{context}</p>
          </div>
          <div className="view-sentence" onClick={toggleOpenAnswer}>
            <img
              src={`${process.env.PUBLIC_URL}/images/test/check.png`}
              alt="Sentence viewing icon"
            />
            <p>정답 보기</p>
          </div>
          <div className={`view-sentence__accordion ${isOpenAnswer ? "open" : ""}`}>
            <img
              src={`${process.env.PUBLIC_URL}/images/test/answer.png`}
              alt="Sentence listening icon"
            />
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
