import './Dashboard.scss'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'
import React, { useEffect, useState } from 'react'
import CommonButton from '../../Common/CommonButton/CommonButton'
import Dashboardmodal from './Component/Dashboardmodal'
import './Dashboard.scss'
import { Link, useNavigate } from 'react-router-dom'
import CustomTable from '../../Common/Table/Index'
import { useDispatch } from 'react-redux'
import useCopyClipboard from '../../../hooks/useCopyToClipboard'
import moment from 'moment'
import toaster from '../../Common/Toast'
import {
  callApiGetMethod,
  callApiPostMethod,
} from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import Swal from 'sweetalert2'

const Dashboard = () => {
  const dispatch: any = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [partnerList, setPartnerList] = useState([])
  const [partnerPropertyList, setPartnerPropertyList] = useState([])
  const [partnerListCount, setPartnerListCount] = useState(0)
  const [partnerPropertyListCount, setPartnerPropertyListCount] = useState(0)
  const [checkStatus, setCheckStatus] = useState(false)
  const [passRequestList, setPassRequestList] = useState([])
  const [passRequestListCount, setPassRequestListCount] = useState(0)

  // table heading
  const fields = [
    'Sr. No.',
    'Account Name',
    'Email Id',
    'Created At (UTC)',
    'Invite Code',
    'Actions',
  ]
  const propertyFields = [
    'Sr. No.',
    'Property Name',
    'Account Name',
    'Created At (UTC)',
    'Actions',
  ]
  const passfield = [
    'Sr. No.',
    'Property Name',
    'Account Name',
    'Pass type',
    'Created At (UTC)',
    'Actions',
  ]

  const cardlist = [
    { label: 'Total pass sold', value: '18' },
    { label: 'Total pass available', value: '45' },
    { label: 'Nights redeemed', value: '120' },
    { label: 'Total properties', value: '120' },
  ]

  useEffect(() => {
    setCheckStatus(false)
    //Get partnerReqestList function
    const retreivePartnerRequestList = async () => {
      const result = await dispatch(
        callApiGetMethod(
          APIURL.PARTNER_REQUEST_LIST,
          { page: 1, limit: 2, search: '' },
          true,
          false,
        ),
      )
      setPartnerList(result?.data?.data)
      setPartnerListCount(result?.data?.count)
    }

    // get partnerPropertyList function
    const retreivePartnerPropertyList = async () => {
      const result = await dispatch(
        callApiGetMethod(
          APIURL.PARTNER_PROPERTY_REQUEST_LIST,
          { page: 1, limit: 2, search: '' },
          true,
          false,
        ),
      )
      setPartnerPropertyList(result?.data)
      setPartnerPropertyListCount(result?.count)
    }

    // get passesList function
    const retreivePassesRequestList = async () => {
      const result = await dispatch(
        callApiGetMethod(
          APIURL.PASSES_REQUEST_LIST,
          { page: 1, limit: 2, search: '' },
          true,
          false,
        ),
      )
      setPassRequestList(result?.data?.data)
      setPassRequestListCount(result?.data?.count)
    }

    retreivePartnerRequestList()
    retreivePartnerPropertyList()
    retreivePassesRequestList()
    // eslint-disable-next-line
  }, [checkStatus])

  //copy string to clipboard with below code
  const [setCopied] = useCopyClipboard()
  const copy = (data: any, message?: string) => {
    setCopied(data)
    if (message) toaster.success(message)
  }

  const handleAction = async (type: string, item: any, reqType: string) => {
    
    if (reqType === 'vendorRequest') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Confirm!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await dispatch(
            callApiPostMethod(
              APIURL.ACTION_PARTNER_REQUEST,
              { email: item?.email_id, action: type },
              {},
              true,
            ),
          )
          if (result?.statusCode === 200) {
            setCheckStatus(true)
          } else if (result?.statusCode === 400) {
            setCheckStatus(true)
          }
        }
      })
    } else if (reqType === 'propertyRequest') {
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
            title: "Rejecting Request Of Property!",
            text: "Reason for Rejecting",
            icon: 'warning',
            input: 'text',
            showCancelButton: true
          }).then(async (result) => {
            if (result.value) {
              const res = await dispatch(
                callApiPostMethod(
                  APIURL.ACTION_PARTNER_PROPERTY,
                  { email: item?.user?.email, action: type, message: result.value },
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
              toaster.error("Please mention reason before rejecting")
            }
          });
        }
      })
    } else if (reqType === "passRequest") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accepted!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await dispatch(
            callApiPostMethod(
              APIURL.ACTION_ON_PASS,
              {
                User_id: item?.property?.user?.id,
                Pass_id: item?.id,
                Property_id: item?.property?.id,
                action: type,
                message: ''
              },
              {},
              true,
            ),
          )
          if (result?.statusCode === 200) {
            setCheckStatus(true)
          } else if (result?.statusCode === 400) {
            setCheckStatus(true)
          }
        } 
        // else if (result.isConfirmed && type === 'rejected') {
        //   Swal.fire({
        //     title: "Rejecting Request Of Pass!",
        //     text: "Reason for Rejecting",
        //     icon: 'warning',
        //     input: 'text',
        //     showCancelButton: true
        //   }).then(async (result) => {
        //     if (result.value) {
        //       const res = await dispatch(
        //         callApiPostMethod(
        //           APIURL.ACTION_ON_PASS,
        //           {
        //             User_id: item?.property?.user?.id,
        //             Pass_id: item?.id,
        //             Property_id: item?.property?.id,
        //             action: type,
        //             message: result.value,
        //           },
        //           {},
        //           true,
        //         ),
        //       )
        //       if (res?.statusCode === 200) {
        //         setCheckStatus(true)
        //       } else if (res?.statusCode === 400) {
        //         setCheckStatus(true)
        //       }
        //     } else {
        //       toaster.error("Please mention reason before rejecting")
        //     }
        //   });
        // }
      })
    }
  }

  const propertyInfo = async (item: any) => {
    const vendorEmail: string = item?.user?.email
    navigate('/auth/hotel-details/' + vendorEmail)
  }

  const handlePassInfo = async (item: any) => {
    const Pass_id: string = item?.id;
    const User_id: string = item?.property?.user?.id;
    const Property_id: string = item?.property?.id;
    navigate('/auth/pass-details/?passId=' + Pass_id + "&userId=" + User_id + "&propertyId=" + Property_id)
  }

  return (
    <>
      <section className="dashboard">
        <CommonHeading heading="Dashboard" />
        <div className="dashboard_section">
          <div className="statistics_card">
            <p>Statistics</p>
            <ul className="statistics_card_list">
              {cardlist.map((data, key) => (
                <li key={key}>
                  <label>{data.label}</label>
                  <h3>{data.value}</h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="statistics_card">
            <p>Pass Details</p>
            <div className="statistics_card_typepass">
              <label>Types of pass</label>
              <p>4</p>
            </div>
            <ul className="statistics_card_totlelist">
              <li>
                <label>Name</label>
                <label>Total Sold</label>
              </li>
              <li>
                <p>SP3</p>
                <p>
                  <span>20</span>/100
                </p>
              </li>
              <li>
                <p>SP7</p>
                <p>
                  <span>12</span>/100
                </p>
              </li>
              <li>
                <p>SP14</p>
                <p>
                  <span>40</span>/100
                </p>
              </li>
              <li>
                <p>SP30</p>
                <p>
                  <span className="gray_span">0</span>/100
                </p>
              </li>
            </ul>
            {/* <div className="create_btn">
              <CommonButton
                title="Create new"
                className="btncreate"
                onClick={() => setShow(true)}
              />
            </div> */}
          </div>

          <div className="approval">
            <div className="approval_tophead">
              <h5>
                <span>{partnerListCount ? partnerListCount : ''}</span> user
                pending approval for vendor
              </h5>
              <Link to="/auth/members?tab=vendor_request" className="viewbtn">
                View all
              </Link>
            </div>
            <div className="approval_table">
              <CustomTable fields={fields}>
                {partnerList &&
                  partnerList.length &&
                  partnerList.map((item: any, key: any) => (
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
                        </div>
                      </td>
                    </tr>
                  ))}
              </CustomTable>
            </div>
          </div>

          <div className="approval">
            <div className="approval_tophead">
              <h5>
                <span>
                  {partnerPropertyListCount ? partnerPropertyListCount : ''}
                </span>{' '}
                property pending approval
              </h5>
              <Link to="/auth/members?tab=properties" className="viewbtn">
                View all
              </Link>
            </div>
            <div className="approval_table">
              <CustomTable fields={propertyFields}>
                {partnerPropertyList &&
                  partnerPropertyList.length &&
                  partnerPropertyList.map((item: any, key: any) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item?.name ? item?.name?.charAt(0).toUpperCase() +
                          item?.name?.slice(1).toLowerCase() : '---'}</td>
                      <td>
                        {item?.user?.name ? item?.user?.name?.charAt(0).toUpperCase() +
                          item?.user?.name?.slice(1).toLowerCase() : '---'}
                      </td>
                      <td>
                        {item?.createdAt
                          ? moment(item?.createdAt)
                            .utc()
                            .format('dddd, MMMM D, YYYY, hh:mm:ss A')
                          : '---'}
                      </td>
                      <td>
                        <div className="tables_btn">
                          <CommonButton
                            title="View"
                            className="border-black-btn"
                            onClick={() => propertyInfo(item)}
                          />

                          {item?.verification === 'pending' ? (
                            <>
                              <CommonButton
                                title="Reject"
                                className="dark-greenbtn"
                                onClick={() =>
                                  handleAction('rejected', item, 'propertyRequest')
                                }
                              />
                              <CommonButton
                                title="Approve"
                                className="btncreate"
                                onClick={() =>
                                  handleAction('accepted', item, 'propertyRequest')
                                }
                              />
                            </>
                          ) : item?.verification === 'rejected' ? (
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

                          {/* <CommonButton
                            title="Reject"
                            className="dark-greenbtn"
                          />
                          <CommonButton title="Approve" className="btncreate" /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
              </CustomTable>
            </div>
          </div>
          <div className="approval">
            <div className="approval_tophead">
              <h5>
                <span>{passRequestListCount ? passRequestListCount : ''}</span> passes pending approval
              </h5>
              <Link to="/auth/members?tab=passes" className="viewbtn">
                View all
              </Link>
            </div>
            <div className="approval_table">
              <CustomTable fields={passfield}>
                {passRequestList && passRequestList.length &&
                  passRequestList.map((item: any, key: number) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item?.property?.name ? item?.property?.name?.charAt(0).toUpperCase() +
                          item?.property?.name?.slice(1).toLowerCase() : "---"}</td>
                      <td>{item?.property?.user?.name ? item?.property?.user?.name?.charAt(0).toUpperCase() +
                          item?.property?.user?.name?.slice(1).toLowerCase() : "---"}</td>
                      <td>{item?.redeemable_nights ? `SP${item?.redeemable_nights}` : "---"}</td>
                      <td>
                        {item?.createdAt
                          ? moment(item?.createdAt)
                            .utc()
                            .format('dddd, MMMM D, YYYY, hh:mm:ss A')
                          : '---'}
                      </td>
                      <td>
                        <div className="tables_btn">
                          <CommonButton
                            title="View"
                            className="border-black-btn"
                            onClick={() => handlePassInfo(item)}
                          />

                          {item?.approval === 'pending' ? (
                            <>
                              <CommonButton
                                title="Reject"
                                className="dark-greenbtn"
                                onClick={() =>
                                  handleAction('rejected', item, 'passRequest')
                                }
                              />
                              <CommonButton
                                title="Approve"
                                className="btncreate"
                                onClick={() =>
                                  handleAction('accepted', item, 'passRequest')
                                }
                              />
                            </>
                          ) : item?.approval === 'rejected' ? (
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

                          {/* <CommonButton
                            title="Reject"
                            className="dark-greenbtn"
                          />
                          <CommonButton title="Approve" className="btncreate" /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
              </CustomTable>
            </div>
          </div>
        </div>
      </section>
      <Dashboardmodal show={show} handleClose={() => setShow(false)} />
    </>
  )
}

export default Dashboard
