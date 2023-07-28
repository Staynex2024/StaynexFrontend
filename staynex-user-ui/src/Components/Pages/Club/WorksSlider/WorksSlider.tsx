import React from 'react';
import './WorksSlider.scss';
import Slider from "react-slick";
import CommonHeading from '../../../Common/CommonHeading/CommonHeading';
import slide1 from "../../../../Assets/Images/club_logo1.jpg"
import slide2 from "../../../../Assets/Images/club_logo2.jpg"
import slide3 from "../../../../Assets/Images/club_logo3.jpg"

const WorksSlider = () => {
    const destinationlist = [
        { slideimg: slide1, },
        { slideimg: slide2, },
        { slideimg: slide3, },
        { slideimg: slide1, },
        { slideimg: slide2, },
        { slideimg: slide3, },
    ]
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1365,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };
    return (
        <>
            <section className='destination'>
                <CommonHeading
                    className='text_size'
                    heading='How it works'
                    paragraph='Discover Switzerland’s best ski resorts and plan the perfect holiday'
                />
                <div className='destination_section work_Slider pt-md-5'>
                    <ul className='list'>
                        <Slider {...settings}>
                            {destinationlist.map((data, i) => (
                                <li key={i}>
                                    <div className='work_Slider_box'>
                                        <figure className='work_Slider_image mb-4 pb-3'>
                                            <img src={data.slideimg} alt="" />
                                        </figure>
                                        <h4>Staynex x Integration</h4>
                                        <p>Some basic sub-text goes here</p>
                                    </div>
                                </li>
                            ))}
                        </Slider>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default WorksSlider