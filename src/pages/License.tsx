export default function License() {
  return (
    <>
      <div className="license-wrapper">
        <div className="license-contents">
          <div className="license-contents__top">
            <div className="license-logo">
              <img
                src={`${process.env.PUBLIC_URL}/images/logo/license_logo.png`}
                alt="License Logo"
              />
            </div>
            <div className="license-description">
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
            </div>
          </div>
          <div className="license-contents__bottom">
            <div className="license-key-input-wrapper">
              <p className="license-key-input-text">라이센스키를 입력해 주십시오.</p>
              <input type="text" className="license-key-input" />
              <button className="license-button__check">확인</button>
            </div>
            <div className="license-logo-bottom">
              <img
                src={`${process.env.PUBLIC_URL}/images/logo/license_logo_bw.png`}
                alt="Monochrome Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
