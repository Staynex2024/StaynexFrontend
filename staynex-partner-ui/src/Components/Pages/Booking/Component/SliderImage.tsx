import React from "react";
import Slider from "react-slick";


export default function SliderImage(props) {

  const [nav1, setNav1] = React.useState(null)
  const [nav2, setNav2] = React.useState(
    {
      arrows: false
    }
  )

  // eslint-disable-next-line
  let slider1: any = []
  // eslint-disable-next-line
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


        {
          props?.img && props?.img.map((item: any, index: any) => {
            return (
              <div key={index}>
                <img src={item} alt="slide 1" />
              </div>
            )
          })
        }

      </Slider>

      <Slider
        asNavFor={nav1}
        ref={(slider: any) => (slider2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        infinite={false}
        className="images_slidertwo"
      >
        {props?.img &&
          props?.img.map((item: any, index: any) => {
            return (
              <div key={index}>
                <img src={item} alt="" />
              </div>
            )
          })}

      </Slider>
    </div>
  );

}