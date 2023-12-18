import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import anime from "animejs";
import { jwtDecode } from "jwt-decode";
import { useRecoilState } from "recoil";
import { jwtTokenState } from "@states/index";

export default function Login() {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

  const [authError, setAuthError] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(false);

    const API_URL = process.env.REACT_APP_RESTAPI_URL;

    await axios({
      method: "post",
      url: API_URL + "/auth/signin",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        console.log(jwtDecode(res.data.accessToken));
        setJwtToken(res.data);
        navigate("/license");
      })
      .catch((err) => {
        console.log(err);
        setAuthError(true);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      transitionPage(0, 1, x, y);
    }, 700);
  }, []);

  const transitionPage = (curr: number, next: number, x: number, y: number): void => {
    const pages = document.querySelectorAll(".login_page") as NodeListOf<HTMLElement>;
    pages[next].style.zIndex = (
      parseInt(getComputedStyle(pages[curr]).zIndex, 10) + 1
    ).toString();

    anime({
      targets: pages[next],
      update: (anim: any) => {
        pages[next].style.clipPath = `circle(${anim.progress * 2}% at ${x}px ${y}px)`;
      },
    });
  };

  return (
    <>
      <div className="login_root">
        <div className="login_page transition_1">
          <div className="img_main_logo">
            <img
              className="main_logo"
              // onClick="nextPage(0, 1);"
              src={`${process.env.PUBLIC_URL}/images/logo/logo.png`}
              alt="SpeechEar_Logo"
            />
          </div>
        </div>
        <div className="login_page transition_3">
          <div className="img_circle_logo">
            <img
              className="circle_logo"
              src={`${process.env.PUBLIC_URL}/images/logo/circle_logo.png`}
              alt="CircleLogo"
            />
            <img
              className="circle_logo_center"
              src={`${process.env.PUBLIC_URL}/images/logo/circle_logo_center.png`}
              alt="CircleLogo_Mob"
            />
          </div>
          <div className="form_area">
            <form id="loginForm" onSubmit={handleSignIn}>
              <div className="form_group">
                <input
                  type="text"
                  className="form_style"
                  name="username"
                  placeholder="아이디을 입력해주세요"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <i className="input_icon icon_account"></i>
              </div>
              <div className="form_group">
                <input
                  type="password"
                  className="form_style"
                  name="password"
                  placeholder="비밀번호를 입력해주세요"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="input_icon icon_password"></i>
              </div>
              {authError && (
                <div className="auth_error">
                  <span>로그인 오류 : 아이디 또는 비밀번호를 확인해주세요</span>
                </div>
              )}
              <div className="btn_login_bottom">
                <button type="submit" className="btn_login" id="signIn">
                  로그인
                </button>
                {/* <Link to="/home" className="btn_login">
                  로그인
                </Link> */}
              </div>
              <div className="account_link">
                <div>
                  <span>
                    <Link to="/">비밀번호를 잊으셨습니까?</Link>
                  </span>
                </div>
                <div>
                  <span>
                    <Link to="/signup">계정만들기</Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="text_div_bottom">
          <div className="text_edition">
            <span>Speech Ear v0.0.1b</span>
          </div>
          <div className="text_volume_cert">
            <span>ⓒ iHAB Corporation all rights reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
}
