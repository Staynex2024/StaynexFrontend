import React from 'react'
import "./MyAccountCard.scss"
import ProfileImg from "../../../../../Assets/Images/profile_img.svg"
import uploadIcon from "../../../../../Assets/Images/upload_icon.svg"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputCustom from '../../../../Common/Inputs/InputCustom'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { callApiPostMethod } from '../../../../../Redux/Actions/api.action'
import { APIURL } from '../../../../../Utils'

const MyAccountCard = ({customerData} : any) => {
    const dispatch: any = useDispatch()

    const addnewproperty = Yup.object().shape({
        name: Yup.string().required('*This Field is required'),
        lastName: Yup.string().required('*This Field is required'),
        gender: Yup.string().required('*This Field is required'),
        contact: Yup.string().required('*This Field is required'),
        eamil: Yup.string().required('*This Field is required'),
        number: Yup.string().required('*This Field is required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            gender: '',
            number: '',
            email: '',
            contact: '',
            password: '',
            pool: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            let dataToSend = {
                walletAddress: "",
                firstName: values?.name,
                lastName: values?.lastName,
                gender: values?.gender,
                email: values?.email,
                mobileNumber: values?.number,
                passportNumber: values?.contact
            }
            // console.log('dataToSend :>> ', dataToSend);
            const result = await dispatch(callApiPostMethod(APIURL.UPDATE_CUSTOMER_PROFILE, dataToSend, {}, true))
            // console.log('result :>> ', result);
        },
    })
    // console.log('formik.values :>> ', formik.errors);
    return (
        <>
            <div className='tabs_innerContent account_Card'>
                <h2>My Account</h2>
                <div className='account_Card_box mt-5'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='account_heading'>
                            <h5>{(customerData && Object.keys(customerData).length > 0) ? `Hello, ${customerData['user']['name']}`: ""}</h5>
                            <p>Save to apply changes</p>
                        </div>
                        <div className='account_profile'>
                            <span className='User_Profile'><img src={ProfileImg} alt="" /></span>
                            <span className='User_upload_img'><img src={uploadIcon} alt="" /></span>
                        </div>
                    </div>
                    <Form onSubmit={formik.handleSubmit} className='mt-5 pt-5 border-top'>
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
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.lastName}
                                    error={
                                        formik.errors.lastName && formik.touched.lastName ? (
                                            <span>{formik.errors.lastName}</span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={6} md={6} xl={4}>
                                <InputCustom
                                    label="Gender"
                                    className="mb-44"
                                    placeholder="Female"
                                    id="gender"
                                    name="gender"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.gender}
                                    error={
                                        formik.errors.gender && formik.touched.gender ? (
                                            <span>{formik.errors.gender}</span>
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
                                    type="email"
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
                            <Col xs={12}>
                                <button type='submit' className='btn-style'>Save</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default MyAccountCard