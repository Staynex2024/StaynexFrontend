import React, { useEffect, useRef } from 'react';
import CommonModal from '../../../Common/CommonModal/CommonModal';
import './GalleryModal.scss';
import Slider from 'react-slick';
import { LeftArrowIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import { Link } from 'react-router-dom';

const GalleryModal = ({ show, handleClose, initialSlide, slides }) => {
    const sliderRef: any = useRef();
    useEffect(() => {
        sliderRef.current?.slickGoTo(initialSlide)
    }, [initialSlide])
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: initialSlide,
    };
    return (
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='GalleryModal'
                heading='Nazeki Villa'
            >
                <div className='modal_data'>

                    <Link className='backbtn' to='/resort-details'><LeftArrowIcon />Back to gallery</Link>
                    <Slider ref={sliderRef} {...settings}>
                        {slides.map((item, idx) => (
                            <div key={idx} className='villaimg_sec'>
                                <img src={item?.img} alt="villaImage" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </CommonModal>
        </>
    )
}
export default GalleryModal