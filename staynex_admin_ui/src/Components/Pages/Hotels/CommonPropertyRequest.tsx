import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import CommonButton from '../../Common/CommonButton/CommonButton'
import Swal from 'sweetalert2'
import { callApiGetMethod, callApiPostMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import { useDispatch } from 'react-redux'
import toaster from '../../Common/Toast'
import { Col, Row } from 'react-bootstrap'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'


const CommonPropertyRequest = () => {
    const dispatch: any = useDispatch()

    const [pendingPropertyList, setPendingPropertyList]: any = useState([])
    const [checkStatus, setCheckStatus] = useState(false)


    useEffect(() => {
        setCheckStatus(false)
        //Get partnerReqestList function
        const retreivePartnerRequestList = async () => {
            const result = await dispatch(
                callApiGetMethod(
                    APIURL.PENDING_PROPERTY_REQUESTLIST,
                    { page: 1, limit: 1, search: '' },
                    true,
                    false,
                ),
            )
            setPendingPropertyList(result?.data)
        }

        retreivePartnerRequestList()
        // eslint-disable-next-line
    }, [checkStatus])

    const handleAction = async (type: string, item: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Accepted!',
        }).then(async (result) => {
            if (result.isConfirmed && type === 'accepted') {
                const result = await dispatch(
                    callApiPostMethod(
                        APIURL.ACTION_PARTNER_PROPERTY,
                        { email: item?.user?.email, action: type, message: '' },
                        {},
                        true,
                    ),
                )
                if (result?.statusCode === 200) {
                    setCheckStatus(true)
                } else if (result?.statusCode === 400) {
                    setCheckStatus(true)
                }
            } else if (result.isConfirmed && type === 'rejected') {
                Swal.fire({
                    title: 'Rejecting Request Of Property!',
                    text: 'Reason for Rejecting',
                    icon: 'warning',
                    input: 'text',
                    showCancelButton: true,
                }).then(async (result) => {
                    if (result.value) {
                        const res = await dispatch(
                            callApiPostMethod(
                                APIURL.ACTION_PARTNER_PROPERTY,
                                {
                                    email: item?.user?.email,
                                    action: type,
                                    message: result.value,
                                },
                                {},
                                true,
                            ),
                        )
                        if (res?.statusCode === 200) {
                            setCheckStatus(true)
                        } else if (res?.statusCode === 400) {
                            setCheckStatus(true)
                        }
                    } else {
                        toaster.error('Please mention reason before rejecting')
                    }
                })
            }
        })
    }

    // date
    const getDate = (date: any) => {
        const givenDate = moment(date);
        const now = moment();
        const timeFromNow = givenDate.from(now);
        return timeFromNow
    }

    return (
        <>
            <div className="property_approval mb-5 p-4 p-md-5 border rounded">
                {pendingPropertyList && pendingPropertyList.length > 0
                    ?
                    <Row>
                        <Col xs={12} md={4} xl={5}>
                            <CommonHeading heading="Property pending approval" />
                            <span>{pendingPropertyList[0]?.name ? `${pendingPropertyList[0]?.name} was created ${getDate(pendingPropertyList[0]?.createdAt)}` : ""}</span>
                        </Col>
                        <Col xs={12} md={8} xl={7}>
                            <div className="tables_btn flex-wrap d-sm-flex align-items-center justify-content-md-end mt-4 mt-md-0">
                                <>
                                    <Link to="/auth/members?tab=properties" className="viewbtn btn-style border-btn">
                                        View all
                                    </Link>
                                    {pendingPropertyList[0]?.verification === 'pending' ? (
                                        <>
                                            <CommonButton
                                                title="Reject"
                                                className="dark-greenbtn my-3 my-sm-0 mx-md-4"
                                                onClick={() => handleAction('rejected', pendingPropertyList[0])}
                                            />
                                            <CommonButton
                                                title="Approve"
                                                className="btncreate"
                                                onClick={() => handleAction('accepted', pendingPropertyList[0])}
                                            />
                                        </>
                                    ) : pendingPropertyList[0]?.verification === 'rejected' ? (
                                        <span
                                            className="fa fa-close"
                                            style={{
                                                marginLeft: '8px',
                                                color: 'red',
                                            }}
                                        >
                                            Rejected
                                        </span>
                                    ) : (
                                        <span
                                            className="fa fa-check"
                                            style={{
                                                marginLeft: '8px',
                                                color: 'green',
                                            }}
                                        >
                                            Accepted
                                        </span>
                                    )}
                                </>
                            </div>
                        </Col>
                    </Row>
                    : ""
                }
                {/* <CustomTable fields={fields}>
                    {pendingPropertyList &&
                        pendingPropertyList.length &&
                        pendingPropertyList.map((item: any, key: any) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>
                                    {item?.invited_name
                                        ? item?.invited_name?.charAt(0).toUpperCase() +
                                        item?.invited_name?.slice(1).toLowerCase()
                                        : '---'}{' '}
                                </td>
                                <td>{item?.email_id ? item?.email_id : '---'}</td>
                                <td>
                                    {item?.createdAt
                                        ? moment(item?.createdAt)
                                            .utc()
                                            .format('dddd, MMMM D, YYYY, hh:mm:ss A')
                                        : '---'}
                                </td>
                                <td>
                                    {item?.invite_code ? item?.invite_code : '---'}
                                    {item?.invite_code ? (
                                        <i
                                            style={{
                                                cursor: 'pointer',
                                                marginLeft: '8px',
                                                color: 'black',
                                            }}
                                            title="copy"
                                            className="fa fa-clone"
                                            onClick={() =>
                                                copy(item?.invite_code, 'Invite code copied')
                                            }
                                        ></i>
                                    ) : (
                                        ''
                                    )}
                                </td>
                                <td>
                                    <div className="tables_btn">
                                        <>
                                            <Link to="/auth/members?tab=vendor_request" className="viewbtn">
                                                View all
                                            </Link>
                                            {item?.invitation_status === 'pending' ? (
                                                <>
                                                    <CommonButton
                                                        title="Reject"
                                                        className="dark-greenbtn"
                                                        onClick={() => handleAction('rejected', item, 'vendorRequest')}
                                                    />
                                                    <CommonButton
                                                        title="Approve"
                                                        className="btncreate"
                                                        onClick={() => handleAction('accepted', item, 'vendorRequest')}
                                                    />
                                                </>
                                            ) : item?.invitation_status === 'rejected' ? (
                                                <span
                                                    className="fa fa-close"
                                                    style={{
                                                        marginLeft: '8px',
                                                        color: 'red',
                                                    }}
                                                >
                                                    Rejected
                                                </span>
                                            ) : (
                                                <span
                                                    className="fa fa-check"
                                                    style={{
                                                        marginLeft: '8px',
                                                        color: 'green',
                                                    }}
                                                >
                                                    Accepted
                                                </span>
                                            )}
                                        </>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </CustomTable> */}
            </div>
        </>
    )
}

export default CommonPropertyRequest