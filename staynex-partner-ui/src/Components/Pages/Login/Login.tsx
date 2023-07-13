import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import InputCustom from '../../Common/Inputs/InputCustom';
import * as Yup from "yup";
import "./Login.scss"
import { EyeIcon, LockIcon, UserIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import Checkbox from '../../Common/FormInputs/Checkbox';
// import { userDetails } from "../../../Redux/Slices/user.slice";
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../../Redux/Actions/user.action';
// import Checkbox from '../../Common/FormInputs/Checkbox';

const Login = () => {
    /**CREATE DISPATCH OBJECT */
    const dispatch: any = useDispatch();

    const [isChecked, setIsChecked] = useState(false);

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter valid email")
            .required("*This Field is required")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Please enter valid email'),
        password: Yup.string().required("*This Field is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            if (isChecked && values.email !== "") {
                localStorage.setItem('email', JSON.stringify(values.email));
                localStorage.checkbox = isChecked;
            }else if(!isChecked){
                localStorage.removeItem('email');
            }
            await dispatch(loginAdmin(values));
        },
    });

    const handleOnChangeCheckbox = (event) => {
        setIsChecked(event.target.checked)
    };

    useEffect(() => {
        if (localStorage.checkbox && localStorage.email !== "") {
            const email_id: any =  localStorage.getItem('email') 
           let emailID: string | null= JSON.parse(email_id)
           formik.setFieldValue("email", emailID)
        }
    }, [])


    return (
        <>
            <div className='signin_page'>
                <Container>
                    <div className='signin_Box mx-auto'>
                        <div className='login_heading'>
                            <h1>Sign in</h1>
                        </div>
                        <Form onSubmit={formik.handleSubmit}>
                            <InputCustom
                                label="Email"
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
                                        <span
                                        >
                                            {formik.errors.email}
                                        </span>
                                    ) : null
                                }
                            />
                            <InputCustom
                                label="Password"
                                type="password"
                                id="password"
                                placeholder="Password"
                                name="password"
                                onChange={formik.handleChange}
                                icon={<LockIcon />}
                                icontwo={<EyeIcon />}
                                className="input_with_icon password_Input"
                                classIcontwo="input_Eyeicon"
                                autoFocus={true}
                                value={formik.values.password}
                                error={
                                    formik.errors.password && formik.touched.password ? (
                                        <span
                                        >
                                            {formik.errors.password}
                                        </span>
                                    ) : null
                                }
                            />
                            <Checkbox   
                                label="Remember me"
                                name=""
                                onChange={(e: any) => handleOnChangeCheckbox(e)}
                            />
                            <div className='text-center mt-4 pt-2'>
                                <Link to="javaacript:;" className="linkwhite">
                                    <button type="submit" className='login_btn'>Sign In</button>
                                </Link>
                            </div>
                            {/* <div className='text-center mt-4'>
                                <Link to="/forgot-password" className="link d-block">
                                    Forgot your password?
                                </Link>
                                <Link to="javaacript:;" className="link d-block mt-3">
                                    Create new account
                                </Link>
                            </div> */}

                        </Form>
                    </div>
                </Container>
            </div>

        </>
    )
}

export default Login

