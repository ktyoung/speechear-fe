import "./App.css";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Layout from "./layout";
import MyPage from "./pages/MyPage";
import Test01Menu from "./pages/tests/test01/Test01Menu";
import Test01Level from "./pages/tests/test01/Test01Level";
import Test01ScreenWrapper from "./pages/tests/test01/Test01ScreenWrapper";
import Test02Menu from "./pages/tests/test02/Test02Menu";
import Test02Level from "./pages/tests/test02/Test02Level";
import Test02ScreenWrapper from "./pages/tests/test02/Test02ScreenWrapper";
import Test03Menu from "./pages/tests/test03/Test03Menu";
import Test03Level from "./pages/tests/test03/Test03Level";
import Test03ScreenWrapper from "./pages/tests/test03/Test03ScreenWrapper";
import Test04Menu from "./pages/tests/test04/Test04Menu";
import Test04Level from "./pages/tests/test04/Test04Level";
import Test04ScreenWrapper from "./pages/tests/test04/Test04ScreenWrapper";
import Test05Menu from "./pages/tests/test05/Test05Menu";
import CrosswordQuiz from "./pages/tests/test05/CrosswordQuiz";

function LayoutRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/myPage" element={<MyPage />} />
        {/* Test01  */}
        <Route path="/training/part1" element={<Test01Menu />} />
        <Route path="/training/part1/:level/:page" element={<Test01Level />} />
        <Route
          path="/training/part1/:level/:page/:quiz"
          element={<Test01ScreenWrapper />}
        />
        {/* Test02  */}
        <Route path="/training/part2" element={<Test02Menu />} />
        <Route path="/training/part2/:level/:page" element={<Test02Level />} />
        <Route
          path="/training/part2/:level/:page/:quiz"
          element={<Test02ScreenWrapper />}
        />
        <Route path="/training/part3" element={<Test03Menu />} />
        <Route path="/training/part3/:level/:page" element={<Test03Level />} />
        <Route
          path="/training/part3/:level/:page/:quiz"
          element={<Test03ScreenWrapper />}
        />
        {/* Test04 */}
        <Route path="/training/part4" element={<Test04Menu />} />
        <Route path="/training/part4/:level/:page" element={<Test04Level />} />
        <Route
          path="/training/part4/:level/:page/:quiz"
          element={<Test04ScreenWrapper />}
        />
        {/* Test05 */}
        <Route path="/training/part5" element={<Test05Menu />} />
        <Route
          path="/training/part5/:level/:page/:quiz"
          element={<CrosswordQuiz />}
        />
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
