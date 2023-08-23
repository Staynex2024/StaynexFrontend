import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GreentickIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';
import Passes1 from '../../../../../Assets/Images/Passes1.png';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callApiGetMethod } from '../../../../../Redux/Actions/api.action';
import { APIURL } from '../../../../../Utils';
// import Swal from 'sweetalert2';
// import toaster from '../../../../Common/Toast';

const Passes = () => {
    const dispatch: any = useDispatch();

    function useQuery() {
        const { search } = useLocation()
        return React.useMemo(() => new URLSearchParams(search), [search])
    }

    let query = useQuery()

    const [passList, setPassList] = useState({})
    // const [isUnList, setIsUnlist] = useState(false)


    useEffect(() => {
        // get PassesList function
        const retreivePassesList = async () => {
            const result = await dispatch(
                callApiGetMethod(
                    APIURL.PASS_DETAILS,
                    {
                        User_id: query.get('userId'),
                        Pass_id: query.get('passId'),
                        Property_id: query.get('propertyId'),
                    },
                    true,
                    false,
                ),
            )
            setPassList(result?.data)
        }

        retreivePassesList()
        // eslint-disable-next-line
    }, [query])


    // const handleAction = async (type: string) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'info',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, Confirm!',
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             setIsUnlist(false)
    //             let dataToSend = {
    //                 list: type === "true" ? true : false,
    //                 User_id: Number(query.get('userId')),
    //                 Pass_id: Number(query.get('passId')),
    //                 Property_id: Number(query.get('propertyId'))
    //             }
    //             let result = await dispatch(
    //                 callApiPostMethod(APIURL.LIST_DELIST_PASS, dataToSend, {}, false),
    //             )
    //             if (result?.statusCode === 201) {
    //                 toaster.success(result?.message)
    //                 setIsUnlist(true)
    //             } else if (result?.statusCode === 400) {
    //                 toaster.error(result?.message)
    //                 setIsUnlist(false)
    //             }
    //         }
    //     })
    // }
    return (
        <>
            <section className='passes'>
                <Row>
                    {
                        passList && Object.keys(passList).length > 0 &&
                        <Col xl={3} lg={6} md={6}>
                            <div className='passes_card'>
                                <div className='passes_card_imageinfo'>
                                    <img src={Passes1} alt='card_image' />
                                    <h6>{(passList['total_copies'] - passList['total_sold']) + `/` + passList['total_copies']}</h6>
                                </div>
                                <div className='passes_card_textinfo'>
                                    <h5>{passList['redeemable_nights'] ? `SP${passList['redeemable_nights']}` : "---"}</h5>
                                    <p>{passList['redeemable_nights'] ? `${passList['redeemable_nights']}-day express pass` : "---"}</p>
                                    <ul className='textlist'>
                                        <li>
                                            <label>Redeemable Nights</label>
                                            <p>{passList['tier_number'] ? `${passList['tier_number']}x nights per year` : "---"}</p>
                                        </li>
                                        <li>
                                            <label>Total Redeemable</label>
                                            <p>{passList['redeemable_nights'] ? `${passList['redeemable_nights'] * 10} nights` : "---"}</p>
                                        </li>
                                    </ul>
                                    <hr className='linespace' />
                                    <div className='offierinfo'>
                                        <label>Perks</label>
                                        {passList['perks'] && passList['perks'].map((item: any, index: any) => (
                                            <p>{item}</p>
                                        ))}
                                    </div>
                                    <h3>{passList['price'] ? `$ ${passList['price']}` : '---'}</h3>
                                    <div className='listedbtn'>
                                        {
                                            passList['approval'] === "pending"
                                                ?
                                                <span className='pending_pass'>Pending Approval</span>
                                                : passList['approval'] === "accepted" && passList['listing_status'] === "unlisted"
                                                    ?
                                                    <>
                                                        {/* <button type='button' className='active' onClick={() => handleAction('true')}>LIST</button> */}
                                                        {/* <button onClick={() => handleAction('false')}>UNLIST</button> */}
                                                        <span className="fa fa-times text-red delist_pass">&nbsp;UNLISTED</span>
                                                    </>
                                                    : passList['approval'] === "accepted" && passList['listing_status'] === "listed"
                                                        ?
                                                        <>
                                                            <span className='listed_check'>Listed <GreentickIcon /></span>
                                                            {/* <button onClick={() => handleAction('false')}>UNLIST</button> */}
                                                        </>
                                                        : passList['approval'] === "accepted" && passList['listing_status'] === "delisted"
                                                            ?
                                                            <>
                                                                {/* <button className='active' onClick={() => handleAction('true')}>LIST</button> */}
                                                                {/* <button onClick={() => handleAction('false')}>UNLIST</button> */}
                                                                <span className='text-red delist_pass fa fa-times'>&nbsp;DELISTED</span>
                                                            </>
                                                            :
                                                            passList['approval'] === "rejected"
                                                                ?
                                                                <span className='rejected_pass'>Pass Request Rejected</span>
                                                                : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    }
                </Row>
            </section>
        </>
    )
}

export default Passes