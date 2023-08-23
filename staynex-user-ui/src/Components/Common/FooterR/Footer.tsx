import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import './Footer.scss'
// import FlagIcon from '../../../Assets/Images/Icons/flags/myr-flag.svg'
// import flag1 from '../../../Assets/Images/Icons/flags/myr-flag.svg'
import footerLogo from '../../../Assets/Images/white-logo.svg'
import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  SoColIcon,
  TwitterIcon,
  YouTubeIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown'

const Footer = () => {

  return (
    <>
      <footer className="site_footer w-100">
        <Container>
          <div className="text-center">
            <Link to="/">
              <img src={footerLogo} alt="Logo" />
            </Link>
            <div className="site_footer_Links flex-wrap d-sm-flex align-items-center justify-content-center py-4 pb-0 my-4 py-xl-5 my-xl-5">
              <Link to="/about-us">StaynexPass</Link>
              <Link to="/club">StaynexClub</Link>
              <Link to="/list-property">Become A Hotel Partner</Link>
              <Link to="/global-partner">Global partnerships</Link>
            </div>
            <div className="site_footer_Socialmedia flex-md-wrap d-flex align-items-center justify-content-center pb-4 my-4 pb-xl-5 my-xl-5">
              <Link to="https://twitter.com/" target="_blank">
                <TwitterIcon />
              </Link>
              <Link to="https://discord.com/" target="_blank">
                <DiscordIcon />
              </Link>
              <Link to="https://www.instagram.com/" target="_blank">
                <InstagramIcon />
              </Link>
              <Link to="https://www.youtube.com/" target="_blank">
                <YouTubeIcon />
              </Link>
              <Link to="https://www.facebook.com/" target="_blank">
                <FacebookIcon />
              </Link>
              <Link to="https://www.socol.io/" target="_blank">
                <SoColIcon />
              </Link>
            </div>
          </div>
          <Row className="align-items-center justify-content-center site_footer_Copyright">
            <Col
              xs={12}
              sm={4}
              className="d-flex order-sm-last justify-content-center justify-content-sm-end mb-5 mt-sm-0"
            >
              {/* <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <img src={FlagIcon} alt="flag" /> <span>MYR</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {countrylist.map((data, i) => {
                    return (
                      <Dropdown.Item key={i} href="#">
                        <img src={data.flagicon} alt="flag" />
                        <span>{data.name}</span>
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown> */}
              <CurrencyDropdown />
            </Col>
            <Col xs={12} sm={4}>
              <div className="site_footer_Links d-flex align-items-center justify-content-center justify-content-sm-start">
                <Link to="#">Terms</Link>
                <Link className="ms-4" to="#">
                  Privacy
                </Link>
              </div>
            </Col>
            <Col xs={12} sm={4} className="text-center d-flex d-md-block justify-content-center mt-3 mt-sm-0">
              <p>© 2023 </p> <p className='ms-2 ms-md-0'>Staynex </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
