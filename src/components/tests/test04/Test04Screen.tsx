import { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";

type QuizItem = {
  id: number;
  text: string;
  isCorrect?: boolean;
};

export default function Test04Screen() {
  const [isPlay, setIsPlay] = useState([false]);
  const [sequencing, setSequencing] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);

  const { level } = useParams();
  const count = parseInt(level?.charAt(level.length - 1) ?? "0", 10);

  const [quizItems, setQuizItems] = useState<QuizItem[]>(
    Array.from({ length: count }, (_, index) => ({
      id: index,
      text: `문장 순서화 하기 ${index + 1}번 문제`,
      isCorrect: false,
    }))
  );

  const determineCorrectOrder = () => {
    if (level === "word3") {
      return [1, 0, 2]; // 정답: 2, 1, 3
    } else if (level === "word4") {
      return [2, 0, 1, 3]; // 정답: 3, 1, 2, 4
    } else if (level === "word5") {
      return [0, 4, 2, 3, 1]; // 정답: 1, 5, 3, 4, 2
    } else {
      return []; // 기본값: 빈 배열
    }
  };

  useEffect(() => {
    const correctOrder = determineCorrectOrder();
    setQuizItems(
      Array.from({ length: correctOrder.length }, (_, index) => ({
        id: index,
        text: `문장 순서화 하기 ${index + 1}번 문제`,
        isCorrect: false,
      }))
    );
  }, [level]);

  // 문장을 섞어서 렌더링하기 위한 shuffle 메서드
  const shuffle = (array: QuizItem[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    setQuizItems((currentItems) => {
      const shuffledItems = shuffle([...currentItems]);
      checkOrder(shuffledItems);
      return shuffledItems;
    });
  }, [level]);

  const checkOrder = (itemsToCheck: QuizItem[]) => {
    const correctOrder = determineCorrectOrder();
    const updatedItems = itemsToCheck.map((item, index) => {
      // 올바른 위치에 있는지 확인
      const isCorrectPosition = correctOrder[index] === item.id;
      return {
        ...item,
        isCorrect: isCorrectPosition,
      };
    });
    setQuizItems(updatedItems);
  };

  // 드래그 앤 드롭 로직에서 아이템을 이동시킨 후 checkOrder 호출
  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setQuizItems((prevItems) => {
      const newItems = [...prevItems];
      const dragItem = newItems.splice(dragIndex, 1)[0];
      newItems.splice(hoverIndex, 0, dragItem);

      checkOrder(newItems);
      return newItems;
    });
  }, []);

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

  const answerListItems = Array.from({ length: count }, (_, index) => (
    <li key={index} className="test-screen__sequencing-item">
      <p>
        {index + 1}. 문장 순서화 하기 {index + 1}번 정답
      </p>
    </li>
  ));

  return (
    <DndProvider backend={HTML5Backend}>
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
                <DropList items={quizItems} moveItem={moveItem} />
              )}
            </div>
          ) : (
            <div className="test-screen__select">
              <ul className="test-screen__select-list">{listItems}</ul>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

const DraggableItem = ({ id, text, isCorrect }: QuizItem) => {
  const [, drag, preview] = useDrag({
    type: "QUIZ_ITEM",
    item: { id },
    canDrag: !isCorrect, // 올바른 위치에 있으면 드래그 비활성화
  });

  return (
    <li
      ref={preview}
      className="test-screen__sequencing-item"
      style={{ color: isCorrect ? "green" : "inherit" }} // 올바른 위치에 있으면 텍스트 색상 변경
    >
      <span
        ref={isCorrect ? null : drag}
        style={{ cursor: isCorrect ? "default" : "move", marginRight: "30px" }}
      >
        ☰
      </span>
      {`${id + 1}. ${text}`}
    </li>
  );
};

const DropList = ({ items, moveItem }: { items: any[]; moveItem: Function }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [, drop] = useDrop({
    accept: "QUIZ_ITEM",
    hover(item: { id: number }, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = items.findIndex((i) => i.id === item.id);
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y;
      let hoverIndex = -1;
      const children = Array.from(ref.current.children);

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        const childRect = child.getBoundingClientRect();
        const childMiddleY = (childRect.top + childRect.bottom) / 2;

        if (hoverClientY < childMiddleY) {
          hoverIndex = i;
          break;
        }
      }

      if (hoverIndex === -1) {
        hoverIndex = children.length - 1;
      }

      if (dragIndex !== hoverIndex) {
        moveItem(dragIndex, hoverIndex);
      }
    },
  });

  drop(ref);

  return (
    <ul ref={ref}>
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          text={item.text}
          isCorrect={item.isCorrect}
        />
      ))}
    </ul>
  );
};
