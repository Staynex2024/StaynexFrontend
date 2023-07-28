import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CommonButton from '../../../Common/CommonButton/CommonButton'
import '../AboutUs.scss'
import resort_img from '../../../../Assets/Images/beach-img.jpg'

const BrowseResort = () => {
    return (
        <section className='aboutus_platform_sec resort_sec'>
            <Row className="mx-0">
                <Col xs={12} sm={5} md={5} xl={5} className="plateform_column">
                    <div className='platform_content'>
                        <h1>Browse our resorts<br/> & properties</h1>
                        <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                        <CommonButton
                            title="Explore"
                            className="white-bg"
                        />
                    </div>
                </Col>
                <Col sm={7} md={7} xl={7} className='px-0'>
                    <div className="paltform_img">
                        <img src={resort_img} alt="platform-img" />
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default BrowseResort
