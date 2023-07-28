import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BookingsIcon, CalendarIcon, CardIcon, CardopenIcon, CarIcon, HomeBlackIcon, MoonBigIcon, MoonsmallIcon, RightGreyIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import './StaynexPasses.scss'
import down_arrow from '../../../../Assets/Images/down-arrow.png' 

const StaynexPasses = () => {
    const passes = [
        {
            number: "1",
            info: "We tokenize your ‘nights’ into Staynex Passes",
        },
        {
            number: "2",
            info: "By allocating an amount of rooms inventory to be sold as “Timeshare Memberships”",
        },
        {
            number: "3",
            info: "These “Timeshare Products” don’t conflict with the usual Room Sales.",
        },
    ];

    const example = [
        {
            icon: <CarIcon />,
            icon2: <BookingsIcon />,
            number: "1",
            info: "Bedroom",
        },
        {
            icon: <MoonBigIcon />,
            icon2: <CalendarIcon />,
            className:"red_clr",
            number: "365",
            info: "Nights Available",
        },
        {
            icon: <MoonsmallIcon />,
            icon2: <HomeBlackIcon />,
            className:"red_clr",
            number: "35",
            info: "Nights Available",
        },
        {
            icon: <CardIcon />,
            icon2: <CardopenIcon />,
            number: "5",
            info: "Nights Available",
        },
    ];
    return (
        <section className='StaynexPasses'>
            <Container>
                <div className='StaynexPasses_data'>
                    <div className='StaynexPasses_data_heading'>
                        <h3>
                            Staynex Passes
                        </h3>
                        <p>How Staynex Passes are created</p>
                    </div>
                    <Row>
                        {passes.map((data) => {
                            return (
                                <Col sm={6} md={4} xl={4}>
                                    <div className='StaynexPasses_data_box'>
                                        <div className='StaynexPasses_data_box_circle'>
                                            <span>
                                                {data.number}
                                            </span>
                                        </div>
                                        <p>{data.info}</p>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                    <div className='StaynexPasses_data_example'>
                        <h6>Example</h6>
                        <div className='StaynexPasses_data_example_list'>
                            <ul>
                                {example.map((data) => {
                                    return (
                                        <li>
                                            <div className='gray_circle'>
                                                <span>{data.icon}</span>
                                            </div>
                                            <div className={`list_icon ${data.className}`}>{data.icon2}</div>
                                            <h5>{data.number}</h5>
                                            <p>{data.info}</p>
                                            <div className='icon'>
                                                <RightGreyIcon />
                                                <img src={down_arrow} alt="arrow" className='arrow'/>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>
                    </div>
                </div>
            </Container>
        </section >
    )
}

export default StaynexPasses
