import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import InputCustom from '../../../Common/Inputs/InputCustom'

const SignupStepTwo = (props) => {
  const { formik, handleBack } = props

  return (
    <>
      <div className="signin_page signUp_page">
        <Container>
          <div className="signin_Box mx-auto">
            <div className="login_heading">
              <h1>Almost done...</h1>
            </div>
            {/* <Form > */}
            <InputCustom
              label="Property Name"
              id="propertyName"
              canGiveSpace={true}
              name="propertyName"
              maxLength={25}
              type="text"
              placeholder="What is the name of your establishment?"
              onChange={formik.handleChange}
              autoFocus={true}
              value={formik.values.propertyName}
              error={
                formik.errors.propertyName && formik.touched.propertyName ? (
                  <span>{formik.errors.propertyName}</span>
                ) : null
              }
            />
            <InputCustom
              readOnly
              label="Name"
              id="name"
              name="name"
              type="text"
              maxLength={25}
              canGiveSpace={true}
              placeholder="Who is in charge of this account?"
              onChange={formik.handleChange}
              autoFocus={true}
              value={props?.formDetails?.invited_name}
              error={
                formik.errors.name && formik.touched.name ? (
                  <span>{formik.errors.name}</span>
                ) : null
              }
            />
            <InputCustom
              readOnly
              label="Contact No."
              id="mobile_number"
              name="mobile_number"
              type="text"
              placeholder="+62-876-87-8798"
              onWheel={(e: any) => e.target.blur()}
              onChange={formik.handleChange}
              autoFocus={true}
              value={props?.formDetails?.mob_no}
              error={
                formik.errors.mobile_number && formik.touched.mobile_number ? (
                  <span>{formik.errors.mobile_number}</span>
                ) : null
              }
            />
            <div className="text-center mt-4 pt-2">
              <button type="submit" className="login_btn mx-auto">
                Save and continue
              </button>
            </div>
            <div className="text-center mt-4" onClick={handleBack}>
              <Link to="/signup" className="link d-block mt-3">
                <u>Back</u>
              </Link>
            </div>

            {/* </Form> */}
          </div>
        </Container>
      </div>
    </>
  )
}

export default SignupStepTwo
