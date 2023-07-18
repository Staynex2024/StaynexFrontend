import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import InputCustom from '../../Common/Inputs/InputCustom';
import * as Yup from "yup";
import { signUpPartner } from '../../../Redux/Actions/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../../../Redux/Slices/user.slice';

const Signup2 = () => {
    /**CREATE DISPATCH OBJECT */
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const select = useSelector((state: any) => state.user.signUpDetail)


    const [isChecked, setIsChecked] = useState(false);

    const loginSchema = Yup.object().shape({
        propertyName: Yup.string().min(2, "Minimum 2 character required").max(25, 'Maximum 25 character required'),
        name: Yup.string().required("*This Field is required").min(2, 'Minimum 2 character required').max(25, 'Maximum 25 character required'),
        mobile_number: Yup.string().required("*This Field is required").min(8, 'Minimum 8 digits required').max(15, 'Maximum 15 digits required'),
    });
    const formik = useFormik({  
        initialValues: {
            propertyName:'',
            name: '',
            mobile_number: '',
            email: select?.email,
            password: select?.password,
            role : 'VENDOR'
        },
        validationSchema: loginSchema,
       
        onSubmit: async (values) => {
           const result =  await dispatch(signUpPartner(values));
           if(result.statusCode === 200){
            const dataToStore = {
                "email" : values.email,
                "mobile_number" : values.mobile_number,
                "propertyName" : values.propertyName,
                "role" : values.role,
                "name" : values.name,
            }
            dispatch(userDetails(dataToStore));
            navigate('/');
           }
        },
    });

    useEffect(() => {
        if (localStorage.checkbox && localStorage.email !== "") {
            const email_id: any = localStorage.getItem('email')
            let emailID: string | null = JSON.parse(email_id)
            formik.setFieldValue("email", emailID)
        }
    }, []);

    return (
        <>
            <div className='signin_page signUp_page'>
                <Container>
                    <div className='signin_Box mx-auto'>
                        <div className='login_heading'>
                            <h1>Almost done...</h1>
                        </div>
                        <Form onSubmit={formik.handleSubmit}>
                            <InputCustom
                                label="Property Name"
                                id="propertyName"
                                canGiveSpace={true}
                                name="propertyName"
                                type="text"
                                placeholder="What is the name of your establishment?"
                                onChange={formik.handleChange}
                                autoFocus={true}
                                value={formik.values.propertyName}
                                error={
                                    formik.errors.propertyName && formik.touched.propertyName ? (
                                        <span>
                                            {formik.errors.propertyName}
                                        </span>
                                    ) : null
                                }
                            />
                            <InputCustom
                                label="Name"
                                id="name"
                                name="name"
                                type="text"
                                canGiveSpace={true}
                                placeholder="Who is in charge of this account?"
                                onChange={formik.handleChange}
                                autoFocus={true}
                                value={formik.values.name}
                                error={
                                    formik.errors.name && formik.touched.name ? (
                                        <span
                                        >
                                            {formik.errors.name}
                                        </span>
                                    ) : null
                                }
                            />
                            <InputCustom
                                label="Contact No."
                                id="mobile_number"
                                name="mobile_number"
                                type="number"
                                onWheel={(e: any) => e.target.blur()}
                                onChange={formik.handleChange}
                                autoFocus={true}
                                value={formik.values.mobile_number}
                                error={
                                    formik.errors.mobile_number && formik.touched.mobile_number ? (
                                        <span
                                        >
                                            {formik.errors.mobile_number}
                                        </span>
                                    ) : null
                                }
                            />
                            <div className='text-center mt-4 pt-2'>
                                {/* <Link to="/" className="linkwhite"> */}
                                    <button type="submit" className='login_btn mx-auto'>Save and continue</button>
                                {/* </Link> */}
                            </div>
                            <div className='text-center mt-4'>
                                <Link to="/signup" className="link d-block mt-3"><u>Back</u></Link>
                            </div>

                        </Form>
                    </div>
                </Container>
            </div>

        </>
    )
}

export default Signup2

