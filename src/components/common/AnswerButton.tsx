interface AnswerButtonProps {
  label: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
  labelClassName: string;
}

export default function AnswerButton({
  label,
  icon,
  isSelected,
  onSelect,
  labelClassName,
}: AnswerButtonProps) {
  const iconUrl = isSelected
    ? `${process.env.PUBLIC_URL}/images/icons/icon_${icon}_white.png`
    : `${process.env.PUBLIC_URL}/images/icons/icon_${icon}.png`;

  const backgroundStyle = isSelected
    ? label === "정답"
      ? {
          background: "#40A0FF",
          border: "2px solid transparent",
          ...(labelClassName === "hidden" && { width: "100%" }),
        }
      : {
          background: "#85888A",
          border: "2px solid transparent",
          ...(labelClassName === "hidden" && { width: "100%" }),
        }
    : { ...(labelClassName === "hidden" && { width: "100%" }) };

  const textStyle = isSelected ? { color: "#ffffff" } : {};

  return (
    <div className="answer-checkbox" style={backgroundStyle} onClick={onSelect}>
      <img src={iconUrl} alt={label} />
      <p className={labelClassName} style={textStyle}>
        {label}
      </p>
    </div>
  );
}
