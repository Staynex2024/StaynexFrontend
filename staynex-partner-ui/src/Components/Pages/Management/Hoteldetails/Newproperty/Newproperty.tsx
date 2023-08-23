import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./Newproperty.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputCustom from "../../../../Common/Inputs/InputCustom";
import CustomSelect from "../../../../Common/Select/Select";
import TextArea from "../../../../Common/FormInputs/TextArea";
import slider1 from "../../../../Assets/Images/slider1.png";
import { PlusIcon } from "../../../../../Assets/Images/svgImgs/svgImgs";
import Checkbox from "../../../../Common/FormInputs/Checkbox";
import PoolIcon from "../../../../../Assets/Images/Icons/PoolIcon.svg";
import WorkspaceIcon from "../../../../../Assets/Images/Icons/WorkspaceIcon.svg";
import ConditioningIcon from "../../../../../Assets/Images/Icons/ConditioningIcon.svg";
import KitchenIcon from "../../../../../Assets/Images/Icons/KitchenIcon.svg";
import TVIcon from "../../../../../Assets/Images/Icons/TVIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toaster from "../../../../Common/Toast";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { callApiPostMethod } from "../../../../../Redux/Actions/api.action";
import { APIURL } from "../../../../../Utils";
import NewPropertyValidation from "./NewPropertyValidation";
import CommonHeading from "../../../../Common/CommonHeading/CommonHeading";
import LocationPicker from "../../../../Common/LocationPicker/LocationPicker";
import { v4 as uuidv4 } from 'uuid';

const Newproperty = () => {
  const dispatch: any = useDispatch()
  const userDetails: any = useSelector<any>(
    (state: any) => state.user.userDetails,
  )

  const [fileArray, setFileArray] = useState([])
  const [uploadFile, setUploadFile] = useState([])
  const [draftKey, setDraftKey] = useState(false)
  const [sizeInput, setSizeInput] = useState(false)
  const [bedroomSize, setBedroomSize] = useState<any>([])
  const [selectedLatLong, setSelectedLatLong] = useState<any>({})
  const [uplaodData, setUplaodData] = useState<any>([])

  let Country = require("country-state-city").Country;
  let State = require("country-state-city").State;
  const navigate: any = useNavigate();
  const uniqueId = uuidv4();

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      country: '',
      state: '',
      latitude: '',
      longitude: '',
      description: '',
      propertyType: '',
      bedrooms: '',
      images: '',
      size: bedroomSize,
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
      website: '',
    },
    validationSchema: NewPropertyValidation,
    onSubmit: async (values) => {
      let dataToSend = {
        name: values?.name,
        country: values?.country,
        state: values?.state,
        address: values?.address,
        longitude: values?.longitude,
        latitude: values?.latitude,
        description: values?.description,
        type: values?.propertyType,
        bedbedrooms: values?.bedrooms,
        rooms: {
          total: values?.bedrooms,
          sizes: bedroomSize,
        },
        email: values?.email,
        mobile_number: '+62' + values?.contact,
        outdoor_pool: values?.pool,
        workspace: values?.workspace,
        pet_allowed: values?.pet,
        wifi: values?.wifi,
        air_conditioner: values?.ac,
        draft: draftKey,
        kitchen: values?.kitchen,
        hd_tv: values?.hdtv,
        free_washer: values?.washer,
        images: uplaodData,

        website: values?.website,
        uu_id: uniqueId.replace(/-/g, "")
      };
      const res: any = await dispatch(
        callApiPostMethod(APIURL.VENDOR_ADD_PROPERTY, dataToSend, {}, true),
      )
      if (res.statusCode === 201) {
        navigate('/auth/hotel-details')
      }
      // const result = await dispatch(addProperty(dataToSend))
      // if (result?.statusCode === 201) {
      //   toaster.success(result?.message)
      //   formik.resetForm()
      // } else if (result?.statusCode === 400) {
      //   toaster.error(result?.message)
      // }
    },
  })

  const options = [
    { value: 'resort', label: 'Resort' },
    { value: 'villa', label: 'Villa and Mansion' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'boutique', label: 'Boutique Hotel' },
  ]
  const uploadMultipleFiles = async (e: any) => {
    let formData = new FormData()
    let fileData = e.target.files[0]
    const name = e.target.value.split(`\\`)
    const fileName = name[name.length - 1]
    formData.append('file', fileData, fileName)
    const res: any = await dispatch(
      callApiPostMethod(APIURL.VENDOR_UPLAOD, formData, {}, true),
    )
    setUplaodData([...uplaodData, res?.data])

    const uploadedFiles: any = Array.from(e.target.files)
    const filteredFiles = uploadedFiles.filter((file: any) => {
      // Check if the file already exists in the uploadFile array based on its name
      const existingFile = uploadFile.find(
        (existing: any) => existing.name === file.name,
      )
      return !existingFile && file.size < 2000000 // Only add if it's not a duplicate and size is less than 2 MB
    })
    if (filteredFiles.length > 0) {
      setUploadFile((prevFile): any => [...prevFile, ...filteredFiles])
      const fileURLs: any = filteredFiles.map((file: any) =>
        URL.createObjectURL(file),
      )
      setFileArray((prevFileArray): any => [...prevFileArray, ...fileURLs])
    } else {
      toaster.error('Files must be less than 2 MB and not duplicates.')
    }
  }

  useEffect(() => {
    formik.setFieldValue('images', uploadFile)
    // eslint-disable-next-line
  }, [formik.values.images, uploadFile])

  const uploadFiles = (e: any) => {
    e.preventDefault()
  }

  const numberOfBedrooms = parseInt(formik.values.bedrooms)
  const bedroomArray: any = Array.from({ length: numberOfBedrooms })

  const handleSizes = (e: any, ind: any) => {
    const newBedroomSize = [...bedroomSize]
    newBedroomSize[ind] = { [e.target.name]: e.target.value }
    setBedroomSize(newBedroomSize)

    // Assuming `formik` is a reference to your Formik instance
    formik.setFieldValue(`room_${ind + 1}`, e.target.value)
  }

  useEffect(() => {
    if (selectedLatLong.lat && selectedLatLong?.lon) {
      formik.setFieldValue('longitude', selectedLatLong?.lon)
      formik.setFieldValue('latitude', selectedLatLong?.lat)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLatLong])

  //  For formik validation , will do later do not remove useEffect
  useEffect(() => {
    let len = Array.from({ length: parseInt(formik.values.bedrooms) })
    len.map((element, index) => {
      formik.setFieldError(`room_${index + 1}`, 'Required')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  
  return (
    <>
      <div className="Usercraete_property_page black_bg_style">
        <Row className="mb-5 align-items-center">
          <Col xs={12} md={5}>
            <CommonHeading
              heading="Create new property"
              className="mb-0 pb-0"
            />
          </Col>
        </Row>
        <section className="new_property">
          <h6>Property information</h6>
          <div className="new_property_section">
            <Form onSubmit={formik.handleSubmit}>
              <Row className="">
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Property Name"
                    className="mb-44"
                    placeholder="Enter Property Name"
                    id="name"
                    name="name"
                    canGiveSpace={true}
                    type="text"
                    onChange={(event: any) => {
                      if (/^([A-Za-z ]|)+$/.test(event.target.value)) {
                        formik.handleChange(event)
                      }
                    }}
                    maxLength={25}
                    autoFocus={true}
                    value={formik.values.name}
                    error={
                      formik.errors.name && formik.touched.name ? (
                        <span>{formik.errors.name}</span>
                      ) : null
                    }
                  />
                </Col>
                <Col lg={4} md={6}>
                  <div>
                    <Row className="flex-column">
                      <label className="form-label">Country</label>
                      <Form.Group className="customInput label_subText">
                        <Form.Control
                          as="select"
                          // defaultValue={'1'}
                          id="country"
                          onChange={(e) => formik.handleChange(e)}
                          value={formik.values.country}
                        >
                          <option value={''}>{'Select country'}</option>
                          {Country.getAllCountries().map(
                            (data: any, index: any) => (
                              <option value={data.isoCode} key={index}>
                                {data.name}
                              </option>
                            ),
                          )}
                        </Form.Control>
                        {formik.errors.country && formik.touched.country ? (
                          <span className="error-message">
                            {formik.errors.country}
                          </span>
                        ) : null}
                      </Form.Group>
                    </Row>
                  </div>
                </Col>
                <Col lg={4} md={6}>
                  <div>
                    <Row className="flex-column">
                      <label className="form-label">State</label>
                      <Form.Group className="customInput label_subText">
                        <Form.Control
                          as="select"
                          // defaultValue={'1'}
                          id="state"
                          onChange={(e) => formik.handleChange(e)}
                          value={formik.values.state}
                        >
                          <option value={''}>{'Select State'}</option>
                          {State.getStatesOfCountry(formik.values.country).map(
                            (data: any, index: any) => (
                              <option value={data.isoCode} key={index}>
                                {data.name}
                              </option>
                            ),
                          )}
                        </Form.Control>
                        {formik.errors.state && formik.touched.state ? (
                          <span className="error-message">
                            {formik.errors.state}
                          </span>
                        ) : null}
                      </Form.Group>
                    </Row>
                  </div>
                </Col>
                <Col lg={4} md={6}>
                  {/* <InputCustom
                    label="Address"
                    className="mb-44"
                    placeholder="Enter Address"
                    id="address"
                    name="address"
                    type="text"
                    maxLength={50}
                    canGiveSpace={true}
                    onChange={formik.handleChange}
                    autoFocus={true}
                    value={formik.values.address}
                    error={
                      formik.errors.address && formik.touched.address ? (
                        <span>{formik.errors.address}</span>
                      ) : null
                    }
                  /> */}
                  <LocationPicker
                    setSelectedLatLong={setSelectedLatLong}
                    formik={formik}
                  />
                </Col>
                <Col lg={8} md={12}>
                  <label className="form-label">Location</label>
                  <Row>
                    <Col lg={6} md={6}>
                      <InputCustom
                        className="mb-44"
                        placeholder="Enter Longitude"
                        id="longitude"
                        name="longitude"
                        type="text"
                        readOnly
                        onChange={formik.handleChange}
                        autoFocus={true}
                        value={formik.values.longitude}
                        // error={
                        //   formik.errors.longitude &&
                        //   formik.touched.longitude ? (
                        //     <span>{formik.errors.longitude}</span>
                        //   ) : null
                        // }
                      />
                    </Col>
                    <Col lg={6} md={6}>
                      <InputCustom
                        className="mb-44"
                        placeholder="Enter Latitude"
                        id="latitude"
                        name="latitude"
                        type="text"
                        readOnly
                        onChange={formik.handleChange}
                        autoFocus={true}
                        value={formik.values.latitude}
                        // error={
                        //   formik.errors.latitude && formik.touched.latitude ? (
                        //     <span>{formik.errors.latitude}</span>
                        //   ) : null
                        // }
                      />
                    </Col>
                  </Row>
                </Col>

                <Col lg={12}>
                  <TextArea
                    label="Description"
                    className="textarea_feilds mb-44"
                    placeholder="Enter Description"
                    name="description"
                    maxLength={300}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    error={
                      formik.errors.description &&
                      formik.touched.description ? (
                        <span>{formik.errors.description}</span>
                      ) : null
                    }
                  />
                </Col>
                <Col lg={4} md={6}>
                  <CustomSelect
                    label="Type"
                    classgroup="mb-44"
                    options={options}
                    onChange={(option: any) =>
                      formik.setFieldValue('propertyType', option.value)
                    }
                    name={'propertyType'}
                    placeholder="Select"
                    isSearchable={false}
                    error={
                      formik.errors.propertyType &&
                      formik.touched.propertyType ? (
                        <span className="error-msg">
                          {formik.errors.propertyType}
                        </span>
                      ) : null
                    }
                  />
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Bedroom (s)"
                    className="mb-44"
                    placeholder="Enter Bedroom (s)"
                    id="bedrooms"
                    name="bedrooms"
                    onChange={(event) => {
                      if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event)
                        setSizeInput(!sizeInput)
                      }
                    }}
                    type="number"
                    disableDecimal={true}
                    onWheel={(e: any) => e.target.blur()}
                    min={1}
                    maxLength={3}
                    autoFocus={true}
                    value={formik.values.bedrooms}
                    error={
                      formik.errors.bedrooms && formik.touched.bedrooms ? (
                        <span>{formik.errors.bedrooms}</span>
                      ) : null
                    }
                  />
                </Col>

                {/* {formik.values.bedrooms ? (
                <Col lg={4} md={6}>
                  <InputCustom
                    label="bedrooms (s)"
                    className="mb-44"
                    placeholder="Enter bedrooms (s)"
                    id="bedrooms"
                    name="bedrooms"
                    onChange={(event) => {
                      if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    type="number"
                    onWheel={(e: any) => e.target.blur()}
                    min={1}
                    maxLength={3}
                    autoFocus={true}
                    value={formik.values.bedrooms}
                    error={
                      formik.errors.bedrooms && formik.touched.bedrooms ? (
                        <span>{formik.errors.bedrooms}</span>
                      ) : null
                    }
                  />
                </Col>
              ) : null} */}

                {/* {formik.values.bedrooms ? (
                  <Col lg={4} md={6}>
                    {" "}
                    <CommonButton
                      title="Add sizes"
                      type="button"
                      onClick={() => {
                        setSizeInput(!sizeInput);
                      }}
                    />
                  </Col>
                ) : null} */}

                {formik.values.bedrooms && sizeInput
                  ? bedroomArray.map((e: any, ind: any) => {
                      return (
                        <Col lg={4} md={6} key={ind}>
                          <InputCustom
                            label={`Room ${ind + 1} Size (sqft)`}
                            className="mb-44"
                            placeholder="Enter Size (sqft)"
                            id={`room_${ind + 1}`}
                            name={`room_${ind + 1}`}
                            type="number"
                            min={4}
                            maxLength={6}
                            onWheel={(e: any) => e.target.blur()}
                            onChange={(e) => handleSizes(e, ind)}
                            autoFocus={true}
                            value={formik.values[`room_${ind + 1}`]}
                            error={
                              formik.errors[`room_${ind + 1}`] &&
                              formik.touched[`room_${ind + 1}`] ? (
                                <span>{formik.errors[`room_${ind + 1}`]}</span>
                              ) : null
                            }
                          />
                        </Col>
                      )
                    })
                  : null}

                <Col lg={12}>
                  <div className="upload_image">
                    <label className="form-label">Upload Images</label>
                    <ul className="upload_image_listed">
                      <li className="form-group multi-preview">
                        {fileArray.map((url, data: any) => (
                          <img src={url} alt="..." key={url} />
                        ))}
                        <div className="image_up">
                          <Form.Control
                            type="file"
                            id="formik .uplaodData.images"
                            name="images"
                            multiple
                            onChange={uploadMultipleFiles}
                            className="file_up"
                          />
                          <span onClick={uploadFiles}>
                            <PlusIcon />
                          </span>
                        </div>
                      </li>
                    </ul>
                    {formik.errors.images && formik.touched.images ? (
                      <span className="error-message">
                        {formik.errors.images}
                      </span>
                    ) : null}
                  </div>
                </Col>

                <hr className="spaceline" />
                <Col lg={12}>
                  <div className="check_box_fields">
                    <h6>Amenities</h6>
                    <ul>
                      <li>
                        <Checkbox
                          className="check_reverse"
                          label={
                            <>
                              <img src={PoolIcon} alt="Icon" /> Shared outdoor
                              pool
                            </>
                          }
                          id="pool"
                          name="pool"
                          onChange={formik.handleChange}
                          value={formik.values.pool}
                        />
                      </li>
                      <li>
                        <Checkbox
                          className="check_reverse"
                          label={
                            <>
                              <img src={PoolIcon} alt="Icon" /> Pet allowed
                            </>
                          }
                          id="pet"
                          name="pet"
                          onChange={formik.handleChange}
                          value={formik.values.pool}
                        />
                      </li>
                      <li>
                        <Checkbox
                          className="check_reverse"
                          label={
                            <>
                              <img src={WorkspaceIcon} alt="Icon" /> Dedicated
                              Workspace
                            </>
                          }
                          id="workspace"
                          name="workspace"
                          onChange={formik.handleChange}
                          value={formik.values.pool}
                        />
                      </li>
                      <li>
                        <Checkbox
                          className="check_reverse"
                          label={
                            <>
                              <img src={WorkspaceIcon} alt="Icon" /> Wifi
                            </>
                          }
                          id="wifi"
                          name="wifi"
                          onChange={formik.handleChange}
                          value={formik.values.pool}
                        />
                      </li>
                      <li>
                        <Checkbox
                          className="check_reverse"
                          label={
                            <>
                              <img src={ConditioningIcon} alt="Icon" /> Air
                              conditioning
                            </>
                          }
                          id="ac"
                          name="ac"
                          onChange={formik.handleChange}
                          value={formik.values.pool}
                        />
                      </li>
                      <li>
                        <Checkbox
                          className="check_reverse"
                          label={
                            <>
                              <img src={ConditioningIcon} alt="Icon" /> Free
                              washer
                            </>
                          }
                          id="washer"
                          name="washer"
                          onChange={formik.handleChange}
                          value={formik.values.pool}
                        />
                      </li>
                      <li>
                        <Checkbox
                          className="check_reverse"
                          label={
                            <>
                              <img src={KitchenIcon} alt="Icon" /> Kitchen
                            </>
                          }
                          id="kitchen"
                          name="kitchen"
                          onChange={formik.handleChange}
                          value={formik.values.pool}
                        />
                      </li>
                      <li>
                        <Checkbox
                          className="check_reverse"
                          label={
                            <>
                              <img src={TVIcon} alt="Icon" /> 40” HDTV
                            </>
                          }
                          id="hdtv"
                          name="hdtv"
                          onChange={formik.handleChange}
                          value={formik.values.pool}
                        />
                      </li>
                    </ul>
                  </div>
                </Col>
                <hr className="spaceline" />
                <h6 className="heading_space">Contact information</h6>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Email"
                    className="mb-44"
                    placeholder="Enter Email"
                    id="email"
                    name="email"
                    type="text"
                    maxLength={40}
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
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Contact no."
                    className="mb-44"
                    placeholder="Enter Contact no."
                    id="contact"
                    name="contact"
                    type="number"
                    onWheel={(e: any) => e.target.blur()}
                    onChange={(event) => {
                      if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event)
                      }
                    }}
                    autoFocus={true}
                    value={formik.values.contact}
                    error={
                      formik.errors.contact && formik.touched.contact ? (
                        <span>{formik.errors.contact}</span>
                      ) : null
                    }
                  />
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Website"
                    className="mb-44"
                    placeholder="www.kunangresort.com"
                    id="website"
                    name="website"
                    type="text"
                    onChange={(event) => {
                      formik.handleChange(event)
                    }}
                    autoFocus={true}
                    value={formik.values.website}
                    error={
                      formik.errors.website && formik.touched.website ? (
                        <span>{formik.errors.website}</span>
                      ) : null
                    }
                  />
                </Col>
                <Col
                  xs={12}
                  md={2}
                  className="d-flex justify-content-md-end mt-4 mt-md-0"
                >
                  <CommonButton type="submit" title="Create" className="ms-3" />
                </Col>
                <Col
                  xs={12}
                  md={3}
                  className="d-flex justify-content-md-end mt-4 mt-md-0"
                >
                  <CommonButton
                    className="grey-btn"
                    type="submit"
                    title="Do this later"
                    onClick={() => setDraftKey(true)}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </section>
      </div>
    </>
  )
}

export default Newproperty
