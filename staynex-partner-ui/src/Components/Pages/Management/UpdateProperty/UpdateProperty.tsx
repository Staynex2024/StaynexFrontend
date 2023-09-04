import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./UpdateProperty.scss";
import { useFormik } from "formik";
import InputCustom from "../../../Common/Inputs/InputCustom";
import TextArea from "../../../Common/FormInputs/TextArea";
import { PlusIcon } from "../../../../Assets/Images/svgImgs/svgImgs";
import Checkbox from "../../../Common/FormInputs/Checkbox";
import PoolIcon from "../../../../Assets/Images/Icons/PoolIcon.svg";
import WorkspaceIcon from "../../../../Assets/Images/Icons/WorkspaceIcon.svg";
import ConditioningIcon from "../../../../Assets/Images/Icons/ConditioningIcon.svg";
import KitchenIcon from "../../../../Assets/Images/Icons/KitchenIcon.svg";
import TVIcon from "../../../../Assets/Images/Icons/TVIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import toaster from "../../../Common/Toast";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import { callApiPostMethod } from "../../../../Redux/Actions/api.action";
import { APIURL } from "../../../../Utils";
import { useNavigate } from "react-router-dom";
import UpdatePropertyValidation from "./UpdatePropertyValidation";

const UpdateProperty = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();

  const propertyDetails: any = useSelector(
    (state: any) => state.user?.propertyDetails.property[0]
  );


  const userDetails: any = useSelector(
    (state: any) => state.user?.propertyDetails
  );

  const [fileArray, setFileArray] = useState([]);
  const [uploadFile, setUploadFile] = useState([]);
  const [bedroomSize, setBedroomSize] = useState<any>(propertyDetails.rooms?.sizes);
  const [uplaodData, setUplaodData] = useState<any>([])

  let Country = require("country-state-city").Country;
  let State = require("country-state-city").State;

  useEffect(() => {
    formik.setFieldValue("name", propertyDetails.name);
    formik.setFieldValue("address", propertyDetails.location.address);
    formik.setFieldValue("country", propertyDetails.location.country);
    formik.setFieldValue("state", propertyDetails.location.state);
    formik.setFieldValue("location", propertyDetails.location.latitude);
    formik.setFieldValue("description", propertyDetails.description);
    formik.setFieldValue("propertyType", propertyDetails.type);
    formik.setFieldValue("email", userDetails.email);
    formik.setFieldValue("contact", userDetails?.property?.[0]?.location?.contact_number);
    formik.setFieldValue("website", propertyDetails?.location?.website);
    formik.setFieldValue("imgaes", propertyDetails?.images)
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      country: "",
      state: "",
      location: "",
      description: "",
      propertyType: "",
      bedrooms: propertyDetails.rooms.total,
      images: "",
      size: propertyDetails.rooms?.sizes,
      pool: propertyDetails.amenity?.outdoor_pool,
      workspace: propertyDetails.amenity?.workspace,
      ac: propertyDetails.amenity?.air_conditioner,
      kitchen: propertyDetails.amenity?.kitchen,
      hdtv: propertyDetails.amenity?.hd_tv,
      pet: propertyDetails.amenity?.pet_allowed,
      wifi: propertyDetails.amenity?.wifi,
      washer: propertyDetails.amenity?.free_washer,
      email: "",
      contact: "",
      website: "",
    },
    validationSchema: UpdatePropertyValidation,
    onSubmit: async (values) => {
      let dataToSend = {
        description: values?.description,
        mobile_number: values?.contact,
        outdoor_pool: values?.pool,
        workspace: values?.workspace,
        pet_allowed: values?.pet,
        wifi: values?.wifi,
        air_conditioner: values?.ac,
        kitchen: values?.kitchen,
        hd_tv: values?.hdtv,
        free_washer: values?.washer,
        website: values?.website,
        rooms: {
          total: values?.bedrooms,
          sizes: [
            { room_1: 120 },
            { room_2: 200 },
          ]
          ,
        },
        images: fileArray,

        // draft: draftKey,
        // name: values?.name,
        // country: values?.country,
        // state: values?.state,
        // address: values?.address,
        // longitude: values?.location,
        // latitude: values?.location,
        // type: values?.propertyType,
        // bedbedrooms: values?.bedrooms,
        // email: values?.email,
      };
      const res: any = await dispatch(
        callApiPostMethod(APIURL.VENDOR_UPDATE_PROPERTY, dataToSend, {}, true)
      );
      if (res?.statusCode === 201) {
        navigate('/auth/hotel-details')
      }
    },
  });


  const options = [
    { value: "resort", label: "Resort" },
    { value: "villa", label: "Villa and Mansion" },
    { value: "hotel", label: "Hotel" },
    { value: "boutique", label: "Boutique Hotel" },
  ];

  useEffect(() => {
    setFileArray(propertyDetails?.images)
  }, [])



  const uploadMultipleFiles = async (e: any) => {
    let formData = new FormData()
    let fileData = e.target.files[0]
    const name = e.target.value.split(`\\`)
    const fileName = name[name.length - 1]
    formData.append('file', fileData, fileName)
    const res: any = await dispatch(
      callApiPostMethod(APIURL.VENDOR_UPLOAD, formData, {}, true),
    )

    setUplaodData([...uplaodData, res?.data])
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

  const numberOfBedrooms = parseInt(propertyDetails?.rooms?.total);
  const bedroomArray: any = Array.from({ length: numberOfBedrooms });
  const handleSizes = (e: any, ind: any) => {
    formik.setFieldValue(`room_${ind + 1}`, e.target.value);
    setBedroomSize({ ...bedroomSize, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //     let len = Array.from({ length: parseInt(formik.values.bedrooms) })
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formik.values.bedrooms]);

  // propertyDetails?.rooms?.sizes.map((e, ind) => {
  //   let a:any = Object?.values(e)

  // )

  // }

  // propertyDetails?.rooms?.sizes.map((e, ind) => {
  //   // let a:any = Object?.values(e)
  //   let text = "";

  //   for (let x in e) {
  //     text += e[x] + " ";
  //   }
  // });

  const handleBedrooms = (e: any, index: any) => {
    const inputdata = [...bedroomSize]
    inputdata[index][`room_${index + 1}`] = e.target.value
    formik.setFieldValue('size', inputdata)
    setBedroomSize(inputdata)
  }

  return (
    <>
      <div className="Usercraete_property_page black_bg_style">
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
                    readOnly={true}
                    onChange={(event: any) => {
                      if (/^([A-Za-z]|)+$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    maxLength={25}
                    // canGiveSpace={true}
                    autoFocus={true}
                    value={formik.values.name}
                  // error={
                  //   formik.errors.name && formik.touched.name ? (
                  //     <span>{formik.errors.name}</span>
                  //   ) : null
                  // }
                  />
                </Col>
                <Col lg={4} md={6}>
                  <div>
                    <Row className="flex-column">
                      <label className="form-label">Country</label>
                      <Form.Group className="customInput label_subText">
                        <Form.Control
                          as="select"
                          id="country"
                          onChange={(e) => formik.handleChange(e)}
                          value={propertyDetails?.location?.country}
                          readOnly={true}
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
                        {/* {formik.errors.country && formik.touched.country ? (
                        <span className="error-message">
                          {formik.errors.country}
                        </span>
                      ) : null} */}
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
                          id="state"
                          onChange={(e) => formik.handleChange(e)}
                          readOnly={true}
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
                    readOnly={true}
                    name="address"
                    type="text"
                    maxLength={50}
                    canGiveSpace={true}
                    onChange={formik.handleChange}
                    autoFocus={true}
                    value={formik.values.address}
                  // error={
                  //   formik.errors.address && formik.touched.address ? (
                  //     <span>{formik.errors.address}</span>
                  //   ) : null
                  // }
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
                        readOnly={true}
                        value={formik.values.location}
                      // error={
                      //   formik.errors.location && formik.touched.location ? (
                      //     <span>{formik.errors.location}</span>
                      //   ) : null
                      // }
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
                        readOnly={true}
                        autoFocus={true}
                        value={formik.values.location}
                      // error={
                      //   formik.errors.location && formik.touched.location ? (
                      //     <span>{formik.errors.location}</span>
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
                  // error={
                  //   formik.errors.description && formik.touched.description ? (
                  //     <span>{formik.errors.description}</span>
                  //   ) : null
                  // }
                  />
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Type"
                    classgroup="mb-44"
                    // options={options}
                    // onChange={(option: any) =>
                    //   formik.setFieldValue("propertyType", option.value)
                    // }
                    name={"propertyType"}
                    id={'propertyType'}
                    disabled
                    value={propertyDetails.type}
                  // isSearchable={false}
                  />
                  {/* {formik.errors.propertyType && formik.touched.propertyType ? (
                  <span className="error-message">
                    {formik.errors.propertyType}
                  </span>
                ) : null} */}
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Bedroom (s)"
                    className="mb-44"
                    placeholder="Enter Bedroom (s)"
                    id="bedrooms"
                    name="bedrooms"
                    onChange={(event) => {
                      // if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                      formik.handleChange(event);
                      // }
                    }}
                    type="number"
                    onWheel={(e: any) => e.target.blur()}
                    min={1}
                    maxLength={3}
                    autoFocus={true}
                    value={formik.values.bedrooms}
                  // error={
                  //   formik.errors.bedrooms && formik.touched.bedrooms ? (
                  //     <span>{formik.errors.bedrooms}</span>
                  //   ) : null
                  // }
                  />
                </Col>

                {/* {formik.values.bedrooms ? (
                <Col lg={4} md={6}>
                  {" "}
                  <CommonButton
                    title="Add sizes"
                    type="button"
                    onClick={() => {setSizeInput(!sizeInput); }}
                  />
                </Col>
              ) : null} */}

                {/* {propertyDetails?.rooms?.total
                ? propertyDetails?.rooms?.sizes.map((e: any, ind: any) => {
                    return (
                      <Col lg={4} md={6} key={ind}>
                        <InputCustom
                          label={`Room ${ind + 1} Size (sqft)`}
                          className="mb-44"
                          placeholder="Enter Size (sqft)"
                          id={`room_${ind + 1}`}
                          name={`room_${ind + 1}`}
                          type="text"
                          min={4}
                          maxLength={6}
                          onWheel={(e: any) => e.target.blur()}
                          onChange={(e) => handleSizes(e, ind)}
                          autoFocus={true}
                          value={e?.rooms?.sizes[0][`room_` + (ind + 1)]}
                          error={
                            formik.errors[`room_${ind + 1}`] &&
                            formik.touched[`room_${ind + 1}`] ? (
                              <span>{formik.errors[`room_${ind + 1}`]}</span>
                            ) : null
                          }
                        />
                      </Col>
                    );
                  })
                : null}  ((()))*/}
                {propertyDetails?.rooms?.total &&
                  propertyDetails.rooms.sizes.map((item: any, index: any) => (
                    <InputCustom
                      label="Size (sqft)"
                      className="mb-44"
                      placeholder="Enter Size (imagessqft)"
                      id="size"
                      name="size"
                      type="text"
                      maxLength={25}
                      autoFocus={true}
                      onChange={(e) => handleBedrooms(e, index)}
                      value={formik.values.size[index][`room_${index + 1}`]}
                    />
                  ))}

                {/* propertyDetails?.rooms?.sizes[0][`room_` + (index + 1)] */}
                <Col lg={12}>
                  <div className="upload_image">
                    <ul className="upload_image_listed">
                      <li>
                        <div className="form-group multi-preview">
                          {fileArray.map((url, data: any) => (
                            <img src={url} alt="..." key={url} />
                          ))}

                          <div className="image_up">
                            <Form.Control
                              type="file"
                              id="formik.uplaodData?.images"
                              name="images"
                              multiple
                              onChange={uploadMultipleFiles}
                              className="file_up"
                            />
                            <span onClick={uploadFiles}>
                              <PlusIcon />
                            </span>
                          </div>

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
                          checked={formik.values.pool}
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
                          checked={formik.values.pet}
                          value={formik.values.pet}
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
                          value={formik.values.workspace}
                          checked={formik.values.workspace}
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
                          checked={formik.values.wifi}
                          value={formik.values.wifi}
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
                          checked={formik.values.ac}
                          value={formik.values.ac}
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
                          value={formik.values.washer}
                          checked={formik.values.washer}
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
                          checked={formik.values.kitchen}
                          value={formik.values.kitchen}
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
                          checked={formik.values.hdtv}
                          onChange={formik.handleChange}
                          value={formik.values.hdtv}
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
                    readOnly={true}
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
                    type="text"
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
                    label="Website"
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
                <Row className="mb-5 align-items-center">
                  <Col xs={12} className="d-flex justify-content-start">
                    <CommonButton type="submit" title="Update" />
                    {/* <CommonButton type="submit" title="Create" className="ms-3" /> */}
                  </Col>
                </Row>
                {/* <Col lg={6} md={6}>
                <CommonButton type="submit" title="Update" />
              </Col> */}
                {/* <Col lg={6} md={6}>
                <CommonButton
                  type="submit"
                  title="Do this later"
                  onClick={() => setDraftKey(true)}
                />
              </Col> */}
              </Row>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
};

export default UpdateProperty;
