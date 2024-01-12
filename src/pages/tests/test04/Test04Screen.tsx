import Snb from "@components/common/Snb";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AnswerButton from "@components/common/AnswerButton";
import { DndProvider, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Test04Screen() {
  // const [currentContext, setCurrentContext] = useState("");
  // const [currentAnswerContext, setCurrentAnswerContext] = useState("");
  // const [currentAudioUrl, setCurrentAudioUrl] = useState("");
  // const { quiz } = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isCoachMarkVisible, setIsCoachMarkVisible] = useState(true);

  // 문제 더미 데이터
  const questionData = [
    { question: "농구는 손을 주로 사용하는 스포츠입니다." },
    { question: "농구는 3m 높이의 골대에 공을 넣으면 점수를 얻습니다." },
    { question: "농구의 한 팀은 5명으로 양팀 10명이 시합을 합니다." },
    { question: "테니스는 라켓 스포츠의 한 종류입니다." },
    { question: "테니스는 혼자 혹은 둘이서 한 팀을 이룹니다." },
  ];
  //

  // 현재 문제 풀이 진행도를 출력하기 위한 코드
  const { level, page, quiz } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const totalQuestions = 5;

  interface DifficultyMapping {
    [key: string]: string;
  }
  const difficultyMapping: DifficultyMapping = {
    word3: "3문장 세트",
    word4: "4문장 세트",
    word5: "5문장 세트",
  };
  const difficultyText = level ? difficultyMapping[level] : "난이도 미정";
  //

  // URL에 따른 문제 개수 조절
  const location = useLocation();
  const currentPath = location.pathname;

  let numQuestions = 5;
  if (currentPath.includes("word3")) {
    numQuestions = 3;
  } else if (currentPath.includes("word4")) {
    numQuestions = 4;
  }

  const [visibleQuestions, setVisibleQuestions] = useState(
    questionData.slice(0, numQuestions)
  );
  //

  // 각 문제의 응답 상태 관리
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questionData.length).fill(null)
  );

  const handleSelect = (index: number, answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer;
    setSelectedAnswers(newAnswers);
  };
  //

  // 드래그된 요소의 위치를 변경하는 로직
  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    const dragItem = visibleQuestions[dragIndex];
    const newVisibleQuestions = [...visibleQuestions];
    newVisibleQuestions.splice(dragIndex, 1);
    newVisibleQuestions.splice(hoverIndex, 0, dragItem);

    setVisibleQuestions(newVisibleQuestions); // 상태 업데이트
  };
  //

  // 퀴즈 데이터 패칭 로직
  // useEffect(() => {
  //   const currentData = data.find((item) => item.index === currentQuestionIndex);
  //   if (currentData) {
  //     setCurrentContext(currentData.questioncontext);
  //     setCurrentAnswerContext(currentData.answer);
  //     setCurrentAudioUrl(
  //       `${process.env.PUBLIC_URL}/sounds/test02/${currentData.questioncode}.mp3`
  //     );
  //   }
  // }, [currentQuestionIndex]);

  // useEffect(() => {
  //   const audio = new Audio(currentAudioUrl);
  //   if (isPlay) {
  //     audio.play();
  //   } else {
  //     audio.pause();
  //   }

  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, [isPlay, currentAudioUrl]);
  //

  const handlePlayClick = () => {
    setIsPlay(!isPlay);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentQuestionIndex(pageNumber);
  };
  const handleTestFinished = (): void => {
    setIsFinished(true);
  };
  const handleCoachMarkVisible = () => {
    setIsCoachMarkVisible(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-wrapper">
        <div className="main-contents home test">
          <div className="snb">
            <Snb />
          </div>
          <div className="main-contents__column">
            <p className="mb pb">문장 순서화 하기</p>
            {isCoachMarkVisible && <CoachMark handleVisible={handleCoachMarkVisible} />}
            <div className="main-select-wrapper visible">
              <div className="text-container">
                {!isFinished ? (
                  <>
                    <p className="font-bold">다음 문장을 다 듣고 순서를 맞춰보세요.</p>
                    <p className="font-light diffculty">
                      {difficultyText} [{quiz}] {currentQuestionIndex}/{totalQuestions}
                    </p>
                  </>
                ) : (
                  <p className="font-bold">
                    오늘의 문장 순서화 하기 듣기 연습을 마쳤습니다.
                  </p>
                )}
              </div>
              <div className="test-contents flex-start">
                {!isFinished ? (
                  <>
                    <p className="guide-text">순서 맞추기</p>
                    {visibleQuestions.map((item, i) => {
                      return (
                        <div key={i} className="test-contents__section">
                          <div className="test-contents__buttons margin-left">
                            <CustomButton
                              text={`${i + 1}번째 문장 듣기`}
                              defaultIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker.png`}
                              blueIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_blue.png`}
                              whiteIcon={`${process.env.PUBLIC_URL}/images/icons/icon_speaker_white.png`}
                              onClick={handlePlayClick}
                            />
                          </div>
                          <DraggableQuestion
                            index={i}
                            item={item}
                            moveQuestion={moveQuestion}
                          />
                          <div className="test-contents__answer sm">
                            <AnswerButton
                              label="정답"
                              icon="correct"
                              isSelected={selectedAnswers[i] === "정답"}
                              onSelect={() => handleSelect(i, "정답")}
                            />
                            <AnswerButton
                              label="오답"
                              icon="wrong"
                              isSelected={selectedAnswers[i] === "오답"}
                              onSelect={() => handleSelect(i, "오답")}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <SelectTypeButton
                    className="position"
                    children="한번 더 연습하기"
                    to={"/training/part4"}
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
    </DndProvider>
  );
}

interface ButtonProps {
  text: string;
  defaultIcon: string;
  blueIcon: string;
  whiteIcon: string;
  onClick: () => void;
}
function CustomButton({ text, defaultIcon, blueIcon, whiteIcon, onClick }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
    onClick();
  };

  const backgroundColor = isClicked
    ? "#40A0FF"
    : isHovered
    ? "rgba(99, 180, 255, 0.10)"
    : "#fff";
  const textColor = isClicked ? "#fff" : "#4894fe";
  const iconSrc = isClicked ? whiteIcon : isHovered ? blueIcon : defaultIcon;
  const imageStyle = {
    // transform: text !== "이야기 듣기" && isClicked ? "rotateX(180deg)" : "rotateX(0deg)",
    transition: "transform 0.4s",
  };

  return (
    <button
      className="btn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleButtonClick}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <p>{text}</p>
      <img src={iconSrc} alt={text} style={imageStyle} />
    </button>
  );
}

function SelectTypeButton({ to, children, className }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);
  const buttonStyle = {
    backgroundColor: isClicked
      ? "#40A0FF"
      : isHovered
      ? "rgba(99, 180, 255, 0.1)"
      : "#fff",
    color: isClicked ? "#fff" : "#4894fe",
    border: isHovered ? "3px solid transparent" : "3px solid #4894fe",
  };

  return (
    <Link
      className={`select-type__button ${className}`}
      to={to}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </Link>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  handleFinished: () => void;
}
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  handleFinished,
}: PaginationProps) {
  return (
    <div className="pagination-wrapper">
      <ul>
        {[...Array(totalPages)].map((_, index) => {
          const number = index + 1;
          return (
            <li
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <button onClick={() => onPageChange(number)}>{number}</button>
            </li>
          );
        })}
        <li className="finish-button">
          <button onClick={handleFinished}>연습 마치기</button>
        </li>
      </ul>
    </div>
  );
}

interface CoachMarkProps {
  handleVisible: () => void;
}
function CoachMark({ handleVisible }: CoachMarkProps) {
  return (
    <div className="coach-mark-container">
      <button onClick={handleVisible} className="coach-mark-btn__close">
        팝업창 끄기 &times;
      </button>
      <div className="guide-with-finger">
        <p>문장박스를 움직여 순서를 맞춰보세요.</p>
        <figure>
          <img
            src={`${process.env.PUBLIC_URL}/images/test/finger_up_down.png`}
            alt="Coach Mark Finger Icon"
          />
        </figure>
      </div>
    </div>
  );
}

// 드래그 앤 드롭 컴포넌트
interface DragItem {
  type: string;
  index: number;
}
interface QuestionItem {
  question: string;
}
interface DraggableQuestionProps {
  item: QuestionItem;
  index: number;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
}

const ItemType = "QUESTION";

function DraggableQuestion({ item, index, moveQuestion }: DraggableQuestionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // 드래그하는 요소가 현재 요소의 위나 아래에 있는지 확인
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // 드래그 방향 결정
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveQuestion(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div className="context-container" ref={ref}>
      <p>{item.question}</p>
    </div>
  );
}
