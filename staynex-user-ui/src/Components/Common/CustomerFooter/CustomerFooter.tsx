import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import "./CustomerFooter.scss"
import FlagIcon from "../../../Assets/Images/Icons/flags/myr-flag.svg"
import flag1 from "../../../Assets/Images/Icons/flags/myr-flag.svg"

const CustomerFooter = () => {
  const countrylist = [
    {
      flagicon: flag1,
      name: "AR",
    },
    {
      flagicon: flag1,
      name: "AR",
    },
    {
      flagicon: flag1,
      name: "AR",
    },
    {
      flagicon: flag1,
      name: "AR",
    },
    {
      flagicon: flag1,
      name: "AR",
    },
  ];
  return (
    <>
      <footer className='login_footer w-100'>
        <Container>
          <Row className='align-items-center'>
            <Col xs={6} sm={4}>
              <div className='login_footer_Links d-flex align-items-center justify-content-center justify-content-sm-start'>
                <Link to="#">Terms</Link>
                <Link className='ms-4' to="#">Privacy</Link>
              </div> 
            </Col>
            <Col xs={6} sm={4} className='text-center'>
              <div className='login_footer_Copyright'>
                <p>© 2023 Staynex</p>
              </div>
            </Col>
            <Col xs={12} sm={4} className='d-flex justify-content-center justify-content-sm-end mt-4 mt-sm-0'>
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <img src={FlagIcon} alt="flag" /> <span>MYR</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {countrylist.map((data, i) => {
                    return (
                      <Dropdown.Item key={i}>
                        <img src={data.flagicon} alt="flag" />
                        <span>{data.name}</span>
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default CustomerFooter
