import { useState, useEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import useAxios, { IRequestType, API_URL } from "@hooks/useAxios";
import { useRecoilState } from "recoil";
import { testModalState, trainingData } from "@states/index";
import PlaySound, { RES_URL } from "@hooks/PlaySound";
import CustomInputButton from "@components/tests/CustomInputButton";
import Modal from "@components/common/Modal";

export default function Test01Screen() {
  const { level } = useParams();
  const [isPlay, setIsPlay] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);
  const [quizIndex, setQuizIndex] = useState(1);
  const [soundFile, setSoundFile] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [training, setTraining] = useRecoilState(trainingData);
  const [testModal, setTestModal] = useRecoilState(testModalState);

  const match = useMatch("/training/part1/:level/:page/:quiz");
  // const soundFile = `${RES_URL}/function1/A01013.mp3`;

  let page: string | null = null;
  let quiz: string | null = null;
  let currentPage: number | null = null;
  let currentQuiz: number | null = null;

  if (match) {
    ({ page, quiz } = match.params as {
      level: string;
      page: string;
      quiz: string;
    });
    currentPage = parseInt(page);
    currentQuiz = parseInt(quiz);
    console.log("level", level);
  }

  console.log("training", training);

  const requestConfig: IRequestType = {
    url: API_URL + "/training/part1/page/" + currentPage,
    method: "GET",
  };

  const res = useAxios(requestConfig);

  useEffect(() => {
    if (quizIndex === 10) {
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
      const currentFilename = training[quizIndex - 1].filename;
      const newSoundFile = `${RES_URL}/function1/${currentFilename}.mp3`;
      setSoundFile(newSoundFile);
    }
  }, [training, quizIndex]);

  useEffect(() => {
    if (training.length > 0 && quizIndex >= 1 && quizIndex <= training.length) {
      const currentContext = training[quizIndex - 1].context;
      setContext(currentContext);
    }
  }, [training, quizIndex]);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };
  const toggleOpenAnswer = () => {
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
        {level !== "basic" && (
          <CustomInputButton
            type="checkbox"
            id="withoutNoiseButton"
            name="answer"
            className=""
            imageName="button_without_noise"
            onClick={() => {}}
          />
        )}
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
          <button onClick={showNextQuiz} className={quizIndex === 10 ? "disabled" : ""}>
            <img
              src={`${process.env.PUBLIC_URL}/images/test/button_right.png`}
              alt="Go to next question"
            />
          </button>
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
              <p style={isPlay ? { color: "#fff" } : { color: "#63a4db" }}>문장 듣기</p>
            </div>
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
            <p>{context}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
