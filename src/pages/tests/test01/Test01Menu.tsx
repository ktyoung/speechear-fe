import categories from "@datas/testCategories.json";

import Snb from "@components/common/Snb";
import DifficultyCard from "@components/tests/test01/DifficultyCard";
import SwipeableHeaderTabs from "@components/common/SwipeableHeaderTabs";

export default function Test01Menu() {
  const testCategories = categories["01"];

  return (
    <div className="main-wrapper bg-gray">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p>소음 하 문장 듣기</p>
          <SwipeableHeaderTabs />
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
