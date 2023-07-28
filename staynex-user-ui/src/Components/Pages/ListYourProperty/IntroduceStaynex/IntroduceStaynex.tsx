import React from 'react'
import './IntroduceStaynex.scss'
import arsenalnft1 from '../../../../Assets/Images/staynex-img2.png'
import arsenalnft2 from '../../../../Assets/Images/staynex-img1.png'
import arsenalnft3 from '../../../../Assets/Images/staynex-card.png'

const IntroduceStaynex = () => {
    return (
        <section className='Intro_staynex'>
            <div className='Intro_staynex_colleftsec'>
                <div className='Intro_staynex_colleftsec_leftsec'>
                    <div className='Intro_staynex_colleftsec_leftsec_textsec'>
                        <h4>Introducing Staynex</h4>
                        <p>Staynex is a platform that enables resorts and hotels to run their own residence club/timeshare program.</p>
                        <br/>
                        <p> Through Web 3 technology, properties can instantly create and embed these timeshare products onto NFTs.</p>
                    </div>
                </div>
            </div>
            <div className='Intro_staynex_colrightsec'>
                <ul className='nftlist'>
                    <li><img src={arsenalnft1} alt='arsenalnft' /></li>
                    <li><img src={arsenalnft2} alt='arsenalnft' /></li>
                    <li><img src={arsenalnft3} alt='arsenalnft' /></li>
                </ul>
            </div>
        </section>
    )
}

export default IntroduceStaynex
