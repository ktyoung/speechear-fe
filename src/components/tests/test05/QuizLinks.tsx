import { Link } from "react-router-dom";

type QuizLinksProps = {
  page: number;
};

export default function QuizLinks({ page }: QuizLinksProps) {
  const start = (page - 1) * 50 + 1;
  const end = page * 50;

  return (
    <div className="quiz-link-container">
      {Array.from({ length: end - start + 1 }, (_, i) => i + start).map((quizNumber) => (
        <Link key={quizNumber} to={`/training/part5/${quizNumber}`}>
          퀴즈 <br /> {quizNumber}
        </Link>
      ))}
    </div>
  );
}
