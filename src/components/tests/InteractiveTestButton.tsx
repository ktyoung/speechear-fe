import { useState } from "react";

type InteractiveTestButtonProps = {
  text: string;
  defaultIcon: string;
  blueIcon: string;
  whiteIcon: string;
  onClick: () => void;
};

export default function InteractiveTestButton({
  text,
  defaultIcon,
  blueIcon,
  whiteIcon,
  onClick,
}: InteractiveTestButtonProps) {
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
    marginRight: text === "문장 보기" ? "17px" : undefined,
    transform:
      text === "문장 듣기" || text === "이야기 듣기" || !isClicked
        ? "rotateX(0deg)"
        : "rotateX(180deg)",
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
