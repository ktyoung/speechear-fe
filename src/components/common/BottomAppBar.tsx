import { useState } from "react";
import { Link } from "react-router-dom";

export default function BottomAppBar() {
  return (
    <div className="bottom-app-bar-container">
      <ActionButton
        to="/home"
        defaultIcon="icon_card_grey"
        clickedIcon="icon_card"
        children="사용자로그"
      />
      <ActionButton
        to="/home"
        defaultIcon="icon_note_grey"
        clickedIcon="icon_note"
        children="연습하기"
      />
      <ActionButton
        to="/settings"
        defaultIcon="icon_setting_grey"
        clickedIcon="icon_setting"
        children="설정"
      />
    </div>
  );
}

type ActionButtonProps = {
  to: string;
  defaultIcon: string;
  clickedIcon: string;
  children: string;
};
function ActionButton({ to, defaultIcon, clickedIcon, children }: ActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        backgroundColor: isClicked ? "#40A0FF" : isHovered ? "#fff" : "transparent",
        color: isClicked ? "#fff" : "inherit",
      }}
    >
      <img
        src={
          isClicked
            ? `${process.env.PUBLIC_URL}/images/icons/${clickedIcon}.png`
            : `${process.env.PUBLIC_URL}/images/icons/${defaultIcon}.png`
        }
        alt="Icon"
      />
      <p className="bottom-app-bar-text">{children}</p>
    </Link>
  );
}
