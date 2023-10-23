import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import { RecoilRoot } from "recoil";
import Layout from "./layout";
import Test01Menu from "./pages/menus/Test01Menu";
import Test02Menu from "./pages/menus/Test02Menu";
import MyPage from "./pages/MyPage";
import Test03Menu from "./pages/menus/Test03Menu";
import Test04Menu from "./pages/menus/Test04Menu";
import Test05Menu from "./pages/menus/Test05Menu";
import Basic from "./pages/tests/test01/Basic";
import Low from "./pages/tests/test01/Low";
import Medium from "./pages/tests/test01/Medium";
import High from "./pages/tests/test01/High";

function LayoutRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/test01-menu" element={<Test01Menu />} />
        <Route path="/test01-menu/test01-basic" element={<Basic />} />
        <Route path="/test01-menu/test01-low" element={<Low />} />
        <Route path="/test01-menu/test01-medium" element={<Medium />} />
        <Route path="/test01-menu/test01-high" element={<High />} />
        <Route path="/test02-menu" element={<Test02Menu />} />
        <Route path="/test03-menu" element={<Test03Menu />} />
        <Route path="/test04-menu" element={<Test04Menu />} />
        <Route path="/test05-menu" element={<Test05Menu />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<LayoutRoutes />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
