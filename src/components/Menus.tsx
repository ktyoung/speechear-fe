import { useState } from "react";
import { Link } from "react-router-dom";

interface MenusType {
  _to: string;
  _difficulty: string;
  _title: string;
}

export default function Menus({ _to, _difficulty, _title }: MenusType) {
  const [isHovered, setIsHoverd] = useState(false);
  const _handleHover = () => {
    setIsHoverd(!isHovered);
  };

  return (
    <ul
      className={`${isHovered ? "hovered" : ""}`}
      onMouseEnter={_handleHover}
      onMouseLeave={_handleHover}
    >
      <li>
        <Link to={_to}>
          <p className="function-number">{_difficulty}</p>
          <p className="function-title">{_title}</p>
        </Link>
      </li>
      <li>
        <Link to={_to}>
          이동하기
          <img
            src={`${process.env.PUBLIC_URL}/images/menus/arrow.svg`}
            alt="Arrow icon"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/menus/arrow_off.svg`}
            alt="Arrow icon"
          />
        </Link>
      </li>
    </ul>
  );
}
