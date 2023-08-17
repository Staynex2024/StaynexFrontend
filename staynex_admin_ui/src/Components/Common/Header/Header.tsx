import React, { useState } from 'react'
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

const Header = () => {
  const dispatch: any = useDispatch()
  // const navigate: any = useNavigate()
  const isLogin = useSelector((state: any) => state.user.token)
  const email = useSelector((state: any) => state.user.email)

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
            <Row>
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="admin_header_search d-flex align-items-center">
                    <label>ADMIN</label>
                    <Form.Control type="text" placeholder="Search" />
                  </div>
                  <span className="Mobile_toggleBtn" onClick={handleShow}>
                    <img src={menuToggle} alt="Menu" />
                  </span>
                </div>
              </Col>
              <Col md={6} className="mt-3 mt-md-0">
                <div className="d-flex justify-content-md-end align-items-center">
                  <Dropdown align="end" className="Notification_Dropdown">
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      <NotificationIcon />
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
                  <Dropdown className="country_Dropdown mx-4">
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
                        return (

                          data?.name === 'Logout' ? (
                            <Dropdown.Item key={i} onClick={handleLogout}><span >{data.name}</span></Dropdown.Item>
                          ) : data?.name === 'Reset Password' ? (
                            <Dropdown.Item key={i} onClick={() => setShowResetModal(true)}><span >
                              {data.name}{' '}
                            </span></Dropdown.Item>
                          ) : (
                            <Dropdown.Item key={i}>
                              <span>{data.name}</span>
                            </Dropdown.Item>
                          )

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
