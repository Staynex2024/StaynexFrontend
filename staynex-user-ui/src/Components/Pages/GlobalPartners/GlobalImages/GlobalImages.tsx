import React from 'react'
import palyer_img from '../../../../Assets/Images/player-img.png'
import football_img from '../../../../Assets/Images/football.png'
import audience_img from '../../../../Assets/Images/audience.jpg'
import './GlobalImages.scss'
import { CheckwhiteIcon } from '../../../../Assets/Images/svgImgs/svgImgs'
import { Container } from 'react-bootstrap'

const GlobalImages = () => {
    return (
        <>
            <section className="global_image">
                <div className='global_image_column'>
                    <img src={palyer_img} alt="palyer-img" />
                    <img src={football_img} alt="palyer-img" />
                    <img src={audience_img} alt="palyer-img" />
                </div>

                <div className='global_image_content'>
                    <Container>
                        <div className='global_image_content_list'>
                            <ul className='global_image_content_list_listing'>
                                <li><CheckwhiteIcon /> <span>Get exposure of 100 million fans</span></li>
                                <li><CheckwhiteIcon /> <span>Bringing together hospitality and football</span></li>
                                <li><CheckwhiteIcon /> <span>Offer once in a lifetime experiences</span></li>
                            </ul>
                        </div>
                        <div className='global_image_content_line'></div>
                        <div className='global_image_content_textsec'>
                            <h3>The full Arsenal experience</h3>
                            <p>Get ready for a truly unforgettable experience. With match tickets to see the Gunners in action, exclusive experiences,
                                and the chance to meet your favorite players, this package has it all. Don’t miss out on the chance to be a part of the Arsenal family and make memories that will last a lifetime.
                                Book now and get ready for the ultimate Arsenal experience!
                            </p>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default GlobalImages
