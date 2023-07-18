import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import InputCustom from "../../Common/Inputs/InputCustom";
import * as Yup from "yup";
import {
  EyeIcon,
  LockIcon,
  UserIcon,
  CrossEyeIcon,
} from "../../../Assets/Images/svgImgs/svgImgs";
import Checkbox from "../../Common/FormInputs/Checkbox";
import { useDispatch } from "react-redux";
import { signUpDetail } from "../../../Redux/Slices/user.slice";

const Signup = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(true);
  const [confirmEyeIcon, setConfirmEyeIcon] = useState(true);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("*This Field is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please enter valid email"),
    password: Yup.string()
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .required("Please enter a password")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, "Must contain number")
      .matches(/[a-z]/, "Must contain lowercase")
      .matches(/[A-Z]/, "Must contain uppercase"),
    cPassword: Yup.string()
      .required("*This Field is required")
      .oneOf([Yup.ref("password")], "  Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if (isChecked && values.email !== "") {
        localStorage.setItem("email", JSON.stringify(values.email));
        localStorage.checkbox = isChecked;
      } else if (!isChecked) {
        localStorage.removeItem("email");
      }
      await dispatch(signUpDetail(values));
      navigate("/signup-almost");
    },
  });

  const handleOnChangeCheckbox = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    if (localStorage.checkbox && localStorage.email !== "") {
      const email_id: any = localStorage.getItem("email");
      let emailID: string | null = JSON.parse(email_id);
      formik.setFieldValue("email", emailID);
    }
  }, []);

  return (
    <>
      <div className="signin_page signUp_page">
        <Container>
          <div className="signin_Box mx-auto">
            <div className="login_heading">
              <h1>Create Account</h1>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <InputCustom
                label="Email"
                placeholder="staynex@gmail.com"
                icon={<UserIcon />}
                className="input_with_icon"
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
              <InputCustom
                label="New Password"
                type={eyeIcon ? "password" : "text"}
                id="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                icon={<LockIcon />}
                className="input_with_icon password_Input"
                classIcontwo="input_Eyeicon"
                autoFocus={true}
                value={formik.values.password}
                error={
                  formik.errors.password && formik.touched.password ? (
                    <span>{formik.errors.password}</span>
                  ) : null
                }
              >
                <span className="eyeIcon" onClick={() => setEyeIcon(!eyeIcon)}>
                  {eyeIcon ? <CrossEyeIcon /> : <EyeIcon />}
                </span>
              </InputCustom>
              <InputCustom
                label="Confirm Password"
                type={confirmEyeIcon ? "password" : "text"}
                id="cPassword"
                placeholder="Confirm password"
                name="cPassword"
                onChange={formik.handleChange}
                icon={<LockIcon />}
                // icontwo={<EyeIcon />}
                className="input_with_icon password_Input"
                classIcontwo="input_Eyeicon"
                autoFocus={true}
                value={formik.values.cPassword}
                error={
                  formik.errors.cPassword && formik.touched.cPassword ? (
                    <span>{formik.errors.cPassword}</span>
                  ) : null
                }
              >
                {" "}
                <span className="eyeIcon" onClick={() => setConfirmEyeIcon(!confirmEyeIcon)}>
                  {confirmEyeIcon ? <CrossEyeIcon /> : <EyeIcon />}
                </span>
              </InputCustom>
              {/* <Checkbox   
                                label="Remember me"
                                name=""
                                onChange={(e: any) => handleOnChangeCheckbox(e)}
                            /> */}
              <div className="text-center mt-4 pt-2">
                {/* <Link to="/signup-almost" className="linkwhite"> */}
                <button type="submit" className="login_btn mx-auto">
                  Create
                </button>
                {/* </Link> */}
              </div>
              <div className="text-center mt-4">
                <Link to="/" className="link d-block mt-3">
                  <u>Sign in to your account</u>
                </Link>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Signup;
