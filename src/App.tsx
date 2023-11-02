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
import SentenceSetThree from "./pages/tests/test04/SentenceSetThree";
import SentenceSetFour from "./pages/tests/test04/SentenceSetFour";
import SentenceSetFive from "./pages/tests/test04/SentenceSetFive";
import CrosswordQuiz from "./pages/tests/test05/CrosswordQuiz";
import Test01Level from "./pages/tests/test01/Test01Level";
import Test01ScreenWrapper from "./pages/tests/test01/Test01ScreenWrapper";
import Test02Level from "./pages/tests/test02/Test02Level";
import Test02ScreenWrapper from "./pages/tests/test02/Test02ScreenWrapper";
import Test03Level from "./pages/tests/test03/Test03Level";
import Test03ScreenWrapper from "./pages/tests/test03/Test03ScreenWrapper";

function LayoutRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/myPage" element={<MyPage />} />
        {/* Test01  */}
        <Route path="/test01-menu" element={<Test01Menu />} />
        <Route path="/test01-menu/:testLevel" element={<Test01Level />} />
        <Route
          path="/test01-menu/:testLevel/:quizNumber"
          element={<Test01ScreenWrapper />}
        />
        {/* Test02  */}
        <Route path="/test02-menu" element={<Test02Menu />} />
        <Route path="/test02-menu/:testLevel" element={<Test02Level />} />
        <Route
          path="/test02-menu/:testLevel/:quizNumber"
          element={<Test02ScreenWrapper />}
        />
        {/* <Route path="/test02-menu/test02-area" element={<Area />} />
        <Route path="/test02-menu/test02-culture" element={<Culture />} />
        <Route path="/test02-menu/test02-food" element={<Food />} />
        <Route path="/test02-menu/test02-other" element={<Other />} /> */}
        {/* Test03  */}
        <Route path="/test03-menu" element={<Test03Menu />} />
        <Route path="/test03-menu/:testLevel" element={<Test03Level />} />
        <Route
          path="/test03-menu/:testLevel/:quizNumber"
          element={<Test03ScreenWrapper />}
        />
        {/* <Route path="/test03-menu/test03-cook" element={<Cook />} />
        <Route
          path="/test03-menu/test03-culture"
          element={<TraditionalCulture />}
        />
        <Route path="/test03-menu/test03-sports" element={<Sports />} />
        <Route path="/test03-menu/test03-festivals" element={<Festivals />} />
        <Route path="/test03-menu/test03-proverbs" element={<Proverbs />} />
        <Route path="/test03-menu/test03-regions" element={<Regions />} />
        <Route path="/test03-menu/test03-heritage" element={<Heritage />} />
        <Route path="/test03-menu/test03-countries" element={<Countries />} />
        <Route path="/test03-menu/test03-health" element={<Health />} />
        <Route path="/test03-menu/test03-people" element={<People />} />
        <Route path="/test03-menu/test03-others" element={<Othres />} /> */}
        {/* Test04 */}
        <Route path="/test04-menu" element={<Test04Menu />} />
        <Route
          path="/test04-menu/test04-set03"
          element={<SentenceSetThree />}
        />
        <Route path="/test04-menu/test04-set04" element={<SentenceSetFour />} />
        <Route path="/test04-menu/test04-set05" element={<SentenceSetFive />} />
        {/* Test05 */}
        <Route path="/test05-menu" element={<Test05Menu />} />
        <Route
          path="/test05-menu/test05-quiz/:quizNumber"
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
