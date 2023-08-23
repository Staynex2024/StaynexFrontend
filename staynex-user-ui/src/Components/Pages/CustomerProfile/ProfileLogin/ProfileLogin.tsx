import React, { useEffect, useState } from 'react'
import "./ProfileLogin.scss"
import ProfileImg from "../../../../Assets/Images/profile_img.svg"
import uploadIcon from "../../../../Assets/Images/upload_icon.svg"
import { Container } from 'react-bootstrap'
import useDebounce from '../../../../hooks/useDebounce'
import { apiCallGet } from '../../../../Services/axios.service'
import { useDispatch, useSelector } from 'react-redux'
import { callApiGetMethod, callApiPostMethod } from '../../../../Redux/Actions/api.action'
import { APIURL } from '../../../../Utils'
import CommonButton from '../../../Common/CommonButton/CommonButton'
import { useNavigate } from 'react-router-dom'

const ProfileLogin = () => {
    const dispatch: any = useDispatch()
    const navigate: any = useNavigate()
    const address = useSelector((state: any) => state?.user?.walletAddress);

    const [search, setSearch] = useState('')
    const [debounce_search, setDeounce_Search] = useState('')
    const [fafaSpin, setfafaSpin] = useState(false);
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    useDebounce(() => handleDebounceSearch(search), 1000, [search])

    const handleDebounceSearch = (value: any) => {
        setDeounce_Search(value)
    }

    useEffect(() => {
        setfafaSpin(false)
        setMessage('')
        setShow(false)
        const checkDuplicateUserName = async () => {
            setfafaSpin(true)
            const result = await dispatch(callApiGetMethod(APIURL.CHECK_DUPLICATE_NAME, { name: debounce_search.trim() }, false, false))
            console.log('result', result)
            if (result?.statusCode === 200) {
                setfafaSpin(false)
                setMessage(result?.message)
                setShow(true)
            } else if (result?.statusCode === 400) {
                setfafaSpin(false)
                setMessage(result?.message)
                setShow(false)
            } else if (result === null) {
                setfafaSpin(false)
                setMessage("Only alphanumeric allowed")
                setShow(false)
            }
        }

        if (debounce_search !== '') {
            checkDuplicateUserName()
        }
    }, [debounce_search])


    const handleCustomerProfile = async () => {
        const result = await dispatch(callApiPostMethod(APIURL?.ADD_CUSTOMER_NAME, {
            walletAddress: address,
            name: debounce_search.trim(),
            profileImage: "image"
        }, {}, false))
        console.log('result :>> ', result);
        if (result?.statusCode === 201) {
            navigate('/auth/profile-pass')
        }
    }

    return (
        <>
            <div className='profile_login'>
                <Container>
                    <div className='profile_login_img'>
                        <span className='User_Profile'><img src={ProfileImg} alt="" /></span>
                        <span className='User_upload_img'><img src={uploadIcon} alt="" /></span>
                    </div>
                    <div className='profile_login_Input'>
                        <label>Hello,</label>
                        <input
                            type="text"
                            className='profile_input'
                            placeholder='type your name here'
                            onChange={(event: any) => setSearch(event.target.value)}
                        />
                        <div className='text_green w-100'>
                            {fafaSpin && <i className="fa fa-spinner fa-spin" style={{ fontSize: "20px" }}></i>}
                            {message && message === 'Username available' ? <span className='text_green'>{message}</span> : <span className='red_text'>{message}</span>}
                        </div>
                    </div>
                    {show &&
                        <div className='text-center mt-4'>
                            <CommonButton
                            title={"Create Profile"}
                            // disabled={connecting}
                            onClick={() => handleCustomerProfile()}
                            className="mx-auto"
                        />
                            </div>}
                </Container>
            </div>
        </>
    )
}

export default ProfileLogin;