import React, { useEffect } from 'react'
import './MyAccountCard.scss'
import ProfileImg from '../../../../../Assets/Images/profile_img.svg'
import uploadIcon from '../../../../../Assets/Images/upload_icon.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputCustom from '../../../../Common/Inputs/InputCustom'
import { Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { callApiPostMethod } from '../../../../../Redux/Actions/api.action'
import { APIURL } from '../../../../../Utils'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import CustomSelect from '../../../../Common/Select/Select'

const MyAccountCard = ({ customerData }: any) => {
  const dispatch: any = useDispatch()
  const address = useSelector((state: any) => state?.user?.walletAddress)

  // const [selectedAvatar, setSelectedAvatar] = useState('');

  const addnewproperty = Yup.object().shape({
    name: Yup.string()
      .required('This Field is required')
      .min(2, 'Too short - should be 2 characters minimum')
      .max(25, 'Too Long - should be 25 characters maximum'),

    lastName: Yup.string()
      .required('This Field is required')
      .min(2, 'Too short - should be 2 characters minimum')
      .max(25, 'Too Long - should be 25 characters maximum'),
    gender: Yup.string().required('This Field is required'),
    passport: Yup.string()
      .required('This Field is required')
      .min(8, "Please enter valid passport number")
      .max(15, "Please enter valid passport number"),
    email: Yup.string()
      .email('Please enter valid email')
      .required('*This field is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Please enter valid email'),
    number: Yup.string()
      .required('This Field is required')
      .min(8, 'Please enter valid contact number')
      .max(15, 'Please enter valid contact number'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      gender: '',
      number: '',
      email: '',
      passport: '',
      password: '',
      pool: '',
    },
    validationSchema: addnewproperty,
    onSubmit: async (values) => {
      let dataToSend = {
        walletAddress: address,
        firstName: values?.name,
        lastName: values?.lastName,
        gender: values?.gender,
        email: values?.email,
        mobileNumber: '+62' + values?.number,
        passportNumber: values?.passport,
      }
      const result = await dispatch(
        callApiPostMethod(APIURL.UPDATE_CUSTOMER_PROFILE, dataToSend, {}, true),
      )
      if (result?.statusCode === 201) {
        formik.resetForm()
      }
    },
  })

  useEffect(() => {
    if (customerData && Object.keys(customerData).length > 0) {
      formik.setFieldValue('name', customerData['firstName'])
      formik.setFieldValue('lastName', customerData['lastName'])
      formik.setFieldValue('gender', customerData['gender'])
      formik.setFieldValue('passport', customerData['passportNumber'])
      formik.setFieldValue('email', customerData['user']['email'])
      // formik.setFieldValue('email', customerData['user']['email'])
      formik.setFieldValue(
        'number',
        customerData['user']['mobile_number'].slice(3),
      )
    }
  }, [customerData])

  // const onSelectFile = e => {
  //     if (!e.target.files || !e.target.files.length) {
  //         setSelectedAvatar('');
  //         return;
  //     }

  //     setSelectedAvatar(e.target.files[0]);
  // }

  const options: any = [
    { value: 'famale', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]
  const pattern = /^[A-Za-z]{2}\d{6}$/

  return (
    <>
      <div className="tabs_innerContent account_Card">
        <h2>My Account</h2>
        <div className="account_Card_box mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <div className="account_heading">
              <h5>
                {customerData && Object.keys(customerData).length > 0
                  ? `Hello, ${customerData['user']['name']}`
                  : ''}
              </h5>
              <p>Save to apply changes</p>
            </div>
            <div className="account_profile">
              <span className="User_Profile">
                <img src={ProfileImg} alt="" />
              </span>
              <span className="User_upload_img">
                <img src={uploadIcon} alt="" />
              </span>
              {/* <input className='User_upload_img' type='file' onChange={onSelectFile} ></input> */}
            </div>
          </div>
          <Form onSubmit={formik.handleSubmit} className="mt-5 pt-5 border-top">
            <Row>
              <Col lg={6} md={6} xl={4}>
                <InputCustom
                  label="First name"
                  className="mb-44"
                  placeholder="Bruno"
                  id="name"
                  name="name"
                  type="text"
                  maxLength={25}
                  // onChange={formik.handleChange}
                  onChange={(event) => {
                    if (/^([A-Za-z]|)+$/.test(event.target.value)) {
                      formik.handleChange(event)
                    }
                  }}
                  autoFocus={true}
                  value={formik.values.name}
                  error={
                    formik.errors.name && formik.touched.name ? (
                      <span>{formik.errors.name}</span>
                    ) : null
                  }
                />
              </Col>
              <Col lg={6} md={6} xl={4}>
                <InputCustom
                  label="Last name"
                  className="mb-44"
                  placeholder="Fernandez"
                  id="lastName"
                  name="lastName"
                  type="text"
                  // onChange={formik.handleChange}
                  onChange={(event: any) => {
                    if (/^([A-Za-z]|)+$/.test(event.target.value)) {
                      formik.handleChange(event)
                    }
                  }}
                  autoFocus={true}
                  maxLength={25}
                  value={formik.values.lastName}
                  error={
                    formik.errors.lastName && formik.touched.lastName ? (
                      <span>{formik.errors.lastName}</span>
                    ) : null
                  }
                />
              </Col>
              <Col lg={6} md={6} xl={4}>
                <CustomSelect
                  label="Gender"
                  id="gender"
                  classgroup="mb-44"
                  options={options}
                  onChange={(option: any) =>
                    formik.setFieldValue('gender', option.value)
                  }
                  name={'propertyType'}
                  placeholder="Select"
                  isSearchable={false}
                  error={
                    formik.errors.gender &&
                      formik.touched.gender ? (
                      <span className="error_Msg">
                        {formik.errors.gender}
                      </span>
                    ) : null
                  }
                />
              </Col>
              <Col lg={6} md={6} xl={4}>
                <InputCustom
                  label="Passport number"
                  className="mb-44"
                  placeholder="A5432313677"
                  id="passport"
                  name="passport"
                  type="text"
                  maxLength={15}
                  onChange={formik.handleChange}
                  // onChange={(event: any) => {
                  //   formik.handleChange(event)

                  // }}
                  autoFocus={true}
                  value={formik.values.passport}
                  error={
                    formik.errors.passport && formik.touched.passport ? (
                      <span>{formik.errors.passport}</span>
                    ) : null
                  }
                />
              </Col>
              <Col lg={6} md={6} xl={4}>
                <InputCustom
                  label="Email"
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
              </Col>
              <Col lg={6} md={6} xl={4}>
                <InputCustom
                  label="Phone number"
                  className="mb-44"
                  placeholder="+6512345676"
                  id="number"
                  name="number"
                  type="text"
                  maxLength={15}
                  onChange={(event: any) => {
                    if (/^\d*(\d{0,8})?$/.test(event.target.value)) {
                      formik.handleChange(event)
                    }
                  }}
                  autoFocus={true}
                  value={formik.values.number}
                  error={
                    formik.errors.number && formik.touched.number ? (
                      <span>{formik.errors.number}</span>
                    ) : null
                  }
                />
              </Col>
              <Col xs={12}>
                <button type="submit" className="btn-style">
                  Save
                </button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}

export default MyAccountCard
