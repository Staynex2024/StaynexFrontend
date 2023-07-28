import React from 'react'
import './ArasenalFC.scss'
import logo from '../../../../Assets/Images/partner-img.png'
import arsenal_img from '../../../../Assets/Images/arasel-img.png'

const ArasenalFC = () => {
    return (
        <section className='ArasenalFc_sec'>
            <div className='ArasenalFc_sec_colleftsec'>
                <div className='ArasenalFc_sec_colleftsec_leftsec'>
                    <div className='ArasenalFc_sec_colleftsec_leftsec_textsec'>
                        <h4>Arsenal FC</h4>
                        <p>As the official partner of Arsenal FC, we are able to create Staynex x Arsenal Co-Branded NFTs.</p>

                        <p> Where the NFT holders will get exclusive match tickets, Arsenal experiences (meet the players), memorabilia and a uniquely designed Arsenal NFT.</p>

                        <p> Participating hotels will get massive exposure through co-marketing campaigns and to leverage of the club’s 100 million followers.</p>

                        <div className='property_list'>
                            <h6>Official Hotel & Resort Membership Partner of  Arsenal FC</h6>
                        </div>
                        <div className='property_logo'>
                            <img src={logo} alt="arsenal_logo" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='ArasenalFc_sec_colrightsec'>
                <div className='ArasenalFc_sec_colrightsec_rightsec'>
                    <img src={arsenal_img} alt="arsnal-img"/>
                </div>
            </div>
        </section>
    )
}

export default ArasenalFC
