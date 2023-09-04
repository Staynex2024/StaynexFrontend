import React, { useEffect } from 'react';
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
import CustomSelect from '../../../../../Common/Select/Select';
import { ethers } from "ethers";
import userABI from "../../../../../../Abi/UserABI.json";
import { useSelector } from 'react-redux';
import { CONTRACT_ADDRESS } from '../../../../../../Constant';


const RedeemBookingModal = ({ show, handleClose, data }) => {
    const [activeStep, setActiveStep] = React.useState(1);
    const [key, setKey]: any = React.useState('customer')

    const walletAddress = useSelector((state: any) => state.user.walletAddress);

    const addnewproperty = Yup.object().shape({
        name: Yup.string().required('*This Field is required'),
        lastname: Yup.string().required('*This Field is required'),
        gender: Yup.string().required('*This Field is required'),
        contact: Yup.string().required('*This Field is required')
            .min(8, "Please enter valid passport number")
            .max(15, "Please enter valid passport number"),
        email: Yup.string().email('Please enter valid email')
            .required('*This field is required')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Please enter valid email'),
        number: Yup.string().required('*This Field is required')
            .min(8, 'Please enter valid contact number')
            .max(15, 'Please enter valid contact number'),
        totalPerson: Yup.number().required('*This Field is required').positive("Total person should be positive"),
        checkoutdate: Yup.string().required('*This Field is required'),
        checkIndate: Yup.string().required('*This Field is required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            gender: '',
            number: '',
            email: '',
            contact: '',
            totalPerson: '',
            checkoutdate: '',
            checkIndate: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            // await dispatch(loginAdmin(values));
        },
    })

    const options: any = [
        { value: 'male', label: 'Male' },
        { value: 'famale', label: 'Female' },
        { value: 'other', label: 'Other' },
    ]

    const handleAutofillData = async () => {
        if (data && Object.keys(data).length > 0) {
            formik.setFieldValue('name', data['firstName'])
            formik.setFieldValue('lastname', data['lastName'])
            formik.setFieldValue('gender', data['gender'])
            formik.setFieldValue('contact', data['passportNumber'])
            formik.setFieldValue('email', data['user']['email'])
            formik.setFieldValue('number', data['user']['mobile_number'].slice(3))
        }
    }

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    useEffect(() => {
        if (activeStep === 1) {
            setKey('customer')
        } else if (activeStep === 2) {
            setKey('payment')
        } else if (activeStep === 3) {
            setKey('booking')
        }
    }, [key, activeStep])


    const handleRedeem = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(walletAddress)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, userABI, signer);
        console.log("contract", contract)

        const result = await contract.redeemNights("13", '4');
        console.log('result :>> ', result);

    }

    return (
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='RedeemBooking_Modal'
                heading=''
            >
                <div className='main_content'>
                    <Tab.Container id="left-tabs-example" defaultActiveKey='customer' activeKey={key} onSelect={(e: any) => setKey(e)}>
                        <Nav variant="pills" className="">
                            <Nav.Item><Nav.Link eventKey="customer"><UsercircleIcon /> Customer info</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="payment"><WalletIcon /> Payment details</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="booking"><CheckcircleIcon /> Booking Complete</Nav.Link></Nav.Item>
                        </Nav>
                        <hr className='my-4 my-md-5' />
                        <Tab.Content >
                            <Tab.Pane eventKey="customer">
                                <div className="customer_info">
                                    <div className='d-md-flex justify-content-between'>
                                        <div className=''>
                                            <h2>Welcome, {data && `${data['firstName'] + ' ' + data['lastName']}`}!</h2>
                                            <Checkbox
                                                label="Please select this option if you’re making this booking for someone else"
                                                name=""
                                            />
                                        </div>
                                        <CommonButton
                                            title="Auto fill"
                                            className="border-btn mt-4 mt-md-0"
                                            onClick={handleAutofillData}
                                        />
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
                                                    id="lastname"
                                                    name="lastname"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    autoFocus={true}
                                                    value={formik.values.lastname}
                                                    error={
                                                        formik.errors.lastname && formik.touched.lastname ? (
                                                            <span>{formik.errors.lastname}</span>
                                                        ) : null
                                                    }
                                                />
                                            </Col>
                                            <Col lg={6} md={6} xl={4}>
                                                <CustomSelect
                                                    label="Gender"
                                                    id="gender"
                                                    classgroup="mb-44"
                                                    options={options}
                                                    onChange={(option: any) =>
                                                        formik.setFieldValue('gender', option.value)
                                                    }
                                                    name={'propertyType'}
                                                    placeholder="Select"
                                                    isSearchable={false}
                                                    // value={data['gender'] && {
                                                    //     label: data['gender']?.charAt(0).toUpperCase() +
                                                    //         data['gender']?.slice(1).toLowerCase()
                                                    // }}
                                                    error={
                                                        formik.errors.gender &&
                                                            formik.touched.gender ? (
                                                            <span className="error_Msg">
                                                                {formik.errors.gender}
                                                            </span>
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
                                                    id="checkIndate"
                                                    name="checkIndate"
                                                    min={new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 10)}
                                                    type="date"
                                                    onChange={formik.handleChange}
                                                    autoFocus={true}
                                                    value={formik.values.checkIndate}
                                                    error={
                                                        formik.errors.checkIndate && formik.touched.checkIndate ? (
                                                            <span
                                                            >
                                                                {formik.errors.checkIndate}
                                                            </span>
                                                        ) : null
                                                    }
                                                />
                                            </Col>
                                            <Col lg={6} md={6} xl={4}>
                                                {formik.values.checkIndate !== '' &&
                                                    <InputCustom
                                                        label="Check out"
                                                        className="mb-44"
                                                        placeholder='10 Feb 2023'
                                                        id="checkoutdate"
                                                        name="checkoutdate"
                                                        type="date"
                                                        min={new Date(new Date(formik.values.checkIndate).getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 10)}
                                                        onChange={formik.handleChange}
                                                        autoFocus={true}
                                                        value={formik.values.checkoutdate}
                                                        error={
                                                            formik.errors.checkoutdate && formik.touched.checkoutdate ? (
                                                                <span
                                                                >
                                                                    {formik.errors.checkoutdate}
                                                                </span>
                                                            ) : null
                                                        }
                                                    />}
                                            </Col>
                                            <Col lg={6} md={6} xl={4}>
                                                <InputCustom
                                                    label="Total person(s)"
                                                    className="mb-44"
                                                    placeholder='2'
                                                    id="totalPerson"
                                                    name="totalPerson"
                                                    type="number"
                                                    onChange={formik.handleChange}
                                                    autoFocus={true}
                                                    value={formik.values.totalPerson}
                                                    error={
                                                        formik.errors.totalPerson && formik.touched.totalPerson ? (
                                                            <span
                                                            >
                                                                {formik.errors.totalPerson}
                                                            </span>
                                                        ) : null
                                                    }
                                                />
                                            </Col>
                                            <Col xs={12}>
                                                <div className='d-flex justify-content-between'>
                                                    <span className='btn-style grey-btn'>Cancel</span>
                                                    <button type='submit' className='btn-style' onClick={handleNext}>Confirm</button>
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
                                    <Col xs={12}>
                                        <div className='d-flex justify-content-between'>
                                            <span className='btn-style grey-btn'>Cancel</span>
                                            <button type='submit' className='btn-style' onClick={handleNext}>Confirm</button>
                                        </div>
                                    </Col>
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
                                        <button type='submit' className='btn-style' onClick={handleRedeem}>Confirm</button>
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