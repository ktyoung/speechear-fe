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

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/myPage"
          element={
            <Layout>
              <MyPage />
            </Layout>
          }
        />
        <Route
          path="/test01-menu"
          element={
            <Layout>
              <Test01Menu />
            </Layout>
          }
        />
        <Route
          path="/test01-menu/test01-basic"
          element={
            <Layout>
              <Basic />
            </Layout>
          }
        />
        <Route
          path="/test02-menu"
          element={
            <Layout>
              <Test02Menu />
            </Layout>
          }
        />
        <Route
          path="/test03-menu"
          element={
            <Layout>
              <Test03Menu />
            </Layout>
          }
        />
        <Route
          path="/test04-menu"
          element={
            <Layout>
              <Test04Menu />
            </Layout>
          }
        />
        <Route
          path="/test05-menu"
          element={
            <Layout>
              <Test05Menu />
            </Layout>
          }
        />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
