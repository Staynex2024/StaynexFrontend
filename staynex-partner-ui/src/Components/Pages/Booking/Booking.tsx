import React, { useState } from 'react'
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

const Booking = () => {
  const [show, setShow] = useState(false)
  const [showdecline, setShowdecline] = useState(false)

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
    '',
    'Booking ID',
    'Customer Name',
    'Address',
    'SP Type',
    'Room Type',
    'Check-in',
    'Check-out',
    'Booking Status',
    '',
  ]
  const tabledata = [
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Confirmed',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Action needed',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Under review',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Confirmed',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Action needed',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Confirmed',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Confirmed',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Action needed',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Action needed',
    },
    {
      customerid: 'DB24220',
      customername: 'Kylee Arroyo',
      address: '0x71c...985f',
      sptype: 'SP7',
      roomtype: 'Triple room',
      checkin: '12 Feb 2023',
      checkout: '13 Feb 2023',
      bookingstatus: 'Confirmed',
    },
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
                  {tabledata.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <Form onSubmit={formik.handleSubmit}>
                          <Checkbox
                            id="pool"
                            name="pool"
                            onChange={formik.handleChange}
                            value={formik.values.pool}
                          />
                        </Form>
                      </td>
                      <td>{item.customerid}</td>
                      <td>{item.customername}</td>
                      <td>
                        <div className="copy_icon">
                          {item.address}{' '}
                          <button>
                            <CopyIcon />
                          </button>
                        </div>
                      </td>
                      <td>{item.sptype}</td>
                      <td>{item.roomtype}</td>
                      <td>{item.checkin}</td>
                      <td>{item.checkout}</td>
                      <td>{item.bookingstatus}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="checkIcon">
                            <CheckcircleIcon />
                          </span>
                          <Dropdown className="table_Dropdown mx-4">
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
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))}
                </CustomTable>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="comfirmed">
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
                  {tabledata.map((item, key) => (
                    <tr key={key}>
                      <td>
                        <Form onSubmit={formik.handleSubmit}>
                          <Checkbox
                            id="pool"
                            name="pool"
                            onChange={formik.handleChange}
                            value={formik.values.pool}
                          />
                        </Form>
                      </td>
                      <td>{item.customerid}</td>
                      <td>{item.customername}</td>
                      <td>
                        <div className="copy_icon">
                          {item.address}{' '}
                          <button>
                            <CopyIcon />
                          </button>
                        </div>
                      </td>
                      <td>{item.sptype}</td>
                      <td>{item.roomtype}</td>
                      <td>{item.checkin}</td>
                      <td>{item.checkout}</td>
                      <td>{item.bookingstatus}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="checkIcon">
                            <CheckcircleIcon />
                          </span>
                          <Dropdown className="table_Dropdown mx-4">
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
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))}
                </CustomTable>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="under">
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
                  {tabledata.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Form onSubmit={formik.handleSubmit}>
                          <Checkbox
                            id="pool"
                            name="pool"
                            onChange={formik.handleChange}
                            value={formik.values.pool}
                          />
                        </Form>
                      </td>
                      <td>{item.customerid}</td>
                      <td>{item.customername}</td>
                      <td>
                        <div className="copy_icon">
                          {item.address}{' '}
                          <button>
                            <CopyIcon />
                          </button>
                        </div>
                      </td>
                      <td>{item.sptype}</td>
                      <td>{item.roomtype}</td>
                      <td>{item.checkin}</td>
                      <td>{item.checkout}</td>
                      <td>{item.bookingstatus}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="checkIcon">
                            <CheckcircleIcon />
                          </span>
                          <Dropdown className="table_Dropdown mx-4">
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
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))}
                </CustomTable>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="canceled">
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
                  {tabledata.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Form onSubmit={formik.handleSubmit}>
                          <Checkbox
                            id="pool"
                            name="pool"
                            onChange={formik.handleChange}
                            value={formik.values.pool}
                          />
                        </Form>
                      </td>
                      <td>{item.customerid}</td>
                      <td>{item.customername}</td>
                      <td>
                        <div className="copy_icon">
                          {item.address}{' '}
                          <button>
                            <CopyIcon />
                          </button>
                        </div>
                      </td>
                      <td>{item.sptype}</td>
                      <td>{item.roomtype}</td>
                      <td>{item.checkin}</td>
                      <td>{item.checkout}</td>
                      <td>{item.bookingstatus}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="checkIcon">
                            <CheckcircleIcon />
                          </span>
                          <Dropdown className="table_Dropdown mx-4">
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
                          </Dropdown>
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
