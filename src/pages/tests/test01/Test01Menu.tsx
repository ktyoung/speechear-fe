import { Link } from "react-router-dom";
import Snb from "@components/common/Snb";
import categories from "@datas/testCategories.json";

export default function Test01Menu() {
  const testCategories = categories["01"];

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p>소음 하 문장 듣기</p>
          <div className="main-select-wrapper">
            {testCategories.map((level) => (
              <DifficultyCard
                key={level.difficulty}
                showDifficulty={level.showDifficulty}
                difficulty={level.difficulty}
                noiseLevel={level.noiseLevel}
                snr={level.snr}
                to={level.to}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DifficultyCard({ showDifficulty, difficulty, noiseLevel, snr, to }: any) {
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
