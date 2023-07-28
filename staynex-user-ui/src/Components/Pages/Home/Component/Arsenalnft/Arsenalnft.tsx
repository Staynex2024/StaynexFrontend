import React from 'react';
import './Arsenalnft.scss';
import arsenallogo from '../../../../../Assets/Images/arsenallogo.png';
import CommonButton from '../../../../Common/CommonButton/CommonButton';
import { CheckwhiteIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';
import arsenalnft1 from '../../../../../Assets/Images/arsenalnft1.png';
import arsenalnft2 from '../../../../../Assets/Images/arsenalnft2.png';
import arsenalnft3 from '../../../../../Assets/Images/arsenalnft3.png';

const Arsenalnft = () => {
    return (
        <>
            <section className='arsenal_nft'>
                <div className='arsenal_nft_colleftsec'>
                    <div className='arsenal_nft_leftsec'>
                        <img src={arsenallogo} alt='arsenallogo' />
                        <div className='arsenal_nft_leftsec_textsec'>
                            <h4>Stay at our finest destinations</h4>
                            <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                            <ul className='listing'>
                                <li><CheckwhiteIcon /> <span>Bringing together hospitality and football</span></li>
                                <li><CheckwhiteIcon /> <span>Get exposure of 100 million fans</span></li>
                                <li><CheckwhiteIcon /> <span>Offer once in a lifetime experiences</span></li>
                            </ul>
                        </div>
                        <CommonButton title="Global partnerships" className="white-bg btn_size" />
                    </div>
                </div>
                <div className='arsenal_nft_colrightsec'>
                    <div className='arsenal_nft_rightsec'>
                        <ul className='nftlist'>
                            <li><img src={arsenalnft1} alt='arsenalnft' /></li>
                            <li><img src={arsenalnft2} alt='arsenalnft' /></li>
                            <li><img src={arsenalnft3} alt='arsenalnft' /></li>
                        </ul>
                        <div className='right_text'>
                            <h6>Staynex x Arsenal NFTs</h6>
                            <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Arsenalnft