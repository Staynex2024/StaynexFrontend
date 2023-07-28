import React from 'react'
import { Container } from 'react-bootstrap'
import './StaynexArsenal.scss'
import arsenalnft1 from '../../../../Assets/Images/arsenalnft1.png'
import arsenalnft2 from '../../../../Assets/Images/arsenalnft2.png'
import arsenalnft3 from '../../../../Assets/Images/arsenalnft3.png'

const StaynexArsenal = () => {
    return (
        <section className='staynex_arsenal red_overlay'>
            <Container>
                <div className='user_heading'>
                    <h3>
                        Staynex x Arsenal NFTs
                    </h3>
                    <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                </div>
                <div className='arsenal'>
                    <ul className='nftlist'>
                        <li><img src={arsenalnft1} alt='arsenalnft' /></li>
                        <li><img src={arsenalnft2} alt='arsenalnft' /></li>
                        <li><img src={arsenalnft3} alt='arsenalnft' /></li>
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default StaynexArsenal
