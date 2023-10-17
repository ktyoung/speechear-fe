import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="contents-wrapper">
      <div className="contents-left half-size">
        <figure className="login-logo">
          <img
            src={`${process.env.PUBLIC_URL}/images/login/logo1.png`}
            alt="iHab Logo"
          />
        </figure>
        <h1 className="login-title">말귀 연습</h1>
        <figure className="login-photo">
          <img
            src={`${process.env.PUBLIC_URL}/images/login/photo.png`}
            alt="Login Pic"
          />
        </figure>
        <div className="bottom-logo-wrapper">
          <ul>
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/images/login/logo3.png`}
                alt="Bottom Logo"
              />
            </li>
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/images/login/logo2.png`}
                alt="Bottom Logo"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="contents-right half-size">
        <h2 className="login-title margin-bottom">로그인</h2>
        <form className="login-form" action="/login" method="post">
          <input
            className="login-input"
            type="text"
            placeholder="ID"
            name="username"
          />
          <input
            className="login-input"
            type="password"
            placeholder="PASSWORD"
            name="password"
          />
          <div className="login-options">
            <div className="store-id">
              <input
                type="checkbox"
                name="store_id"
                id="store_id"
                className="checkbox"
              />
              <label htmlFor="store_id" className="store-id">
                아이디 저장
              </label>
            </div>
            <div className="find-id-password">
              <Link to="/">아이디 찾기</Link>
              <p className="bar">&nbsp;/&nbsp;</p>
              <Link to="/">비밀번호 찾기</Link>
            </div>
          </div>
          <Link to="/home" className="login-btn">
            로그인
          </Link>
          {/* TODO: 클릭 시 회원가입 페이지로 이동 */}
          <Link to="/signup" className="login-btn">
            회원가입
          </Link>
        </form>
      </div>
    </div>
  );
}
