import Header from "./components/common/Header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
