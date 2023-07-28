import React from 'react'
import { Container } from 'react-bootstrap'
import logo from '../../../../Assets/Images/partner-img.png'
import './MembershipArsenal.scss'

const MembershipArsenal = () => {
    return (
        <section className='membership_sec'>
            <div className='membership_sec_logo'>
                <img src={logo} alt="arsenal_logo" />
                <p>Official Hotel & Resort Membership Partner of  Arsenal FC</p>
            </div>
        </section>
    )
}

export default MembershipArsenal
