import React from 'react'
import './PropertyStaynex.scss'
import CreateListForm from '../CreateListForm/CreateListForm'
import { CheckwhiteIcon } from '../../../../Assets/Images/svgImgs/svgImgs'
import logo from '../../../../Assets/Images/partner-img.png'

const PropertyStaynex = () => {
    return (
        <section className='listproperty_sec'>
            <div className='listproperty_sec_colleftsec'>
                <div className='listproperty_sec_colleftsec_leftsec'>
                    <div className='listproperty_sec_colleftsec_leftsec_textsec'>
                        <h4>List your property<br /> on Staynex </h4>
                        <p>Registration is free and can take as little as 15 minutes to complete – get started today.</p>
                        <div className='property_list'>
                            <h6>Create new listing</h6>
                            <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                            <ul className='listing'>
                                <li><CheckwhiteIcon /> <span>Bringing together hospitality and football</span></li>
                                <li><CheckwhiteIcon /> <span>Get exposure of 100 million fans</span></li>
                                <li><CheckwhiteIcon /> <span>Offer once in a lifetime experiences</span></li>
                            </ul>
                        </div>
                        <div className='property_logo'>
                            <img src={logo} alt="arsenal_logo" />
                            <p>Official Hotel & Resort Membership Partner of  Arsenal FC</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='listproperty_sec_colrightsec'>
                <div className='listproperty_sec_colrightsec_rightsec'>
                    <CreateListForm />
                </div>
            </div>
        </section>
    )
}

export default PropertyStaynex
