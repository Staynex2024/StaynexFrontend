import { Formik } from 'formik'
import React, { Dispatch, useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap'
import * as Yup from 'yup'
import CommonButton from '../CommonButton/CommonButton'
import CommonModal from '../CommonModal/CommonModal'
import InputCustom from '../Inputs/InputCustom'
import { logOut } from '../../../Redux/Actions/user.action'
import { useDispatch } from 'react-redux'
import { LockIcon } from '../../../Assets/Images/svgImgs/svgImgs'
import show from '../../../Assets/Images/eye_white.svg'
import eye from '../../../Assets/Images/eye-slash_white.svg'
import { callApiPostMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'

const ResetSchema = Yup.object().shape({
  oldpassword: Yup.string().required('*This Field is Required'),
  newpassword: Yup.string()
    .required('*This Field is Required')
    .min(10, 'Password is too short - should be 10 characters minimum')
    .max(15, 'Password is too long - should be less than 15 characters maximum')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[`~!@#$%^&*()_|+\-=?;:'",.<>/])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must contain minimum 8 characters, one uppercase, one lowercase, one number and one special case character.',
    ),
  confirmpassword: Yup.string()
    .required('*This Field is Required')
    .oneOf([Yup.ref('newpassword')], 'Passwords must match'),
})

const ResetModal = ({ showResetModal, handleClose }) => {
  const dispatch: Dispatch<any> = useDispatch()
  const [hiddenPass, setHiddenPass] = useState(true)
  const [hidden, setHidden] = useState(true)
  const [hiddenPassword, setHiddenPassword] = useState(true)

  const toggleShow = () => {
    setHidden(!hidden)
  }
  const toggleShowPassword = () => {
    setHiddenPassword(!hiddenPassword)
  }
  const toggleShowPass = () => {
    setHiddenPass(!hiddenPass)
  }

  return (
    <>
      <CommonModal
        show={showResetModal}
        handleClose={handleClose}
        className="dashboardmodal"
        heading="Reset Page"
      >
        <Modal.Body>
          <Formik
            initialValues={{
              oldpassword: '',
              newpassword: '',
              confirmpassword: '',
            }}
            validationSchema={ResetSchema}
            onSubmit={async (values: any) => {
              const data: any = {
                new_password: values.newpassword,
                old_password: values.oldpassword,
              }
              const res: any = await dispatch(callApiPostMethod(APIURL.RESET_PASSWORD, data, {}, true))
              if (res?.statusCode === 200) {
                setTimeout(() => {
                  handleClose()
                  dispatch(logOut())
                }, 3000)
              }
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Col>
                  <InputCustom
                    label="Old Password"
                    type={hidden ? 'password' : 'text'}
                    id="oldpassword"
                    icon={<LockIcon />}
                    placeholder="Old password"
                    name="oldpassword"
                    onChange={handleChange}
                    maxLength={15}
                    className="input_with_icon password_Input"
                    classIcontwo="input_Eyeicon"
                    value={values.oldpassword}
                    error={errors.oldpassword}
                  >
                    <span className="eyeIcon" onClick={toggleShow}>
                      {!hidden ? (
                        <img src={show} alt="icon" />
                      ) : (
                        <img src={eye} alt="icon" />
                      )}
                    </span>
                  </InputCustom>
                </Col>

                <Col>
                  <InputCustom
                    label="New Password"
                    type={hiddenPassword ? 'password' : 'text'}
                    id="newpassword"
                    placeholder="New password"
                    name="newpassword"
                    icon={<LockIcon />}
                    onChange={handleChange}
                    maxLength={15}
                    className="input_with_icon password_Input"
                    classIcontwo="input_Eyeicon"
                    value={values.newpassword}
                    error={errors.newpassword}
                  >
                    <span onClick={toggleShowPassword} className="eyeIcon">
                      {!hiddenPassword ? (
                        <img src={show} alt="icon" />
                      ) : (
                        <img src={eye} alt="icon" />
                      )}
                    </span>
                  </InputCustom>
                </Col>
                <Col>
                  <InputCustom
                    label="Confirm Password"
                    type={hiddenPass ? 'password' : 'text'}
                    id="confirmpassword"
                    placeholder="Confirm password"
                    name="confirmpassword"
                    onChange={handleChange}
                    maxLength={15}
                    icon={<LockIcon />}
                    className="input_with_icon password_Input"
                    classIcontwo="input_Eyeicon"
                    value={values.confirmpassword}
                    error={errors.confirmpassword}
                  >
                    <span onClick={toggleShowPass} className="eyeIcon">
                      {!hiddenPass ? (
                        <img src={show} alt="icon" />
                      ) : (
                        <img src={eye} alt="icon" />
                      )}
                    </span>
                  </InputCustom>
                </Col>
                <Col>
                  <CommonButton type="sumbit" title="Submit" />
                </Col>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </CommonModal>
    </>
  )
}
export default ResetModal
