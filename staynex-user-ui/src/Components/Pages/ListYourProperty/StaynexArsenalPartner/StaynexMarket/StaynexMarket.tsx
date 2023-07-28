import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { markAsUntransferable } from 'worker_threads'
import { GlobalIcon, MaximizeIcon, SpeakerIcon } from '../../../../../Assets/Images/svgImgs/svgImgs'
import './StaynexMarket.scss'

const StaynexMarket = () => {
    const market = [
        {
            title: "MAXIMIZE",
            icon: <MaximizeIcon />,
            info: "Sales, Revenue & Occupancy",
        },
        {
            title: "GLOBAL REACH",
            icon: <GlobalIcon />,
            info: "Through extensive marketing",
        },
        {
            title: "REDUCE",
            icon: <SpeakerIcon/>,
            info: "Marketing & operational cost",
        },
    ];
    return (
        <div className='staynex_market'>
            <Container>
                <div className='market_data'>
                    <Row>
                        {market.map((data) => {
                            return (
                                <Col sm={6} md={4} xl={4}>
                                    <div className='market_box'>
                                        <h3>{data.title}</h3>
                                        <span>{data.icon}</span>
                                        <p>{data.info}</p>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default StaynexMarket
