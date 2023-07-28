import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import InputCustom from '../../Common/Inputs/InputCustom'
import * as Yup from 'yup'
import { UserIcon } from '../../../Assets/Images/svgImgs/svgImgs'
import { useDispatch } from 'react-redux'
import { fogotPassword } from '../../../Redux/Actions/user.action'
import toaster from '../../Common/Toast'

const ForgotPassword = () => {
    const navigate: any = useNavigate()
    const dispatch: any = useDispatch()

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter valid email')
            .required('*This Field is required')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Please enter valid email'),
    })
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const result: any = await dispatch(fogotPassword(values))
            if (result?.statusCode === 200) {
                navigate('/reset-password-page/' + values?.email)
                toaster.success(result?.message)
            } else if (result?.statusCode === 400) {
                toaster.error(result?.message)
            }
        },
    })

    return (
        <>
            <div className="signin_page f   orgot_password_Page">
                <Container>
                    <div className="signin_Box mx-auto">
                        <div className="login_heading">
                            <h1>Forgot password</h1>
                            <p>
                                No problem! We'll send you a link to reset it. Enter the email
                                address you use to sign in to Staynex.com
                            </p>
                        </div>
                        <form className="mt-4 pt-1" onSubmit={formik.handleSubmit}>
                            <InputCustom
                                label="Email"
                                icon={<UserIcon />}
                                className="input_with_icon"
                                id="email"
                                placeholder="partner@staynex.com"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                autoFocus={true}
                                value={formik.values.email}
                                error={formik.errors.email}
                            />
                            <div className="text-center mt-5 linkwhite">
                                <button type="submit" className="login_btn">
                                    Send reset link
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

export default ForgotPassword
