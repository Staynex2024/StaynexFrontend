import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CommonHeading from '../../../../Common/CommonHeading/CommonHeading'
import './Eventandstuff.scss'
import event1 from '../../../../../Assets/Images/event1.png'
import event2 from '../../../../../Assets/Images/event2.png'
import event3 from '../../../../../Assets/Images/event3.png'
import event4 from '../../../../../Assets/Images/event4.png'
import Slider from 'react-slick'
import Commoncard from '../../../../Common/CommonCard/Commoncard'
import CommonButton from '../../../../Common/CommonButton/CommonButton'
import {
  DiscorddarkIcon,
  SocolIcon,
} from '../../../../../Assets/Images/svgImgs/svgImgs'

const Eventandstuff = () => {
  const destinationlist = [
    {
      hotelimag: event1,
      hoteltitle: 'Crypto State by CoinDesk',
      datetime: '29th Jan 2023 ・ 3PM - 4PM',
    },
    {
      hotelimag: event2,
      hoteltitle: 'Crypto State by CoinDesk',
      datetime: '29th Jan 2023 ・ 3PM - 4PM',
    },
    {
      hotelimag: event3,
      hoteltitle: 'Crypto State by CoinDesk',
      datetime: '29th Jan 2023 ・ 3PM - 4PM',
    },
    {
      hotelimag: event4,
      hoteltitle: 'Crypto State by CoinDesk',
      datetime: '29th Jan 2023 ・ 3PM - 4PM',
    },
    {
      hotelimag: event1,
      hoteltitle: 'Crypto State by CoinDesk',
      datetime: '29th Jan 2023 ・ 3PM - 4PM',
    },
    {
      hotelimag: event2,
      hoteltitle: 'Crypto State by CoinDesk',
      datetime: '29th Jan 2023 ・ 3PM - 4PM',
    },
    {
      hotelimag: event3,
      hoteltitle: 'Crypto State by CoinDesk',
      datetime: '29th Jan 2023 ・ 3PM - 4PM',
    },
    {
      hotelimag: event4,
      hoteltitle: 'Crypto State by CoinDesk',
      datetime: '29th Jan 2023 ・ 3PM - 4PM',
    },
  ]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
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
  return (
    <>
      <section className="eventand_stuff">
        <div className="eventand_stuff_section">
          <CommonHeading
            className="text_size"
            heading="Events and stuff"
            paragraph="Discover Switzerland’s best ski resorts and plan the perfect holiday"
          />
          <ul className="list">
            <Slider {...settings}>
              {destinationlist.map((data, i) => (
                <li key={i}>
                  <Commoncard
                    hotelimag={data.hotelimag}
                    hoteltitle={data.hoteltitle}
                    adderss={data.datetime}
                  />
                </li>
              ))}
            </Slider>
          </ul>
        </div>
        <div className="stayupdate">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} sm={6}>
                <div className="text_update">
                  <h3>Stay updated on the latest</h3>
                </div>
              </Col>
              <Col lg={6} sm={6}>
                <div className="update_btns">
                  <CommonButton
                    title={
                      <>
                        <DiscorddarkIcon /> DISCORD
                      </>
                    }
                    className="dark-greenborder btnSize"
                  />
                  <CommonButton
                    title={
                      <>
                        <SocolIcon /> SO-COL
                      </>
                    }
                    className="dark-greenborder btnSize"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  )
}

export default Eventandstuff
