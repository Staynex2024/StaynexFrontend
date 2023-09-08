import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { Dispatch, } from "react";
import { BlackTickIcon } from "../../../../Assets/Images/svgImgs/svgImgs";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import InputCustom from "../../../Common/Inputs/InputCustom";
import "./CreateListForm.scss";
import * as Yup from "yup";
import { callApiPostMethod } from "../../../../Redux/Actions/api.action";
import { useFormik } from "formik";
import { APIURL } from "../../../../Utils";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../../../Common/Inputs/InputCustom.scss'
const CreateListForm = () => {
  const dispatch: Dispatch<any> = useDispatch()
  // return (
  //     <div className='create_form'>
  //         <div className='form_text'>
  //             <h6>Create new listing</h6>
  //             <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
  //             <ul className='listing'>
  //                 <li><BlackTickIcon /> <span>Official partner of Arsenal FC  </span></li>
  //                 <li><BlackTickIcon /> <span>Access more than 100k travelers</span></li>
  //             </ul>
  //         </div>
  //         <InputCustom
  //             type="text"
  //             placeholder="Bruno Fernandes"
  //             name=""
  //         />
  //         <InputCustom
  //             type="text"
  //             placeholder="bruno@kunangkunang.com"
  //             name=""
  //         />
  //         <InputCustom
  //             type="tel"
  //             name="phone"
  //             // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
  //             placeholder="+65 122456849"
  //         />
  //         <p>By continuing, you agree to let Staynex email you regarding your property registration.</p>
  //         <CommonButton title="Get started" className="blurclr-bg btn_size" />
  //     </div>
  // )
  // }

  const loginSchema = Yup.object().shape({
    invite_name: Yup.string()
      .required("This field is required")
      .min(2, "Name should be at least 2 characters long.")
      .max(25, "Name should be at most 25 characters long.")
      .matches(/[^]/, 'special characters not awllowed')
      .matches(/^(?! ).*(?<! )$/, "Space is not allowed at start or end places"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please enter valid email"),
    mobile_number: Yup.string().required("This field is required")

  });
  const formik = useFormik({
    initialValues: {
      invite_name: "",
      email: "",
      mobile_number: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const dataToSend = {
        invite_name: values?.invite_name,
        email: values?.email,
        mobile_number:
          values?.mobile_number,
      }
      const result: any = await dispatch(callApiPostMethod(APIURL.PROPERTY_ADD_REQUEST, dataToSend, {}, true))
      if (result && result?.statusCode === 201) {
        formik.resetForm();
      }
    },
  });
  return (
    <div className="create_form">
      <div className="form_text">
        <h6>Create new listing</h6>
        <p>
          Discover Switzerland’s best ski resorts and plan the perfect holiday
        </p>
        <ul className="listing">
          <li>
            <BlackTickIcon /> <span>Official partner of Arsenal FC </span>
          </li>
          <li>
            <BlackTickIcon /> <span>Access more than 100k travelers</span>
          </li>
        </ul>
      </div>
      <Form onSubmit={formik.handleSubmit} className='list_form'>
        <InputCustom
          id="invite_name"
          name="invite_name"
          type="text"
          placeholder="Bruno Fernandes"
          maxLength={25}
          canGiveSpace={true}
          onChange={(event) => {
            if (/^[a-zA-Z\s]*$/.test(event.target.value)) {
              formik.handleChange(event);
            }
          }}
          autoFocus={true}
          value={formik.values.invite_name}
          error={
            formik.errors.invite_name && formik.touched.invite_name ? (
              <span>{formik.errors.invite_name}</span>
            ) : null
          }
        />
        <InputCustom
          placeholder="bruno@kunangkunang.com"
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          autoFocus={true}
          value={formik.values.email}
          error={
            formik.errors.email && formik.touched.email ? (
              <span>{formik.errors.email}</span>
            ) : null
          }
        />

        <label className="form-label">
          Mobile Number
        </label>
        <PhoneInput
          country="us"
          value={formik.values.mobile_number}
          onChange={(mobile_number) => {
            formik.setFieldValue('mobile_number', `+${mobile_number}`)
          }}
          enableSearch={true}
        />
        <p className="error-msg" style={{ color: 'red' }}>
          {formik.errors.mobile_number && formik.touched.mobile_number && formik.errors.mobile_number}
        </p>
        <p>
          By continuing, you agree to let Staynex email you regarding your
          property registration.
        </p>
        <CommonButton title="Get started" className="blurclr-bg btn_size" type="submit" />
      </Form>
    </div>
  );
};

export default CreateListForm;
