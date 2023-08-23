import React, { useEffect, useState } from 'react'
// import { BathroomIcon, BedroomIcon, SquareareaIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';
import CommonHeading from '../../../../Common/CommonHeading/CommonHeading'
import './Destinations.scss'
import Slider from 'react-slick'
import Commoncard from '../../../../Common/CommonCard/Commoncard'
import { useDispatch } from 'react-redux'
import { callApiGetMethod } from '../../../../../Redux/Actions/api.action'
import { APIURL } from '../../../../../Utils'
import CommonButton from '../../../../Common/CommonButton/CommonButton'
import { useNavigate } from 'react-router-dom'

const Destinations = (props: any) => {
  const dispatch: any = useDispatch()
  const navigate: any = useNavigate()
  const [propertyList, setPropertyList]: any = useState([])

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  useEffect(() => {
    //Get propertyList function
    const retreivePropertyList: any = async () => {
      const result: any = await dispatch(
        callApiGetMethod(
          APIURL.GET_PROPERTY_LIST,
          { page: 1, limit: 10 },
          true,
          false,
        ),
      )
      setPropertyList(result?.data)
    }
    retreivePropertyList()
  }, [dispatch])

  let listOnly = (propertyList: any) => {
    return propertyList.map((d) => d.price)
  }

  const GetIndividualData = async (data) => {
    navigate('/resort-details/' + data.id)
    props?.HotelDetails && props?.HotelDetails()
  }

  return (
    <>
      <section className="destination">
        <CommonHeading
          className="text_size"
          heading="Stay at our finest destinations"
          paragraph="Discover Switzerland’s best ski resorts and plan the perfect holiday"
        />
        <div className="destination_section">
          <ul className="list">
            {propertyList && propertyList.length > 0 && (
              <Slider {...settings}>
                {propertyList && propertyList.length > 0
                  ? propertyList.map((data: any, index: number) => (
                    <li key={index}>
                      <Commoncard
                        hotelimag={data?.images ? data?.images[0] : ''}
                        hoteltitle={
                          data?.name
                            ? data?.name?.charAt(0).toUpperCase() +
                            data?.name?.slice(1).toLowerCase()
                            : ''
                        }
                        GetIndividualData={() => GetIndividualData(data)}
                        address={data?.location ? data?.location : ''}
                        bedroom={data?.rooms ? data?.rooms?.total : ''}
                        price={data?.passes.length > 0
                          ? `${Math.min.apply(
                            Math,
                            listOnly(data?.passes),
                          )}`
                          : ''
                        }
                      />
                    </li>
                  ))
                  : 'No Data Found'}
              </Slider>
            )}
            {propertyList && propertyList.length > 10 ? (
              <CommonButton
                title={'Show More'}
                onClick={() => navigate('/listing')}
              />
            ) : (
              ''
            )}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Destinations
