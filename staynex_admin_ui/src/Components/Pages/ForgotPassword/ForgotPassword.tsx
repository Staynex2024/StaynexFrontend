import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import InputCustom from '../../Common/Inputs/InputCustom';
import * as Yup from "yup";
import { UserIcon } from '../../../Assets/Images/svgImgs/svgImgs';

const ForgotPassword = () => {
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter valid email")
            .required("*This Field is required")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Please enter valid email'),
    });
    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {

            // alert(JSON.stringify(values, null, 2));
            // console.log(formik.errors)

        },

    });
    return (
        <>
            <div className='signin_page f   orgot_password_Page'>
                <Container>
                    <div className='signin_Box mx-auto'>
                        <div className='login_heading'>
                            <h1>Forgot password</h1>
                            <p>No problem! We'll send you a link to reset it. Enter the email address you use to sign in to Staynex.com</p>
                        </div>
                        <form className='mt-4 pt-1' onSubmit={formik.handleSubmit}>
                            <InputCustom
                                label="Email"
                                type="email"
                                placeholder="Email"
                                name="eamil"
                                error={formik.errors.email}
                                onChange={formik.handleChange}
                                icon={<UserIcon />}
                                className="input_with_icon"
                            />
                            <div className='text-center mt-5'>
                                <Link to="javaacript:;" className="linkwhite">
                                    <button type="submit" className='login_btn'>Send reset link</button>
                                </Link>
                            </div>
                            <div className='text-center mt-4'>
                                <Link to="javaacript:;" className="link d-block"><u>Cancel</u></Link>
                            </div>

                        </form>
                    </div>
                </Container>
            </div>

        </>
    )
}

export default ForgotPassword

