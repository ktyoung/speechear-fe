import TestCategory from "@components/TestCategory";
import Snb from "@components/common/Snb";

export default function Test02Menu() {
  const testCategories = [
    {
      icon: "location",
      children: "지역",
    },
    {
      icon: "culture",
      children: "우리문화",
    },
    {
      icon: "food",
      children: "음식",
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
          <p className="mb pb">짧은 이야기 듣기</p>
          <div className="main-select-wrapper visible">
            <p className="font-bold">듣고 싶은 이야기를 골라주세요</p>
            <div className="test-category-container">
              {testCategories.map((items, i) => {
                return (
                  <TestCategory key={i} icon={items.icon} children={items.children} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
