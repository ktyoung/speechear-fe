import Header from "./components/common/Header";
import BottomNavigationBar from "@components/common/BottomNavigationBar";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      {children}
      <BottomNavigationBar />
    </>
  );
}
