import categories from "@datas/testCategories.json";

import TestCategory from "@components/TestCategory";
import Snb from "@components/common/Snb";
import SwipeableHeaderTabs from "@components/common/SwipeableHeaderTabs";
import { Link } from "react-router-dom";
import React from "react";

export default function Test02Menu() {
  const testCategories = categories["02"];

  return (
    <div className="main-wrapper bg-gray">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">짧은 이야기 듣기</p>
          <SwipeableHeaderTabs />
          <div className="main-select-wrapper visible">
            <p className="font-bold">듣고 싶은 이야기를 골라주세요</p>
            <div className="test-category-container">
              {testCategories.map((items, i) => {
                return (
                  <React.Fragment key={i}>
                    <TestCategory
                      part="part2"
                      icon={items.icon}
                      children={items.children}
                    />
                    <Link className="link-sm" to={`/training/part2/${items.icon}/1`}>
                      {items.children}
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
