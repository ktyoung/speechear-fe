import { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

type DragItem = {
  type: string;
  index: number;
};
type QuestionItem = {
  question: string;
};
type DraggableQuestionProps = {
  item: QuestionItem;
  index: number;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
};

const ItemType = "QUESTION";

export default function DraggableQuestion({
  item,
  index,
  moveQuestion,
}: DraggableQuestionProps) {
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
