import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../AboutUs.scss'
import hotelimag from '../../../../Assets/Images/card-img.jpg'
import hotelimag2 from '../../../../Assets/Images/allows2.jpg'
import hotelimag3 from '../../../../Assets/Images/allows3.jpg'

const ImagineNFT = () => {
    const carddata = [
        {
            hotelimag:hotelimag,
            title:"Live the life of a globetrotter",
            info:"By owning Stays at multiple properties around the world, you are guaranteed the life of a traveller at the finest of destinations.",
        },
        {
            hotelimag:hotelimag2,
            title:"Build a collection of stays globally",
            info:"Start building a collection of your most favourite properties to Stay at from all over the world.",
        },
        {
            hotelimag:hotelimag3,
            title:"Gives you exclusive experiences",
            info:"Choose from an ever-growing list of curated experiences with the highest standards you’ve come to enjoy from the best resorts and hotels globally.",
        },
    ];
    return (
        <section className='nft_sec'>
            <Container>
                <div className='nft_deatil'>
                    <h2>Imagine an NFT that allows you to</h2>
                    <Row className='card_row gx-xl-5 justify-content-center'>
                        {carddata.map((data,i) => {
                            return (
                                <Col key={i} sm={6} md={4} xl={4}>
                                    <div className='Card_Box_img w-100'>
                                        <img src={data.hotelimag} alt='hotelimag' />
                                        <div className='card_content'>
                                            <h3>{data.title}</h3>
                                            <p>{data.info}</p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default ImagineNFT
