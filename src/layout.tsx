import BottomAppBar from "@components/common/BottomAppBar";
import Header from "./components/common/Header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      {children}
      <BottomAppBar />
    </>
  );
}
