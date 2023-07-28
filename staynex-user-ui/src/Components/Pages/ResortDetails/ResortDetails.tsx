import React, { useState } from 'react'
import "./ResortDetails.scss"
import { Col, Container, Row } from 'react-bootstrap'
import resortimg1 from '../../../Assets/Images/resort1.jpg';
import resortimg2 from '../../../Assets/Images/resort2.jpg';
import resortimg3 from '../../../Assets/Images/resort3.jpg';
import resortimg4 from '../../../Assets/Images/resort4.jpg';
import outdoorimg from '../../../Assets/Images/outdoor.svg';
import workspaceimg from '../../../Assets/Images/workspace.svg';
import airconditioningimg from '../../../Assets/Images/airconditioning.svg';
import kitchenimg from '../../../Assets/Images/kitchen.svg';
import hdtvimg from '../../../Assets/Images/hdtv.svg';
import petallowedimg from '../../../Assets/Images/petallowed.svg';
import wifiimg from '../../../Assets/Images/wifi.svg';
import freewasherimg from '../../../Assets/Images/freewasher.svg';
import mapimg from '../../../Assets/Images/map.jpg';
import { BedIcon, GrouparrowIcon, ResortIcon, ShowpicIcon, SizeIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import NazekiVillaModal from './NazekiVillaModal/NazekiVillaModal';
import Destinations from '../Home/Component/Destinations/Destinations';
import PropertyListCard from './PropertyListCard/PropertyListCard';

const ResortDetails = () => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className='resort_detail_page'>
                <Container>
                    <div className='details_page'>
                        <h2>Nazeki Villa</h2>
                        <p>Jl. Pura Batu Pageh No.89, Ungasan, Kec. Kuta Sel., Kabupaten Badung, Bali 80361, Indonesia</p>
                    </div>
                </Container>
            </div> 
            <div className='resort'>
                <Container>
                    <div className='resort_img'>
                        <Row>
                            <Col xs={7} md={6} lg={6} xl={6}>
                                <img className='resort_pic' src={resortimg1} alt="resortimg" />
                            </Col>
                            <Col xs={5} md={3} lg={3} xl={3}>
                                <img className='villa_pic' src={resortimg2} alt="resortimg" />
                                <img className='villa_pic' src={resortimg3} alt="resortimg" />
                            </Col>
                            <Col sm={12} lg={3} xl={3} className='d-none d-md-block'>
                                <img className='resort_pic' src={resortimg4} alt="resortimg" />
                            </Col>
                        </Row>
                        <button onClick={() => setShow(true)} className='picshow_icon'>
                            <ShowpicIcon />
                            Show all photos
                        </button>
                    </div>

                    <div className='nazeki_villa'>
                        <Row>
                            <Col xs={12} xl={6} >
                                <div className='nazeki_info'>
                                    <h2>Nazeki Villa</h2>
                                    <h4>You're eligible for a Genius discount at Nazeki Villa! To save at this property, all you have to do is <span>sign in.</span>
                                    </h4>

                                    <p> Situated 1.5 km from Green Bowl Beach, Nazeki Villa offers a garden, a shared lounge and air-conditioned accommodation with a balcony and free WiFi. The villa provides guests with a terrace, mountain views, a seating area, satellite flat-screen TV, a fully equipped kitchen with a fridge and a dishwasher, and a private bathroom with shower and free toiletries. A microwave, a stovetop and toaster are also available, as well </p>
                                    <div className='villa_info_icon'>
                                        <span>Read more</span>
                                        <GrouparrowIcon />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} xl={6}>

                                <h3>Property information</h3>

                                <div className='room_info'>
                                    <ul>
                                        <li><p>Type</p></li>
                                        <li> <ResortIcon /></li>
                                        <li>Resort</li>
                                    </ul>
                                    <ul>
                                        <li><p> Bedrooms</p></li>
                                        <li><BedIcon /></li>
                                        <li>3 Bedrooms</li>
                                    </ul>
                                    <ul>
                                        <li><p>Size</p></li>
                                        <li><SizeIcon /></li>
                                        <li>3,500 sqft</li>
                                    </ul>
                                </div>

                            </Col>

                        </Row>
                    </div>
                    <div className='villa_sarvice'>
                        <ul>
                            <li><img className='resort_pic' src={outdoorimg} alt="outdoorimg" />Shared outdoor pool</li>
                            <li><img src={kitchenimg} alt="kitchenimg" />Kitchen</li>
                            <li><img src={wifiimg} alt="wifiimg" />Wifi</li>
                            <li><img className='resort_pic' src={workspaceimg} alt="workspaceimg" />Dedicated Workspace</li>
                            <li><img src={hdtvimg} alt="hdtvimg" />40” HDTV</li>
                            <li><img src={freewasherimg} alt="freewasherimg" />Free washer</li>
                            <li><img className='resort_pic' src={airconditioningimg} alt="airconditioningimg" />freewasherimg</li>
                            <li><img src={petallowedimg} alt="petallowedimg" />Pet allowed</li>
                        </ul>
                    </div>                    
                    <PropertyListCard />
                </Container>
                <div className='map_sec'>
                    <Row className='mx-0'>
                        <Col xs={12} lg={4} className='d-flex px-0'>
                            <div className='map_content w-100'>
                                <p>Address</p>
                                <h2>Kunang Kunang Tent Resort</h2>
                                <h3>Labuan Bajo, Kec. Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Tim. 86554, Indonesia</h3>
                            </div>
                        </Col>
                        <Col xs={12} lg={8} className='d-flex px-0'>
                            <div className='map_pic w-100'>
                                <img src={mapimg} alt="mapimg" />
                            </div>
                        </Col>
                    </Row>
                </div>

                <Destinations />
            </div>            
            <NazekiVillaModal
                show={show}
                handleClose={() => setShow(false)}
            />
        </>
    )
}

export default ResortDetails

