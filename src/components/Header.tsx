import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../state/atom";

export default function Header() {
  const [toggle, setToggle] = useRecoilState(modalState);

  function _handleModal() {
    setToggle(!toggle);
  }

  return (
    <header className="header-wrapper">
      <div className="header">
        <div className="nav">
          <h2 className="app-title">말귀연습</h2>
          <Link to="/home" className="link-home">
            HOME
          </Link>
        </div>
        <div className="nav">
          <Link to="/" className="logout-btn">
            로그아웃
          </Link>
          <figure onClick={_handleModal}>
            <img
              src={`${process.env.PUBLIC_URL}/images/home/user.png`}
              alt="User Icon"
            />
          </figure>
        </div>
      </div>
    </header>
  );
}
