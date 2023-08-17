import React, { useState } from 'react'
import CommonButton from '../../../../Common/CommonButton/CommonButton'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { FilterIcon, FilterToggleIcon } from '../../../../../Assets/Images/svgImgs/svgImgs'
import passimg from "../../../../../Assets/Images/pass-ticket1.svg"
import "./YourPassesCard.scss"
import RedeemModal from '../RedeemHistoryCard/RedeemModal/RedeemModal'
import CancelBookingModal from '../RedeemHistoryCard/CancelBookingModal/CancelBookingModal'
import CustomSelect from '../../../../Common/Select/Select'
import Checkbox from '../../../../Common/FormInputs/Checkbox'

const YourPassesCard = () => {
    const [show, setShow] = useState(false);
    const [isActive, setActive] = useState(false);
    const [showcancel, setShowcancel] = useState(false);
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
            title: 'Nazeki Villa',
        },
        {
            passimg: passimg,
            title: 'Nazeki Villa',
        },
        {
            passimg: passimg,
            title: 'Nazeki Villa',
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
            <div className='tabs_innerContent'>
                <h2>Your Staynex Passes</h2>
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
                            <Row key={i}>
                                <Col xs={12} lg={4} className='d-flex pe-lg-0'>
                                    <div className='Profile_passbox_ticket w-100'>
                                        <img src={data.passimg} alt='' />
                                    </div>
                                </Col>
                                <Col xs={12} lg={8} className='flex ps-lg-0'>
                                    <div className='Profile_passbox_details w-100'>
                                        <h2>{data.title}</h2>
                                        <h6>Bali</h6>
                                        <ul>
                                            <li>
                                                <span>Price</span>
                                                <p>$4,999</p>
                                            </li>
                                            <li>
                                                <span>Resort Contact</span>
                                                <p>+61 120 3874 4949</p>
                                            </li>
                                            <li>
                                                <span></span>
                                                <p>hello@nazeki.com</p>
                                            </li>
                                        </ul>
                                        <ul className='border-0'>
                                            <li>
                                                <span>Pass type</span>
                                                <p>SP7</p>
                                            </li>
                                            <li>
                                                <span>Redeemable nights</span>
                                                <p>3 per year</p>
                                            </li>
                                            <li>
                                                <span>Total redeemable</span>
                                                <p>30 nights</p>
                                            </li>
                                            <li>
                                                <span>Rewards</span>
                                                <p></p>
                                            </li>
                                        </ul>
                                        <div className='btn_group d-flex'>
                                            <CommonButton title="Swap" onClick={() => setShowcancel(true)} className="grey-btn w-50 me-2" />
                                            <CommonButton title="Redeem" onClick={() => setShow(true)} className="w-50 ms-2" />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
            </div>

            <RedeemModal
                show={show}
                handleClose={() => setShow(false)}
            />
            <CancelBookingModal
                show={showcancel}
                handleClose={() => setShowcancel(false)}
            />
        </>
    )
}

export default YourPassesCard