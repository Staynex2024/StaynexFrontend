import React, { useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import paltform_img from '../../../Assets/Images/platform-img.jpg'
import { SocolIcon, TwitterBlackIcon, TwitterIcon } from '../../../Assets/Images/svgImgs/svgImgs'
import CommonButton from '../../Common/CommonButton/CommonButton'
import twitter_img from '../../../Assets/Images/Icons/twitter-img.png'
import './AboutUs.scss'
import ImagineNFT from './ImagineNFT/ImagineNFT'
import OfficialPartner from './OfficialPartner/OfficialPartner'
import BrowseResort from './BrowseResort/BrowseResort'
import StaynexPass from './StaynexPass/StaynexPass'
// import aboutvideo from "../../../Assets/videos/video.mp4"

const AboutUs = () => {
    return (
        <div className='aboutus'>
            <section className='aboutus_banner_sec'>
                <video autoPlay loop muted>
                    <source src="../../../Assets/videos/video.mp4" type="video/mp4" />
                </video>
            </section>
            <OfficialPartner />
            <section className='aboutus_platform_sec'>
                <Row className="mx-0">
                    <Col sm={7} md={7} xl={7} className="plateform_column">
                        <div className='platform_content'>
                            <h1>The Staynex Platform</h1>
                            <p>An exclusive vacation club platform that allows members the usage rights to resorts globally on an annual basis, and
                                the ability to earn rewards by holding onto the membership. We use blockchain to tokenize ‘stays’ and to embed them onto NFTs,
                                which represents your membership and a number of nights allocated to you at the property.
                            </p>
                            <div className='platform_presskit'>
                                <p>PRESS AND MEDIA</p>
                                <div className='platform_btns'>
                                    <CommonButton
                                        title={<>Download Staynex's<br /> Official Press Kit</>}
                                    />
                                    <CommonButton
                                        title={<><TwitterBlackIcon /> Follow us<br />@Staynexcom</>}
                                        className="twitter_btn"
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={5} md={5} xl={5} className="platform_col px-0">
                        <div className="paltform_img">
                            <img src={paltform_img} alt="platform-img" />
                        </div>
                    </Col>
                </Row>
            </section>
            <ImagineNFT />
            <StaynexPass />
            <BrowseResort />
        </div >
    )
}

export default AboutUs
