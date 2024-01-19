import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import data from "@datas/test03Data.json";

import Snb from "@components/common/Snb";
import SelectTypeButton from "@components/common/SelectTypeButton";
import Pagination from "@components/tests/Pagination";
import Test03InteractiveButton from "@components/tests/test03/Test03InteractiveButton";

export default function Test03Screen() {
  const [currentContext, setCurrentContext] = useState("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(false);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [isPlayActive, setIsPlayActive] = useState(false);
  const [isContextActive, setIsContextActive] = useState(false);
  const [isQuestionActive, setIsQuestionActive] = useState(false);

  // 현재 문제 풀이 진행도를 출력하기 위한 코드
  const { level, page, quiz } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const totalQuestions = 5;

  interface DifficultyMapping {
    [key: string]: string;
  }
  const difficultyMapping: DifficultyMapping = {
    cook: "요리",
    orient_culture: "전통문화",
    sport: "스포츠",
    party: "세계의 잔치",
    proverb: "속담",
    location: "지역",
    heritage: "세계유산",
    nation: "나라",
    health: "건강",
    person: "인물",
    etc: "기타",
  };
  const difficultyText = level ? difficultyMapping[level] : "난이도 미정";
  //

  // 문제 더미 데이터
  const questionData = [
    { question: "기억나는 단어를 나열해 보세요." },
    { question: "무엇에 관한 이야기입니까?" },
    { question: "축구에서의 한 팀은 몇 명입니까?" },
    { question: "일반적인 축구의 경기 시간은 얼만큼입니까?" },
    { question: "반칙을 당한 상대방에게 주어지는 기회는 무엇입니까?" },
  ];
  //

  // 퀴즈 데이터 패칭 로직
  useEffect(() => {
    const currentData = data.find((item) => item.index === currentQuestionIndex);
    if (currentData) {
      setCurrentContext(currentData.speechcontext);
      setCurrentAudioUrl(
        `${process.env.PUBLIC_URL}/sounds/test03/${currentData.speechcode}.mp3`
      );
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    const audio = new Audio(currentAudioUrl);
    if (isPlay) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlay, currentAudioUrl]);
  //

  // 각 문제의 응답 상태 관리
  // const [selectedAnswers, setSelectedAnswers] = useState(
  //   Array(questionData.length).fill(null)
  // );

  // const handleSelect = (index: number, answer: string) => {
  //   const newAnswers = [...selectedAnswers];
  //   newAnswers[index] = answer;
  //   setSelectedAnswers(newAnswers);
  // };
  //

  const handlePlayClick = () => {
    setIsPlayActive(!isPlayActive);
    setIsContextActive(false);
    setIsQuestionActive(false);
    setIsPlay(!isPlay);
    setIsContextVisible(false);
    setIsQuestionVisible(false);
  };

  const handleContextButtonClick = () => {
    setIsPlayActive(false);
    setIsContextActive(!isContextActive);
    setIsQuestionActive(false);
    setIsPlay(false);
    setIsContextVisible(!isContextVisible);
    setIsQuestionVisible(false);
  };

  const handleAnswerButtonClick = () => {
    setIsPlayActive(false);
    setIsContextActive(false);
    setIsQuestionActive(!isQuestionActive);
    setIsPlay(false);
    setIsContextVisible(false);
    setIsQuestionVisible(!isQuestionVisible);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentQuestionIndex(pageNumber);
  };
  const handleTestFinished = (): void => {
    setIsFinished(true);
  };

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">긴 이야기 듣기</p>
          <div className="main-select-wrapper visible">
            <div className="text-container">
              {!isFinished ? (
                <>
                  <p className="font-bold">다음 긴 이야기를 듣고 문제에 답해보세요.</p>
                  <p className="font-light diffculty">
                    {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
                  </p>
                </>
              ) : (
                <p className="font-bold">오늘의 긴 이야기 듣기 연습을 마쳤습니다.</p>
              )}
            </div>
            <div className="test-contents flex-start">
              {!isFinished ? (
                <>
                  <div className="test-contents__buttons row border">
                    <Test03InteractiveButton
                      text="이야기 듣기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                      onClick={handlePlayClick}
                      isActive={isPlayActive}
                    />
                    <Test03InteractiveButton
                      text="이야기 보기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
                      onClick={handleContextButtonClick}
                      isActive={isContextActive}
                    />
                    <Test03InteractiveButton
                      text="문제 보기"
                      defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more.png`}
                      blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_blue.png`}
                      whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_more_white.png`}
                      onClick={handleAnswerButtonClick}
                      isActive={isQuestionActive}
                    />
                  </div>
                  {isPlay && (
                    <div className="test-contents__waves">
                      <figure>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/test/waves.png`}
                          alt="Waves Image"
                        />
                      </figure>
                    </div>
                  )}
                  {isContextVisible && (
                    <div className="test-contents__context">
                      <p
                        className="context font-small"
                        style={isContextVisible ? { opacity: 1 } : { opacity: 0 }}
                      >
                        {currentContext}
                      </p>
                    </div>
                  )}
                  {isQuestionVisible && (
                    <div className="test-contents__question-context">
                      {questionData.map((items, i) => {
                        return (
                          <div key={i} className="question-list">
                            <p>
                              Q{i + 1}. {items.question}
                            </p>
                            <div className="question-answer">
                              <input className="answer-input" type="text" />
                              <div className="test-contents__answer">
                                <button className="button__answer">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icons/icon_answer_correct.png`}
                                    alt="Correct Answer"
                                  />
                                </button>
                                <button className="button__answer">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icons/icon_answer_wrong.png`}
                                    alt="Wrong Answer"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <SelectTypeButton
                  children="한번 더 연습하기"
                  to={"/training/part3"}
                  className="position"
                />
              )}
            </div>
            {!isFinished && (
              <Pagination
                currentPage={currentQuestionIndex}
                totalPages={totalQuestions}
                onPageChange={handlePageChange}
                handleFinished={handleTestFinished}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
