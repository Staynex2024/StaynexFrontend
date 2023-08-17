import React, { useState } from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { FilterIcon, FilterToggleIcon, SmallArrowIcon } from '../../../../../Assets/Images/svgImgs/svgImgs'
import passimg from "../../../../../Assets/Images/pass-ticket1.svg"
import passimg1 from "../../../../../Assets/Images/pass-ticket2.svg"
import "./RedeemHistoryCard.scss"
import Checkbox from '../../../../Common/FormInputs/Checkbox'
import CustomSelect from '../../../../Common/Select/Select'

const RedeemHistoryCard = () => {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };
    const fliterlist = [
        { name: 'Recent' },
        { name: "A-Z", },
        { name: "Z-A", },
    ];
    const ticketdata = [
        {
            passimg: passimg,
            title: 'nights in Nazeki Villa',
        },
        {
            passimg: passimg1,
            title: 'nights in Kunang Kunang Tent Resort',
        },
    ];
    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ]

    return (
        <>
            <div className='tabs_innerContent RedeemHistory_Card'>
                <h2>Redeem History</h2>
                <div className={isActive ? 'tabs_innerContent openFilter' : "tabs_innerContent"}>
                    <div className='Listings_Filter_Btns d-flex align-items-center justify-content-between'>
                        <Dropdown className='filter_Dropdown filter_items_Dropdown'>
                            <Dropdown.Toggle className='filter_btn' variant="" id="dropdown-basic"><FilterToggleIcon /> Filter</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className='filter_items_box'>
                                    <h5>Destination</h5>
                                    <CustomSelect
                                        classgroup=""
                                        options={options}
                                    />
                                </div>
                                <div className='filter_items_box'>
                                    <h5>Property type</h5>
                                    <Checkbox label="Resorts" />
                                    <Checkbox label="Hotels" />
                                    <Checkbox label="Villas & mansions" />
                                    <Checkbox label="Boutique hotels" />
                                </div>
                                {/* <Dropdown.Item></Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className='filter_Dropdown'>
                            <Dropdown.Toggle className='filter_btn' variant="" id="dropdown-basic"><span className='me-2'>Sort by:</span> A-Z <FilterIcon /></Dropdown.Toggle>
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
                </div>
                <div className='Profile_passbox'>
                    {ticketdata.map((data, i) => {
                        return (
                            <div className='Redeem_passbox' key={i}>
                                <Row className='align-items-center'>
                                    <Col xs={12} lg={3} className='d-flex pe-lg-0'>
                                        <div className='Profile_passbox_ticket w-100'>
                                            <img src={data.passimg} alt='' />
                                        </div>
                                    </Col>
                                    <Col xs={12} lg={9} className='flex ps-lg-0'>
                                        <div className='Profile_passbox_details w-100'>
                                            <h2><span className='text-org'>10</span> {data.title}</h2>
                                            <h6 className='ticket_date'>Redeemed on 10 January 2023, 8.00PM</h6>
                                            <div className='ticket_from_to border-bottom d-flex flex-wrap align-items-center'>
                                                <div>
                                                    <span>From</span>
                                                    <h5>12 Jan 2023</h5>
                                                    <p>Saturday</p>
                                                </div>
                                                <div className='mx-5'><SmallArrowIcon /></div>
                                                <div>
                                                    <span>To</span>
                                                    <h5>22 Jan 2023</h5>
                                                    <p>Sunday</p>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-wrap'>
                                                <ul className='me-md-5 pe-md-5'>
                                                    <li>
                                                        <span>Pass type</span>
                                                        <p>SP7</p>
                                                    </li>
                                                    <li>
                                                        <span>Remaining night(s)</span>
                                                        <p>4</p>
                                                    </li>
                                                </ul>
                                                <ul className='border-0'>
                                                    <li>
                                                        <span>Price</span>
                                                        <p>$4,999</p>
                                                    </li>
                                                    <li>
                                                        <span>Room type</span>
                                                        <p>Deluxe King Room Ensuite</p>
                                                    </li>
                                                    <li>
                                                        <span>Contact</span>
                                                        <p>hello@nazeki.com</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default RedeemHistoryCard