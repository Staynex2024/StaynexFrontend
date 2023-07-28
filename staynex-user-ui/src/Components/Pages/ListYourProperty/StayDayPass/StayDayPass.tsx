import React from 'react'
import './StayDayPass.scss';
import { IncreaseIcon, OccupancyIcon, RedrightIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import CommonButton from '../../../Common/CommonButton/CommonButton';
import CenterCardSlider from '../CenterCardSlider/CenterCardSlider';


const StayDayPass = () => {
    return (
        <section className='Stay_pass'>
            <div className='Stay_pass_colleftsec'>
                <CenterCardSlider />
                <div className='signup_btn mt-4'>
                    <CommonButton
                        title="Sign Up Today" 
                    />
                </div> 
            </div>
            <div className='Stay_pass_colrightsec'>
                <div className='Stay_pass_colrightsec_rightsec'>
                    <div className='Stay_pass_colrightsec_rightsec_textsec'>
                        <h4>StayDay Pass</h4>
                        <p>Staynex enables the creation of Stayday Passes. Unlock new Annual Revenue from your hotel and resort amenities and facilities.</p>
                        <ul className='listing'>
                            <li><RedrightIcon /> <p><span>Maximize ancillary revenue</span> by selling out unused hotel facilities by increasing revenue beyond the room</p></li>
                            <li><OccupancyIcon /> <p><span>Maximizing lower occupancy</span> and off peak days</p></li>
                            <li><IncreaseIcon /> <p><span>Monetize your hotel amenities</span> by creating products that fit your property’s strengths. Fully utilize your gym, pool, restaurants etc</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StayDayPass
