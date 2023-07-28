import React from 'react';
import './ListingCard.scss';
import image1 from "../../../Assets/Images/image2.jpg"
import image2 from "../../../Assets/Images/image2.jpg"
import { Col, Row } from 'react-bootstrap';
import { BathroomIcon, BedroomIcon, NightIcon, NightshelterIcon, SquareareaIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import imgicon1 from "../../../Assets/Images/airconditioning.svg"
import imgicon2 from "../../../Assets/Images/tvstand.svg"
import imgicon3 from "../../../Assets/Images/Amenities.png"
import imgicon4 from "../../../Assets/Images/petallowed.svg"
import imgicon5 from "../../../Assets/Images/hdtv.svg"
import imgicon6 from "../../../Assets/Images/kitchen.svg"
import imgicon7 from "../../../Assets/Images/freewasher.svg"
import imgicon8 from "../../../Assets/Images/wifi.svg"

const ListingCard = () => {
    const destinationlist = [
        { hotelimag: image1, hoteltitle: 'Nazeki Villa', adderss: 'Amber Villa, Indonesia', price: '$4,999', },
        { hotelimag: image2, hoteltitle: 'Nazeki Villa', adderss: 'Amber Villa, Indonesia', price: '$4,999', },
        { hotelimag: image1, hoteltitle: 'Nazeki Villa', adderss: 'Amber Villa, Indonesia', price: '$4,999', },
        { hotelimag: image2, hoteltitle: 'Nazeki Villa', adderss: 'Amber Villa, Indonesia', price: '$4,999', },
        { hotelimag: image1, hoteltitle: 'Nazeki Villa', adderss: 'Amber Villa, Indonesia', price: '$4,999', },
    ]
    return (
        <>
            <div className="Listing_Card">
                {destinationlist.map((data, i) => (
                    <div className='Card_hotel_Box' key={i}>
                        <Row className=''>
                            <Col xs={12} lg={5} className='d-flex pe-lg-0'>
                                <div className='Card_hotel_Box_img w-100'>
                                    <img src={data.hotelimag} alt='hotelimag' />
                                </div>
                            </Col>
                            <Col xs={12} lg={7} className='ps-lg-0 d-flex'>
                                <div className='Card_hotel_Box_content w-100'>
                                    <div className='Card_content_heading'>
                                        <h2>{data.hoteltitle}</h2>
                                        <h5>{data.adderss}</h5>
                                    </div>
                                    <h6>From {data.price}</h6>
                                    <hr />
                                    <div className='Card_hotel_Box_details'>
                                        <ul className='d-flex flex-wrap'>
                                            <li><BedroomIcon /> <span>2 bedrooms</span></li>
                                            <li><BathroomIcon /> <span>2 bathrooms</span></li>
                                            <li><NightIcon /> <span>30 Nights</span></li>
                                            <li><SquareareaIcon /> <span>2300 sqft</span></li>
                                        </ul>
                                        <h4>Description</h4>
                                        <p>See more of Labuan Bajo and spend less time traveling through it, when you stay at Mohini Komodo Resort and experience all the benefits of a truly central location.</p>
                                        <h4>Amenities</h4>
                                        <div className='amenities_icon d-flex'>
                                            <img src={imgicon1} alt="icon" />
                                            <img src={imgicon2} alt="icon" />
                                            <img src={imgicon3} alt="icon" />
                                            <img src={imgicon4} alt="icon" />
                                            <img src={imgicon5} alt="icon" />
                                            <img src={imgicon6} alt="icon" />
                                            <img src={imgicon7} alt="icon" />
                                            <img src={imgicon8} alt="icon" />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
        </div >
        </>
    )
}

export default ListingCard