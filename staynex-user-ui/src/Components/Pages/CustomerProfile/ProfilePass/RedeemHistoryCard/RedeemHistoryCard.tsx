import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { FilterIcon, FilterToggleIcon, SmallArrowIcon } from '../../../../../Assets/Images/svgImgs/svgImgs'
import passimg from "../../../../../Assets/Images/pass-ticket1.svg"
import passimg1 from "../../../../../Assets/Images/pass-ticket2.svg"
import "./RedeemHistoryCard.scss"
import Checkbox from '../../../../Common/FormInputs/Checkbox'
import CustomSelect from '../../../../Common/Select/Select'
import { callApiGetMethod } from '../../../../../Redux/Actions/api.action'
import { APIURL } from '../../../../../Utils'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { handleConversion } from "../../../../../Services/common.service";


const RedeemHistoryCard = ({ customerData }) => {
    const dispatch: any = useDispatch()
    const [isActive, setActive] = useState(false);
    const [redeemHistory, setRedeemHistory] = useState([])


    const conversionRate = useSelector((state: any) => state.user.conversionRate)
    const currencySymobl = useSelector((state: any) => state.user.currencySymbol)

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


    useEffect(() => {
        const handleRedeemHistory = async () => {
            const result = await dispatch(callApiGetMethod(APIURL.REDEEM_HISTORY, { userId: customerData?.user?.id }, true, false))
            setRedeemHistory(result?.data)
        }

        handleRedeemHistory()
    }, [])

    // customerData?.user?.id
    // console.log('customerData?.user?.id :>> ', customerData?.user?.id);
    // console.log(' :>> ', redeemHistory);

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
                    {redeemHistory && redeemHistory?.length > 0 ? redeemHistory.map((data: any, i) => {
                        return (
                            <div className='Redeem_passbox' key={i}>
                                <Row className='align-items-center'>
                                    <Col xs={12} lg={3} className='d-flex pe-lg-0'>
                                        <div className='Profile_passbox_ticket w-100'>
                                            <img src={data?.userPass?.pass?.bg_image} alt='' />
                                        </div>
                                    </Col>
                                    <Col xs={12} lg={9} className='flex ps-lg-0'>
                                        <div className='Profile_passbox_details w-100'>
                                            <h2><span className='text-org'>{data?.userPass?.totalNightsRedeemed}</span> nights in  {data?.userPass?.pass?.property?.name}</h2>
                                            <h6 className='ticket_date'>Redeemed on { moment(data?.createdAt).format("D MMMM YYYY, hh:mm:ss A")}</h6>
                                            <div className='ticket_from_to border-bottom d-flex flex-wrap align-items-center'>
                                                <div>
                                                    <span>From</span>
                                                    <h5>{moment(data?.checkIn).format("D MMMM YYYY")}</h5>
                                                    <p>{moment(data?.checkIn).format('dddd')}</p>
                                                </div>
                                                <div className='mx-5'><SmallArrowIcon /></div>
                                                <div>
                                                    <span>To</span>
                                                    <h5>{moment(data?.checkOut).format("D MMMM YYYY")}</h5>
                                                    <p>{moment(data?.checkOut).format('dddd')}</p>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-wrap'>
                                                <ul className='me-md-5 pe-md-5'>
                                                    <li>
                                                        <span>Pass type</span>
                                                        <p>{`SP${data?.userPass?.pass?.tier_number}`}</p>
                                                    </li>
                                                    <li>
                                                        <span>Remaining night(s)</span>
                                                        <p>{data?.userPass?.availableNights}</p>
                                                    </li>
                                                </ul>
                                                <ul className='border-0'>
                                                    <li>
                                                        <span>Price</span>
                                                        <p>{handleConversion(conversionRate, data?.userPass?.pass?.price) + ' ' + currencySymobl}</p>
                                                    </li>
                                                    <li>
                                                        <span>Room type</span>
                                                        <p>Deluxe King Room Ensuite</p>
                                                    </li>
                                                    <li>
                                                        <span>Contact</span>
                                                        <p>{data?.bookingEmail ? data?.bookingEmail : ""}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }): ""}
                </div>
            </div>
        </>
    )
}

export default RedeemHistoryCard