import BottomNavigationBar from "@components/common/BottomNavigationBar";
import Header from "@components/common/Header";
import { Link } from "react-router-dom";

export default function MyPage() {
  return (
    <>
      <Header className="my-page" />
      <div className="main-wrapper my-page">
        <div className="main-contents info">
          <div className="snb">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo/logo.png`}
              alt="White Logo"
              className="settings-logo"
            />
          </div>
          <div className="main-select-wrapper info">
            <Link to="/home" className="link__mobile">
              <img src={`${process.env.PUBLIC_URL}/images/icons/icon_back.png`} alt="" />
              <p>회원정보 수정</p>
            </Link>
            <p>회원정보 수정</p>
            <ul className="user-info-wrapper">
              <li className="user-info">
                <p className="info-num">01</p>
                <p className="info-text">아이디</p>
                <input type="text" value="user1" className="info-input" disabled />
              </li>
              <li className="user-info">
                <p className="info-num">02</p>
                <p className="info-text">이름</p>
                <input type="text" value="사용자1" className="info-input underline" />
              </li>
              <li className="user-info">
                <p className="info-num">03</p>
                <p className="info-text">전화번호</p>
                <input
                  type="text"
                  value="010-2222-1111"
                  className="info-input underline"
                />
              </li>
              <li className="user-info baseline">
                <p className="info-num">04</p>
                <p className="info-text">비밀번호변경</p>
                <ul className="change-password">
                  <li className="change-password__flex">
                    <p>현재 비밀번호</p>
                    <input type="password" className="info-input underline" />
                  </li>
                  <li className="change-password__flex">
                    <p>새 비밀번호</p>
                    <input type="password" className="info-input underline" />
                  </li>
                  <li className="change-password__flex">
                    <p>비밀번호 확인</p>
                    <input type="password" className="info-input underline" />
                  </li>
                </ul>
              </li>
              <li className="user-info">
                <p className="info-num">05</p>
                <p className="info-text">사용기간</p>
                <input type="text" value="2099.12.31" className="info-input" disabled />
              </li>
            </ul>
            <div className="select-button-wrapper">
              <Link to="/myPage" className="refesh">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icons/icon_refresh.png`}
                  alt="Refresh Icon"
                />
              </Link>
              <Link to="/home" className="check">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icons/icon_check.png`}
                  alt="Check Icon"
                />
              </Link>
            </div>
          </div>
          <div className="main-logo-bottom">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo/license_logo_bw.png`}
              alt="Monochrome Logo"
            />
          </div>
        </div>
      </div>
      <BottomNavigationBar className="my-page" />
    </>
  );
}
