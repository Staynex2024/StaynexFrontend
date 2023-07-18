import React from "react";
import Slider from "react-slick";
import sliderImg from "../../../../Assets/Images/slider1.png"
import sliderImg1 from "../../../../Assets/Images/slider2.png"
import sliderImg2 from "../../../../Assets/Images/slider3.png"
import sliderImg3 from "../../../../Assets/Images/slider4.png"

export default function SliderImage() {
  const [nav1, setNav1] = React.useState(null)
  const [nav2, setNav2] = React.useState(
    {
      arrows: false
    }
  )
  let slider1: any = []
  let slider2: any = []

  React.useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider1, slider2])

  return (
    <div>
      <Slider
        asNavFor={nav2}
        ref={slider => (slider1 = slider)}
        className="images_sliderone"
      >
        <div><img src={sliderImg} alt="slide 1" /></div>
        <div><img src={sliderImg1} alt="slide 1" /></div>
        <div><img src={sliderImg2} alt="slide 1" /></div>
        <div><img src={sliderImg3} alt="slide 1" /></div>

      </Slider>

      <Slider
        asNavFor={nav1}
        ref={slider => (slider2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        className="images_slidertwo"
      >
        <div><img src={sliderImg} alt="slide 1" /></div>
        <div><img src={sliderImg1} alt="slide 1" /></div>
        <div><img src={sliderImg2} alt="slide 1" /></div>
        <div><img src={sliderImg3} alt="slide 1" /></div>
      </Slider>
    </div>
  );

}