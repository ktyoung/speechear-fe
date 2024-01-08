import TestCategory from "@components/TestCategory";
import Snb from "@components/common/Snb";

export default function Test03Menu() {
  const testCategories = [
    {
      icon: "cook",
      children: "요리",
    },
    {
      icon: "orient_culture",
      children: "전통문화",
    },
    {
      icon: "sport",
      children: "스포츠",
    },
    {
      icon: "party",
      children: "세계의 잔치",
    },
    {
      icon: "proverb",
      children: "속담",
    },
    {
      icon: "location",
      children: "지역",
    },
    {
      icon: "heritage",
      children: "세계유산",
    },
    {
      icon: "nation",
      children: "나라",
    },
    {
      icon: "health",
      children: "건강",
    },
    {
      icon: "person",
      children: "인물",
    },
    {
      icon: "etc",
      children: "기타",
    },
  ];

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">긴 이야기 듣기</p>
          <div className="main-select-wrapper visible">
            <p className="font-bold">듣고 싶은 이야기를 골라주세요</p>
            <div className="test-category-container grid">
              {testCategories.map((items, i) => {
                return (
                  <TestCategory
                    key={i}
                    part="part3"
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
