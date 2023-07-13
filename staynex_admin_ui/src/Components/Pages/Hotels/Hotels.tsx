import React from 'react';
import { Link } from 'react-router-dom';
import { GreentickIcon, SearchIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import CommonHeading from '../../Common/CommonHeading/CommonHeading';
import './Hotels.scss';
import SliderImage from './Component/SliderImage';
import CommonButton from '../../Common/CommonButton/CommonButton';
import { Form } from 'react-bootstrap';
import CustomSelect from '../../Common/Select/Select';

const Hotels = () => {
    const listspno = [
        { sptitle: 'SP7', }, { sptitle: 'SP14', }, { sptitle: 'SP28', }, { sptitle: 'SP32', },
    ]
    const options = [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'USA' },
        { value: 'canada', label: 'Canada' },
        { value: 'russia', label: 'Russia' },
        { value: 'australia', label: 'Australia' },
    ]
    return (
        <>
            <section className='hotels'>
                <div className='hotels_topheader d-sm-flex justify-content-between'>
                    <CommonHeading
                        heading='All Properties'
                        paragraph={<>There is a total of <span>100</span> properties</>}
                    />
                    <Link to="/auth/new-property"><CommonButton title="Add New Property" className="mt-3 mt-sm-0" /></Link>
                </div>
                <div className='hotels_topform d-sm-flex align-items-center mb-4 pb-2'>
                    <div className='Common_search d-flex align-items-center'>
                        <SearchIcon />
                        <Form.Control type="text" placeholder="Search" />
                    </div>
                    <CustomSelect
                        classgroup="hotels_Select ms-md-3"
                        options={options}
                    />
                </div>
                <div className='hotels_section'>
                    <div className='hotels_section_cards'>
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
                </div>
                <div className='hotels_section my-4'>
                    <div className='hotels_section_cards'>
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
                </div>
                <div className='hotels_section'>
                    <div className='hotels_section_cards'>
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
                </div>
            </section>
        </>
    )
}

export default Hotels