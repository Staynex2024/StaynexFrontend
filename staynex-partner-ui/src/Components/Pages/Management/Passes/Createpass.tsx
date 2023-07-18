import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import createpass2 from '../../../../Assets/Images/Icons/createpass.png';
import { EditIcon, PlusgrayIcon, } from '../../../../Assets/Images/svgImgs/svgImgs';
import InputCustom from '../../../Common/Inputs/InputCustom';
import Upload from '../../../Common/FormInputs/Upload';
import CommonButton from '../../../Common/CommonButton/CommonButton';

const Createpass = () => {
    /**CREATE DISPATCH OBJECT */
    const dispatch: any = useDispatch();
    const addnewproperty = Yup.object().shape({
        residence: Yup.string().required("*This Field is required"),
        passtier: Yup.string().required("*This Field is required"),
        pricepass: Yup.string().required("*This Field is required"),
        redeemable: Yup.string().required("*This Field is required"),
        perks: Yup.string().required("*This Field is required"),
        perks2: Yup.string().required("*This Field is required"),
        passexpiry: Yup.string().required("*This Field is required"),
        bookinglink: Yup.string().required("*This Field is required"),
    });
    const formik = useFormik({
        initialValues: {
            residence: '',
            passtier: '',
            pricepass: '',
            redeemable: '',
            perks: '',
            perks2: '',
            passexpiry: '',
            bookinglink: '',
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
                            <Col lg={7} md={7} className="order-md-1">
                                <div className='pass_form'>
                                    <h4 className='pass_name'>Pass Name <span><EditIcon /></span></h4>
                                    <InputCustom
                                        label='Name of Residence'
                                        className="mb-3"
                                        placeholder='Enter Residence Name'
                                        id="residence"
                                        name="residence"
                                        type="text"
                                        onChange={formik.handleChange}
                                        autoFocus={true}
                                        value={formik.values.residence}
                                        error={
                                            formik.errors.residence && formik.touched.residence ? (
                                                <span
                                                >
                                                    {formik.errors.residence}
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
                                    <InputCustom
                                        label='Pass/Tier Name'
                                        className="mb-3"
                                        placeholder='Enter Pass/Tier Name'
                                        id="passtier"
                                        name="passtier"
                                        type="text"
                                        onChange={formik.handleChange}
                                        autoFocus={true}
                                        value={formik.values.passtier}
                                        error={
                                            formik.errors.passtier && formik.touched.passtier ? (
                                                <span
                                                >
                                                    {formik.errors.passtier}
                                                </span>
                                            ) : null
                                        }
                                    />
                                    <InputCustom
                                        label='Price per pass'
                                        className="mb-3"
                                        placeholder='Enter Price per pass'
                                        id="pricepass"
                                        name="pricepass"
                                        type="text"
                                        onChange={formik.handleChange}
                                        autoFocus={true}
                                        value={formik.values.pricepass}
                                        error={
                                            formik.errors.pricepass && formik.touched.pricepass ? (
                                                <span
                                                >
                                                    {formik.errors.pricepass}
                                                </span>
                                            ) : null
                                        }
                                    />
                                    <InputCustom
                                        label='Redeemable nights (per year)'
                                        className="mb-3"
                                        placeholder='Enter Redeemable nights (per year)'
                                        id="redeemable"
                                        name="redeemable"
                                        type="text"
                                        onChange={formik.handleChange}
                                        autoFocus={true}
                                        value={formik.values.redeemable}
                                        error={
                                            formik.errors.redeemable && formik.touched.redeemable ? (
                                                <span
                                                >
                                                    {formik.errors.redeemable}
                                                </span>
                                            ) : null
                                        }
                                    />
                                    <InputCustom
                                        label='Perks'
                                        className="mb-3"
                                        placeholder='Enter Perks'
                                        id="perks"
                                        name="perks"
                                        type="text"
                                        onChange={formik.handleChange}
                                        autoFocus={true}
                                        value={formik.values.perks}
                                        error={
                                            formik.errors.perks && formik.touched.perks ? (
                                                <span
                                                >
                                                    {formik.errors.perks}
                                                </span>
                                            ) : null
                                        }
                                    />
                                    <InputCustom
                                        className="mb-3"
                                        placeholder='Enter Perks'
                                        id="perks2"
                                        name="perks2"
                                        type="text"
                                        onChange={formik.handleChange}
                                        autoFocus={true}
                                        value={formik.values.perks2}
                                        error={
                                            formik.errors.perks2 && formik.touched.perks2 ? (
                                                <span
                                                >
                                                    {formik.errors.perks2}
                                                </span>
                                            ) : null
                                        }
                                    />
                                    <div className='add_fieldsbtn'>
                                        <button>
                                            <PlusgrayIcon />
                                        </button>
                                    </div>
                                    <InputCustom
                                        label='Pass Expiry Date'
                                        className="mb-3"
                                        placeholder='Enter Pass Expiry Date'
                                        id="passexpiry"
                                        name="passexpiry"
                                        type="date"
                                        onChange={formik.handleChange}
                                        autoFocus={true}
                                        value={formik.values.passexpiry}
                                        error={
                                            formik.errors.passexpiry && formik.touched.passexpiry ? (
                                                <span
                                                >
                                                    {formik.errors.passexpiry}
                                                </span>
                                            ) : null
                                        }
                                    />
                                    <InputCustom
                                        label='Booking link'
                                        className="mb-3"
                                        placeholder='Enter Booking link'
                                        id="bookinglink"
                                        name="bookinglink"
                                        type="text"
                                        onChange={formik.handleChange}
                                        autoFocus={true}
                                        value={formik.values.bookinglink}
                                        error={
                                            formik.errors.bookinglink && formik.touched.bookinglink ? (
                                                <span
                                                >
                                                    {formik.errors.bookinglink}
                                                </span>
                                            ) : null
                                        }
                                    />
                                </div>
                            </Col>
                            <Col lg={5} md={5}>
                                <div className='hotel_image'>
                                    <img src={createpass2} alt='createpass2' />
                                </div>
                            </Col>
                        </Row>
                        <div className='createpass_btns'>
                            <CommonButton title="Cancel" className="grey-btn" />
                            <CommonButton title="Confirm" className="confirm_btn" />
                        </div>
                    </div>
                </Form>
            </section>
        </>
    )
}

export default Createpass