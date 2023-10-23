import { Link } from "react-router-dom";

export default function Test03Menu() {
  const testSubjects = [
    "요리",
    "전통문화",
    "스포츠",
    "세계의 잔치",
    "속담",
    "지역",
    "세계유산",
    "나라",
    "건강",
    "인물",
    "기타",
  ];

  const testUrl = [
    "cook", // 요리
    "culture", // 전통문화
    "sports", // 스포츠
    "festivals", // 세계의 잔치
    "proverbs", // 속담
    "regions", // 지역
    "heritage", // 세계유산
    "countries", // 나라
    "health", // 건강
    "people", // 인물
    "others", // 기타
  ];

  return (
    <div className="contents-wrapper main">
      <div className="contents-main">
        <div className="main-title menu">
          <p className="select-function menu-title menu-title-color">
            <span className="function-number menu-number-color">03</span>긴
            이야기 듣기
          </p>
        </div>
        <div className="functions-wrapper menus">
          <ul className="grid">
            {testSubjects.map((subject, i) => {
              return (
                <li key={i} className="test-card">
                  <Link to={`test03-${testUrl[i]}`}>{subject}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
