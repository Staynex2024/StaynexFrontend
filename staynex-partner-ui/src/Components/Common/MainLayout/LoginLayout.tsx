import { Outlet } from "react-router-dom";
import "./MainLayout.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LoginLayout = () => {
  return (
    <>
      <Header />
      <main className="main-wrap">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LoginLayout;
