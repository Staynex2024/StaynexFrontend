import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { GreentickIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';
import Passes1 from '../../../../../Assets/Images/Passes1.png';
import CommonHeading from '../../../../Common/CommonHeading/CommonHeading';
import moment from 'moment';
import { Link } from 'react-router-dom';
import CommonButton from '../../../../Common/CommonButton/CommonButton';
// import { useDispatch } from 'react-redux';

const PropertyPass = ({ data, handleAction }: any) => {

    // date
    const getDate = (date: any) => {
        const givenDate = moment(date);
        const now = moment();
        const timeFromNow = givenDate.from(now);
        return timeFromNow
    }

    // const handleAction = async (item: any, data: any, type: string) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, Accepted!',
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             const result = await dispatch(
    //                 callApiPostMethod(
    //                     APIURL.ACTION_ON_PASS,
    //                     {
    //                         User_id: data?.user?.id,
    //                         Pass_id: item?.id,
    //                         Property_id: item?.id,
    //                         action: type,
    //                         message: ''
    //                     },
    //                     {},
    //                     true,
    //                 ),
    //             )
    //             if (result?.statusCode === 200) {
    //                 // setCheckStatus(true)
    //             } else if (result?.statusCode === 400) {
    //                 // setCheckStatus(true)
    //             }
    //         }
    //     })
    // }

    return (
        <>
            <section className='passes'>
                {data?.passes && data?.passes.length > 0 ?
                    data?.passes.map((item: any, index: number) => (
                        item?.approval === 'pending' &&
                        <div className="property_approval mb-5 p-4 p-md-5 border rounded">
                            <Row>
                                <Col xs={12} md={4} xl={5}>
                                    <CommonHeading heading="Passes pending approval" />
                                    <span>{item?.approval === 'pending' ? `${data?.name} created a new pass ${getDate(item?.createdAt)}` : ""}</span>
                                </Col>
                                <Col xs={12} md={8} xl={7}>
                                    <div className="tables_btn flex-wrap d-sm-flex align-items-center justify-content-md-end mt-4 mt-md-0">
                                        <>
                                            <Link to="/auth/members?tab=passes" className="viewbtn btn-style border-btn">
                                                View all
                                            </Link>
                                            {item?.approval === 'pending' && (
                                                <>
                                                    <CommonButton
                                                        title="Reject"
                                                        className="dark-greenbtn my-3 my-sm-0 mx-md-4"
                                                        onClick={() => handleAction(item, data, 'rejected')}
                                                    />
                                                    <CommonButton
                                                        title="Approve"
                                                        className="btncreate my-3 my-sm-0 mx-md-4"
                                                        onClick={() => handleAction(item, data, 'accepted')}
                                                    />
                                                </>
                                            )}
                                        </>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                    )) : ""}
                <Row>
                    {data?.passes && data?.passes.length > 0 ?
                        data?.passes.map((item: any, index: number) => (
                            <Col xl={3} lg={6} md={6} key={index} className="d-flex">
                                <div className='passes_card w-100'>
                                    <div className='passes_card_imageinfo'>
                                        <img src={Passes1} alt='card_image' />
                                        <h6>{(item?.total_copies - item?.total_sold) + '/' + item?.total_copies}</h6>
                                    </div>
                                    <div className='passes_card_textinfo'>
                                        <h5>{(item?.redeemable_nights || item?.tier_number) ? `SP${item?.redeemable_nights}` : "---"}</h5>
                                        <p>{(item?.redeemable_nights || item?.tier_number) ? `${item?.redeemable_nights}-day express pass` : "---"}</p>
                                        <ul className='textlist'>
                                            <li>
                                                <label>Redeemable Nights</label>
                                                <p>{item?.redeemable_nights ? `${item?.redeemable_nights}x nights per year` : "---"}</p>
                                            </li>
                                            <li>
                                                <label>Total Redeemable</label>
                                                <p>{item?.redeemable_nights ? `${(item?.redeemable_nights * 10)} nights` : "---"}</p>
                                            </li>
                                        </ul>
                                        <hr className='linespace' />
                                        <div className='offierinfo'>
                                            <label>Perks</label>
                                            {/* {item?.perks && item?.perks.length > 0 && passList['perks'].map((item: any, index: any) => (
                                                <p>{item}</p>
                                            ))} */}
                                            {item?.perks && item?.perks.length > 0 &&
                                                item?.perks.map((item: any, index: number) => (
                                                    <p>{item}</p>
                                                ))}
                                        </div>
                                        <h3>{item?.price ? `$ ${item?.price}` : '---'}</h3>
                                        <div className='listedbtn'>
                                            {
                                                item?.approval === "pending"
                                                    ?
                                                    <span className='pending_pass'>Pending Approval</span>
                                                    : item?.approval === "accepted" && item?.listing_status === "unlisted"
                                                        ?
                                                        <>
                                                            {/* <button className='active' onClick={() => handleAction('true', item)}>LIST</button> */}
                                                            {/* <button onClick={() => handleAction('false')}>UNLIST</button> */}
                                                            <span className="fa fa-times text-red delist_pass">&nbsp;UNLISTED</span>
                                                        </>
                                                        : item?.approval === "accepted" && item?.listing_status === "listed"
                                                            ?
                                                            <>
                                                                <span className='listed_check'>Listed <GreentickIcon /></span>
                                                                {/* <button onClick={() => handleAction('false', item)}>UNLIST</button> */}
                                                            </>
                                                            : item?.approval === "accepted" && item?.listing_status === "delisted"
                                                                ?
                                                                <>
                                                                    {/* <button className='active' onClick={() => handleAction('true', item)}>LIST</button> */}
                                                                    {/* <button onClick={() => handleAction('false')}>UNLIST</button> */}
                                                                    <span className='text-red delist_pass fa fa-times'>&nbsp;DELISTED</span>
                                                                </>
                                                                :
                                                                item?.approval === "rejected"
                                                                    ?
                                                                    <span className='rejected_pass'>Pass Request Rejected</span>
                                                                    : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )) : "No Data Found"}

                </Row>
            </section>
        </>
    )
}

export default PropertyPass