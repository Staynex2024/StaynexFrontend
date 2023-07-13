import { Outlet } from "react-router-dom";
import "./MainLayout.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main-wrap">
        <Sidebar />
        <div className="main_Layout">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
