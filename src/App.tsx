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
import Area from "./pages/tests/test02/Area";
import Culture from "./pages/tests/test02/Culture";
import Food from "./pages/tests/test02/Food";
import Other from "./pages/tests/test02/Other";
import Cook from "./pages/tests/test03/Cook";
import TraditionalCulture from "./pages/tests/test03/TraditionalCulture";
import Sports from "./pages/tests/test03/Sports";
import Festivals from "./pages/tests/test03/Festivals";
import Proverbs from "./pages/tests/test03/Proverbs";
import Regions from "./pages/tests/test03/Regions";
import Heritage from "./pages/tests/test03/Heritage";
import Countries from "./pages/tests/test03/Countries";
import Health from "./pages/tests/test03/Health";
import People from "./pages/tests/test03/People";
import Othres from "./pages/tests/test03/Othres";
import SentenceSetThree from "./pages/tests/test04/SentenceSetThree";
import SentenceSetFour from "./pages/tests/test04/SentenceSetFour";
import SentenceSetFive from "./pages/tests/test04/SentenceSetFive";
import CrosswordQuiz from "./pages/tests/test05/CrosswordQuiz";

function LayoutRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/myPage" element={<MyPage />} />
        {/* Test01  */}
        <Route path="/test01-menu" element={<Test01Menu />} />
        <Route path="/test01-menu/test01-basic" element={<Basic />} />
        <Route path="/test01-menu/test01-low" element={<Low />} />
        <Route path="/test01-menu/test01-medium" element={<Medium />} />
        <Route path="/test01-menu/test01-high" element={<High />} />
        {/* Test02  */}
        <Route path="/test02-menu" element={<Test02Menu />} />
        <Route path="/test02-menu/test02-area" element={<Area />} />
        <Route path="/test02-menu/test02-culture" element={<Culture />} />
        <Route path="/test02-menu/test02-food" element={<Food />} />
        <Route path="/test02-menu/test02-other" element={<Other />} />
        {/* Test03  */}
        <Route path="/test03-menu" element={<Test03Menu />} />
        <Route path="/test03-menu/test03-cook" element={<Cook />} />
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
        <Route path="/test03-menu/test03-others" element={<Othres />} />
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
