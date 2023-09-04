import './Header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useDispatch } from "react-redux";
// import { Dispatch } from "redux";
import headerLogo from "../../../Assets/Images/logo.svg";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import ConnectWallet from '../ConnectWallet';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callApiPostMethod } from '../../../Redux/Actions/api.action';
import { APIURL } from '../../../Utils';
import toaster from '../Toast';

const Header = () => {
  const dispatch: any = useDispatch()
  const navigate: any = useNavigate()
  const walletAddress = useSelector((state: any) => state.user.walletAddress)

  useEffect(() => {
    const handleCustomerLogin = async () => {
      const result = await dispatch(callApiPostMethod(APIURL?.CUSTOMER_LOGIN, { walletAddress: walletAddress }, {}, false))

      if (result?.data === false) {
        navigate('/auth/profile-login')
      } else if (result?.data === true) {
        navigate('/auth/profile-pass')
      }
    }

    if (walletAddress !== '') {
      handleCustomerLogin()
    }
    if (walletAddress === '') {
      navigate('/')
    }
  }, [walletAddress])



  return (
    <>
      <header className="site_header sticky-top">
        <Navbar expand="xl" className="">
          <Container>
            <div className="site_header_search d-flex align-items-center">
              <Link to="/">
                <img src={headerLogo} alt="Logo" />
              </Link>
              {/* <Form.Control type="text" placeholder="Anywhere" /> */}
            </div>
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              <Nav className="">
                <NavLink className="nav-link" to="/about-us">
                  StaynexPass
                </NavLink>
                <NavLink className="nav-link" to="/club">
                  StaynexClub
                </NavLink>
                <NavLink className="nav-link" to="/global-partner">
                  Global partners
                </NavLink>
                <NavLink className="nav-link" to="/list-property">
                  List your property
                </NavLink>
              </Nav>
            </Navbar.Collapse>
            <div className="d-flex justify-content-between justify-content-md-end align-items-center">
              <CurrencyDropdown />
              <ConnectWallet />
              <Navbar.Toggle
                className="ms-3"
                aria-controls="basic-navbar-nav"
              />
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Header
