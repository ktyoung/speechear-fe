import categories from "@datas/testCategories.json";

import TestCategory from "@components/TestCategory";
import Snb from "@components/common/Snb";

export default function Test02Menu() {
  const testCategories = categories["02"];

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">짧은 이야기 듣기</p>
          <div className="main-select-wrapper visible">
            <p className="font-bold">듣고 싶은 이야기를 골라주세요</p>
            <div className="test-category-container">
              {testCategories.map((items, i) => {
                return (
                  <TestCategory
                    key={i}
                    part="part2"
                    icon={items.icon}
                    children={items.children}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
