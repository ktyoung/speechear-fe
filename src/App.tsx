import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import { RecoilRoot } from "recoil";
import Layout from "./layout";
import Test01Menu from "./pages/menus/Test01Menu";

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
          path="/test01-menu"
          element={
            <Layout>
              <Test01Menu />
            </Layout>
          }
        />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
