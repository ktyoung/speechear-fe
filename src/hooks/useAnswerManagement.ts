import { useState, useCallback } from "react";

export const useAnswerManagement = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>(
    {}
  );

  const handleSelect = useCallback((questionIndex: number, answer: string) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  }, []);

  return {
    selectedAnswers,
    handleSelect,
  };
};
