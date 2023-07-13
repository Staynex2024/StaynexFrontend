import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './Newproperty.scss';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import InputCustom from '../../../Common/Inputs/InputCustom';
import CustomSelect from '../../../Common/Select/Select';
import TextArea from '../../../Common/FormInputs/TextArea';
import slider1 from '../../../../Assets/Images/slider1.png';
import { PlusIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import Checkbox from '../../../Common/FormInputs/Checkbox';
import PoolIcon from '../../../../Assets/Images/Icons/PoolIcon.svg';
import WorkspaceIcon from '../../../../Assets/Images/Icons/WorkspaceIcon.svg';
import ConditioningIcon from '../../../../Assets/Images/Icons/ConditioningIcon.svg';
import KitchenIcon from '../../../../Assets/Images/Icons/KitchenIcon.svg';
import TVIcon from '../../../../Assets/Images/Icons/TVIcon.svg';
import CommonHeading from '../../../Common/CommonHeading/CommonHeading';

const Newproperty = () => {
    /**CREATE DISPATCH OBJECT */
    const dispatch: any = useDispatch();

    const addnewproperty = Yup.object().shape({
        name: Yup.string().required("*This Field is required"),
        address: Yup.string().required("*This Field is required"),
        location: Yup.string().required("*This Field is required"),
        description: Yup.string().required("*This Field is required"),
        bedroom: Yup.string().required("*This Field is required"),
        size: Yup.string().required("*This Field is required"),
        email: Yup.string().required("*This Field is required"),
        contact: Yup.string().required("*This Field is required"),
    });

    const formik = useFormik({

        initialValues: {
            name: '',
            address: '',
            location: '',
            description: '',
            bedroom: '',
            size: '',
            pool: '',
            email: '',
            contact: '',
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
            <div className='mb-4'>
                <CommonHeading heading='Add New Properties' />
            </div>
            <section className='new_property'>
                <h6>Property information</h6>
                <div className='new_property_section'>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row className='align-items-end'>
                            <Col lg={4} md={6}>
                                <InputCustom
                                    label="Name"
                                    className="mb-44"
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
                            </Col>
                            <Col lg={4} md={6}>
                                <CustomSelect
                                    label="Country"
                                    classgroup="mb-44"
                                    options={options}
                                />
                            </Col>
                            <Col lg={4} md={6}>
                                <CustomSelect
                                    label="State"
                                    classgroup="mb-44"
                                    options={options}
                                />
                            </Col>
                            <Col lg={4} md={6}>
                                <InputCustom
                                    label="Address"
                                    className="mb-44"
                                    placeholder='Enter Address'
                                    id="address"
                                    name="address"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.address}
                                    error={
                                        formik.errors.address && formik.touched.address ? (
                                            <span
                                            >
                                                {formik.errors.address}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={4} md={6}>
                                <InputCustom
                                    label="Location"
                                    className="mb-44"
                                    placeholder='Enter Longitude'
                                    id="location"
                                    name="location"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.location}
                                    error={
                                        formik.errors.location && formik.touched.location ? (
                                            <span
                                            >
                                                {formik.errors.location}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={4} md={6}>
                                <InputCustom
                                    className="mb-44"
                                    placeholder='Enter Longitude'
                                    id="location"
                                    name="location"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.location}
                                    error={
                                        formik.errors.location && formik.touched.location ? (
                                            <span
                                            >
                                                {formik.errors.location}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={12}>
                                <TextArea
                                    label='Description'
                                    className="textarea_feilds mb-44"
                                    placeholder='Enter Description'
                                    name="description"
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    error={
                                        formik.errors.description && formik.touched.description ? (
                                            <span
                                            >
                                                {formik.errors.description}
                                            </span>
                                        ) : null
                                    }

                                />
                            </Col>
                            <Col lg={4} md={6}>
                                <CustomSelect
                                    label="Type"
                                    classgroup="mb-44"
                                    options={options}
                                />
                            </Col>
                            <Col lg={4} md={6}>
                                <InputCustom
                                    label="Bedroom (s)"
                                    className="mb-44"
                                    placeholder='Enter Bedroom (s)'
                                    id="bedroom"
                                    name="bedroom"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.bedroom}
                                    error={
                                        formik.errors.bedroom && formik.touched.bedroom ? (
                                            <span
                                            >
                                                {formik.errors.bedroom}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={4} md={6}>
                                <InputCustom
                                    label="Size (sqft)"
                                    className="mb-44"
                                    placeholder='Enter Size (sqft)'
                                    id="size"
                                    name="size"
                                    type="text"
                                    onChange={formik.handleChange}
                                    autoFocus={true}
                                    value={formik.values.size}
                                    error={
                                        formik.errors.size && formik.touched.size ? (
                                            <span
                                            >
                                                {formik.errors.size}
                                            </span>
                                        ) : null
                                    }
                                />
                            </Col>
                            <Col lg={12}>
                                <div className='upload_image'>
                                    <ul className='upload_image_listed'>
                                        <li>
                                            <img src={slider1} alt='icons' />
                                        </li>
                                        <li>
                                            <div className='image_up'>
                                                <span><PlusIcon /></span>
                                                <Form.Control type="file" className='file_up' />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <hr className='spaceline' />
                            <Col lg={12}>
                                <div className='check_box_fields'>
                                    <h6>Amenities</h6>
                                    <ul>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={PoolIcon} alt='Icon' /> Shared outdoor pool</>}
                                                id='pool'
                                                name='pool'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={PoolIcon} alt='Icon' /> Pet allowed</>}
                                                id='pool'
                                                name='pool'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={WorkspaceIcon} alt='Icon' /> Dedicated Workspace</>}
                                                id='pool'
                                                name='pool'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={WorkspaceIcon} alt='Icon' /> Wifi</>}
                                                id='pool'
                                                name='pool'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={ConditioningIcon} alt='Icon' /> Air conditioning</>}
                                                id='pool'
                                                name='pool'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={ConditioningIcon} alt='Icon' /> Free washer</>}
                                                id='pool'
                                                name='pool'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={KitchenIcon} alt='Icon' /> Kitchen</>}
                                                id='pool'
                                                name='pool'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={TVIcon} alt='Icon' /> 40” HDTV</>}
                                                id='pool'
                                                name='pool'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <hr className='spaceline' />
                            <h6 className='heading_space'>Contact information</h6>
                            <Col lg={6} md={6}>
                                <InputCustom
                                    label="Email"
                                    className="mb-44"
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
                        </Row>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default Newproperty