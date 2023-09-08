import React from 'react'
import CommonHeading from '../../../../Common/CommonHeading/CommonHeading'
import { Container } from 'react-bootstrap'
import Slider from 'react-slick'
import "./FavoriteDestinations.scss"
import { useDispatch } from 'react-redux'
import { callApiGetMethod } from '../../../../../Redux/Actions/api.action'
import { APIURL } from '../../../../../Utils'
import { Favorite } from "./FavouriteDestinationList"
import { useNavigate } from 'react-router-dom'
import toaster from '../../../../Common/Toast'
// import SlideImg1 from "../../../../../Assets/Images/far-slide1.svg"
// import SlideImg2 from "../../../../../Assets/Images/far-slide2.svg"
// import SlideImg3 from "../../../../../Assets/Images/far-slide3.svg"
// import SlideImg4 from "../../../../../Assets/Images/far-slide4.svg"
// import SlideImg5 from "../../../../../Assets/Images/far-slide5.svg"

const FavoriteDestinations = () => {
    const dispatch: any = useDispatch()
    const navigate: any = useNavigate()
    // const favDestination: any = FavouriteDestination

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: '200px',
        autoplay: true,
        autoplaySpeed: 1500,
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
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '100px',
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '50px',
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '80px',
                }
            },
        ]
    };

    const handleFavouriteData = async (item: any) => {
        const result: any = await dispatch(
            callApiGetMethod(
                APIURL.GET_PROPERTY_LIST,
                { page: 1, limit: 10, country: item?.country },
                false,
                false,
            ),
        )
        if (result?.statusCode === 200) {
            if (result.count > 0) {
                navigate('/listing/?country=' + item?.country)
            } else {
                toaster.error("No property found")
            }
        } else if (result?.statusCode === 400) {
            toaster.error(result.message)
        }
    }

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
                        {Favorite.length > 0 &&
                            <Slider {...settings}>
                                {Favorite?.map((item: any, index: any) => {
                                    return (
                                        <div className='favorite_slide_box' key={index} onClick={() => handleFavouriteData(item)}>
                                            <img src={item?.image} alt="image" />
                                            <p>{item?.label}</p>
                                        </div>
                                    )
                                })}
                            </Slider>
                        }
                        {/* <Slider {...settings}>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg2} alt="Canada" /><p>Japan</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg3} alt="Canada" /><p>LONDON</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg4} alt="Canada" /><p>phuket</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg5} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg1} alt="Canada" /><p>Canada</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg2} alt="Canada" /><p>Japan</p></div>
                            <div className='favorite_slide_box'><img src={SlideImg3} alt="Canada" /><p>LONDON</p></div>
                        </Slider> */}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default FavoriteDestinations