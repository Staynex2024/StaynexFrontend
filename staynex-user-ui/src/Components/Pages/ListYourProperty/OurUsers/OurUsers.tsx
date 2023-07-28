import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AeroplaneIcon, BenefitIcon, CalendarIcon, ChartDataIcon, DollarIcon, IncreaseIcon, TimerIcon, UserIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import './OurUsers.scss'

const OurUsers = () => {
    const user = [
        {
            icon:<ChartDataIcon/>,
            info:"The income stability of real estate",
        },
        {
            icon:<AeroplaneIcon/>,
            info:"The ability to travel the world knowing you always have a ‘home’ in every country",
        },
        {
            icon:<DollarIcon/>,
            info:"The ability to liquidate anytime when needed",
        },
        {
            icon:<TimerIcon/>,
            info:"The ability to buy the ‘time’ you need at a property",
        },
        {
            icon:<CalendarIcon/>,
            info:"Doesn’t force users to use up their vacations and rewards them",
        },
        {
            icon:<BenefitIcon/>,
            info:"Increase in benefits the more the user purchases",
        },
    ];
    return (
        <section className='user_sec'>
            <Container>
                <div className='user_data'>
                    <div className='user_heading'>
                        <h3>
                            This allows us to give our users
                        </h3>
                        <p>Discover Switzerland’s best ski resorts and plan the perfect holiday</p>
                    </div>

                    <Row>
                        {user.map((data) => {
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

export default OurUsers
