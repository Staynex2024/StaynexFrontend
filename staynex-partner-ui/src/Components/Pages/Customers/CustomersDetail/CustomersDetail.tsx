import React from 'react'
import './CustomersDetail.scss'
import { Link } from 'react-router-dom'
import { Col, Form, Nav, ProgressBar, Row, Tab } from 'react-bootstrap'
import userimg from '../../../../Assets/Images/slider2.png'
import walletIcon from '../../../../Assets/Images/Icons/wallet.svg'
import InputCustom from '../../../Common/Inputs/InputCustom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EditIcon } from '../../../../Assets/Images/svgImgs/svgImgs'
import CustomTable from '../../../Common/Table/Index'
import Checkbox from '../../../Common/FormInputs/Checkbox'
import Booking from '../../Booking/Booking'

const CustomersDetail = () => {
  const addnewproperty = Yup.object().shape({
    name: Yup.string().required('*This Field is required'),
    date: Yup.string().required('*This Field is required'),
    contact: Yup.string().required('*This Field is required'),
    eamil: Yup.string().required('*This Field is required'),
    number: Yup.string().required('*This Field is required'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      email: '',
      contact: '',
      password: '',
      pool: '',
    },
    validationSchema: addnewproperty,
    onSubmit: async (values) => {
      // await dispatch(loginAdmin(values));
    },
  })
  const fields = [
    '',
    'No',
    'Name',
    'Redeemable Nights',
    'Total Redeemable',
    'Perks',
    '',
  ]
  const tabledata = [
    {
      no: '1',
      name: 'SP30',
      nightred: '23',
      totalnight: '120',
      perks1: '5% off on restaurant F&B',
      perks2: '5% off on villa resort services',
      perks3: 'Free shuttle to and from airport',
    },
    {
      no: '1',
      name: 'SP30',
      nightred: '23',
      totalnight: '120',
      perks1: '5% off on restaurant F&B',
      perks2: '5% off on villa resort services',
      perks3: 'Free shuttle to and from airport',
    },
    {
      no: '1',
      name: 'SP30',
      nightred: '23',
      totalnight: '120',
      perks1: '5% off on restaurant F&B',
      perks2: '5% off on villa resort services',
      perks3: 'Free shuttle to and from airport',
    },
    {
      no: '1',
      name: 'SP30',
      nightred: '23',
      totalnight: '120',
      perks1: '5% off on restaurant F&B',
      perks2: '5% off on villa resort services',
      perks3: 'Free shuttle to and from airport',
    },
    {
      no: '1',
      name: 'SP30',
      nightred: '23',
      totalnight: '120',
      perks1: '5% off on restaurant F&B',
      perks2: '5% off on villa resort services',
      perks3: 'Free shuttle to and from airport',
    },
    {
      no: '1',
      name: 'SP30',
      nightred: '23',
      totalnight: '120',
      perks1: '5% off on restaurant F&B',
      perks2: '5% off on villa resort services',
      perks3: 'Free shuttle to and from airport',
    },
  ]
  return (
    <>
      <div className="Booking_Detail Customers_Detail">
        <Link className="mb-4" to="/auth/customers">
          <u>Back to previous page</u>
        </Link>
        <div className="Booking_Detail_Explorer mt-4">
          <Row className="align-items-center">
            <Col xs={12} lg={6}>
              <div className="Booking_Detail_Explorer_user d-flex align-items-center">
                <img className="expuser_img" src={userimg} alt="img" />
                <div className="ms-3">
                  <h4>Bruno Fernandez</h4>
                  <p>
                    <img src={walletIcon} alt="icon" /> 0xb794f5ea...9579268
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <div className="Booking_Detail_Explorer_Progress">
                <div className="d-flex justify-content-between">
                  <h2 className="text-org">Explorer</h2>
                  <p className="Exp_days">
                    180/<span className="Exp_no">365</span>{' '}
                    <span className="Exp_grey">Nights</span>
                  </p>
                </div>
                <ProgressBar now={60} />
                <p className="text-end">NEXT tier: GLOBETROTTER</p>
              </div>
            </Col>
          </Row>
        </div>

        <Tab.Container id="left-tabs-example" defaultActiveKey="personalinfo">
          <Row className="mt-5">
            <Col xs={12}>
              <Nav variant="pills" className="Border_Tabs">
                <Nav.Item>
                  <Nav.Link eventKey="personalinfo">Personal Info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="passes">Passes Owned</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="booking">Booking History</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Tab.Content className="mt-4 pt-3">
            <Tab.Pane eventKey="personalinfo">
              <div className="Booking_Detail_Bookform border-0 mt-0 pt-0">
                <span className="EditForm">
                  <EditIcon />
                </span>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="align-items-end">
                    <Col lg={6} md={6} xl={4}>
                      <InputCustom
                        label="First name"
                        className="mb-44"
                        placeholder="Bruno"
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        autoFocus={true}
                        value={formik.values.name}
                        error={
                          formik.errors.name && formik.touched.name ? (
                            <span>{formik.errors.name}</span>
                          ) : null
                        }
                      />
                    </Col>
                    <Col lg={6} md={6} xl={4}>
                      <InputCustom
                        label="Last name"
                        className="mb-44"
                        placeholder="Fernandez"
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        autoFocus={true}
                        value={formik.values.name}
                        error={
                          formik.errors.name && formik.touched.name ? (
                            <span>{formik.errors.name}</span>
                          ) : null
                        }
                      />
                    </Col>
                    <Col lg={6} md={6} xl={4}>
                      <InputCustom
                        label="Gender"
                        className="mb-44"
                        placeholder="Female"
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        autoFocus={true}
                        value={formik.values.name}
                        error={
                          formik.errors.name && formik.touched.name ? (
                            <span>{formik.errors.name}</span>
                          ) : null
                        }
                      />
                    </Col>
                    <Col lg={6} md={6} xl={4}>
                      <InputCustom
                        label="Passport number"
                        className="mb-44"
                        placeholder="A5432313677"
                        id="contact"
                        name="contact"
                        type="text"
                        onChange={formik.handleChange}
                        autoFocus={true}
                        value={formik.values.contact}
                        error={
                          formik.errors.contact && formik.touched.contact ? (
                            <span>{formik.errors.contact}</span>
                          ) : null
                        }
                      />
                    </Col>
                    <Col lg={6} md={6} xl={4}>
                      <InputCustom
                        label="Email"
                        className="mb-44"
                        placeholder="brunofernie@gmail.com"
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        autoFocus={true}
                        value={formik.values.email}
                        error={
                          formik.errors.email && formik.touched.email ? (
                            <span>{formik.errors.email}</span>
                          ) : null
                        }
                      />
                    </Col>
                    <Col lg={6} md={6} xl={4}>
                      <InputCustom
                        label="Phone number"
                        className="mb-44"
                        placeholder="+6512345676"
                        id="number"
                        name="number"
                        type="text"
                        onChange={formik.handleChange}
                        autoFocus={true}
                        value={formik.values.number}
                        error={
                          formik.errors.number && formik.touched.number ? (
                            <span>{formik.errors.number}</span>
                          ) : null
                        }
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="passes">
              <div className="">
                <CustomTable fields={fields}>
                  {tabledata.map((item) => (
                    <tr>
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
                      <td>{item.no}</td>
                      <td>
                        <div className="copy_icon">{item.name}</div>
                      </td>
                      <td>{item.nightred}</td>
                      <td>{item.totalnight}</td>
                      <td>
                        <div className="perks_data">
                          <span>{item.perks1}</span>
                          <span>{item.perks2}</span>
                          <span>{item.perks3}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </CustomTable>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="booking">
              <Booking />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  )
}

export default CustomersDetail
