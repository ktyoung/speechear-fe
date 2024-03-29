import { useState } from "react";
import { Link } from "react-router-dom";

export default function License() {
  const [checkLicense, setCheckLicense] = useState(false);

  function handleCheckLicense() {
    setCheckLicense(true);
  }

  return (
    <div className="main-wrapper license">
      <div className="main-contents">
        <div className="main-contents__top">
          <div className="main-logo">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo/license_logo.png`}
              alt="License Logo"
            />
          </div>
          <div className="main-description">
            <p className="license-text">
              아이해브 말귀는 말소리 듣기 연습 프로그램입니다. <br />
              청각학 교수와 난청 전문의가 머리를 맞대고 만든 <br />
              난청 환자들에게 효과를 검증받은 수천개의 듣기 연습 자료입니다. <br />
              듣기 연습은 많이 맞추는 것보다 꾸준히 연습하는 것이 중요합니다. <br />
              누구나 쉽고 재밌게 듣기 연습을 할 수 있는 &nbsp;
              <img
                src={`${process.env.PUBLIC_URL}/images/logo/license_logo_sm.png`}
                alt="License Logo In Text"
              />
              로 <br />
              여러분의 듣기 능력을 올려 보세요.
            </p>
            <p className="license-text mobile">
              아이해브 말귀는 말소리 듣기 연습 프로그램입니다. <br />
              청각학 교수와 난청 전문의가 머리를 맞대고 만든 난청 환자들에게 효과를
              검증받은 수천개의 듣기 연습 자료입니다. <br />
              듣기 연습은 많이 맞추는 것보다 꾸준히 연습하는 것이 중요합니다. <br />
              누구나 쉽고 재밌게 듣기 연습을 할 수 있는 &nbsp;
              <img
                src={`${process.env.PUBLIC_URL}/images/logo/license_logo_sm.png`}
                alt="License Logo In Text"
              />
              로 여러분의 듣기 능력을 올려 보세요.
            </p>
          </div>
        </div>
        <div className="main-contents__bottom">
          {!checkLicense ? (
            <div className="license-key-input-wrapper">
              <p className="license-key-input-text">라이센스키를 입력해 주십시오.</p>
              <input type="text" className="license-key-input" />
              <button className="license-button__check" onClick={handleCheckLicense}>
                확인
              </button>
            </div>
          ) : (
            <div className="license-check__pass">
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/license_check_icon.png`}
                alt="License Key Check Success"
              />
              <div className="license-check-modal">
                <p>License</p>
                <p>라이센스 확인 완료</p>
              </div>
              <Link to="/home">다음</Link>
            </div>
          )}
          <div className="main-logo-bottom">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo/license_logo_bw.png`}
              alt="Monochrome Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
