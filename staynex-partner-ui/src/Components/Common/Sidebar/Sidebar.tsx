import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";
import headerLogo from "../../../Assets/Images/white-logo.svg"
import { BookingIcon, DashboardIcon, HomeIcon, LogoutIcon, LoyaltyIcon, ManageIcon, SettingIcon, SupportIcon } from "../../../Assets/Images/svgImgs/svgImgs";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/Actions/user.action";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Sidebar = ({ handleSidebar }: { handleSidebar?: () => void }) => {
  const dispatch: any = useDispatch();

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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <p>Cooming Soon</p>
    </Tooltip>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar_Menu">
        <Link to="/"><img src={headerLogo} alt='Logo' /></Link>
        <ul className="sidebar_inner">
          <li>
            <span
              // to=""
              className="nav_link">
              <span className="nav_link_icon"><DashboardIcon /></span>
              {/* Dashboard */}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <span>Dashboard</span>
              </OverlayTrigger>
            </span>
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
          {/* <li>
            <NavLink to="/auth/support" className="nav_link">
              <span className="nav_link_icon"><SupportIcon /></span>
              Support
            </NavLink>
          </li> */}
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
                    <div className="d-flex w-100" onClick={handleLogout}>
                      <span className="nav_link_icon">{item.icon}</span>
                      {item.label}
                    </div>
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
