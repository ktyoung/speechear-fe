import categories from "@datas/testCategories.json";

import Snb from "@components/common/Snb";
import TestSetCard from "@components/tests/test04/TestSetCard";

export default function Test04Menu() {
  const testCategories = categories["04_1"];

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">문장 순서화 하기</p>
          <div className="main-select-wrapper visible">
            {testCategories.map((items, i) => {
              return (
                <TestSetCard
                  key={i}
                  title={items.title}
                  detail={items.detail}
                  to={items.to}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
