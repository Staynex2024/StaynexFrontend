import React, { useEffect, useState } from 'react';
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
import CommonButton from '../../../Common/CommonButton/CommonButton';

const Newproperty = () => {
    /**CREATE DISPATCH OBJECT */
    const dispatch: any = useDispatch();

    let Country = require("country-state-city").Country;
    let State = require("country-state-city").State;

    const [selectedFiles, setSelectedFiles]: any = useState([]);

    const addnewproperty = Yup.object().shape({
        name: Yup.string().required("*This Field is required"),
        address: Yup.string().required("*This Field is required"),
        country: Yup.string().required("*This Field is required"),
        state: Yup.string().required("*This Field is required"),
        location: Yup.string().required("*This Field is required"),
        description: Yup.string().required("*This Field is required"),
        propertyType: Yup.string().required("*This Field is required"),
        bedroom: Yup.number().positive().required("*This Field is required"),
        images: Yup.string().required("*This Field is required"),
        size: Yup.string().required("*This Field is required"),
        email: Yup.string()
            .email("Please enter valid email")
            .required("*This Field is required")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Please enter valid email'),
        contact: Yup.string().min(10, "Contact number should be of minimum 10 digits").max(12, 'Contact number should not more than 12 digits').required("*This Field is required"),
    });

    const formik = useFormik({

        initialValues: {
            name: '',
            address: '',
            country: '',
            state: "",
            location: '',
            description: '',
            propertyType: '',
            bedroom: '',
            images: '',
            size: '',
            pool: false,
            workspace: false,
            ac: false,
            kitchen: false,
            hdtv: false,
            pet: false,
            wifi: false,
            washer: false,
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
        { value: 'resort', label: 'Resort' },
        { value: 'villa', label: 'Villa' },
        { value: 'hotel', label: 'Hotel' },
    ]

    // console.log('formik.values', formik.values)

    const handleFileChange = (e) => {
        const a: any = e.target.files
        setSelectedFiles([a, ...selectedFiles]);
    };

    // console.log('selectedFiles :>> ', selectedFiles);

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
                                    maxLength={25}
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

                                <label className="form-label">Country</label>
                                <Form.Group >
                                    <Form.Control
                                        as="select"
                                        defaultValue={"1"}
                                        id="country"
                                        onChange={(e) => { formik.handleChange(e); }}
                                        value={formik.values.country}
                                    >
                                        <option value={""}>{"Select country"}</option>
                                        {Country.getAllCountries().map((data: any, index: any) => (
                                            <option value={data.isoCode} key={index}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    {formik.errors.country &&
                                        formik.touched.country ? (
                                        <span className="error-message">
                                            {formik.errors.country}
                                        </span>
                                    ) : null}
                                </Form.Group>


                                {/* <CustomSelect
                                    label="Country"
                                    classgroup="mb-44"
                                    options={options}
                                    onChange={(option: any) => formik.setFieldValue("country", option.value)}
                                    name={"currency"}
                                    value={formik.values.country}
                                    placeholder="Select"
                                /> */}

                            </Col>
                            <Col lg={4} md={6}>

                                <div >
                                    <Row className="flex-column">
                                        <label className="form-label">State</label>
                                        <Form.Group className="customInput label_subText">
                                            <Form.Control
                                                as="select"
                                                defaultValue={"1"}
                                                id="state"
                                                onChange={(e) => { formik.handleChange(e); }}
                                                value={formik.values.state}
                                            >
                                                <option value={""}>{"Select State"}</option>
                                                {State.getStatesOfCountry(
                                                    formik.values.country
                                                ).map((data: any, index: any) => (
                                                    <option value={data.isoCode} key={index}>
                                                        {data.name}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                            {formik.errors.state &&
                                                formik.touched.state ? (
                                                <span className="error-message">
                                                    {formik.errors.state}
                                                </span>
                                            ) : null}
                                        </Form.Group>
                                    </Row>
                                </div>



                                {/* <CustomSelect
                                    label="State"
                                    classgroup="mb-44"
                                    options={options}
                                    onChange={(option: any) => formik.setFieldValue("state", option.value)}
                                    name={"state"}
                                    value={formik.values.state}
                                    placeholder="Select"
                                />
                                {formik.errors.state && formik.touched.state ? (
                                    <span>
                                        {formik.errors.state}
                                    </span>
                                ) : null} */}
                            </Col>
                            <Col lg={4} md={6}>
                                <InputCustom
                                    label="Address"
                                    className="mb-44"
                                    placeholder='Enter Address'
                                    id="address"
                                    name="address"
                                    type="text"
                                    maxLength={50}
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
                                    maxLength={70}
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
                                    onChange={(option: any) => formik.setFieldValue("propertyType", option.value)}
                                    name={"propertyType"}
                                    value={formik.values.propertyType}
                                    placeholder="Select"
                                    isSearchable={false}
                                />
                                {formik.errors.propertyType && formik.touched.propertyType ? (
                                    <span>
                                        {formik.errors.propertyType}
                                    </span>
                                ) : null}
                            </Col>
                            <Col lg={4} md={6}>
                                <InputCustom
                                    label="Bedroom (s)"
                                    className="mb-44"
                                    placeholder='Enter Bedroom (s)'
                                    id="bedroom"
                                    name="bedroom"
                                    type="number"
                                    onWheel={(e: any) => e.target.blur()}
                                    min={1}
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
                                    type="number"
                                    min={1}
                                    onWheel={(e: any) => e.target.blur()}
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
                                                <Form.Control type="file" multiple onChange={handleFileChange} className='file_up' />
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
                                                id='pet'
                                                name='pet'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={WorkspaceIcon} alt='Icon' /> Dedicated Workspace</>}
                                                id='workspace'
                                                name='workspace'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={WorkspaceIcon} alt='Icon' /> Wifi</>}
                                                id='wifi'
                                                name='wifi'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={ConditioningIcon} alt='Icon' /> Air conditioning</>}
                                                id='ac'
                                                name='ac'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={ConditioningIcon} alt='Icon' /> Free washer</>}
                                                id='washer'
                                                name='washer'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={KitchenIcon} alt='Icon' /> Kitchen</>}
                                                id='kitchen'
                                                name='kitchen'
                                                onChange={formik.handleChange}
                                                value={formik.values.pool}
                                            />
                                        </li>
                                        <li>
                                            <Checkbox
                                                className='check_reverse'
                                                label={<><img src={TVIcon} alt='Icon' /> 40” HDTV</>}
                                                id='hdtv'
                                                name='hdtv'
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
                                    maxLength={40}
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
                                    type="number"
                                    onWheel={(e: any) => e.target.blur()}
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
                        <CommonButton
                            type='submit' title="Submit" />
                    </Form>
                </div>
            </section>
        </>
    )
}

export default Newproperty