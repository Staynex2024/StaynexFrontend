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
import { useDispatch } from "react-redux";
import toaster from "../../../../Common/Toast";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { callApiPostMethod } from "../../../../../Redux/Actions/api.action";
import { APIURL } from "../../../../../Utils";
import { useLocation } from 'react-router-dom'


const Newproperty = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: any = useDispatch();

  const location = useLocation()
  const { from } = location.state
  console.log(from)


  const [fileArray, setFileArray] = useState([]);
  const [uploadFile, setUploadFile] = useState([]);
  const [draftKey, setDraftKey] = useState(false);
  const [sizeInput, setSizeInput] = useState(false);
  const [bedroomSize, setBedroomSize] = useState<any>([]);

  let Country = require("country-state-city").Country;
  let State = require("country-state-city").State;

  const addnewproperty = Yup.object().shape({
    name: Yup.string()
      .required("This fieldd is required")
      .min(2, "Property name should be at least 2 characters long.")
      .max(25, "Property name should be at most 25 characters long.")
      .matches(/^(?! ).*(?<! )$/, "Can not enter space in start or end"),
    country: Yup.string().required("This fieldd is required"),
    state: Yup.string().required("This fieldd is required"),
    address: Yup.string()
      .required("This fieldd is required")
      .min(8, "Address should be at least 8 characters long.")
      .max(50, "Address should be at least 50 characters long.")
      .matches(/^(?! ).*(?<! )$/, "Can not enter space in start or end")
      .matches(/^[0-9a-zA-Z\s,.-]+$/, "Please enter valid address"),
    location: Yup.string().required("This fieldd is required"),
    description: Yup.string()
      .min(30, "minimum 30 characters allowed")
      .max(300, "maximum 300 characters allowed")
      .required("This fieldd is required"),
    propertyType: Yup.string().required("This fieldd is required"),
    bedrooms: Yup.number()
      .positive()
      .required("This fieldd is required")
      .min(1, "bedrooms  should be of minimum 1")
      .max(30, "bedrooms  should not more than 30"),
    // images: Yup.array().min(5, 'at least 5 images required').max(10, 'maximum 10 images').required('This Field is required'),
    // size: Yup.number().required("This fieldd is required"),
    // .min(2, 'size  should be of minimum 2 digits')
    // .max(5, 'bedrooms  should not more than 5 digits'),
    email: Yup.string()
      .email("Please enter valid email")
      .required("This fieldd is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please enter valid email"),
    contact: Yup.string()
      .min(10, "Contact number should be of minimum 10 digits")
      .max(12, "Contact number should not more than 12 digits")
      .required("This fieldd is required"),
    website: Yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      country: "",
      state: "",
      location: "",
      description: "",
      propertyType: "",
      bedrooms: "",
      images: [],
      size: bedroomSize,
      pool: false,
      workspace: false,
      ac: false,
      kitchen: false,
      hdtv: false,
      pet: false,
      wifi: false,
      washer: false,
      email: "",
      contact: "",
      website: "",
    },
    validationSchema: addnewproperty,
    onSubmit: async (values) => {
      let dataToSend = {
        name: values?.name,
        country: values?.country,
        state: values?.state,
        address: values?.address,
        longitude: values?.location,
        latitude: values?.location,
        description: values?.description,
        type: values?.propertyType,
        bedbedrooms: values?.bedrooms,
        rooms: {
          total : values?.bedrooms,
          sizes : [
            bedroomSize
          ]
        },
        email: values?.email,
        mobile_number: values?.contact,
        outdoor_pool: values?.pool,
        workspace: values?.workspace,
        pet_allowed: values?.pet,
        wifi: values?.wifi,
        air_conditioner: values?.ac,
        draft: draftKey,
        kitchen: values?.kitchen,
        hd_tv: values?.hdtv,
        free_washer: values?.washer,
        images: [
          "https://media.istockphoto.com/id/1083982928/photo/jaipur-metro.jpg?s=2048x2048&w=is&k=20&c=h9FYPJHd-TfFQNjbRCELPG93tcNj8Zb1Qgcr_lM5Zog=",
        ],
        website: values?.website,
      };
      const res: any = await dispatch(
        callApiPostMethod(APIURL.VENDOR_ADD_PROPERTY, dataToSend, {}, true)
      );
      // const result = await dispatch(addProperty(dataToSend))
      // if (result?.statusCode === 201) {
      //   toaster.success(result?.message)
      //   formik.resetForm()
      // } else if (result?.statusCode === 400) {
      //   toaster.error(result?.message)
      // }
    },
  });

  const options = [
    { value: "resort", label: "Resort" },
    { value: "villa", label: "Villa and Mansion" },
    { value: "hotel", label: "Hotel" },
    { value: "boutique", label: "Boutique Hotel" },
  ];

  // const uploadMultipleFiles = (e: any) => {
  //   if (e.currentTarget.files[0].size < 2000000) {
  //     const files: any = Array.from(e.target.files)
  //     setUploadFile((prevFile): any => [...prevFile, ...files])
  //     const fileURLs: any = files.map((file: any) => URL.createObjectURL(file))
  //     setFileArray((prevFileArray): any => [...prevFileArray, ...fileURLs])

  //   } else {
  //     toaster.error("File must be less than 2 MB");
  //   }
  // }

  const uploadMultipleFiles = (e: any) => {
    const uploadedFiles = Array.from(e.target.files);
    const filteredFiles = uploadedFiles.filter((file: any) => {
      // Check if the file already exists in the uploadFile array based on its name
      const existingFile = uploadFile.find(
        (existing: any) => existing.name === file.name
      );
      return !existingFile && file.size < 2000000; // Only add if it's not a duplicate and size is less than 2 MB
    });
    if (filteredFiles.length > 0) {
      setUploadFile((prevFile): any => [...prevFile, ...filteredFiles]);
      const fileURLs: any = filteredFiles.map((file: any) =>
        URL.createObjectURL(file)
      );
      setFileArray((prevFileArray): any => [...prevFileArray, ...fileURLs]);
    } else {
      toaster.error("Files must be less than 2 MB and not duplicates.");
    }
  };

  useEffect(() => {
    formik.setFieldValue("images", uploadFile);
    // eslint-disable-next-line
  }, [formik.values.images, uploadFile]);

  const uploadFiles = (e: any) => {
    e.preventDefault();
  };

  const numberOfBedrooms = parseInt(formik.values.bedrooms);
  const bedroomArray: any = Array.from({ length: numberOfBedrooms });

  const handleSizes = (e:any, ind: any) => {
    formik.setFieldValue(`room_${ind + 1}`, e.target.value);
    setBedroomSize( {...bedroomSize, [e.target.name] : e.target.value})
  };

  useEffect(() => {
      let len = Array.from({ length: parseInt(formik.values.bedrooms) })
      len.map((element, index) => {
        // formik.setFieldError(`room_${index + 1}`, "Required")
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.bedrooms]);

  return (
    <>
      <section className="new_property">
        <h6>Property information</h6>
        <div className="new_property_section">
          <Form onSubmit={formik.handleSubmit}>
            <Row className="">
              <Col lg={4} md={6}>
                <InputCustom
                  label="Name"
                  className="mb-44"
                  placeholder="Enter Name"
                  id="name"
                  name="name"
                  type="text"
                  onChange={(event: any) => {
                    if (/^([A-Za-z]|)+$/.test(event.target.value)) {
                      formik.handleChange(event);
                    }
                  }}
                  maxLength={25}
                  // canGiveSpace={true}
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
                        <option value={""}>{"Select country"}</option>
                        {Country.getAllCountries().map(
                          (data: any, index: any) => (
                            <option value={data.isoCode} key={index}>
                              {data.name}
                            </option>
                          )
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
                        <option value={""}>{"Select State"}</option>
                        {State.getStatesOfCountry(formik.values.country).map(
                          (data: any, index: any) => (
                            <option value={data.isoCode} key={index}>
                              {data.name}
                            </option>
                          )
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
                <InputCustom
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
                />
              </Col>
              <Col lg={8} md={12}>
                <label className="form-label">Location</label>
                <Row>
                  <Col lg={6} md={6}>
                    <InputCustom
                      className="mb-44"
                      placeholder="Enter Longitude"
                      id="location"
                      name="location"
                      type="text"
                      onChange={formik.handleChange}
                      autoFocus={true}
                      value={formik.values.location}
                      error={
                        formik.errors.location && formik.touched.location ? (
                          <span>{formik.errors.location}</span>
                        ) : null
                      }
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <InputCustom
                      className="mb-44"
                      placeholder="Enter Latitude"
                      id="location"
                      name="location"
                      type="text"
                      onChange={formik.handleChange}
                      autoFocus={true}
                      value={formik.values.location}
                      error={
                        formik.errors.location && formik.touched.location ? (
                          <span>{formik.errors.location}</span>
                        ) : null
                      }
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
                    formik.errors.description && formik.touched.description ? (
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
                    formik.setFieldValue("propertyType", option.value)
                  }
                  name={"propertyType"}
                  placeholder="Select"
                  isSearchable={false}
                />
                {formik.errors.propertyType && formik.touched.propertyType ? (
                  <span className="error-message">
                    {formik.errors.propertyType}
                  </span>
                ) : null}
              </Col>
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

              {formik.values.bedrooms ? (
                <Col lg={4} md={6}>
                  {" "}
                  <CommonButton
                    title="Add sizes"
                    type="button"
                    onClick={() => {setSizeInput(!sizeInput); }}
                  />
                </Col>
              ) : null}

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
                          onChange={(e) => handleSizes(e,ind)}
                          autoFocus={true}
                          value={formik.values[`room_${ind + 1}`]}
                          error={
                            formik.errors[`room_${ind + 1}`] && formik.touched[`room_${ind + 1}`] ? (
                              <span>{formik.errors[`room_${ind + 1}`]}</span>
                            ) : null
                          }
                        />
                      </Col>
                    );
                  })
                : null}

              <Col lg={12}>
                <div className="upload_image">
                  <ul className="upload_image_listed">
                    <li>
                      <div className="form-group multi-preview">
                        {fileArray.map((url, data: any) => (
                          <img src={url} alt="..." key={url} />
                        ))}

                        <div className="image_up">
                          <span>
                            <PlusIcon />
                          </span>
                          <Form.Control
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            onChange={uploadMultipleFiles}
                            className="file_up"
                          />
                        </div>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={uploadFiles}
                        >
                          Upload
                        </button>
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
                      formik.handleChange(event);
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
                  label="Website."
                  className="mb-44"
                  placeholder="www.kunangresort.com"
                  id="website"
                  name="website"
                  type="text"
                  onChange={(event) => {
                    formik.handleChange(event);
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
            </Row>
            <Row>
              <Col lg={6} md={6}>
                <CommonButton type="submit" title="Submit" />
              </Col>
              <Col lg={6} md={6}>
                <CommonButton
                  type="submit"
                  title="Do this later"
                  onClick={() => setDraftKey(true)}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Newproperty;
