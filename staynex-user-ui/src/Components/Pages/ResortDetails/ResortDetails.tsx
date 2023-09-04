import React, { useEffect, useState } from 'react'
import './ResortDetails.scss'
import { Col, Container, Row } from 'react-bootstrap'
// import resortimg1 from '../../../Assets/Images/resort1.jpg'
// import resortimg2 from '../../../Assets/Images/resort2.jpg'
// import resortimg3 from '../../../Assets/Images/resort3.jpg'
// import resortimg4 from '../../../Assets/Images/resort4.jpg'
import outdoorimg from '../../../Assets/Images/outdoor.svg'
import workspaceimg from '../../../Assets/Images/workspace.svg'
import airconditioningimg from '../../../Assets/Images/airconditioning.svg'
import kitchenimg from '../../../Assets/Images/kitchen.svg'
import hdtvimg from '../../../Assets/Images/hdtv.svg'
import petallowedimg from '../../../Assets/Images/petallowed.svg'
import wifiimg from '../../../Assets/Images/wifi.svg'
import freewasherimg from '../../../Assets/Images/freewasher.svg'
import mapimg from '../../../Assets/Images/map.jpg'
import {
  BedIcon,
  InstagramIcon,
  ResortIcon,
  ShowpicIcon,
  SizeIcon,
  FacebookIcon,
  GrouparrowIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import NazekiVillaModal from './NazekiVillaModal/NazekiVillaModal'
import PropertyListCard from './PropertyListCard/PropertyListCard'
import { useDispatch } from 'react-redux'
import { callApiGetMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import { Link, useParams } from 'react-router-dom'
import SimilarProperties from './SimilarProperties'

const ResortDetails = () => {
  // const descriptionLengeth = 50
  const [show, setShow] = useState(false)
  const dispatch: any = useDispatch()
  const [hotelDetailsData, setHotelDetailsData] = useState<any>()
  const { id } = useParams()
  const [isReadMore, setIsReadMore] = useState(true)

  useEffect(() => {
    HotelDetails()
    window.scroll(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const HotelDetails = async () => {
    let result: any = await dispatch(
      callApiGetMethod(
        APIURL?.SEE_HOTELS_DETAILS,
        { propertyId: id },
        true,
        false,
      ),
    )
    setHotelDetailsData(result?.data)
  }
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  return (
    <>
      <div className="resort_detail_page">
        <Container>
          <div className="details_page">
            <h2>
              {hotelDetailsData?.name
                ? hotelDetailsData?.name?.charAt(0).toUpperCase() +
                hotelDetailsData?.name?.slice(1).toLowerCase()
                : ''}
            </h2>
            <p>{hotelDetailsData?.location?.address}</p>
          </div>
        </Container>
      </div>

      <div className="resort">
        <Container>
          <div className="resort_img">
            <Row>
              <Col xs={7} md={6} lg={6} xl={6}>
                <img
                  className="resort_pic"
                  src={hotelDetailsData?.images[0]}
                  alt="resortimg"
                />
              </Col>
              <Col xs={5} md={3} lg={3} xl={3}>
                <img
                  className="villa_pic"
                  src={hotelDetailsData?.images[1]}
                  alt="resortimg"
                />
                <img
                  className="villa_pic"
                  src={hotelDetailsData?.images[2]}
                  alt="resortimg"
                />
              </Col>
              <Col sm={12} lg={3} xl={3} className="d-none d-md-block">
                <img
                  className="resort_pic"
                  src={hotelDetailsData?.images[3]}
                  alt="resortimg"
                />
              </Col>
            </Row>
            <button onClick={() => setShow(true)} className="picshow_icon">
              <ShowpicIcon />
              Show all photos
            </button>
          </div>
          <div className="resort_socialicon">
            <Link to="https://www.instagram.com/" target="_blank">
              <InstagramIcon />
            </Link>
            <Link to="https://www.facebook.com/" target="_blank">
              <FacebookIcon />
            </Link>
          </div>
          <div className="nazeki_villa">
            <Row>
              <Col xs={12} xl={6}>
                <div className="nazeki_info">
                  <h2>
                    {hotelDetailsData?.name
                      ? hotelDetailsData?.name?.charAt(0).toUpperCase() +
                      hotelDetailsData?.name?.slice(1).toLowerCase()
                      : ''}
                  </h2>
                  {/* <h4>{hotelDetailsData?.description}.</h4> */}
                  {/* <div className="villa_info_icon">
                    <span>Read more</span>
                    <GrouparrowIcon />
                  </div> */}

                  <h4 className="villa_info_icon">
                    {/* {isReadMore && isReadMore.length > 50 ? (

              )} */}

                    {isReadMore
                      ? hotelDetailsData?.description.slice(0, 50)
                      : hotelDetailsData?.description}
                  </h4>

                  {isReadMore && hotelDetailsData?.description.length > 50 ? (
                    <>
                      {' '}
                      <span onClick={toggleReadMore} className="read-or-hide ">
                        {' '}
                        Read more{' '}
                      </span>{' '}
                      <GrouparrowIcon />
                    </>
                  ) : isReadMore ? null : (
                    <>
                      <span onClick={toggleReadMore} className="read-or-hide ">
                        Read less
                      </span>
                      <GrouparrowIcon />
                    </>
                  )}

                  <div className="villa_info_icon"></div>
                </div>
              </Col>
              <Col xs={12} xl={6}>
                <h3>Property information</h3>

                <div className="room_info">
                  <ul>
                    <li>
                      <p>Type</p>
                    </li>
                    <li>
                      <ResortIcon />
                    </li>
                    <li>
                      {hotelDetailsData?.type
                        ? hotelDetailsData?.type?.charAt(0).toUpperCase() +
                        hotelDetailsData?.type?.slice(1).toLowerCase()
                        : ''}
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p> Bedrooms</p>
                    </li>
                    <li>
                      <BedIcon />
                    </li>
                    <p>
                      <b>
                        {hotelDetailsData?.rooms?.total
                          ? `${hotelDetailsData?.rooms?.total} Bedrooms`
                          : ''}
                      </b>
                    </p>
                    <li></li>
                  </ul>
                  <ul>
                    <li>
                      <p>Size</p>
                    </li>
                    <li>
                      <SizeIcon />
                    </li>
                    <li>950 sqft</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
          <div className="villa_sarvice">
            {hotelDetailsData?.amenity &&
              Object.keys(hotelDetailsData?.amenity).length > 0 && (
                <ul>
                  {hotelDetailsData?.amenity?.outdoor_pool && (
                    <li>
                      <img
                        className="resort_pic"
                        src={outdoorimg}
                        alt="outdoorimg"
                        title="Shared outdoor pool"
                      />
                      Shared outdoor pool
                    </li>
                  )}

                  {hotelDetailsData?.amenity?.kitchen && (
                    <li>
                      <>
                        <img
                          src={kitchenimg}
                          alt="kitchenimg"
                          title="Kitchen"
                        />
                        Kitchen
                      </>
                    </li>
                  )}

                  {hotelDetailsData?.amenity?.wifi && (
                    <li>
                      <>
                        <img src={wifiimg} alt="wifiimg" title="Wifi" />
                        Wifi
                      </>
                    </li>
                  )}

                  {hotelDetailsData?.amenity?.workspace && (
                    <li>
                      <>
                        <img
                          className="resort_pic"
                          src={workspaceimg}
                          alt="workspaceimg"
                          title="Dedicated Workspace"
                        />
                        Dedicated Workspace
                      </>
                    </li>
                  )}

                  {hotelDetailsData?.amenity?.hd_tv && (
                    <li>
                      <>
                        <img src={hdtvimg} alt="hdtvimg" title="HDTV" />
                        40” HDTV
                      </>
                    </li>
                  )}
                  {hotelDetailsData?.amenity?.free_washer && (
                    <li>
                      <>
                        <img
                          src={freewasherimg}
                          alt="freewasherimg"
                          title="Free washer"
                        />
                        Free washer
                      </>
                    </li>
                  )}
                  {hotelDetailsData?.amenity?.air_conditioner && (
                    <li>
                      <img
                        className="resort_pic"
                        src={airconditioningimg}
                        alt="airconditioningimg"
                        title="air conditioning"
                      />
                      Air Conditioning
                    </li>
                  )}

                  {hotelDetailsData?.amenity?.pet_allowed && (
                    <li>
                      <>
                        <img
                          src={petallowedimg}
                          alt="petallowedimg"
                          title="pet allowed"
                        />
                        Pet allowed
                      </>
                    </li>
                  )}
                </ul>
              )}
          </div>
          <PropertyListCard hotelDetailsData={hotelDetailsData} />
        </Container>
        <div className="map_sec">
          <Row className="mx-0">
            <Col xs={12} lg={4} className="d-flex px-0">
              <div className="map_content w-100">
                <p>Address</p>
                <h2>
                  {hotelDetailsData?.name
                    ? hotelDetailsData?.name?.charAt(0).toUpperCase() +
                    hotelDetailsData?.name?.slice(1).toLowerCase()
                    : ''}
                </h2>
                <p>{hotelDetailsData?.location?.address}</p>
              </div>
            </Col>
            <Col xs={12} lg={8} className="d-flex px-0">
              <div className="map_pic w-100">
                <img src={mapimg} alt="mapimg" />
              </div>
            </Col>
          </Row>
        </div>
        <SimilarProperties hotelDetailsData={hotelDetailsData} />
      </div>
      <NazekiVillaModal
        show={show}
        handleOpen={() => setShow(true)}
        handleClose={() => setShow(false)}
        data={hotelDetailsData}
      />
    </>
  )
}

export default ResortDetails
