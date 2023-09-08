import React, { useState } from 'react';
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import CommonHeading from '../../Common/CommonHeading/CommonHeading';
import { useFormik } from 'formik';
import * as Yup from "yup";
import './Settings.scss';
import InputCustom from '../../Common/Inputs/InputCustom';
import { SecureIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import Switch from '../../Common/FormInputs/Switch';
import CommonButton from '../../Common/CommonButton/CommonButton';
import ResetModal from '../../Common/Reset/ResetModal';

const Settings = () => {

    const addnewproperty = Yup.object().shape({
        instlink: Yup.string().required("*This Field is required"),
        facebooklink: Yup.string().required("*This Field is required"),
        email: Yup.string().required("*This Field is required"),
    });
    const formik = useFormik({
        initialValues: {
            instlink: '',
            facebooklink: '',
            email: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            // console.log('values', values)
            // await dispatch(loginAdmin(values));
        },
    });


    const [show, setShow] = useState(false)
    const [showResetModal, setShowResetModal] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    return (
        <>
            <section className='settings'>
                <CommonHeading
                    heading='Settings'
                />
                <div className='settings_section'>
                    <Form onSubmit={formik.handleSubmit}>
                        <Accordion defaultActiveKey="0">
                            {/* <Accordion.Item eventKey="0">
                                <Accordion.Header>General</Accordion.Header>
                                <Accordion.Body>
                                    <div className='fieldscontent'>
                                        <Row className='align-items-center'>
                                            <Col lg={6} sm={6}>
                                                <div className='fieldscontent_text'>
                                                    <h6>Instagram</h6>
                                                    <p>Specify the URL if your instagram page.</p>
                                                </div>
                                            </Col>
                                            <Col lg={6} sm={6}>
                                                <div className='fieldscontent_input'>
                                                    <InputCustom
                                                        className=""
                                                        placeholder='Enter Instagram Link'
                                                        id="instlink"
                                                        name="instlink"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        autoFocus={true}
                                                        value={formik.values.instlink}
                                                        error={
                                                            formik.errors.instlink && formik.touched.instlink ? (
                                                                <span
                                                                >
                                                                    {formik.errors.instlink}
                                                                </span>
                                                            ) : null
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='fieldscontent'>
                                        <Row className='align-items-center'>
                                            <Col lg={6} sm={6}>
                                                <div className='fieldscontent_text'>
                                                    <h6>Facebook</h6>
                                                    <p>Specify the URL if your facebook page.</p>
                                                </div>
                                            </Col>
                                            <Col lg={6} sm={6}>
                                                <div className='fieldscontent_input'>
                                                    <InputCustom
                                                        className=""
                                                        placeholder='Enter Facebook Link'
                                                        id="facebooklink"
                                                        name="facebooklink"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        autoFocus={true}
                                                        value={formik.values.facebooklink}
                                                        error={
                                                            formik.errors.facebooklink && formik.touched.facebooklink ? (
                                                                <span
                                                                >
                                                                    {formik.errors.facebooklink}
                                                                </span>
                                                            ) : null
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item> */}
                            {/* <Accordion.Item eventKey="1">
                                <Accordion.Header>Email</Accordion.Header>
                                <Accordion.Body>
                                    <div className='fieldscontent'>
                                        <Row className='align-items-center'>
                                            <Col lg={6} sm={6}>
                                                <div className='fieldscontent_text'>
                                                    <h6>Email</h6>
                                                    <p>Registered email for this account</p>
                                                </div>
                                            </Col>
                                            <Col lg={6} sm={6}>
                                                <div className='fieldscontent_input'>
                                                    <InputCustom
                                                        className=""
                                                        placeholder='Enter Email'
                                                        id="email"
                                                        name="email"
                                                        type="text"
                                                        onChange={formik.handleChange}
                                                        autoFocus={true}
                                                        value={formik.values.email}
                                                        error={
                                                            formik.errors.email && formik.touched.email ? (
                                                                <span
                                                                >
                                                                    {formik.errors.email}
                                                                </span>
                                                            ) : null
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item> */}
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Security</Accordion.Header>
                                <Accordion.Body>
                                    <div className='security'>
                                        {/* <h5>These settings are helps you keep your account secure. <span><SecureIcon /></span></h5> */}
                                        <ul className='security_listing'>
                                            {/* <li>
                                                <div className='text_sec'>
                                                    <h6>Save my Activity Logs</h6>
                                                    <p>You can save your all activity logs including unusual activity detected.</p>
                                                </div>
                                                <div className='btn_section'>
                                                    <Switch
                                                        id=''
                                                        // onChange=''
                                                        name=''
                                                    />
                                                </div>
                                            </li> */}
                                            {/* <li>
                                                <div className='text_sec'>
                                                    <h6>Turn on login alerts <span className='enable'>Enabled</span></h6>
                                                    <p>Be notified if anyone logs in account from unknown or new device</p>
                                                </div>
                                                <div className='btn_section'>
                                                    <CommonButton title="Disable" disabled />
                                                </div>
                                            </li> */}
                                            <li>
                                                <div className='text_sec'>
                                                    <h6>Change Password</h6>
                                                    <p>Set a unique password to protect your account</p>
                                                </div>
                                                <div className='btn_section'>
                                                    <CommonButton title="Change Password" className='dark-greenbtn' onClick={() => setShowResetModal(true)} />
                                                </div>

                                                <ResetModal
                                                    showResetModal={showResetModal}
                                                    handleClose={() => setShowResetModal(false)}
                                                />

                                            </li>
                                        </ul>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* <Accordion.Item eventKey="3">
                                <Accordion.Header>Account Activity</Accordion.Header>
                                <Accordion.Body>

                                </Accordion.Body>
                            </Accordion.Item> */}
                        </Accordion>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default Settings