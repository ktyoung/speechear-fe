import { useState } from "react";

interface AnswerButtonProps {
  label: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function AnswerButton({
  label,
  icon,
  isSelected,
  onSelect,
}: AnswerButtonProps) {
  const iconUrl = isSelected
    ? `${process.env.PUBLIC_URL}/images/icons/icon_${icon}_white.png`
    : `${process.env.PUBLIC_URL}/images/icons/icon_${icon}.png`;

  const backgroundStyle = isSelected
    ? label === "정답"
      ? { background: "#40A0FF", border: "2px solid transparent" }
      : { background: "#85888A", border: "2px solid transparent" }
    : {};

  const textStyle = isSelected ? { color: "#ffffff" } : {};

  return (
    <div className="answer-checkbox" style={backgroundStyle} onClick={onSelect}>
      <img src={iconUrl} alt={label} />
      <p style={textStyle}>{label}</p>
    </div>
  );
}
