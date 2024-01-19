import { Link } from "react-router-dom";

type DifficultyCardProps = {
  showDifficulty: boolean;
  difficulty: string;
  noiseLevel: string;
  snr: string;
  to: string;
};

export default function DifficultyCard({
  showDifficulty,
  difficulty,
  noiseLevel,
  snr,
  to,
}: DifficultyCardProps) {
  return (
    <div className="test-card-wrapper">
      <div className="test-card-left">
        {showDifficulty && <p className="font-light">난이도</p>}
        <p className="font-bold">{difficulty}</p>
      </div>
      <div className="test-card-right">
        <div className="test-card-right__row">
          <img
            src={`${process.env.PUBLIC_URL}/images/icons/icon_bookmark.png`}
            alt="Bookmark Icon"
          />
          <p className="font-bold margin">{noiseLevel}</p>
          <p className="text-gray">{snr}</p>
        </div>
        <Link to={to} className="test-card-button">
          이동하기
        </Link>
      </div>
    </div>
  );
}
