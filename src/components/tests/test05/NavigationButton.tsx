import { useLocation, Link } from "react-router-dom";

type NavigationButtonProps = {
  quizNumber: number;
};

export default function NavigationButton({ quizNumber }: NavigationButtonProps) {
  const location = useLocation();

  const isActive = location.pathname === `/training/part5/${quizNumber}`;
  const buttonStyle = {
    color: isActive ? "#40A0FF" : "#8696BB",
  };

  return (
    <Link to={`/training/part5/${quizNumber}`} style={buttonStyle}>
      퀴즈 <br /> {quizNumber}
    </Link>
  );
}
