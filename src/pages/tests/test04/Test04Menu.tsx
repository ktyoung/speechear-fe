import TestCategory from "@components/TestCategory";
import Snb from "@components/common/Snb";
import { Link } from "react-router-dom";

export default function Test04Menu() {
  const testCategories = [
    {
      title: "3문장 세트",
      detail: "문장 세개를 순서에 맞게 선택",
      to: "word3",
    },
    {
      title: "4문장 세트",
      detail: "문장 네개를 순서에 맞게 선택",
      to: "word4",
    },
    {
      title: "5문장 세트",
      detail: "문장 다섯개를 순서에 맞게 선택",
      to: "word5",
    },
  ];

  return (
    <div className="main-wrapper">
      <div className="main-contents home test">
        <div className="snb">
          <Snb />
        </div>
        <div className="main-contents__column">
          <p className="mb pb">문장 순서화 하기</p>
          <div className="main-select-wrapper visible">
            {/* <p className="font-bold">듣고 싶은 이야기를 골라주세요</p> */}
            {testCategories.map((items, i) => {
              return (
                <TestMenuCard
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

interface TestMenuCardProps {
  title: string;
  detail: string;
  to: string;
}
function TestMenuCard({ title, detail, to }: TestMenuCardProps) {
  return (
    <div className="test-card-container">
      <p className="card-title">{title}</p>
      <p className="card-detail">{detail}</p>
      <Link to={`/training/part4/${to}`} className="card-link">
        이동하기
      </Link>
    </div>
  );
}
