import React from 'react'
import "./Club.scss"
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import clubbtn from "../../../Assets/Images/club-btn.svg"
import Clubbanner from "../../../Assets/Images/club-img.jpg"
import { BigArrowIcon, UserWalletIcon, WalletIcon } from '../../../Assets/Images/svgImgs/svgImgs'
import WorksSlider from './WorksSlider/WorksSlider'
import Explorerprogram from './Explorerprogram/Explorerprogram'

const Club = () => { 

    return (
        <> 
            <div className='Club_Page'>
                <section className='Club_Banner'>
                    <Container fluid className='px-0'>
                        <Row className='mx-0'>
                            <Col xs={12} md={5} xl={4} className='d-flex px-0'>
                                <div className='Club_Banner_Content w-100'>
                                    <Link to="#"><img src={clubbtn} alt="Club" /></Link>
                                    <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                                </div>
                            </Col>
                            <Col xs={12} md={7} xl={8} className='d-flex px-0'>
                                <div className='Club_Banner_Image w-100'>
                                    <img src={Clubbanner} alt="Banner Img" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className='Club_wallet'>
                    <Container>
                        <div className='Club_wallet_box'>
                            <h2>Your wallet is your passport</h2>
                            <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                            <div className='user_wallet d-flex align-items-center justify-content-between'>
                                <div className='user_wallet_connect'>
                                    <WalletIcon />
                                </div>
                                <span className='arrow_big'><BigArrowIcon /></span>
                                <div className='user_wallet_connect'>
                                    <UserWalletIcon />
                                </div>
                            </div>
                            Discover Switzerland’s best ski resorts and plan the perfect holiday
                        </div>
                    </Container>
                </section>
                <section className='Club_explorer py-60'>
                    <Container>
                        <div className='Club_explorer_program'>
                            <div className='Page_heading text-center'>
                                <h2>Staynex Explorer Program (Q1 2023)</h2>
                                <p>We reward our Staynex Pass holders with more rewards! By purchasing the Staynex PFP, users have their passport that shows</p>
                            </div>
                            <Explorerprogram />
                            <div className='text-center pt-5 mt-xl-4'>
                                <p>By buying more NFTs, users create a collection and portfolio</p>
                                <p>of timeshare stays globally, by reaching 365 nights. </p>
                                <p className='pt-4'>They get to live around the world for free!Further discounts per tier achieved.</p>
                            </div>
                        </div>
                    </Container>
                </section>

                <section className='Club_works_sec py-60'>
                    <WorksSlider />
                </section>

                <section className='Club_faq py-70'>
                    <Container>
                        <Row>
                            <Col xs={12} md={5} xl={4} className=''>
                                <div className='Club_faq_heading text-left'>
                                    <h2>Frequently asked questions</h2>
                                    <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                                </div>
                            </Col>
                            <Col xs={12} md={7} xl={8} className=''>
                                <div className='Club_faq w-100'>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Some question goes here?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Some question goes here?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>Some question goes here?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>Some question goes here?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header>Some question goes here?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>Some question goes here?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="6">
                                            <Accordion.Header>Some question goes here?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="7">
                                            <Accordion.Header>Some question goes here?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default Club

