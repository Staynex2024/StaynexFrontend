import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import headerLogo from "../../../Assets/Images/white-logo.svg"
import { BookingIcon, DashboardIcon, HomeIcon, LogoutIcon, LoyaltyIcon, ManageIcon, ManageSearchIcon, SettingIcon, SupportIcon, UserbigIcon } from "../../../Assets/Images/svgImgs/svgImgs";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/Actions/user.action";

const Sidebar = ({ handleSidebar }: { handleSidebar?: () => void }) => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();

  const NavfooterLinks = [
    {
      icon: <SettingIcon />,
      label: "Settings",
      to: "/auth/settings",
    },
    {
      icon: <LogoutIcon />,
      label: "Logout",
      to: "/",
    },
  ];

    // Logut Function
    const handleLogout = async () => {
      await dispatch(logOut());
    };

  return (
    <aside className="sidebar">
      <div className="sidebar_Menu">
        <Link to="/"><img src={headerLogo} alt='Logo' /></Link>
        <ul className="sidebar_inner">
          <li>
            <NavLink to="/auth/dashboard" className="nav_link">
              <span className="nav_link_icon"><DashboardIcon /></span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/auth/Booking" className="nav_link">
              <span className="nav_link_icon"><BookingIcon /></span>
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/auth/customers" className="nav_link">
              <span className="nav_link_icon"><LoyaltyIcon /></span>
              Customer
            </NavLink>
          </li>
          <li>
            {/* <NavLink to="/" className="nav_link" ></NavLink> */}
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                <span className="nav_link_icon"><ManageIcon /></span>
                Management
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <NavLink to="/auth/hotel-details">Hotel Details</NavLink>
                <NavLink to="/auth/passes">Passes</NavLink>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <NavLink to="/auth/support" className="nav_link">
              <span className="nav_link_icon"><SupportIcon /></span>
              Support
            </NavLink>
          </li>
        </ul>
        {/* <ul className="sidebar_inner">
          {NavLinks.map((item) => (
            <li key={item.label}>
              <NavLink to={item.to} className="nav_link">
                <span className="nav_link_icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul> */}
      </div>
      <div className="sidebar_footerMenu">
        <ul className="sidebar_inner">
            {NavfooterLinks.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to} className="nav_link" onClick={handleSidebar}>
                {item?.label === "Logout" ?
                  <>
                    <span className="nav_link_icon" onClick={handleLogout}>{item.icon}
                    {item.label}</span>
                  </>
                  :
                  <>
                    <span className="nav_link_icon">{item.icon}</span>
                    {item.label}
                  </>}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
