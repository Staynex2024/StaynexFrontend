import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import createpass2 from "../../../../../Assets/Images/Icons/createpass.png";
import {
  EditIcon,
  PlusgrayIcon,
} from "../../../../../Assets/Images/svgImgs/svgImgs";
import InputCustom from "../../../../Common/Inputs/InputCustom";
import Upload from "../../../../Common/FormInputs/Upload";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import toaster from "../../../../Common/Toast";
import CustomSelect from "../../../../Common/Select/Select";
import {
  callApiPostMethod,
  callApiGetMethod,
} from "../../../../../Redux/Actions/api.action";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../../../../../Utils";

const UpdatePass = () => {
  const [perkArray, setPerkArray] = useState(["", "", ""]);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [passData, setPassData] = useState();
  const [passDetails, setPassDetails] = useState<any>({});
  const [editPerks, setEditPerks] = useState(false);

  const params = useParams();
  const addnewproperty = Yup.object().shape({
    perks: Yup.array().of(Yup.string().required('This field is required').min(5, 'minimum 5 characters required').max(50, 'maximum 50 characters allowed')),
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
    },
    validationSchema: addnewproperty,
    onSubmit: async (values) => {
      const dataToSend: any = {
        perks: values?.perks,
        passId: Number(params?.id)
      };
      const createPassResult = await dispatch(
        callApiPostMethod(APIURL.UPDATE_PASS, dataToSend, {}, true)
      );
      setPassData(createPassResult);
      if (createPassResult.statusCode === 201) {
        navigate("/auth/passes");
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

  useEffect(() => {
    getPassDetailsByID();
  }, []);

  const getPassDetailsByID = async () => {
    let result = await dispatch(
      callApiGetMethod(
        APIURL.GET_PASS_BY_ID,
        { passId: params?.id },
        true,
        false
      )
    );
    if (result) {
      setPassDetails(result?.data);
      formik.setFieldValue("residenceName", result?.data?.residence_name);
      formik.setFieldValue("totalCopies", result?.data?.total_copies);
      formik.setFieldValue("tier_number", result?.data?.tier_number);
      formik.setFieldValue("theme", result?.data?.theme);
      formik.setFieldValue("pricepass", result?.data?.price);
      formik.setFieldValue("redeemable", result?.data?.redeemable_nights);
      formik.setFieldValue("passtier", result?.data?.name);
      formik.setFieldValue("perks", result?.data['perks'].map((item: any, index: number) => (
        item
      )));
    }
  };

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
  console.log('perkArray :>> ', perkArray);
  const handleRemoveField = (index: number) => {
    setPerkArray(perkArray.filter((field: any, i: number) => i !== index));
    formik.setFieldValue(
      "perks",
      perkArray.filter((field: any, i: number) => i !== index)
    );
  };

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
                    <span onClick={() => setEditPerks(!editPerks)}>
                      <EditIcon />
                    </span>
                  </h4>
                  <InputCustom
                    label="Name of Residence"
                    className="mb-3"
                    placeholder="Enter Residence Name"
                    id="residenceName"
                    name="residenceName"
                    readOnly
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
                      disabled={true}
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
                    />
                  </>
                  <hr className="spaceline" />
                  <InputCustom
                    label="Number of Passes/copies"
                    className="mb-3"
                    placeholder="Enter Number of passes/copies"
                    readOnly
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
                    readOnly
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
                  <InputCustom
                    label="Theme"
                    classgroup="mb-3"
                    readOnly
                    onChange={formik.handleChange}
                    name={"propertyType"}
                    placeholder="Property type"
                    value={formik?.values?.theme}
                  />

                  <InputCustom
                    label="Price per pass"
                    readOnly
                    className="mb-3"
                    placeholder="Enter Price per pass"
                    id="pricepass"
                    name="pricepass"
                    type="text"
                    onChange={(event: any) => {
                      if (/^\d*(\\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
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
                    readOnly
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
                    readOnly
                    placeholder="Enter Pass/Tier Name"
                    id="passtier"
                    name="passtier"
                    type="text"
                    maxLength={5}
                    onChange={formik.handleChange}
                    autoFocus={true}
                    value={formik.values.passtier}
                    error={
                      formik.errors.passtier && formik.touched.passtier ? (
                        <span>{formik.errors.passtier}</span>
                      ) : null
                    }
                  />
                  {perkArray &&
                    perkArray?.length &&
                    perkArray.map((item: any, index: any) => (
                      <>
                        <InputCustom
                          label={`Perks (${index + 1})`}
                          disabled={editPerks ? false : true}
                          className="mb-3"
                          placeholder="Enter Perks"
                          id="perks"
                          canGiveSpace={true}
                          type="text"
                          onChange={(event: any) => {
                            handlePerksOnchange(event, index);
                            // formik.handleChange(event); // This is not required for array fields
                            // formik.setFieldValue(`perks[${index}]`, event.target.value); // Set the value for the corresponding perk field
                          }}
                          autoFocus={true}
                          name="perks"
                          value={editPerks ? formik.values.perks[index] : formik.values.perks[index]}
                          error={
                            formik.errors.perks && formik.touched.perks && formik.errors.perks[index] ? (
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
              {
                editPerks ?
                  <CommonButton
                    title="Update"
                    type="submit"
                    className="confirm_btn"
                  /> : null
              }

            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default UpdatePass;
