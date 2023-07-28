import React from 'react'
import "./CenterCardSlider.scss"
import Slider from "react-slick";
import staypass2 from '../../../../Assets/Images/staypass3.png'

const CenterCardSlider = () => {
  const settings = {
    className: "center",
    arrows:false,
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 575,
        settings: {
          arrows: false,
          centerPadding: '100px',
          slidesToShow: 1
        }
      }
    ]
  };
  return (
    <>
      <div className='CenterCard_Slider'>
        <Slider {...settings}>
          <div className='Card_passimg'>
            <img src={staypass2} alt='arsenalnft' />
          </div>
          <div className='Card_passimg'>
            <img src={staypass2} alt='arsenalnft' />
          </div>
          <div className='Card_passimg'>
            <img src={staypass2} alt='arsenalnft' />
          </div>
          <div className='Card_passimg'>
            <img src={staypass2} alt='arsenalnft' />
          </div>
          <div className='Card_passimg'>
            <img src={staypass2} alt='arsenalnft' />
          </div>
        </Slider>
      </div>
    </>
  )
}

export default CenterCardSlider
