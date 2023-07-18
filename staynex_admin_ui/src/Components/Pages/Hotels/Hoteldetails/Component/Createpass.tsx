import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import createpass2 from '../../../../../Assets/Images/Icons/createpass2.png';
import { EditIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';
import InputCustom from '../../../../Common/Inputs/InputCustom';
import Upload from '../../../../Common/FormInputs/Upload';

const Createpass = () => {
    const addnewproperty = Yup.object().shape({
        instlink: Yup.string().required("*This Field is required"),
    });
    const formik = useFormik({
        initialValues: {
            instlink: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            // console.log('values', values)
            // await dispatch(loginAdmin(values));
        },
    });
    return (
        <>
            <section className='create_pass'>
                <Form onSubmit={formik.handleSubmit}>
                    <div className='create_pass_section'>
                        <Row>
                            <Col lg={4}>
                                <div className='hotel_image'>
                                    <img src={createpass2} alt='createpass2' />
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className='pass_form'>
                                    <h4 className='pass_name'>Pass Name <span><EditIcon /></span></h4>
                                    <InputCustom
                                        label='Name of Residence'
                                        className="mb-3"
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
                                    <Upload
                                        label='Upload Logo'
                                        className="mb-3"
                                    />
                                    <Upload
                                        label='Upload Background Image'
                                        className="mb-3"
                                    />
                                    <hr className='spaceline' />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </section>
        </>
    )
}

export default Createpass