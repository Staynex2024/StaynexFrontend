import React, { useState } from "react";
import { IdleTimerProvider } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { logOut } from "../../../Redux/Actions/user.action";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./AuthLayout.scss";

const AuthLayout = () => {
  const dispatch: any = useDispatch();
  const [active, setActive] = useState(false);
  const handleSidebar = () => setActive(!active);
  const onIdle = () => {
    // localStorage.clear();
    Swal.fire({
      icon: "info",
      title: "Session Expired",
      text: "Your session is expired, You have to login again to continue",
      showCancelButton: false,
      confirmButtonText: "Ok",
    }).then(() => {
      dispatch(logOut(false));
    });
  };
  return (
    <IdleTimerProvider timeout={1000 * 60 * 15} crossTab={true} onIdle={onIdle}>
      <div className={`Admin_main_Layout ${active ? "expanded_sidebar" : ""}`}>
        <Sidebar handleSidebar={handleSidebar} />
        <div className="admin_Layout_Rightside">
          <Header />
          <div className="admin_Layout_Content">
            <Outlet />
          </div>
        </div>
      </div>
    </IdleTimerProvider>
  );
};

export default AuthLayout;
