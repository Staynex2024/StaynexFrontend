import React, { useEffect, useState } from 'react'
import {
  CancelScheduleIcon,
  CheckcircleIcon,
  CopyIcon,
  DeleteIcon,
  DocviewIcon,
  EditIcon,
  HomeBlackIcon,
  MoreIcon,
  SearchIcon,
  TransactionIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'
import './Booking.scss'
import { Col, Dropdown, Form, Nav, Row, Tab } from 'react-bootstrap'
import CustomSelect from '../../Common/Select/Select'
import CustomTable from '../../Common/Table/Index'
import Checkbox from '../../Common/FormInputs/Checkbox'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ConfirmbookingModal from './ConfirmbookingModal/ConfirmbookingModal'
import DeclineBookingModal from './DeclineBookingModal/DeclineBookingModal'
import { callApiGetMethod, callApiPostMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import { useDispatch, useSelector } from 'react-redux'
import CommonButton from '../../Common/CommonButton/CommonButton'
import Swal from 'sweetalert2'
import toaster from '../../Common/Toast'

const Booking = () => {
  const [show, setShow] = useState(false)
  const [showdecline, setShowdecline] = useState(false)
  const [bookingList, setBookingList] = useState<any[]>([])
  const [checkStatus, setCheckStatus] = useState(false);
  const dispatch = useDispatch<any>()
  const walletAddress = useSelector((state: any) => state?.user?.walletAddress);

  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ]

  const addnewproperty = Yup.object().shape({})

  const formik = useFormik({
    initialValues: {
      pool: '',
    },
    validationSchema: addnewproperty,
    onSubmit: async (values) => {
      // await dispatch(loginAdmin(values));
    },
  })
  const fields = [
    'Booking ID',
    'Customer Name',
    'Address',
    'SP Type',
    'Room Type',
    'Check-in',
    'Check-out',
    'Booking Status',
    'Action',
  ]
  const tabledroplist = [
    {
      icondrop: <HomeBlackIcon />,
      name: 'Confirm Booking',
      onclick: () => setShow(true),
    },
    { icondrop: <EditIcon />, name: 'Edit' },
    {
      icondrop: <DocviewIcon />,
      name: 'View Details',
      to: '/auth/booking-details',
    },
    { icondrop: <TransactionIcon />, name: 'View Transaction' },
    {
      icondrop: <CancelScheduleIcon />,
      name: 'Decline Booking',
      onclick: () => setShowdecline(true),
    },
    { icondrop: <DeleteIcon />, name: 'Cancel Booking' },
  ]

  useEffect( () => {
    const retreiveVendorProperty = async () => {
      const result = await dispatch(callApiGetMethod(APIURL.GET_BOOKING_LIST, {}, true, false))
      if (result?.statusCode === 200) {
        setBookingList(result?.data)
        // dispatch(propertyDetails(result?.data))
      } 
    }
    retreiveVendorProperty()
  }, [checkStatus]); 


  const handleAction = (item) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setCheckStatus(true)
          const dataToSend = {
            "bookingId": item?.bookingId ,
            "status": 'confirmed'
          }
          const result = dispatch(callApiPostMethod(APIURL.UPDATE_BOOKING_STATUS, dataToSend, {}, true));
          if(result){
            setCheckStatus(false)
          }
        }
      });
    }
  
  return (
    <>
      <section className="Booking_Pages">
        <CommonHeading
          heading="Bookings"
          paragraph={
            <>
              You have a total of <span>84</span> bookings
            </>
          }
        />
        <div className="d-sm-flex align-items-center mb-4 pb-2">
          <div className="Common_search d-flex align-items-center">
            <SearchIcon />
            <Form.Control type="text" placeholder="Search" />
          </div>
          <CustomSelect
            classgroup="hotels_Select ms-md-3 mt-sm-0 mt-3"
            options={options}
          />
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="all">
          <Row className="mt-5">
            <Col xs={12}>
              <Nav variant="pills" className="Button_Tabs">
                <Nav.Item>
                  <Nav.Link eventKey="all">SHOW ALL</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="comfirmed">COMFIRMED</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="under">UNDER REVIEW</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="canceled">CANCELLED</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Tab.Content className="mt-4 pt-3">
            <Tab.Pane eventKey="all">
              <div className="booking_table">
                <div className="pagination_select mb-4">
                  <CustomSelect
                    classgroup="select_pagi"
                    label="Page"
                    options={options}
                  />
                  <label>of 102</label>
                </div>
                <CustomTable fields={fields}>
                  {bookingList.map((item, i) => (
                    <tr key={i}>
                      <td>{item.bookingId}</td>
                      <td>{item.firstName + item?.lastName}</td>
                      <td>
                        <div className="copy_icon">
                          {item.address}{' '}
                          <button>
                            <CopyIcon />
                          </button>
                        </div>
                      </td>
                      <td>{item?.userPass?.pass?.name}</td>
                      <td>{item.roomType ? item.roomType : '--'}</td>
                      <td>{item.checkIn}</td>
                      <td>{item.checkOut}</td>
                      <td>{item.bookingStatus}</td>
                      <td>
                        <div className="d-flex align-items-center">

                          {/* <Dropdown className="table_Dropdown mx-4">
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                              <MoreIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {tabledroplist.map((data, i) => {
                                return (
                                  <Dropdown.Item key={i} href={data.to}>
                                    <div
                                      className="table_drop d-flex"
                                      onClick={data.onclick}
                                    >
                                      {data.icondrop}
                                      <span>{data.name}</span>
                                    </div>
                                  </Dropdown.Item>
                                )
                              })}
                            </Dropdown.Menu>
                          </Dropdown> */}
                             <div className="tables_btn">
                        {item?.bookingStatus === "pending" ? (
                          <>
                            <CommonButton
                              title="Set Nights"
                              className="btncreate"
                              onClick={() => handleAction(item)}
                            />
                          </>
                        ) : (
                          <span
                            className="fa fa-check"
                            style={{
                              marginLeft: "8px",
                              color: "green",
                            }}
                          >
                            Accepted
                          </span>
                        )}
                      </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </CustomTable>
              </div>
            </Tab.Pane>
            
          </Tab.Content>
        </Tab.Container>
      </section>
      {/* onClick={() => setShow(true)} */}
      <ConfirmbookingModal show={show} handleClose={() => setShow(false)} />
      <DeclineBookingModal
        show={showdecline}
        handleClose={() => setShowdecline(false)}
      />
    </>
  )
}

export default Booking
