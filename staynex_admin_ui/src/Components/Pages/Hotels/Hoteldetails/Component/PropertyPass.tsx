import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { GreentickIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';
import Passes1 from '../../../../../Assets/Images/Passes1.png';

const PropertyPass = ({ data, handleAction }: any) => {

    return (
        <>
            <section className='passes'>
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
                                                            <button className='active' onClick={() => handleAction('true', item)}>LIST</button>
                                                            {/* <button onClick={() => handleAction('false')}>UNLIST</button> */}
                                                            <span >DELIST</span>
                                                        </>
                                                        : item?.approval === "accepted" && item?.listing_status === "listed"
                                                            ?
                                                            <>
                                                                <span className='listed_check'>Listed <GreentickIcon /></span>
                                                                <button onClick={() => handleAction('false', item)}>UNLIST</button>
                                                            </>
                                                            : item?.approval === "accepted" && item?.listing_status === "delisted"
                                                                ?
                                                                <>
                                                                    <button className='active' onClick={() => handleAction('true', item)}>LIST</button>
                                                                    {/* <button onClick={() => handleAction('false')}>UNLIST</button> */}
                                                                    <span className='text-red delist_pass'>DELISTED</span>
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