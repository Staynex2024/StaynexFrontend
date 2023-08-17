import React from 'react'
import './Commoncard.scss'
import {
  BedroomIcon,
  BathroomIcon,
  SquareareaIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import { useNavigate } from 'react-router-dom'

const Commoncard = ({
  className,
  hotelimag,
  hoteltitle,
  address,
  bedroom,
  price,
  GetIndividualData,
}: any) => {
  let Country = require('country-state-city').Country
  let State = require('country-state-city').State
  const navigate: any = useNavigate()

  const getUserData = async (data) => {
    navigate('/resort-details/' + data.id)
    // props?.HotelDetails && props?.HotelDetails()
  }
  return (
    <>
      <div className={`commoncard ${className} `}>
        <img src={hotelimag} alt="hotelimag" onClick={GetIndividualData} />
        <h5>{hoteltitle}</h5>
        {State && (
          <h6>{`${
            State.getStateByCodeAndCountry(address?.state, address?.country)
              ?.name
          }, ${Country.getCountryByCode(address?.country)?.name}`}</h6>
        )}
        {/* <div className="info_hotel">
          <p>
            <>
              <BedroomIcon />
              &nbsp;{bedroom} bedrooms
            </>
          </p>
          <p>
            <>
              <BathroomIcon />
              &nbsp;1 Bathroom
            </>
          </p>
          <p>
            {
              <>
                <SquareareaIcon />
              </>
            }
          </p>
        </div> */}    
        <h6>{`From ${price}`}</h6>
      </div>
    </>
  )
}

export default Commoncard
