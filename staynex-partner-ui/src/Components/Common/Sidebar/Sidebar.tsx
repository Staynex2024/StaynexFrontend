import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";
import headerLogo from "../../../Assets/Images/white-logo.svg"
import {  DashboardIcon, HomeIcon,LogoutIcon,ManageSearchIcon, SettingIcon, UserbigIcon } from "../../../Assets/Images/svgImgs/svgImgs"; 

const Sidebar = ({ handleSidebar }: { handleSidebar?: () => void }) => {
  const NavLinks = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      to: "/auth/dashboard",
    },
    {
      icon: <HomeIcon />,
      label: "Hotels",
      to: "/auth/hotels",
    },
    {
      icon: <UserbigIcon />,
      label: "Members",
      to: "/",
    },
    {
      icon: <ManageSearchIcon />,
      label: "Management",
      to: "/",
    },
  ];

  const NavfooterLinks = [
    {
      icon: <SettingIcon />,
      label: "Settings",
      to: "/",
    },
    {
      icon: <LogoutIcon />,
      label: "Logout",
      to: "/",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar_Menu">
        <Link to="/"><img src={headerLogo} alt='Logo' /></Link>
        <ul className="sidebar_inner">
          {NavLinks.map((item) => (
            <li key={item.label}>
              <NavLink to={item.to} className="nav_link" onClick={handleSidebar}>
                <span className="nav_link_icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar_footerMenu">
        <ul className="sidebar_inner">
            {NavfooterLinks.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to} className="nav_link" onClick={handleSidebar}>
                  <span className="nav_link_icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
