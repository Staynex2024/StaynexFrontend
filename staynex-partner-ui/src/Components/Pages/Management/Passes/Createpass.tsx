import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import createpass2 from "../../../../Assets/Images/Icons/createpass.png";
import { PlusgrayIcon, PlusIcon } from "../../../../Assets/Images/svgImgs/svgImgs";
import InputCustom from "../../../Common/Inputs/InputCustom";
import Upload from "../../../Common/FormInputs/Upload";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import toaster from "../../../Common/Toast";
import CustomSelect from "../../../Common/Select/Select";
import { callApiPostMethod } from "../../../../Redux/Actions/api.action";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../../../../Utils";

const Createpass = () => {
  const [perkArray, setPerkArray] = useState(["", "", ""]);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [passData, setPassData] = useState();
  const { state } = useLocation();
  const params = useParams();

  const options = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "cream", label: "Cream" },
    { value: "orange", label: "orange" },
  ];
  const addnewproperty = Yup.object().shape({
    residenceName: Yup.string()
      .required("This field is required")
      .min(2, "Name should be at least 2 characters long")
      .max(25, "Name should be at most 25 characters long")
      .matches(/^(?! ).*(?<! )$/, "Can not enter space in start or end"),
    bgImage: Yup.string().required("This field is required"),
    tier_number: Yup.number()
      .required("This field is required")
      .min(1, "Tier number should be of minimum 1"),
    passtier: Yup.string().required("This Field is required"),
    theme: Yup.string().required("This field is required"),
    totalCopies: Yup.number()
      .required("This field is required")
      .min(1, "Passes should be of minimum 1")
      .positive("Price should be positive")
      .min(1, "Price should be of minimum 1")
      .max(10000, "Price  should not more than 10000"),
    pricepass: Yup.number()
      .required("This field is required")
      .positive("Price should be positive")
      .min(1, "Price should be of minimum 1")
      .max(10000, "Price  should not more than 10000"),
    redeemable: Yup.number()
      .required("This field is required")
      .min(1, "Redeemable nights should be of minimum 1")
      .max(365, "Redeemable nights should be at most 365 characters long")
      .oneOf(
        [Yup.ref("tier_number")],
        "Tier number and redeemable nights must be same"
      ),
      items: Yup.array().of(
        Yup.string().required('This field is required')
      )
    // .required('*This field is required')
    // .min(3, 'perks should be of minimum 8 characters')
    // .max(30, 'perks sholud  not more than 30 characters'),
    // passexpiry: Yup.string().required('This field is required'),
  });
  const formik = useFormik({
    initialValues: {
      residenceName: "",
      totalCopies: "",
      theme: "",
      bgImage: "",
      passtier: "",
      pricepass: "",
      redeemable: "",
      tier_number: "",
      perks: perkArray,
      // passexpiry: '',
      // bookinglink: "",
    },
    validationSchema: addnewproperty,
    onSubmit: async (values) => {
      const dataToSend: any = {
        name: values.passtier,
        residenceName: values?.residenceName,
        theme: values?.theme,
        bgImage:
          "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-338504.jpg&fm=jpg",
        price: parseInt(values?.pricepass),
        redeemableNights: Number(values?.redeemable),
        perks: perkArray,
        totalCopies: Number(values?.totalCopies),
        tierNumber: Number(values?.tier_number),
      };
      if (state?.resubmit === "resubmit") {
        dataToSend.passId = Number(params?.id);

        const resubmitPass = await dispatch(
          callApiPostMethod(APIURL.RESUBMIT_PASS, dataToSend, {}, true)
        );
        if (resubmitPass?.statusCode === 201) {
          navigate("/auth/passes");
        }
      } else {
        const createPassResult = await dispatch(
          callApiPostMethod(APIURL.CREATE_PASS, dataToSend, {}, true)
        );
        setPassData(createPassResult);
        if (createPassResult.statusCode === 201) {
          navigate("/auth/passes");
        }
      }
    },
  });
  const [backgroundLogo, setBackgroundLogo] = useState(formik.values.bgImage);


  useEffect(() => {
    
    const backgound_fileInput: any = document.querySelector(
      "#bgImage"
    ) as Element;
    backgound_fileInput.addEventListener("change", (e: any) =>
      setFileName(e, setBackgroundLogo)
    );

    function setFileName(e: any, func: any) {
      let name = e?.target.value.split(`\\`);
      func(name[name.length - 1]);
    }
      // formik.setFieldError(`perks`, "Required");

  },[]);

  // const handlePerks = () => {
  //   if (perkArray.length <= 9) {
  //     const abc:any =[...perkArray,[]]
  //     console.log('abc', abc)
  //     setPerkArray(abc);
  //   }
  // }

  // const handleClose = (i:any) => {
  //   console.log(i,"index number ");
  //   if(perkArray.length > 3){
  //     const arr = [...perkArray]
  //     arr.splice(i,1);
  //     setPerkArray(arr);
  //   }
  // }

  const handlePerksOnchange = (e: any, index: any) => {
    const inputdata = [...perkArray];
    inputdata[index] = e.target.value;
    formik.setFieldValue("perks", inputdata);
    setPerkArray(inputdata);
  };

  const maxFields = 10;
  const handleAddField = () => {
    if (perkArray.length < maxFields) {
      setPerkArray([...perkArray, ""]);
    }
  };

  const handleRemoveField = (index: number) => {
    setPerkArray(perkArray.filter((field: any, i: number) => i !== index));
    formik.setFieldValue(
      "perks",
      perkArray.filter((field: any, i: number) => i !== index)
    );
  };

  const handleResetForm = () => {
    formik.resetForm();
    setPerkArray(["", "", ""]);
  };

  useEffect(() => {
    formik.setFieldValue("passtier", `SP${formik.values.redeemable}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.redeemable]);


  return (
    <>
      <section className="create_pass">
        <Form onSubmit={formik.handleSubmit}>
          <div className="create_pass_section">
            <Row>
              <Col lg={7} md={7} className="order-md-1">
                <div className="pass_form">
                  <h4 className="pass_name">Pass Name </h4>
                  <InputCustom
                    label="Name of Residence"
                    className="mb-3"
                    placeholder="Enter Residence Name"
                    id="residenceName"
                    name="residenceName"
                    type="text"
                    canGiveSpace={true}
                    onChange={(event: any) => formik.handleChange(event)}
                    autoFocus={true}
                    value={formik.values.residenceName}
                    error={
                      formik.errors.residenceName &&
                      formik.touched.residenceName ? (
                        <span>{formik.errors.residenceName}</span>
                      ) : null
                    }
                  />
                  <>
                    <Upload
                      label="Upload Background Image"
                      className="mb-3"
                      name="bgImage"
                      id="bgImage"
                      type="file"
                      accept="application/pdf, image/jpeg, image/jpg, images/png"
                      onChange={(event: any) => {
                        if (event.currentTarget.files[0].size < 2000000) {
                          formik.setFieldValue(
                            "bgImage",
                            event.currentTarget.files[0]
                          );
                        } else {
                          toaster.error("File must be less than 2 MB");
                          formik.setFieldValue("bgImage", "");
                        }
                      }}
                      onClick={() => formik.setFieldTouched("bgImage", true)}
                      error={
                        formik.errors.bgImage && formik.touched.bgImage ? (
                          <span>{formik.errors.bgImage}</span>
                        ) : null
                      }
                      imgName={
                        <p className="uploaded_document_name">
                        {formik.values.bgImage ? backgroundLogo : ""}
                      </p>
                      }
                    />
                  </>
                   {/* <Col lg={12}>
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
                            id="images"
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
                </Col> */}


                  <hr className="spaceline" />
                  <InputCustom
                    label="Number of Passes/copies"
                    className="mb-3"
                    placeholder="Enter Number of passes/copies"
                    id="totalCopies"
                    name="totalCopies"
                    type="text"
                    onChange={(event: any) => {
                      if (/^\d*(\\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    autoFocus={true}
                    value={formik.values.totalCopies}
                    error={
                      formik.errors.totalCopies &&
                      formik.touched.totalCopies ? (
                        <span>{formik.errors.totalCopies}</span>
                      ) : null
                    }
                  />
                  <InputCustom
                    label="Tier number"
                    className="mb-3"
                    placeholder="Tier number"
                    id="tier_number"
                    name="tier_number"
                    type="text"
                    onChange={(event: any) => {
                      if (/^\d*(\\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    autoFocus={true}
                    value={formik.values.tier_number}
                    error={
                      formik.errors.tier_number &&
                      formik.touched.tier_number ? (
                        <span>{formik.errors.tier_number}</span>
                      ) : null
                    }
                  />
                  {/* <InputCustom
                  label="Theme"
                  className="mb-3"
                  placeholder="Theme"
                  id="theme"
                  name="theme"
                  type="text"
                  onChange={(event: any) => {
                    // if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                      formik.handleChange(event)
                    // }
                  }}
                  autoFocus={true}
                  value={formik.values.theme}
                  error={
                    formik.errors.theme && formik.touched.theme ? (
                      <span>{formik.errors.theme}</span>
                    ) : null
                  }
                /> */}
                  <CustomSelect
                    label="Theme"
                    classgroup="mb-44"
                    options={options}
                    onChange={(option: any) =>
                      formik.setFieldValue("theme", option.value)
                    }
                    name={"propertyType"}
                    placeholder="Select"
                    isSearchable={false}
                    // error={
                    //   formik.errors.propertyType &&
                    //   formik.touched.propertyType ? (
                    //     <span className="error-msg">
                    //       {formik.errors.propertyType}
                    //     </span>
                    //   ) : null
                    // }
                  />

                  <InputCustom
                    label="Price per pass"
                    className="mb-3"
                    placeholder="Enter Price per pass"
                    id="pricepass"
                    name="pricepass"
                    type="text"
                    onChange={(event: any) => {
                      formik.handleChange(event);
                    }}
                    autoFocus={true}
                    value={formik.values.pricepass}
                    error={
                      formik.errors.pricepass && formik.touched.pricepass ? (
                        <span>{formik.errors.pricepass}</span>
                      ) : null
                    }
                  />
                  <InputCustom
                    label="Redeemable nights (per year)"
                    className="mb-3"
                    placeholder="Enter Redeemable nights (per year)"
                    id="redeemable"
                    name="redeemable"
                    type="text"
                    onChange={(event: any) => {
                      if (/^\d*(\\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    autoFocus={true}
                    value={formik.values.redeemable}
                    error={
                      formik.errors.redeemable && formik.touched.redeemable ? (
                        <span>{formik.errors.redeemable}</span>
                      ) : null
                    }
                  />
                  <InputCustom
                    label="Pass/Tier Name"
                    className="mb-3"
                    placeholder="Enter Pass/Tier Name"
                    id="passtier"
                    name="passtier"
                    type="text"
                    maxLength={5}
                    onChange={formik.handleChange}
                    autoFocus={true}
                    readOnly={true}
                    value={formik.values.passtier}
                    error={
                      formik.errors.passtier && formik.touched.passtier ? (
                        <span>{formik.errors.passtier}</span>
                      ) : null
                    }
                  />
                  {perkArray &&
                    perkArray.length &&
                    perkArray.map((item: any, index: any) => (
                      <>
                        <InputCustom
                          label={`Perks (${index + 1})`}
                          className="mb-3"
                          placeholder="Enter Perks"
                          id="perks"
                          canGiveSpace={true}
                          type="text"
                          onChange={(event: any) => {
                            handlePerksOnchange(event, index);
                            // formik.handleChange(event); // This is not required for array fields
                            formik.setFieldError(`perks`, event.target.value); // Set the value for the corresponding perk field
                          }}
                          autoFocus={true}
                          name="perks"
                          value={item}
                          error={
                            formik.errors.perks && formik.touched.perks ? (
                              <span>{formik.errors.perks}</span>
                            ) : null
                          }
                        />
                        {perkArray.length > 3 && index > 2 && (
                          <i
                            className="fa fa-times"
                            onClick={() => handleRemoveField(index)}
                          ></i>
                        )}
                      </>
                    ))}
                  <div className="add_fieldsbtn">
                    {perkArray.length <= 9 ? (
                      <button type="button" onClick={handleAddField}>
                        <PlusgrayIcon />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* Expiry date has been set to 10 years from backend so  */}
                  {/* <InputCustom
                    label="Pass Expiry Date"
                    className="mb-3"
                    placeholder="Enter Pass Expiry Date"
                    id="passexpiry"
                    name="passexpiry"
                    type="date"
                    onChange={formik.handleChange}
                    autoFocus={true}
                    value={formik.values.passexpiry}
                    error={
                      formik.errors.passexpiry && formik.touched.passexpiry ? (
                        <span>{formik.errors.passexpiry}</span>
                      ) : null
                    }
                  /> */}
                  {/* <InputCustom
                    label="Booking link"
                    className="mb-3"
                    placeholder="Enter Booking link"
                    id="bookinglink"
                    name="bookinglink"
                    type="text"
                    onChange={formik.handleChange}
                    autoFocus={true}
                    value={formik.values.bookinglink}
                    error={
                      formik.errors.bookinglink &&
                      formik.touched.bookinglink ? (
                        <span>{formik.errors.bookinglink}</span>
                      ) : null
                    }
                  /> */}
                </div>
              </Col>
              <Col lg={5} md={5}>
                <div className="hotel_image">
                  <img src={createpass2} alt="createpass2" />
                </div>
              </Col>
            </Row>
            <div className="createpass_btns">
              {formik.dirty ? (
                <CommonButton
                  title="Reset"
                  onClick={handleResetForm}
                  className="grey-btn"
                  type="button"
                />
              ) : null}

              <CommonButton
                title="Confirm"
                type="submit"
                className="confirm_btn"
              />
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default Createpass;
