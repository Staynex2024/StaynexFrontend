import React from 'react';
import CommonModal from '../../../../../Common/CommonModal/CommonModal';
import './RedeemBookingModal.scss';
import { CheckcircleIcon, SmallArrowIcon, UsercircleIcon, WalletIcon } from '../../../../../../Assets/Images/svgImgs/svgImgs';
import CommonButton from '../../../../../Common/CommonButton/CommonButton';
import { Col, Form, Nav, Row, Tab } from 'react-bootstrap';
import Checkbox from '../../../../../Common/FormInputs/Checkbox';
import InputCustom from '../../../../../Common/Inputs/InputCustom';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import watingicon from "../../../../../../Assets/Images/Icons/hourglass.svg"
import bookimage from "../../../../../../Assets/Images/event1.png"
import bookimage1 from "../../../../../../Assets/Images/event1.png"

const RedeemBookingModal = ({ show, handleClose, }) => {
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
            date: '',
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
    return (
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='RedeemBooking_Modal'
                heading=''
            >
                <div className='main_content'>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="customer">
                        <Nav variant="pills" className="">
                            <Nav.Item><Nav.Link eventKey="customer"><UsercircleIcon /> Customer info</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="payment"><WalletIcon /> Payment details</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="booking"><CheckcircleIcon /> Booking Complete</Nav.Link></Nav.Item>
                        </Nav>
                        <hr className='my-4 my-md-5' />
                        <Tab.Content>
                            <Tab.Pane eventKey="customer">
                                <div className="customer_info">
                                    <div className='d-md-flex justify-content-between'>
                                        <div className=''>
                                            <h2>Welcome, Bruno Fernandes!</h2>
                                            <Checkbox
                                                label="Please select this option if you’re making this booking for someone else"
                                                name=""
                                            />
                                        </div>
                                        <CommonButton title="Auto fill" className="border-btn mt-4 mt-md-0" />
                                    </div>
                                    <Form onSubmit={formik.handleSubmit} className='mt-5 mt-md-5 pt-5 border-top'>
                                        <Row>
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
                                            <Col lg={6} md={6} xl={4}>
                                                <InputCustom
                                                    label="Check in"
                                                    className="mb-44"
                                                    placeholder='10 Feb 2023'
                                                    id="date"
                                                    name="date"
                                                    type="date"
                                                    onChange={formik.handleChange}
                                                    autoFocus={true}
                                                    value={formik.values.date}
                                                    error={
                                                        formik.errors.date && formik.touched.date ? (
                                                            <span
                                                            >
                                                                {formik.errors.date}
                                                            </span>
                                                        ) : null
                                                    }
                                                />
                                            </Col>
                                            <Col lg={6} md={6} xl={4}>
                                                <InputCustom
                                                    label="Check out"
                                                    className="mb-44"
                                                    placeholder='10 Feb 2023'
                                                    id="date"
                                                    name="date"
                                                    type="date"
                                                    onChange={formik.handleChange}
                                                    autoFocus={true}
                                                    value={formik.values.date}
                                                    error={
                                                        formik.errors.date && formik.touched.date ? (
                                                            <span
                                                            >
                                                                {formik.errors.date}
                                                            </span>
                                                        ) : null
                                                    }
                                                />
                                            </Col>
                                            <Col lg={6} md={6} xl={4}>
                                                <InputCustom
                                                    label="Total person(s)"
                                                    className="mb-44"
                                                    placeholder='2'
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    autoFocus={true}
                                                    value={formik.values.name}
                                                    error={
                                                        formik.errors.name && formik.touched.name ? (
                                                            <span
                                                            >
                                                                {formik.errors.name}
                                                            </span>
                                                        ) : null
                                                    }
                                                />
                                            </Col>
                                            <Col xs={12}>
                                                <div className='d-flex justify-content-between'>
                                                    <span className='btn-style grey-btn'>Cancel</span>
                                                    <button type='submit' className='btn-style'>Confirm</button>
                                                </div>
                                            </Col>
                                        </Row> 
                                    </Form>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="payment">
                                <div className="payment_details text-center">
                                    <img src={watingicon} alt="Waiting" />
                                    <h2 className='my-4'>Connecting to wallet</h2>
                                    <p>Waiting for confirmation</p>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="booking">
                                <div className='booking_complete'>
                                    <h2>Redeeming <u>10</u> nights in  <u>Nazeki Villa</u></h2>
                                    <Row className='align-items-center mt-4 mt-md-5'>
                                        <Col xs={12} lg={6}>
                                            <div className='booking_from_to d-flex flex-wrap align-items-center'>
                                                <div>
                                                    <span>From</span>
                                                    <h2>12 Jan 2023</h2>
                                                    <p>Saturday</p>
                                                </div>
                                                <div className='mx-5'><SmallArrowIcon /></div>
                                                <div>
                                                    <span>To</span>
                                                    <h2>22 Jan 2023</h2>
                                                    <p>Sunday</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12} lg={6}>
                                            <div className='booking_hotel_images mt-4 mt-xl-0'>
                                                <img src={bookimage} alt="img" />
                                                <img src={bookimage1} alt="img" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr className='my-5' />
                                    <Row className='booking_complete_list'>
                                        <Col xs={6} md={4} xl={3}>
                                            <label>Pass type</label>
                                            <h2>SP7</h2>
                                        </Col>
                                        <Col xs={6} md={3} xl={3}>
                                            <label>Price</label>
                                            <h2>$4,999</h2>
                                        </Col>
                                        <Col xs={12} md={5} xl={5}>
                                            <label>Room</label>
                                            <h2>Deluxe Double or Twin Room</h2>
                                        </Col>
                                    </Row>
                                    <Row className='booking_complete_list'>
                                        <Col xs={6} md={4} xl={3}>
                                            <label>Name</label>
                                            <h2>Bruno Fernandes</h2>
                                        </Col>
                                        <Col className='d-none d-md-block' xs={6} md={3} xl={3}>
                                        </Col>
                                        <Col xs={6} md={5} xl={5}>
                                            <label>Number</label>
                                            <h2>+651231231233</h2>
                                        </Col>
                                    </Row>
                                    <Row className='booking_complete_list'>
                                        <Col xs={6} md={4} xl={3}>
                                            <label>Passport no</label>
                                            <h2>A3543456445</h2>
                                        </Col>
                                        <Col className='d-none d-md-block' xs={6} md={3} xl={3}>
                                        </Col>
                                        <Col xs={12} md={5} xl={5}>
                                            <label>Email</label>
                                            <h2>brunofergie@gmail.com</h2>
                                        </Col>
                                    </Row>
                                    <div className='d-flex justify-content-between mt-3'>
                                        <button type='submit' className='btn-style grey-btn'>Cancel</button>
                                        <button type='submit' className='btn-style'>Confirm</button>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </CommonModal >
        </>
    )
}

export default RedeemBookingModal