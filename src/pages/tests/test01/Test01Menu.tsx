import Snb from "@components/common/Snb";
import { Link } from "react-router-dom";

export default function Test01Menu() {
  const difficultyLevels = [
    {
      showDifficulty: false,
      difficulty: "기초",
      noiseLevel: "소음이 없는 조용한 상황",
      snr: "Quiet 상황",
      to: "basic/1",
    },
    {
      showDifficulty: true,
      difficulty: "하",
      noiseLevel: "소음이 조금 있는 상황",
      snr: "선풍기, 에어컨 소리 정도의 소음\n(6 dB SNR)",
      to: "low/1",
    },
    {
      showDifficulty: true,
      difficulty: "중",
      noiseLevel: "주변 소음이 보통의 상황",
      snr: "생활환경에서의 소음\n(3 dB SNR)",
      to: "medium/1",
    },
    {
      showDifficulty: true,
      difficulty: "상",
      noiseLevel: "주변이 시끄러운 상황",
      snr: "찻길 정도의 소음\n(0 dB SNR)",
      to: "high/1",
    },
  ];

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p>듣기 연습 선택</p>
          <div className="main-select-wrapper">
            {difficultyLevels.map((level) => (
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
