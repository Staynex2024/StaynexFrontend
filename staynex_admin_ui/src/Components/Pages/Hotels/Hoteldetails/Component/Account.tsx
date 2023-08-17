import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './Hotelindex.scss';
import { useFormik } from 'formik';
import * as Yup from "yup";
import InputCustom from '../../../../Common/Inputs/InputCustom';
import { EyeIcon, LockIcon, UserIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';

const Account = ({data} : any) => {

    const addnewproperty = Yup.object().shape({
        name: Yup.string().required("*This Field is required"),
        email: Yup.string()
            .email("Please enter valid email")
            .required("*This Field is required")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Please enter valid email'),
        password: Yup.string().required("*This Field is required"),
        contact: Yup.string().required("*This Field is required"),
    });

    const formik = useFormik({

        initialValues: {
            name: '',
            email: '',
            contact: '',
            password: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            // console.log('values', values)
            // await dispatch(loginAdmin(values));
        },

    });
    return (
        <>
            <section className='account'>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col lg={6} md={6}>
                            <InputCustom
                                label="Name"
                                className="mb-44"
                                placeholder='Enter Name'
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                autoFocus={true}
                                value={data?.user?.name ? data?.user?.name?.charAt(0).toUpperCase() +
                                    data?.user?.name?.slice(1).toLowerCase() : ""}
                            />
                        </Col>
                        <Col lg={6} md={6}>
                            <InputCustom
                                label="Contact no."
                                className="mb-44"
                                placeholder='Enter Contact no.'
                                id="contact"
                                name="contact"
                                type="text"
                                onChange={formik.handleChange}
                                autoFocus={true}
                                value={data?.user?.mobile_number ? data?.user?.mobile_number : ""}
                                readOnly
                            />
                        </Col>
                        <Col lg={6} md={6}>
                            <InputCustom
                                label="Email"
                                icon={<UserIcon />}
                                className="input_with_icon"
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                autoFocus={true}
                                value={data?.user?.email ? data?.user?.email : ""}
                                readOnly
                            />
                        </Col>
                        <Col lg={6} md={6}>
                            <InputCustom
                                label="Password"
                                type="password"
                                id="password"
                                placeholder="Password"
                                name="password"
                                onChange={formik.handleChange}
                                icon={<LockIcon />}
                                icontwo={<EyeIcon />}
                                className="input_with_icon password_Input"
                                classIcontwo="input_Eyeicon"
                                autoFocus={true}
                                value={formik.values.password}
                                error={
                                    formik.errors.password && formik.touched.password ? (
                                        <span
                                        >
                                            {formik.errors.password}
                                        </span>
                                    ) : null
                                }
                            />
                        </Col>
                        <Col xs={12} className='mt-4'>
                            <button className='reset_btn mb-0'>Reset</button>
                        </Col>
                    </Row>
                </Form>

            </section>
        </>
    )
}

export default Account