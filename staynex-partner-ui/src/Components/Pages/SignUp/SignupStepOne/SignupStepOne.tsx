import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import InputCustom from '../../../Common/Inputs/InputCustom'
import {
  EyeIcon,
  LockIcon,
  UserIcon,
  CrossEyeIcon,
} from '../../../../Assets/Images/svgImgs/svgImgs'

const SignupStepOne = (props) => {
  const [eyeIcon, setEyeIcon] = useState(true)
  const [confirmEyeIcon, setConfirmEyeIcon] = useState(true)
  const { formik } = props

  return (
    <>
      <div className="signin_page signUp_page">
        <Container>
          <div className="signin_Box mx-auto">
            <div className="login_heading">
              <h1>Create Account</h1>
            </div>
            {/* <Form > */}
            <InputCustom
              readOnly
              label="Email"
              placeholder="staynex@gmail.com"
              icon={<UserIcon />}
              className="input_with_icon"
              id="email"
              name="email"
              value={props?.formDetails?.email_id}
              type="email"
              onChange={formik.handleChange}
              autoFocus={true}
              error={
                formik.errors.email && formik.touched.email ? (
                  <span>{formik.errors.email}</span>
                ) : null
              }
            />
            <InputCustom
              label="New Password"
              type={eyeIcon ? 'password' : 'text'}
              id="password"
              placeholder="Password"
              name="password"
              maxLength={15}
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
              type={confirmEyeIcon ? 'password' : 'text'}
              id="cPassword"
              placeholder="Confirm password"
              name="cPassword"
              onChange={formik.handleChange}
              icon={<LockIcon />}
              maxLength={15}
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
              {' '}
              <span
                className="eyeIcon"
                onClick={() => setConfirmEyeIcon(!confirmEyeIcon)}
              >
                {confirmEyeIcon ? <CrossEyeIcon /> : <EyeIcon />}
              </span>
            </InputCustom>
            <InputCustom
              readOnly
              label="Invite Code"
              type="text"
              id="inviteCode"
              name="inviteCode"
              value={props?.formDetails?.invite_code}
            />
            <div className="text-center mt-4 pt-2">
              <button type="submit" className="login_btn mx-auto">
                Create
              </button>
            </div>
            <div className="text-center mt-4">
              <Link to="/" className="link d-block mt-3">
                <u>Sign in to your account</u>
              </Link>
            </div>
            {/* </Form> */}
          </div>
        </Container>
      </div>
    </>
  )
}

export default SignupStepOne
