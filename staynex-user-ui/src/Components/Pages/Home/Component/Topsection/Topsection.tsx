import React from 'react';
import './Topsection.scss';
import Slider from "react-slick";
import swap1 from '../../../../../Assets/Images/swap1.png';
import swap2 from '../../../../../Assets/Images/swap2.png';
import swap3 from '../../../../../Assets/Images/swap3.png';
import { BedroomIcon, NightshelterIcon, SearchwhiteIcon, SellIcon, SquareareaIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';

const Topsection = () => {
    const swaping = [
        { slideimage: swap1, }, { slideimage: swap2, }, { slideimage: swap3, },
    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <section className='top_section'>
                <Slider {...settings}>
                    {swaping.map((data) => (
                        <div className='swip'>
                            <div className='swip_textsec'>
                                <h3>Ski the Swiss Alps this winter</h3>
                                <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                            </div>
                            <div className='swip_imagesec'>
                                <img src={data.slideimage} alt='side-image' />
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className='bar_space'>
                    <div className='searchbar'>
                        <div className='search_fields'>
                            <input type='text' placeholder='Search anywhere' />
                            <ul className='listinghotel'>
                                <li><NightshelterIcon /> Villas</li>
                                <li><BedroomIcon /> 2 bedrooms</li>
                                <li><SquareareaIcon /> {'>900sqft'}</li>
                                <li><SellIcon /> {'>$3,500'}</li>
                            </ul>
                        </div>
                        <button><SearchwhiteIcon /></button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Topsection