import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import createpass2 from "../../../../Assets/Images/Icons/createpass.png";
import {
  EditIcon,
  PlusgrayIcon,
} from "../../../../Assets/Images/svgImgs/svgImgs";
import InputCustom from "../../../Common/Inputs/InputCustom";
import Upload from "../../../Common/FormInputs/Upload";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import toaster from "../../../Common/Toast";
import CustomSelect from "../../../Common/Select/Select";
import {
  callApiGetMethod,
  callApiPostMethod,
} from "../../../../Redux/Actions/api.action";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../../../../Utils";

const ReSubmitPass = () => {
  const [perkArray, setPerkArray] = useState(["", "", ""]);
  const dispatch = useDispatch<any>();
  const navigate: any = useNavigate();
  const { id } = useParams();

  const options = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "cream", label: "Cream" },
    { value: "orange", label: "orange" },
  ];

  const addnewproperty = Yup.object().shape({
    residenceName: Yup.string()
      .required("This field is required")
      .min(2, "Name should be at least 2 characters long.")
      .max(25, "Name should be at most 25 characters long.")
      .matches(/^(?! ).*(?<! )$/, "Can not enter space in start or end"),
    bgImage: Yup.string().required("This field is required"),
    passtier: Yup.string().required("This Field is required"),
    theme: Yup.string().required("This field is required"),
    totalCopies: Yup.number()
      .required("This Field is required")
      .positive("Price should be positive")
      .min(1, "Price should be of minimum 1")
      .max(10000, "Price  should not more than 10000"),
    pricepass: Yup.number()
      .required("This Field is required")
      .positive("Price should be positive")
      .min(1, "Price should be of minimum 1")
      .max(10000, "Price  should not more than 10000"),
    tier_number: Yup.number()
      .required("This field is required")
      .min(1, "Tier number should be of minimum 1"),
    redeemable: Yup.number()
      .required("This Field is required")
      .max(365, "Redeemable nights should be at most 365 characters long.")
      .oneOf(
        [Yup.ref("tier_number")],
        "Tier number and redeemable nights must be same"
      ),
    perks: Yup.array().of(
      Yup.string()
        .required("This field is required")
        .min(5, "minimum 5 characters required")
        .max(50, "maximum 50 characters allowed")
    ),
    // bookinglink: Yup.string().required('This Field is required'),
  });
  const formik: any = useFormik({
    initialValues: {
      residenceName: "",
      totalCopies: "",
      theme: "",
      bgImage: "",
      passtier: "",
      pricepass: "",
      redeemable: "",
      tier_number: "",
      perks: "",
    },
    validationSchema: addnewproperty,
    onSubmit: async (values) => {
      const dataToSend: any = {
        name: values.passtier,
        residenceName: values?.residenceName,
        tierNumber: Number(values?.tier_number),
        theme: values?.theme,
        bgImage:
          "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-338504.jpg&fm=jpg",
        price: values?.pricepass,
        redeemableNights: Number(values?.redeemable),
        perks: values?.perks,
        totalCopies: Number(values?.totalCopies),
        passId: Number(id),
      };

      const res: any = await dispatch(
        callApiPostMethod(APIURL.PASSES_RESUBMIT_PASS, dataToSend, {}, true)
      );
      if (res?.statusCode === 201) {
        navigate("/auth/passes");
        formik.resetForm();
      } else if (res?.statusCode === 400) {
        toaster.error(res?.message);
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
  });

  const handlePerksOnchange = (e: any, index: any) => {
    const inputdata = [...formik.values.perks];
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
  };

  useEffect(() => {
    formik.setFieldValue("passtier", `SP${formik.values.redeemable}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.redeemable]);

  useEffect(() => {
    const getPassDetailsByID = async () => {
      let result = await dispatch(
        callApiGetMethod(APIURL.GET_PASS_BY_ID, { passId: id }, true, false)
      );
      if (result) {
        formik.setFieldValue("residenceName", result?.data["residence_name"]);
        formik.setFieldValue("bgImage", result?.data["bg_image"]);
        formik.setFieldValue("totalCopies", result?.data["total_copies"]);
        formik.setFieldValue("tier_number", result?.data["tier_number"]);
        formik.setFieldValue("theme", result?.data["theme"]);
        formik.setFieldValue("pricepass", result?.data["price"]);
        formik.setFieldValue("redeemable", result?.data["redeemable_nights"]);
        formik.setFieldValue("passtier", result?.data["name"]);
        formik.setFieldValue(
          "perks",
          result?.data["perks"].map((item: any, index: number) => item)
        );
      }
    };

    getPassDetailsByID();
  }, []);

  return (
    <>
      <section className="create_pass">
        <Form onSubmit={formik.handleSubmit}>
          <div className="create_pass_section">
            <Row>
              <Col lg={7} md={7} className="order-md-1">
                <div className="pass_form">
                  <h4 className="pass_name">
                    Pass Name{" "}
                    <span>
                      <EditIcon />
                    </span>
                  </h4>
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
                    />
                    {formik.errors.bgImage && formik.touched.bgImage ? (
                      <span>{formik.errors.bgImage}</span>
                    ) : null}
                    <p className="uploaded_document_name">
                      {formik.values.bgImage ? backgroundLogo : ""}
                    </p>
                  </>
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
                  <CustomSelect
                    label="Theme"
                    classgroup="mb-44"
                    options={options}
                    name={"theme"}
                    placeholder="Select"
                    isSearchable={false}
                    onChange={(option: any) =>
                      formik.setFieldValue("theme", option.label)
                    }
                    value={
                      formik.values.theme && {
                        label:
                          formik.values.theme?.charAt(0).toUpperCase() +
                          formik.values.theme?.slice(1).toLowerCase(),
                      }
                    }
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
                          canGiveSpace={true}
                          type="text"
                          onChange={(event: any) => {
                            handlePerksOnchange(event, index);
                          }}
                          autoFocus={true}
                          name={`perks[${index}]`}
                          id={`perks[${index}]`}
                          value={formik.values.perks[index]}
                          error={
                            formik.errors.perks &&
                              formik.touched.perks &&
                              formik.errors.perks[index] ? (
                              <span>{formik.errors.perks[index]}</span>
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
                </div>
              </Col>
              <Col lg={5} md={5}>
                <div className="hotel_image">
                  <img src={createpass2} alt="createpass2" />
                </div>
              </Col>
            </Row>
            <div className="createpass_btns">
              <CommonButton title="ReSubmit" type="submit" />
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default ReSubmitPass;
