import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './Management.scss';
import { useFormik } from 'formik';
import * as Yup from "yup";
import InputCustom from '../../Common/Inputs/InputCustom';
import CustomSelect from '../../Common/Select/Select';
import { PlusgrayIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import CommonButton from '../../Common/CommonButton/CommonButton';
import Explorerprogram from '../../Common/Explorerprogram/Explorerprogram';

const Management = () => {
    const addnewproperty = Yup.object().shape({
        name: Yup.string().required("*This Field is required"),
        nights: Yup.string().required("*This Field is required"),
    });
    const formik = useFormik({
        initialValues: { 
            name: '',
            nights: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            // console.log('values', values)
            // await dispatch(loginAdmin(values));
        },
    });
    const options = [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'USA' },
        { value: 'canada', label: 'Canada' },
        { value: 'russia', label: 'Russia' },
        { value: 'australia', label: 'Australia' },
    ]
    return (
        <>
            <section className='management'>
                <div className='management_program'>
                    <Explorerprogram />
                </div>
                <Form onSubmit={formik.handleSubmit}>
                    <div className='management_form'>
                        <Row>
                            <Col lg={6} md={12}>
                                <CustomSelect
                                    label="Name"
                                    classgroup="mb-44"
                                    options={options}
                                />
                            </Col>
                            <Col lg={6} md={12}>
                                <InputCustom
                                    label="Nights"
                                    className="mb-44"
                                    placeholder='Enter Nights'
                                    id="nights"
                                    name="nights"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.nights}
                                    error={
                                        formik.errors.nights && formik.touched.nights ? (
                                            <span
                                            >
                                                {formik.errors.nights}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={12}>
                                <InputCustom
                                    label="Benefits"
                                    className="mb-3"
                                    placeholder='Enter Name'
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
                                <InputCustom
                                    className="mb-3"
                                    placeholder='Enter Name'
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
                                <div className='add_fieldsbtn'>
                                    <button>
                                        <PlusgrayIcon />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='btn_save'>
                        <CommonButton title="Save" className="save_btn" />
                    </div>
                </Form>
            </section>
        </>
    )
}

export default Management