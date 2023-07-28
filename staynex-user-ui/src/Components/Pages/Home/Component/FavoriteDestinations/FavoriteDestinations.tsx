import React from 'react'
import CommonHeading from '../../../../Common/CommonHeading/CommonHeading'
import { Container } from 'react-bootstrap'
import Slider from 'react-slick'
import SlideImg1 from "../../../../../Assets/Images/far-slide1.svg"
import "./FavoriteDestinations.scss"

const FavoriteDestinations = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        centerMode: false,
        centerPadding: '150px',
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
            // responsive: [
            //     {
            //         breakpoint: 1365,
            //         settings: {
            //             slidesToShow: 3,
            //             slidesToScroll: 1,
            //         }
            //     },
            //     {
            //         breakpoint: 1024,
            //         settings: {
            //             slidesToShow: 3,
            //             slidesToScroll: 1,
            //             centerPadding: '100px',
            //         }
            //     },
            //     {
            //         breakpoint: 767,
            //         settings: {
            //             slidesToShow: 2,
            //             slidesToScroll: 1,
            //             centerPadding: '50px',
            //         }
            //     },
            //     {
            //         breakpoint: 575,
            //         settings: {
            //             slidesToShow: 1,
            //             slidesToScroll: 1,
            //             centerPadding: '80px',
            //         }
            //     },
            // ]
    };
    
    return (
        <>
            <div className='favorite_destination'>
                <Container>
                    <CommonHeading
                        className='text_size text-center'
                        heading='Favorite Destinations'
                        paragraph='Discover Switzerland’s best ski resorts and plan the perfect holiday'
                    />
                </Container>

                <div className='favorite_destination_Slider '>
                    <ul className='list'>
                        <Slider {...settings}>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                        </Slider>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default FavoriteDestinations