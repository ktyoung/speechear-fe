import { Link } from "react-router-dom";
import Snb from "@components/common/Snb";
import categories from "@datas/testCategories.json";

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
