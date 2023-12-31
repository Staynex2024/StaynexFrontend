import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Sidebar.scss'
import headerLogo from '../../../Assets/Images/white-logo.svg'
import {
  DashboardIcon,
  HomeIcon,
  LogoutIcon,
  ManageSearchIcon,
  SettingIcon,
  UserbigIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import { logOut } from '../../../Redux/Actions/user.action'
import { useDispatch } from 'react-redux'

const Sidebar = ({ handleSidebar }: { handleSidebar?: () => void }) => {
  const dispatch: any = useDispatch()
  const location: any = useLocation();

  const NavLinks = [
    {
      icon: <DashboardIcon />,
      label: 'Dashboard',
      to: '/auth/dashboard',
      // comingsoon:<small></small>,
    },
    {
      icon: <HomeIcon />,
      label: 'Hotels',
      to: '/auth/hotels',
    },
    {
      icon: <UserbigIcon />,
      label: 'Members',
      to: '/auth/members',
    },
    {
      icon: <UserbigIcon />,
      label: 'Customers',
      to: '/auth/customers',
    },
    {
      icon: <ManageSearchIcon />,
      label: 'Management',
      to: location.pathname,
      comingsoon:<small></small>,
    },
    {
      icon: <ManageSearchIcon />,
      label: 'Buy Request',
      to: '/auth/buy-request',
    },
  ];

  const NavfooterLinks = [
    {
      icon: <SettingIcon />,
      label: 'Settings',
      to: '/auth/settings',
    },
    {
      icon: <LogoutIcon />,
      label: 'Logout',
      to: '/',
    },
  ]

  // Logut Function
  const handleLogout = async () => {
    await dispatch(logOut())
  }

  return (
    <aside className="sidebar">
      <div className="sidebar_Menu">
        <Link to="/">
          <img src={headerLogo} alt="Logo" />
        </Link>
        <ul className="sidebar_inner">
          {NavLinks.map((item) => (
            <li key={item.label}>  
              <NavLink
                to={item.to}
                className="nav_link"
                onClick={handleSidebar}
              >
                 {item.comingsoon}
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
              <NavLink
                to={item.to}
                className="nav_link"
                onClick={handleSidebar}
              >
                {item?.label === 'Logout' ? (
                  <>
                    <span
                      className="nav_link_icon sidebar_logout_btn"
                      onClick={handleLogout}
                    >
                      {item.icon}
                      {item.label}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="nav_link_icon">{item.icon}</span>
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
