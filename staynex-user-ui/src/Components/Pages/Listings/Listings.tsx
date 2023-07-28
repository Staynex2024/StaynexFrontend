import React, { useState } from 'react'
import "./Listings.scss"
import { Col, Container, Dropdown, Form, Pagination, Row } from 'react-bootstrap'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'
import Checkbox from '../../Common/FormInputs/Checkbox'
import InputCustom from '../../Common/Inputs/InputCustom'
import { CrosscircleIcon, FilterIcon, FilterToggleIcon } from '../../../Assets/Images/svgImgs/svgImgs'
import ListingCard from '../../Common/ListingCard/ListingCard'
import CommonButton from '../../Common/CommonButton/CommonButton'
import RangeSlider from '../../Common/RangeSlider/RangeSlider'

const Listings = () => {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };
    const fliterlist = [
        { name: "Our top picks", },
        { name: "Most popular", },
        { name: "Price (lowest first)", },
    ];
    return (
        <>
            <div className='Listings'>
                <section className='Listings_Banner'>
                    <Container>
                        <Row className='align-items-center'>
                            <Col xs={12} md={7}>
                                <CommonHeading
                                    className='text_size mb-0'
                                    heading='Showing results for ‘Bali, Indonesia’'
                                    paragraph='Over 500 properties'
                                />
                            </Col>
                            <Col xs={12} md={5}>
                                <div className='common_search mt-5 mt-md-0'>
                                    <Form.Control type="text" placeholder="Search" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className={isActive ? 'Listings_Filter openFilter' : "Listings_Filter"}>
                    <Container>
                        <div className='Listings_Filter_Btns d-flex align-items-center justify-content-between justify-content-xl-end mb-5'>
                            <span className='filter_toggle d-block d-xl-none' onClick={toggleClass} ><FilterToggleIcon /></span>
                            <Dropdown className='filter_Dropdown'>
                                <Dropdown.Toggle className='filter_btn' variant="" id="dropdown-basic">Sort by: Our top picks <FilterIcon /></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {fliterlist.map((data, i) => {
                                        return (
                                            <Dropdown.Item key={i} href="#">
                                                <span>{data.name}</span>
                                            </Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <Row className='gx-5'>
                            <Col xs={12} xl={3}>
                                <div className='listing_filter_box'>
                                    <div className='Flietr_mobile_header d-block d-xl-none text-center'>
                                        <span onClick={toggleClass} className='Close_filter_btn'><CrosscircleIcon /></span>
                                        <h5>Filters</h5>
                                    </div>
                                    <div className='listing_filter_centerbox'>
                                        <h5>Your search</h5>
                                        <h2>Bali, Indonesia</h2>
                                        <h4>33 accomadations</h4>

                                        <div className='listing_filter_box_Inner'>
                                            <h5>Price range</h5>
                                            <RangeSlider />
                                        </div>
                                        <div className='listing_filter_box_Inner'>
                                            <h5>Property type</h5>
                                            <Checkbox label="Resorts" />
                                            <Checkbox label="Hotels" />
                                            <Checkbox label="Villas & mansions" />
                                            <Checkbox label="Boutique hotels" />
                                        </div>
                                        <div className='listing_filter_box_Inner'>
                                            <h5>No of rooms</h5>
                                            <InputCustom
                                                type="text"
                                                placeholder="2 Bedrooms"
                                                name=""
                                            />
                                        </div>
                                        <div className='listing_filter_box_Inner'>
                                            <h5>Unit size</h5>
                                            <InputCustom
                                                type="text"
                                                placeholder=">2,500 sqft"
                                                name=""
                                            />
                                        </div>
                                        <div className='listing_filter_box_Inner'>
                                            <h5>Number of nights</h5>
                                            <InputCustom
                                                type="text"
                                                placeholder="30"
                                                name=""
                                            />
                                        </div>
                                    </div>
                                    <div className='Flietr_mobile_footer d-flex justify-content-between align-items-center d-xl-none'>
                                        <h5>Clear all</h5>
                                        <CommonButton title="Show properties" />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} xl={9} className=''>
                                <ListingCard />
                                <Pagination className='mt-5 justify-content-center'>
                                    <Pagination.Prev />
                                    <Pagination.Item className='active'>{1}</Pagination.Item>
                                    <Pagination.Item>{2}</Pagination.Item>
                                    <Pagination.Item>{3}</Pagination.Item>
                                    <Pagination.Item>{4}</Pagination.Item>
                                    <Pagination.Item>{5}</Pagination.Item>
                                    <Pagination.Item>{6}</Pagination.Item>
                                    <Pagination.Next />
                                </Pagination>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default Listings

