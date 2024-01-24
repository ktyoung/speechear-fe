import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import Layout from "./layout";
import Login from "@pages/Login";
import Home from "@pages/Home";
import SignUp from "@pages/Signup";
import MyPage from "@pages/MyPage";
import License from "@pages/License";
import Settings from "@pages/Settings";
import Test01Menu from "@pages/tests/test01/Test01Menu";
import Test01Level from "@pages/tests/test01/Test01Level";
import Test01Screen from "@pages/tests/test01/Test01Screen";
import Test02Menu from "@pages/tests/test02/Test02Menu";
import Test02Level from "@pages/tests/test02/Test02Level";
import Test02Screen from "@pages/tests/test02/Test02Screen";
import Test03Menu from "@pages/tests/test03/Test03Menu";
import Test03Level from "@pages/tests/test03/Test03Level";
import Test03Screen from "@pages/tests/test03/Test03Screen";
import Test04Menu from "@pages/tests/test04/Test04Menu";
import Test04Level from "@pages/tests/test04/Test04Level";
import Test04Screen from "@pages/tests/test04/Test04Screen";
import Test05Menu from "@pages/tests/test05/Test05Menu";
import Test05Screen from "@pages/tests/test05/Test05Screen";

function LayoutRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />

        {/* Test01  */}
        <Route path="/training/part1" element={<Test01Menu />} />
        <Route path="/training/part1/:level/:page" element={<Test01Level />} />
        <Route path="/training/part1/:level/:page/:quiz" element={<Test01Screen />} />
        {/* Test02  */}
        <Route path="/training/part2" element={<Test02Menu />} />
        <Route path="/training/part2/:level/:page" element={<Test02Level />} />
        <Route path="/training/part2/:level/:page/:quiz" element={<Test02Screen />} />
        {/* Test03 */}
        <Route path="/training/part3" element={<Test03Menu />} />
        <Route path="/training/part3/:level/:page" element={<Test03Level />} />
        <Route path="/training/part3/:level/:page/:quiz" element={<Test03Screen />} />
        {/* Test04 */}
        <Route path="/training/part4" element={<Test04Menu />} />
        <Route path="/training/part4/:level/:page" element={<Test04Level />} />
        <Route path="/training/part4/:level/:page/:quiz" element={<Test04Screen />} />
        {/* Test05 */}
        <Route path="/training/part5" element={<Test05Menu />} />
        <Route path="/training/part5/:quiz" element={<Test05Screen />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/license" element={<License />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<LayoutRoutes />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
