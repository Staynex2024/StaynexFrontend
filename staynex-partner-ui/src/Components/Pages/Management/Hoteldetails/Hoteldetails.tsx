import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GreentickIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import CommonButton from '../../../Common/CommonButton/CommonButton';
import CommonHeading from '../../../Common/CommonHeading/CommonHeading';
import SliderImage from '../../Booking/Component/SliderImage';
import Account from './Component/Account';
import Passes from './Component/Passes';
import Propertydetail from './Component/Propertydetail';
import Stats from './Component/Stats';
import './Hoteldetails.scss';

const Hoteldetails = () => {
    const listspno = [
        { sptitle: 'SP7', }, { sptitle: 'SP14', }, { sptitle: 'SP28', }, { sptitle: 'SP32', },
    ]
    return (
        <>
            <section className='hotel_details'>
                <div className='top_head'>
                    <CommonButton title="Save" className="save_btn" />
                </div>
                <div className='hotel_details_section'>
                    {/* <Tabs
                        defaultActiveKey="propertydetail"
                        id="uncontrolled-tab-example"
                        className="tabs_section"
                    >
                        <Tab eventKey="propertydetail" title="Property Detail">
                            <Propertydetail />
                        </Tab>
                        <Tab eventKey="passes" title="Passes">
                            <Passes />
                        </Tab>
                        <Tab eventKey="account" title="Account">
                            <Account />
                        </Tab>
                        <Tab eventKey="stats" title="Stats">
                            <Stats />
                        </Tab>
                    </Tabs> */}
                    <div className='hotel_details_section_cards'>
                        <div className='top_headbtn'>
                            <button className='active'>LISTED <GreentickIcon /></button>
                            <button >UNLIST</button>
                        </div>
                        <div className='main_containt'>
                            <div className='main_containt_left'>
                                <SliderImage />
                            </div>
                            <div className='main_containt_right'>
                                <div className='right_textsec'>
                                    <h3>$4,300</h3>
                                    <h4>Kunang Kunang Tent Resort</h4>
                                    <p>Indonesia</p>
                                    <ul className='list_text'>
                                        {listspno.map((item) => (
                                            <li>
                                                <span>{item.sptitle}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='resort_contact'>
                                        <div className='resort_number'>
                                            <label>Resort Contact</label>
                                            <p>+61 120 3874 4949</p>
                                        </div>
                                        <p>hello@kunangkunang.com</p>
                                    </div>
                                </div>
                                <div className='right_btnsec'>
                                    <Link to='/auth/hotel-details'>See Details</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Propertydetail />
                </div>
            </section>
        </>
    )
}

export default Hoteldetails