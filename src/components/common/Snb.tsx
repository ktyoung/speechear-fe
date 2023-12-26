import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Snb() {
  const location = useLocation();

  const practiceType = [
    { name: "소음 하 문장듣기", path: "/training/part1" },
    { name: "짧은 이야기 듣기", path: "/training/part2" },
    { name: "긴 이야기 듣기", path: "/training/part3" },
    { name: "문장 순서화 하기", path: "/training/part4" },
    { name: "가로세로 퀴즈", path: "/training/part5" },
  ];

  return (
    <ul className="select-type__snb">
      {practiceType.map((type) => (
        <SelectTypeButton
          key={type.name}
          to={type.path}
          children={type.name}
          isSelected={location.pathname === type.path}
        />
      ))}
    </ul>
  );
}

interface SelectTypeButtonProps {
  to: string;
  children: React.ReactNode;
  isSelected: boolean;
}

function SelectTypeButton({ to, children, isSelected }: SelectTypeButtonProps) {
  const currentPathIncludesTo = location.pathname.includes(to);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);
  const buttonStyle = {
    transition: "all 0.2s ease-out",
    backgroundColor:
      currentPathIncludesTo || isSelected || isClicked
        ? "#40A0FF"
        : isHovered
        ? "rgba(99, 180, 255, 0.1)"
        : "#fff",
    color: currentPathIncludesTo || isSelected || isClicked ? "#fff" : "#4894fe",
    border:
      currentPathIncludesTo || isSelected
        ? "3px solid transparent"
        : isHovered
        ? "3px solid transparent"
        : "3px solid #4894fe",
  };

  return (
    <Link
      className="snb-select-type__button"
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
