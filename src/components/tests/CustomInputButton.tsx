import { ChangeEvent, useState } from "react";

interface CustomInputButtonProps {
  type: string;
  id: string;
  imageName: string;
  name: string;
  className: string;
  onClick: () => void;
}

export default function CustomInputButton({
  type,
  id,
  imageName,
  name,
  className,
  onClick,
}: CustomInputButtonProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        hidden
      />
      <label
        className={`custom-button ${className}`}
        htmlFor={id}
        onClick={onClick}
        style={{
          display: "inline-block",
          width: "151px",
          height: "131px",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/test/${imageName}.png)`,
          cursor: "pointer",
        }}
      ></label>
    </>
  );
}
