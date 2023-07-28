import { Outlet } from "react-router-dom";
import "./MainLayout.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="main_Layout">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
