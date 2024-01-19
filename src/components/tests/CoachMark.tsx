type CoachMarkProps = {
  handleVisible: () => void;
  isRightFinger: boolean;
};

export default function CoachMark({ handleVisible, isRightFinger }: CoachMarkProps) {
  return (
    <div className="coach-mark-container">
      <button onClick={handleVisible} className="coach-mark-btn__close">
        팝업창 끄기 &times;
      </button>
      <div
        className={
          isRightFinger ? "guide-with-finger finger__right" : "guide-with-finger"
        }
      >
        <p>
          {isRightFinger
            ? "힌트 버튼을 밀어 힌트를 확인해보세요."
            : "문장박스를 움직여 순서를 맞춰보세요."}
        </p>
        <figure>
          <img
            src={
              isRightFinger
                ? `${process.env.PUBLIC_URL}/images/test/finger_left_right.png`
                : `${process.env.PUBLIC_URL}/images/test/finger_up_down.png`
            }
            alt="Coach Mark Finger Icon"
          />
        </figure>
      </div>
    </div>
  );
}
