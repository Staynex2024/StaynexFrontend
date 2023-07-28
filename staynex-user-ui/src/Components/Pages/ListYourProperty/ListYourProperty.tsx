import React from 'react'
import './ListYourProperty.scss'
import banner_img from '../../../Assets/Images/proprty-img.jpg'
import MembershipArsenal from './MembershipArsenal/MembershipArsenal'
import StaynexArsenalPartner from './StaynexArsenalPartner/StaynexArsenalPartner'
import CreateListForm from './CreateListForm/CreateListForm'
import RedefineTime from './RedefineTime/RedefineTime'
import IntroduceStaynex from './IntroduceStaynex/IntroduceStaynex'
import StayDayPass from './StayDayPass/StayDayPass'
import OurUsers from './OurUsers/OurUsers'
import PropertyStaynex from './PropertyStaynex/PropertyStaynex'
import StaynexPasses from './StaynexPasses/StaynexPasses'

const ListYourProperty = () => {
    return (
        <div className='listproperty'>
            <section className='listproperty_banner'>
                <div className='listproperty_banner_colleftsec'>
                    <div className='listproperty_banner_colleftsec_leftsec'>
                        <div className='listproperty_banner_colleftsec_leftsec_textsec'>
                            <h4>List your property<br /> on Staynex </h4>
                            <p>Registration is free and can take as little as 15 minutes to complete – get started today.</p>
                        </div>
                    </div>
                </div>
                <div className='listproperty_banner_colrightsec'>
                    <div className='listproperty_banner_colrightsec_rightsec'>
                        <img src={banner_img} alt="banner-img" />
                        <CreateListForm/>
                    </div>
                </div>
            </section>
            <MembershipArsenal/>
            <StaynexArsenalPartner/>
            <IntroduceStaynex/>
            <RedefineTime/>
            <StaynexPasses/>
            <StayDayPass/>
            <OurUsers/>
            <PropertyStaynex/>
        </div>
    )
}

export default ListYourProperty
