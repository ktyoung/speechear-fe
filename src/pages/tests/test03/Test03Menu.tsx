import React from "react";
import { Link } from "react-router-dom";

import categories from "@datas/testCategories.json";
import tabsData from "@datas/swipeableHeaderTabsData.json";

import Snb from "@components/common/Snb";
import TestCategory from "@components/TestCategory";
import SwipeableHeaderTabs from "@components/common/SwipeableHeaderTabs";

export default function Test03Menu() {
  const testCategories = categories["03"];

  return (
    <div className="main-wrapper bg-gray">
      <div className="main-contents home test h-auto">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">긴 이야기 듣기</p>
          <SwipeableHeaderTabs tabsDetail={tabsData.mainNavigationTabs} />
          <div className="main-select-wrapper visible">
            <p className="font-bold">듣고 싶은 이야기를 골라주세요</p>
            <div className="test-category-container grid">
              {testCategories.map((items, i) => {
                return (
                  <React.Fragment key={i}>
                    <TestCategory
                      key={i}
                      part="part3"
                      icon={items.icon}
                      children={items.children}
                    />
                    <Link className="link-sm" to={`/training/part3/${items.icon}/1`}>
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
