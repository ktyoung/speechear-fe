import { useState, useCallback } from "react";

type UseQuestionNavigationProps = {
  totalQuestions: number;
};

type UseQuestionNavigationReturn = {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  handleLeftArrowClick: () => void;
  handleRightArrowClick: () => void;
};

export const useQuestionNavigation = ({
  totalQuestions,
}: UseQuestionNavigationProps): UseQuestionNavigationReturn => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);

  const changeQuestionIndex = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev" && currentQuestionIndex > 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      } else if (direction === "next" && currentQuestionIndex < totalQuestions) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    },
    [currentQuestionIndex, totalQuestions]
  );

  const handleLeftArrowClick = useCallback(
    () => changeQuestionIndex("prev"),
    [changeQuestionIndex]
  );
  const handleRightArrowClick = useCallback(
    () => changeQuestionIndex("next"),
    [changeQuestionIndex]
  );

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    handleLeftArrowClick,
    handleRightArrowClick,
  };
};
