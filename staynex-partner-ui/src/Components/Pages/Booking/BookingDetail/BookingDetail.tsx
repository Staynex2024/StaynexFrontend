import React, { useState } from 'react'
import "./BookingDetail.scss"
import CommonHeading from '../../../Common/CommonHeading/CommonHeading'
import { Link } from 'react-router-dom'
import CommonButton from '../../../Common/CommonButton/CommonButton'
import ConfirmbookingModal from '../ConfirmbookingModal/ConfirmbookingModal'
import DeclineBookingModal from '../DeclineBookingModal/DeclineBookingModal'
import { Col, Form, ProgressBar, Row } from 'react-bootstrap'
import userimg from "../../../../Assets/Images/slider2.png"
import walletIcon from "../../../../Assets/Images/Icons/wallet.svg"
import arrowicon from "../../../../Assets/Images/Icons/arrow_forward.svg"
import SliderIcon from "../../../../Assets/Images/slider1.png"
import InputCustom from '../../../Common/Inputs/InputCustom'
import { useFormik } from 'formik';
import * as Yup from "yup";
import CustomSelect from '../../../Common/Select/Select'
import { EditIcon } from '../../../../Assets/Images/svgImgs/svgImgs'

const BookingDetail = () => {
    const [show, setShow] = useState(false);
    const [showdecline, setShowdecline] = useState(false);

    const addnewproperty = Yup.object().shape({
        name: Yup.string().required("*This Field is required"),
        date: Yup.string().required("*This Field is required"),
        contact: Yup.string().required("*This Field is required"),
    });

    const formik = useFormik({

        initialValues: {
            name: '',
            date: '',
            contact: '',
            password: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            // console.log('values', values)
            // await dispatch(loginAdmin(values));
        },

    });
    const options = [
        { value: 'SP7', label: 'SP7' },
        { value: 'SP10', label: 'SP10' },
        { value: 'SP20', label: 'SP20' },
    ]
    return (
        <>
            <div className='Booking_Detail'>
                <Link className='mb-4' to="/auth/booking"><u>Back to previous page</u></Link>
                <Row className='justify-content-between'>
                    <Col xs={12} md={5}>
                        <CommonHeading heading='Booking Detail' />
                    </Col>
                    <Col xs={12} md={7}>
                        <div className='d-sm-flex justify-content-end'>
                            <CommonButton title="Decline Booking" onClick={() => setShow(true)} className="grey-btn me-sm-3" />
                            <CommonButton title="Add New Property" onClick={() => setShowdecline(true)} className="mt-3 mt-sm-0" />
                        </div>
                    </Col>
                </Row>

                <div className='Booking_Detail_Explorer'>
                    <Row className='align-items-center'>
                        <Col xs={12} lg={6}>
                            <div className='Booking_Detail_Explorer_user d-flex align-items-center'>
                                <img className='expuser_img' src={userimg} alt="img" />
                                <div className='ms-3'>
                                    <h4>Bruno Fernandez</h4>
                                    <p><img src={walletIcon} alt="icon" /> 0xb794f5ea...9579268</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} lg={6}>
                            <div className='Booking_Detail_Explorer_Progress'>
                                <div className='d-flex justify-content-between'>
                                    <h2 className='text-org'>Explorer</h2>
                                    <p className='Exp_days'>180/<span className='Exp_no'>365</span> <span className='Exp_grey'>Nights</span></p>
                                </div>
                                <ProgressBar now={60} />
                                <p className='text-end'>NEXT tier: GLOBETROTTER</p>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='Booking_Detail_Tentresort'>
                    <h2 className='Exp_tent'>Redeeming <u>10</u> nights in <u>Kunang Kunang Tent Resort</u></h2>
                    <Row className='align-items-center'>
                        <Col xs={12} xl={5} className='pe-xl-5'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='Exp_from_to'>
                                    <span>From</span>
                                    <h5>12 Nov 2022</h5>
                                    <p>Saturday</p>
                                </div>
                                <img className='for_arrow_img' src={arrowicon} alt="img" />
                                <div className='Exp_from_to'>
                                    <span>From</span>
                                    <h5>12 Nov 2022</h5>
                                    <p>Saturday</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} xl={7} className='mt-5 mt-xl-0'>
                            <div className='d-md-flex align-items-center'>
                                <img className='tentresort_img' src={SliderIcon} alt="img" />
                                <img className='tentresort_img' src={SliderIcon} alt="img" />
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='Booking_Detail_Bookform'>
                    <span className='EditForm'><EditIcon /></span>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row className='align-items-end'>
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
                            <Col lg={6} md={6} xl={4}>
                                <InputCustom
                                    label="Resort"
                                    className="mb-44"
                                    placeholder='Kunang Kunang Resort'
                                    id="contact"
                                    name="contact"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.contact}
                                    error={
                                        formik.errors.contact && formik.touched.contact ? (
                                            <span
                                            >
                                                {formik.errors.contact}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={6} md={6} xl={4}>
                                <InputCustom
                                    label="Room type"
                                    className="mb-44"
                                    placeholder='Deluxe Double'
                                    id="contact"
                                    name="contact"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.contact}
                                    error={
                                        formik.errors.contact && formik.touched.contact ? (
                                            <span
                                            >
                                                {formik.errors.contact}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={6} md={6} xl={4}>
                                <InputCustom
                                    label="Room no."
                                    className="mb-44"
                                    placeholder='8B12'
                                    id="contact"
                                    name="contact"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.contact}
                                    error={
                                        formik.errors.contact && formik.touched.contact ? (
                                            <span
                                            >
                                                {formik.errors.contact}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={6} md={6} xl={4}>
                                <InputCustom
                                    label="Booking date"
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
                                <CustomSelect
                                    classgroup="mb-44"
                                    options={options}
                                />
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <ConfirmbookingModal
                show={show}
                handleClose={() => setShow(false)}
            />
            <DeclineBookingModal
                show={showdecline}
                handleClose={() => setShowdecline(false)}
            />
        </>
    )
}

export default BookingDetail