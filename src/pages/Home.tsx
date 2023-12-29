import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const practiceType = [
    { name: "소음 하 문장듣기", path: "/training/part1" },
    { name: "짧은 이야기 듣기", path: "/training/part2" },
    { name: "긴 이야기 듣기", path: "/training/part3" },
    { name: "문장 순서화 하기", path: "/training/part4" },
    { name: "가로세로 퀴즈", path: "/training/part5" },
  ];

  return (
    <div className="main-wrapper">
      <div className="main-contents home">
        <div className="snb"></div>
        <div className="main-contents__column">
          <p>듣기 연습 선택</p>
          <div className="main-select-wrapper">
            <p className="font-light">실행할 듣기 연습 종류를 선택하세요.</p>
            <ul className="select-type">
              {practiceType.map((type, i) => (
                <SelectTypeButton key={i} to={type.path} children={type.name} />
              ))}
            </ul>
          </div>
        </div>
        <div className="main-logo-bottom">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo/license_logo_bw.png`}
            alt="Monochrome Logo"
          />
        </div>
      </div>
    </div>
  );
}

function SelectTypeButton({ to, children }: any) {
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
      className="select-type__button"
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
