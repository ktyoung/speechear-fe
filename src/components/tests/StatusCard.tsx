import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

type StatusCardProps = {
  number: number;
};

export default function StatusCard({ number }: StatusCardProps) {
  const [progress, setProgress] = useState(50);
  const location = useLocation();

  const testScreenPath = `${location.pathname}/${number}`;
  const isPart3 = location.pathname.includes("/training/part3/");

  return (
    <>
      {!isPart3 ? (
        <Link to={testScreenPath} className="status-card">
          <p className="status-card__number">{number}</p>
          <div className="status-card__progress-bar">
            <div
              className="status-card__progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="status-card__percentage">{progress}%</div>
          <div className="status-card__complete">
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/icon_progress_check_white.png`}
              alt="White Check Icon"
            />
          </div>
        </Link>
      ) : (
        <Link to={testScreenPath} className="status-card margin">
          <p className="status-card__title">긴 이야기 {number}</p>
          <div className="status-card__complete">
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/icon_progress_check_white.png`}
              alt="White Check Icon"
            />
          </div>
        </Link>
      )}
    </>
  );
}
