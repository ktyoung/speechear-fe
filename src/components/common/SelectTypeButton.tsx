import { useState } from "react";
import { Link } from "react-router-dom";

type SelectTypeButtonProps = {
  to: string;
  children: string;
  className: string;
};

export default function SelectTypeButton({
  to,
  children,
  className,
}: SelectTypeButtonProps) {
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
