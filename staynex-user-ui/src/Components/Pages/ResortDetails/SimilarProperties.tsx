import React, { useEffect, useState } from 'react'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'
// import './Destinations.scss'
import Slider from 'react-slick'
import Commoncard from '../../Common/CommonCard/Commoncard'
import { useDispatch } from 'react-redux'
import { callApiGetMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import CommonButton from '../../Common/CommonButton/CommonButton'
import { useNavigate } from 'react-router-dom'

const SimilarProperties = ({ hotelDetailsData }: any) => {
  const dispatch: any = useDispatch()
  const navigate: any = useNavigate()

  let Country = require('country-state-city').Country
  let State = require('country-state-city').State

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
    const retreiveSimilarPropertyList: any = async () => {
      const result: any = await dispatch(
        callApiGetMethod(
          APIURL.GET_PROPERTY_LIST,
          {
            page: 1,
            limit: 10,
            country: hotelDetailsData?.location?.country,
            state: hotelDetailsData?.location?.state,
            omitPropertyId: hotelDetailsData?.id,
          },
          false,
          false,
        ),
      )
      setPropertyList(result?.data)
    }

    if (
      hotelDetailsData?.location?.country !== undefined &&
      hotelDetailsData?.location?.state !== undefined
    ) {
      retreiveSimilarPropertyList()
    }
  }, [dispatch, hotelDetailsData])

  let listOnly = (propertyList: any) => {
    return propertyList.map((d) => d.price)
  }
  const GetIndividualData = async (data: any) => {
    navigate('/resort-details/' + data?.id)
    // window.scrollTo(0, 0)
    hotelDetailsData?.HotelDetails && hotelDetailsData?.HotelDetails()
  }

  return (
    <>
      <section className="destination">
        <CommonHeading
          className="text_size"
          heading="Similar Properties"
          paragraph={
            hotelDetailsData?.location?.state !== undefined
              ? `Discover ${State.getStateByCodeAndCountry(
                hotelDetailsData?.location?.state,
                hotelDetailsData?.location?.country,
              )?.name
              }, ${Country.getCountryByCode(hotelDetailsData?.location?.country)
                ?.name
              } best resorts and plan the perfect holiday`
              : 'Discover best resorts and plan the perfect holiday'
          }
        />
        <div className="destination_section">
          <ul className="list">
            {propertyList && propertyList.length > 0 ? (
              <Slider {...settings}>
                {propertyList && propertyList.length > 0
                  ? propertyList.map((data: any, index: number) => (
                    <li key={index}>
                      <Commoncard
                        hotelimag={data?.images ? data?.images[0] : ''}
                        //   onClick={() => getUserData(data?.id)}
                        hoteltitle={
                          data?.name
                            ? data?.name?.charAt(0).toUpperCase() +
                            data?.name?.slice(1).toLowerCase()
                            : ''
                        }
                        GetIndividualData={() => GetIndividualData(data)}
                        address={data?.location ? data?.location : ''}
                        bedroom={data?.rooms ? data?.rooms?.total : ''}
                        bathroom= {data?.rooms ? data?.rooms?.bathroom : ''}
                        price={
                          data?.passes.length > 0
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
            ) : (
              'No Similar Property'
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

export default SimilarProperties
