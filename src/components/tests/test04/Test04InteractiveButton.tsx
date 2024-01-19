import { useState } from "react";

type Test04InteractiveButtonProps = {
  text: string;
  defaultIcon: string;
  blueIcon: string;
  whiteIcon: string;
  onClick: () => void;
  isActive: boolean;
};

export default function Test04InteractiveButton({
  text,
  defaultIcon,
  blueIcon,
  whiteIcon,
  onClick,
  isActive,
}: Test04InteractiveButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
    onClick();
  };

  const backgroundColor = isActive
    ? "#40A0FF"
    : isHovered
    ? "rgba(99, 180, 255, 0.10)"
    : "#fff";
  const textColor = isActive ? "#fff" : "#4894fe";
  const iconSrc = isActive ? whiteIcon : isHovered ? blueIcon : defaultIcon;

  return (
    <button
      className="btn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleButtonClick}
      style={{ backgroundColor, color: textColor }}
    >
      <p>{text}</p>
      <img src={iconSrc} alt={text} />
    </button>
  );
}
