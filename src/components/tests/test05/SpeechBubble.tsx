type SpeechBubbleProps = {
  showAnswer: () => void;
};

export default function SpeechBubble({ showAnswer }: SpeechBubbleProps) {
  return (
    <div className="speech-bubble-container" onClick={showAnswer}>
      <div className="blur"></div>
      <div className="speech-bubble-text">
        <p>정답</p>
      </div>
    </div>
  );
}
