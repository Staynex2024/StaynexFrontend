import React from 'react'
import { Container } from 'react-bootstrap'
import arsenallogo from '../../../../Assets/Images/arsenallogo-black.png'
import { BlackTickIcon, CheckwhiteIcon } from '../../../../Assets/Images/svgImgs/svgImgs'
import CommonButton from '../../../Common/CommonButton/CommonButton'
import PropertyRevenue from './PropertyRevenue/PropertyRevenue'
import './StaynexArsenalPartner.scss'
import StaynexMarket from './StaynexMarket/StaynexMarket'

const StaynexArsenalPartner = () => {
    return (
        <section className='Staynex_sec'>
            <div className='arsenal_nft'>
                <Container>
                    <div className='arsenal_nft_mainsec'>
                        <img src={arsenallogo} alt='arsenallogo' />
                        <div className='arsenal_nft_mainsec_area'>
                            <div className='arsenal_nft_mainsec_area_textsec'>
                                <h4>We are the Official Hotel & Resort Membership Partner of Arsenal FC</h4>
                                <p>Join our Global Partnerships Program today</p>
                                <ul className='listing'>
                                    <li><BlackTickIcon /> <span>Bringing together hospitality and football</span></li>
                                    <li><BlackTickIcon /> <span>Get exposure of 100 million fans</span></li>
                                    <li><BlackTickIcon /> <span>Offer once in a lifetime experiences</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='global_btn'>
                            <CommonButton title="Global Partnerships Program" className="btn_size" />
                        </div>
                    </div>
                </Container>
            </div>
            <StaynexMarket/>
            <PropertyRevenue/>
        </section>
    )
}

export default StaynexArsenalPartner
