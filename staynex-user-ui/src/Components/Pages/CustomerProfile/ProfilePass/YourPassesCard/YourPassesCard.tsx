import React, { useEffect, useState } from 'react'
import CommonButton from '../../../../Common/CommonButton/CommonButton'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { FilterIcon, FilterToggleIcon } from '../../../../../Assets/Images/svgImgs/svgImgs'
import passimg from "../../../../../Assets/Images/pass-ticket1.svg"
import "./YourPassesCard.scss"
import RedeemModal from '../RedeemHistoryCard/RedeemModal/RedeemModal'
import CancelBookingModal from '../RedeemHistoryCard/CancelBookingModal/CancelBookingModal'
import CustomSelect from '../../../../Common/Select/Select'
import Checkbox from '../../../../Common/FormInputs/Checkbox'

const YourPassesCard = ({ customerData }: any) => {
    const [show, setShow] = useState(false);
    const [isActive, setActive] = useState(false);
    const [showcancel, setShowcancel] = useState(false);
    const [propertyData, setPropertyData] = useState([])
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
    useEffect(() => {
        if (customerData && Object.keys(customerData).length > 0) {
            setPropertyData(customerData['user']['property'])
        }
    }, [customerData])
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
                    {propertyData && propertyData.length > 0
                        ? ticketdata.map((data, i) => {
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
                        }) :
                        <div className="empty_msg text-center">
                            <svg
                                width="40"
                                height="41"
                                viewBox="0 0 40 41"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M27.3 18.0551C28.0667 18.0551 28.7083 17.7884 29.225 17.2551C29.7417 16.7217 30 16.0884 30 15.3551C30 14.5884 29.7417 13.9467 29.225 13.4301C28.7083 12.9134 28.0667 12.6551 27.3 12.6551C26.5667 12.6551 25.9333 12.9134 25.4 13.4301C24.8667 13.9467 24.6 14.5884 24.6 15.3551C24.6 16.0884 24.8667 16.7217 25.4 17.2551C25.9333 17.7884 26.5667 18.0551 27.3 18.0551ZM12.7 18.0551C13.4667 18.0551 14.1083 17.7884 14.625 17.2551C15.1417 16.7217 15.4 16.0884 15.4 15.3551C15.4 14.5884 15.1417 13.9467 14.625 13.4301C14.1083 12.9134 13.4667 12.6551 12.7 12.6551C11.9667 12.6551 11.3333 12.9134 10.8 13.4301C10.2667 13.9467 10 14.5884 10 15.3551C10 16.0884 10.2667 16.7217 10.8 17.2551C11.3333 17.7884 11.9667 18.0551 12.7 18.0551ZM20 23.8551C17.7667 23.8551 15.7417 24.4801 13.925 25.7301C12.1083 26.9801 10.7667 28.6384 9.9 30.7051H12.55C13.2833 29.3051 14.3167 28.2217 15.65 27.4551C16.9833 26.6884 18.45 26.3051 20.05 26.3051C21.6167 26.3051 23.0583 26.6967 24.375 27.4801C25.6917 28.2634 26.7333 29.3384 27.5 30.7051H30.1C29.2667 28.6051 27.9333 26.9384 26.1 25.7051C24.2667 24.4717 22.2333 23.8551 20 23.8551V23.8551ZM20 40.7051C17.2333 40.7051 14.6333 40.1801 12.2 39.1301C9.76667 38.0801 7.65 36.6551 5.85 34.8551C4.05 33.0551 2.625 30.9384 1.575 28.5051C0.525 26.0717 0 23.4717 0 20.7051C0 17.9384 0.525 15.3384 1.575 12.9051C2.625 10.4717 4.05 8.35508 5.85 6.55508C7.65 4.75508 9.76667 3.33008 12.2 2.28008C14.6333 1.23008 17.2333 0.705078 20 0.705078C22.7667 0.705078 25.3667 1.23008 27.8 2.28008C30.2333 3.33008 32.35 4.75508 34.15 6.55508C35.95 8.35508 37.375 10.4717 38.425 12.9051C39.475 15.3384 40 17.9384 40 20.7051C40 23.4717 39.475 26.0717 38.425 28.5051C37.375 30.9384 35.95 33.0551 34.15 34.8551C32.35 36.6551 30.2333 38.0801 27.8 39.1301C25.3667 40.1801 22.7667 40.7051 20 40.7051ZM20 37.7051C24.7333 37.7051 28.75 36.0551 32.05 32.7551C35.35 29.4551 37 25.4384 37 20.7051C37 15.9717 35.35 11.9551 32.05 8.65508C28.75 5.35508 24.7333 3.70508 20 3.70508C15.2667 3.70508 11.25 5.35508 7.95 8.65508C4.65 11.9551 3 15.9717 3 20.7051C3 25.4384 4.65 29.4551 7.95 32.7551C11.25 36.0551 15.2667 37.7051 20 37.7051Z"
                                    fill="black"
                                />
                            </svg>
                            <h2>Looks like you don’t have any passes yet</h2>
                            <p>Your SPs will show here</p>
                            <CommonButton title="Own a StaynexPass" className="empty_btn" />
                        </div>


                    }
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