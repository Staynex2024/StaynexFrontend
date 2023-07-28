import React, { Dispatch, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../../Redux/Actions/user.action'
import InputCustom from '../../Common/Inputs/InputCustom'
import {
  CrossEyeIcon,
  EyeIcon,
  UserIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import toaster from '../../Common/Toast'

const ForgotPasswordForm = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate: any = useNavigate()
  const [toggleEyeIcon, setToggleEyeIcon] = useState(true)
  const [toggleShow, setToggleShow] = useState(true)

  function useQuery() {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
  }

  let query = useQuery()

  const forgotSchema = Yup.object().shape({
    newpassword: Yup.string()
      .required("This field is required.")
      .min(10, "Password should be at least 10 characters long.")
      .max(15, "Password should be at most 15 characters long.")
      .matches(/[0-9]/, "Password should contain at least one numeric number.")
      .matches(/[a-z]/, "Password should contain at least one lowercase letter.")
      .matches(/[A-Z]/, "Password should contain at least one uppercase letter.")
      .matches(/[@$!%*?&<>-]/, "Password should contain at least one special character."),
    confirmpassword: Yup.string()
      .required('*This Field is Required')
      .oneOf([Yup.ref('newpassword')], 'Confirm password does not match'),
  })
  const formik = useFormik({
    initialValues: {
      newpassword: '',
      confirmpassword: '',
    },
    validationSchema: forgotSchema,
    onSubmit: async (values) => {
      const data: any = {
        password: values.newpassword,
        token: query.get('token'),
      }
      const result: any = await dispatch(resetPassword(data))
      if (result?.statusCode === 200) {
        formik.resetForm()
        toaster.success(result?.message)
        navigate('/')
      } else if (result?.statusCode === 400) {
        toaster.error(result?.message)
      }
    },
  })

  return (
    <>
      <div className="signin_page forgot_password_Page">
        <Container>
          <div className="signin_Box mx-auto">
            <div className="login_heading">
              <h1>Forgot Password Form</h1>
            </div>
            <form className="mt-4 pt-1" onSubmit={formik.handleSubmit}>
              <Col>
                <InputCustom
                  label="Enter Password"
                  icon={<UserIcon />}
                  className="input_with_icon"
                  id="newpassword"
                  placeholder="Password"
                  name="newpassword"
                  maxLength={15}
                  type={toggleEyeIcon ? 'password' : 'text'}
                  onChange={formik.handleChange}
                  autoFocus={true}
                  value={formik.values.newpassword}
                  error={formik.errors.newpassword}
                >
                  <span
                    className="eyeIcon"
                    onClick={() => setToggleEyeIcon(!toggleEyeIcon)}
                  >
                    {toggleEyeIcon ? <CrossEyeIcon /> : <EyeIcon />}
                  </span>
                </InputCustom>
              </Col>

              <Col>
                <InputCustom
                  label="Enter Confirm Password"
                  icon={<UserIcon />}
                  className="input_with_icon"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  type={toggleShow ? 'password' : 'text'}
                  maxLength={15}
                  onChange={formik.handleChange}
                  autoFocus={true}
                  value={formik.values.confirmpassword}
                  error={formik.errors.confirmpassword}
                >
                  <span
                    className="eyeIcon"
                    onClick={() => setToggleShow(!toggleShow)}
                  >
                    {toggleShow ? <CrossEyeIcon /> : <EyeIcon />}
                  </span>
                </InputCustom>
              </Col>
              <div className="text-center mt-5 linkwhite">
                <button type="submit" className="login_btn">
                  Submit
                </button>
              </div>
              <div className="text-center mt-4">
                <Link to="/" className="link d-block">
                  <u>Cancel</u>
                </Link>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ForgotPasswordForm
