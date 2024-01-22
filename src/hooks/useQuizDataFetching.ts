import { useEffect, useState } from "react";

type UseQuizDataFetchingProps = {
  currentQuestionIndex: number;
  quizDataArray: any[];
  setContext?: (context: any) => void;
  setAdditionalData?: (data: any) => void;
  isPlay: boolean;
};

export const useQuizDataFetching = ({
  currentQuestionIndex,
  quizDataArray,
  setContext,
  setAdditionalData,
  isPlay,
}: UseQuizDataFetchingProps) => {
  const [audioUrl, setAudioUrl] = useState<string>("");

  useEffect(() => {
    const currentData = quizDataArray.find((item) => item.index === currentQuestionIndex);
    if (currentData) {
      setContext &&
        setContext(
          currentData.context || currentData.questioncontext || currentData.speechcontext
        );

      // 오디오 URL 설정
      const newAudioUrl = `${process.env.PUBLIC_URL}/sounds/${currentData.audioPath}/${
        currentData.filename || currentData.questioncode || currentData.speechcode
      }.mp3`;
      setAudioUrl(newAudioUrl);

      setAdditionalData && setAdditionalData(currentData);
    }
  }, [currentQuestionIndex, quizDataArray, setContext, setAdditionalData]);

  // 오디오 재생 로직
  useEffect(() => {
    let audio = new Audio(audioUrl);

    if (isPlay) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioUrl, isPlay]);
};
