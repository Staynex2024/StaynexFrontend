import React from 'react'
import './Commoncard.scss'
import {
  BedroomIcon,
  BathroomIcon,
  SquareareaIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
// import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { handleConversion } from "../../../Services/common.service";


const Commoncard = ({
  className,
  hotelimag,
  hoteltitle,
  address,
  bedroom,
  price,
  GetIndividualData,
  eventaddress,
  bathroom,
  events,
}: any) => {
  let Country = require('country-state-city').Country
  let State = require('country-state-city').State
  // const navigate: any = useNavigate()

  const conversionRate = useSelector((state: any) => state.user.conversionRate)
  const currencySymobl = useSelector((state: any) => state.user.currencySymbol)

  // const getUserData = async (data) => {
  //   navigate('/resort-details/' + data.id)
  //   // props?.HotelDetails && props?.HotelDetails()
  // }
  return (
    <>
      <div className={`commoncard ${className} `}>
        <img src={hotelimag} alt="hotelimag" onClick={GetIndividualData} />
        <h5>{hoteltitle}</h5>

      {events === undefined &&
        <>
          {State && (
            <h6>{`${State.getStateByCodeAndCountry(address?.state, address?.country)
              ?.name
              }, ${Country.getCountryByCode(address?.country)?.name}`}</h6>
          )}
          <div className="info_hotel">
            <p>
              <>
                <BedroomIcon />
                &nbsp;{bedroom} bedrooms
              </>
            </p>
            <p>
              <>
                <BathroomIcon />
                &nbsp;{bathroom} Bathroom
              </>
            </p>
            <p>
              {
                <>
                  <SquareareaIcon />
                  &nbsp;950sqft
                </>
              }
            </p>
          </div>
          <h6>From <strong>{price ? `${handleConversion(conversionRate, price) + ' ' + currencySymobl}` : ""}</strong></h6>
        </>}
        {events === 'events' && eventaddress}
      </div>
    </>
  )
};

export default Commoncard
