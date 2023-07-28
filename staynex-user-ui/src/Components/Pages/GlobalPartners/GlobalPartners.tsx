import React from 'react'
import './GlobalPartners.scss';
import global_logo from '../../../Assets/Images/global-logo.png'
import StaynexArsenal from './StaynexArsenal/StaynexArsenal';
import ArasenalFC from './ArasenalFC/ArasenalFC';
import GlobalPartnership from './GlobalPartnership/GlobalPartnership';
import GlobalImages from './GlobalImages/GlobalImages';

const GlobalPartners = () => {
    return (
        <div className='global_sec'>
            <section className='global_partnership'>
                <div className='global_text'>
                    <h2>Global Partnerships</h2>
                    <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                    <div className='global_logo'>
                        <img src={global_logo} alt="global-logo"/>
                    </div>
                </div>
            </section>
            <ArasenalFC/>
            <StaynexArsenal/>
            <GlobalPartnership/>
            <GlobalImages/>
        </div>
    )
}

export default GlobalPartners
