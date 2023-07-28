import { defaultMaxListeners } from 'events'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BlackuserIcon, GlobalIcon, InterfaceIcon, RealtimeIcon, TokenIcon, TransparencyIcon } from '../../../../Assets/Images/svgImgs/svgImgs'
import './RedefineTime.scss'

const RedefineTime = () => {
    const define = [
        {
            icon: <BlackuserIcon />,
            info: "Peer-to-Peer -> Eliminates intermediaries",
        },
        {
            icon: <InterfaceIcon />,
            info: "Clear interface for customers to compare accommodation costs",
        },
        {
            icon: <RealtimeIcon />,
            info: "A real-time marketplace where users can trade their timeshare products",
        },
        {
            icon: <TransparencyIcon />,
            info: "Transparency of ownership on blockchain",
        },
        {
            icon: <TokenIcon />,
            info: "Nights tokenization enables properties of all sizes to participate in the program",
        },
        {
            icon: <GlobalIcon />,
            info: "Centralized platform with global and extensive marketing",
        },
    ];
    return (
        <section className='Redefine_timeshare'>
            <Container>
                <div className='Redefine_data'>
                    <div className='Redefine_heading'>
                        <h3>
                            How Staynex redefines timeshare
                        </h3>
                        <p>Using Web 3 technology, we’ve studied the timeshare business, keeping all the benefits and removing the frictions that have bogged this industry down</p>
                    </div>

                    <Row>
                        {define.map((data) => {
                            return (
                                <Col sm={6} md={4} xl={4}>
                                    <div className='redefine_box'>
                                        <span>
                                            {data.icon}
                                        </span>
                                        <p>{data.info}</p>
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

export default RedefineTime
