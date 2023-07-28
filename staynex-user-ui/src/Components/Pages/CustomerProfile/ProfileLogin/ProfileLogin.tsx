import React from 'react'
import "./ProfileLogin.scss"
import ProfileImg from "../../../../Assets/Images/profile_img.svg"
import uploadIcon from "../../../../Assets/Images/upload_icon.svg"
import { Container } from 'react-bootstrap'

const ProfileLogin = () => {
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
                        <input type="text" className='profile_input' placeholder='type your name here' />
                    </div>                    
                </Container>
            </div>
        </>
    )
}

export default ProfileLogin