import React from 'react';
import { BathroomIcon, BedroomIcon, SquareareaIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';
import CommonHeading from '../../../../Common/CommonHeading/CommonHeading';
import './Destinations.scss';
import destination1 from '../../../../../Assets/Images/destination1.png';
import destination2 from '../../../../../Assets/Images/destination2.png';
import destination3 from '../../../../../Assets/Images/destination3.png';
import destination4 from '../../../../../Assets/Images/destination4.png';
import Slider from "react-slick";
import Commoncard from '../../../../Common/CommonCard/Commoncard';

const Destinations = () => {
    const destinationlist = [
        {
            hotelimag: destination1, hoteltitle: 'Nazeki Villa', adderss: 'Amber Villa, Indonesia',
            bedroom: '2 bedrooms', bathroom: '1 Bathroom', area: '950sqft', price: '$4,999',
        },
        {
            hotelimag: destination2, hoteltitle: 'Kunang Kunang Tent Resort', adderss: 'Banyuwangi, Indonesia',
            bedroom: '2 bedrooms', bathroom: '1 Bathroom', area: '950sqft', price: '$4,999',
        },
        {
            hotelimag: destination3, hoteltitle: 'Mohini Komodo', adderss: 'Labuan Bajo, Indonesia',
            bedroom: '2 bedrooms', bathroom: '1 Bathroom', area: '950sqft', price: '$4,999',
        },
        {
            hotelimag: destination4, hoteltitle: 'Be Home', adderss: 'Phuket, Thailand',
            bedroom: '2 bedrooms', bathroom: '1 Bathroom', area: '950sqft', price: '$4,999',
        },
        {
            hotelimag: destination1, hoteltitle: 'Nazeki Villa', adderss: 'Amber Villa, Indonesia',
            bedroom: '2 bedrooms', bathroom: '1 Bathroom', area: '950sqft', price: '$4,999',
        },
        {
            hotelimag: destination2, hoteltitle: 'Kunang Kunang Tent Resort', adderss: 'Banyuwangi, Indonesia',
            bedroom: '2 bedrooms', bathroom: '1 Bathroom', area: '950sqft', price: '$4,999',
        },
        {
            hotelimag: destination3, hoteltitle: 'Mohini Komodo', adderss: 'Labuan Bajo, Indonesia',
            bedroom: '2 bedrooms', bathroom: '1 Bathroom', area: '950sqft', price: '$4,999',
        },
        {
            hotelimag: destination4, hoteltitle: 'Be Home', adderss: 'Phuket, Thailand',
            bedroom: '2 bedrooms', bathroom: '1 Bathroom', area: '950sqft', price: '$4,999',
        },
    ]
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
                    heading='Stay at our finest destinations'
                    paragraph='Discover Switzerland’s best ski resorts and plan the perfect holiday'
                />
                <div className='destination_section'>
                    <ul className='list'>
                        <Slider {...settings}>
                            {destinationlist.map((data) => (
                                <li>
                                    <Commoncard
                                        hotelimag={data.hotelimag}
                                        hoteltitle={data.hoteltitle}
                                        adderss={data.adderss}
                                        hotellist
                                        bedroom={<><BedroomIcon /> {data.bedroom}</>}
                                        bathroom={<><BathroomIcon /> {data.bathroom}</>}
                                        area={<><SquareareaIcon /> {data.area}</>}
                                        price={<>From <strong>{data.price}</strong></>}
                                    />
                                </li>
                            ))}
                        </Slider>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Destinations