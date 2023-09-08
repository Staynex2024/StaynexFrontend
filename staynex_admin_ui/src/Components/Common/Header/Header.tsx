import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import headerLogo from '../../../Assets/Images/logo.svg'
import { Col, Container, Dropdown, Form, Offcanvas, Row } from 'react-bootstrap'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import UserImg from '../../../Assets/Images/userimg.png'
import { NotificationIcon } from '../../../Assets/Images/svgImgs/svgImgs'
import closeicon from '../../../Assets/Images/Cancel.svg'
import Sidebar from '../Sidebar/Sidebar'
import menuToggle from '../../../Assets/Images/Icons/menu-toggle.svg'
import { logOut } from '../../../Redux/Actions/user.action'
import ResetModal from '../Reset/ResetModal'
import ConnectWallet from '../ConnectWallet'
import Swal from 'sweetalert2'
import { callContractGetMethod } from '../../../Redux/Actions/contract.action'
import { disconnectWallet } from "../../../Redux/Actions/user.action";

const Header = () => {
  const dispatch: any = useDispatch()
  // const navigate: any = useNavigate()
  const isLogin = useSelector((state: any) => state.user.token)
  const email = useSelector((state: any) => state.user.email)
  const walletAddress = useSelector((state: any) => state.user.walletAddress)

  const settingdata = [
    // {
    //   name: 'User Profile',
    // },
    // {
    //   name: 'Add Properties',
    // },
    {
      name: 'Logout',
    },
    {
      name: 'Reset Password',
    },
  ]
  const countrylist = [
    {
      name: 'India',
    },
    {
      name: 'USA',
    },
    {
      name: 'UK',
    },
  ]
  const [show, setShow] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Logut Function
  const handleLogout = async () => {
    await dispatch(logOut())
  }

  // const handleNavigation = () => {
  //   navigate('/auth/hotels/new-property')
  // }

  useEffect(() => {
    if (walletAddress) {
      validateAdmin()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress])


  // function to validate admin wallet address
  const validateAdmin = async () => {
    let owner = await dispatch(callContractGetMethod('owner', [], 'factory', true));
    if (owner.toLowerCase() !== walletAddress) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Connect Correct Wallet',
        text: 'You have to connect correct wallet to access admin panel',
      })
      dispatch(disconnectWallet());
    }
  };

  return (
    <>
      {isLogin === '' ? (
        <header className="login-header">
          <Container>
            <Row>
              <Col xs={6}>
                <Link to="/">
                  <img src={headerLogo} alt="Logo" />
                </Link>
              </Col>
              <Col xs={6} className="text-end">
                <Link to="/" className="admin_link">
                  Admin
                </Link> 
              </Col>
            </Row>
          </Container>
        </header>
      ) : (
        <header className="admin_header">
          <Container fluid>
            <Row className='align-items-center'>
              <Col lg={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="admin_header_search d-flex align-items-center">
                    <label>ADMIN</label>
                    {/* <Form.Control type="text" placeholder="Search" /> */}
                  </div>
                  <span className="Mobile_toggleBtn" onClick={handleShow}>
                    <img src={menuToggle} alt="Menu" />
                  </span>
                </div>
              </Col>
              <Col lg={6} className="mt-3 mt-lg-0">
                <div className="d-flex flex-wrap justify-content-between justify-content-lg-end align-items-center">
                  <>
                    <ConnectWallet />
                  </>
                  <Dropdown align="end" className="Notification_Dropdown">
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      {/* <NotificationIcon /> */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {countrylist.map((data, i) => {
                        return (
                          <Dropdown.Item key={i}>
                            <div className="Notification_List d-flex">
                              <p>
                                Jessica P. made a new booking at Mohini Resort{' '}
                                <small>a min ago</small>
                              </p>
                              <span className="close_info">
                                <img src={closeicon} alt="x" />
                              </span>
                            </div>
                          </Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="country_Dropdown mx-3">
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      MYR
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {countrylist.map((data, i) => {
                        return (
                          <Dropdown.Item key={i}>
                            <span>{data.name}</span>
                          </Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown align="end" className="Setting_Dropdown">
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      <img src={UserImg} alt="flag" />{' '}
                      <span>{email ? `Hello, ${email}` : ''}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {settingdata.map((data, i) => {
                        return data?.name === 'Logout' ? (
                          <Dropdown.Item key={i} onClick={handleLogout}>
                            <span>{data.name}</span>
                          </Dropdown.Item>
                        ) : data?.name === 'Reset Password' ? (
                          <Dropdown.Item
                            key={i}
                            onClick={() => setShowResetModal(true)}
                          >
                            <span>{data.name} </span>
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item key={i}>
                            <span>{data.name}</span>
                          </Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Container>
        </header>
      )}
      <Offcanvas className="SideBar_Menu" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar />
        </Offcanvas.Body>
      </Offcanvas>
      <ResetModal
        showResetModal={showResetModal}
        handleClose={() => setShowResetModal(false)}
      />
    </>
  )
}

export default Header
