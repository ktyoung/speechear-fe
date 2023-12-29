import { useState } from "react";

export default function ToggleSwitch() {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);

  return (
    <div className="toggle-switch-container">
      <label className="toggle-switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className={`slider ${isToggled ? "on" : "off"} round`}></span>
      </label>
      <p className={`toggle-text ${isToggled ? "text-on" : ""}`}>소음 없이 듣기</p>
    </div>
  );
}
