import { Link } from "react-router-dom";

type TestSetCardProps = {
  title: string;
  detail: string;
  to: string;
};

export default function TestSetCard({ title, detail, to }: TestSetCardProps) {
  return (
    <div className="test-card-container">
      <p className="card-title">{title}</p>
      <p className="card-detail">{detail}</p>
      <Link to={`/training/part4/${to}`} className="card-link">
        이동하기
      </Link>
    </div>
  );
}
