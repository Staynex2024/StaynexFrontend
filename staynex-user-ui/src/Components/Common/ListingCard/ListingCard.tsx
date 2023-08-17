import React from 'react'
import './ListingCard.scss'
import { Col, Row } from 'react-bootstrap'
import {
  BathroomIcon,
  BedroomIcon,
  NightIcon,
  SquareareaIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import airCondition from '../../../Assets/Images/airconditioning.svg'
import tvStand from '../../../Assets/Images/tvstand.svg'
import imgicon3 from '../../../Assets/Images/Amenities.png'
import petAllowed from '../../../Assets/Images/petallowed.svg'
import hdTv from '../../../Assets/Images/hdtv.svg'
import kitchen from '../../../Assets/Images/kitchen.svg'
import freeWasher from '../../../Assets/Images/freewasher.svg'
import wifi from '../../../Assets/Images/wifi.svg'
import { useNavigate } from 'react-router-dom'

const ListingCard = ({ data }: any) => {
  const navigate: any = useNavigate()

  let Country = require('country-state-city').Country
  let State = require('country-state-city').State

  let listOnly = (propertyList: any, type: any) => {
    if (type === 'price') {
      return propertyList.map((d) => d.price)
    } else if (type === 'night') {
      return propertyList.map((d) => d.redeemable_nights)
    }
  }
  const getUserData = async (id: any) => {
    navigate('/resort-details/' + id)
  }

  return (
    <>
      <div className="Listing_Card">
        {data && data?.length > 0
          ? data.map((data: any, i: number) => (
              <div className="Card_hotel_Box" key={i}>
                <Row className="">
                  <Col xs={12} lg={5} className="d-flex pe-lg-0">
                    <div className="Card_hotel_Box_img w-100">
                      <img
                        src={data?.images[0]}
                        alt="hotelimag"
                        onClick={() => getUserData(data?.id)}
                      />
                    </div>
                  </Col>
                  <Col xs={12} lg={7} className="ps-lg-0 d-flex">
                    <div className="Card_hotel_Box_content w-100">
                      <div className="Card_content_heading">
                        <h2>
                          {data?.name
                            ? data?.name?.charAt(0).toUpperCase() +
                              data?.name?.slice(1).toLowerCase()
                            : ''}
                        </h2>
                        {State && (
                          <h6>{`${
                            State.getStateByCodeAndCountry(
                              data?.location?.state,
                              data?.location?.country,
                            )?.name
                          }, ${
                            Country.getCountryByCode(data?.location?.country)
                              ?.name
                          }`}</h6>
                        )}
                      </div>
                      <h6>
                        From{' '}
                        {data?.passes.length > 0
                          ? `$ ${Math.min.apply(
                              Math,
                              listOnly(data?.passes, 'price'),
                            )}`
                          : ''}
                      </h6>
                      <hr />
                      <div className="Card_hotel_Box_details">
                        <ul className="d-flex flex-wrap">
                          <li>
                            <BedroomIcon />{' '}
                            <span>{data?.rooms?.total} bedrooms</span>
                          </li>
                          <li>
                            <BathroomIcon /> <span>2 bathrooms</span>
                          </li>
                          <li>
                            <>
                              <NightIcon />
                              {data?.passes.length > 0
                                ? `${Math.min.apply(
                                    Math,
                                    listOnly(data?.passes, 'night'),
                                  )} Nights`
                                : ''}
                            </>
                          </li>
                          <li>
                            <SquareareaIcon /> <span>2300 sqft</span>
                          </li>
                        </ul>
                        <h4>Description</h4>
                        <p>{data?.description ? data?.description : ''}</p>
                        <h4>
                          {data?.amenity &&
                          Object.values(data?.amenity).includes(true)
                            ? 'Amenities'
                            : ''}
                        </h4>
                        <div className="amenities_icon d-flex">
                          {data?.amenity?.air_conditioner && (
                            <img
                              src={airCondition}
                              alt="icon"
                              title="air-condition"
                            />
                          )}
                          {data?.amenity?.free_washer && (
                            <img
                              src={freeWasher}
                              alt="icon"
                              title="free washer"
                            />
                          )}
                          {data?.amenity?.hd_tv && (
                            <img src={hdTv} alt="icon" title="hd-tv" />
                          )}
                          {data?.amenity?.kitchen && (
                            <img src={kitchen} alt="icon" title="kitchen" />
                          )}
                          {data?.amenity?.outdoor_pool && (
                            <img
                              src={imgicon3}
                              alt="icon"
                              title="outdoorpool"
                            />
                          )}
                          {data?.amenity?.pet_allowed && (
                            <img
                              src={petAllowed}
                              alt="icon"
                              title="pet allowed"
                            />
                          )}
                          {data?.amenity?.wifi && (
                            <img src={wifi} alt="icon" title="wifi" />
                          )}
                          {data?.amenity?.workspace && (
                            <img src={tvStand} alt="icon" title="tv stand" />
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))
          : 'No Data Found'}
      </div>
    </>
  )
}

export default ListingCard
