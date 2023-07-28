import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CommonButton from '../../../Common/CommonButton/CommonButton'
import './GlobalPartnership.scss'
import partnership_img from '../../../../Assets/Images/globalpartner-bg.jpg'

const GlobalPartnership = () => {
    return (
        <section className='partnership_sec'>
            <Row className="mx-0">
                <Col sm={4} md={4} xl={4} className="partnership_sec_column">
                    <div className='partnership_sec_column_content'>
                        <h1>Join the Global Partnership program</h1>
                        <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                        <div className='platform_presskit'>
                            <CommonButton
                                title="Explore"
                                className="white-bg"
                            />
                        </div>
                    </div>
                </Col>
                <Col sm={8} md={8} xl={8} className="partnership_sec_rightimg px-0">
                    <div className="partnership_sec_rightimg_img">
                        <img src={partnership_img} alt="platform-img" />
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default GlobalPartnership
