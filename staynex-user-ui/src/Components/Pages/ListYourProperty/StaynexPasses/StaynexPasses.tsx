import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BookingsIcon, CalendarIcon, CardIcon, CarIcon, HomeBlackIcon, LogoredIcon, MoonBigIcon, MoonsmallIcon, RightGreyIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import './StaynexPasses.scss'
import down_arrow from '../../../../Assets/Images/down-arrow.png' 

const StaynexPasses = () => {
    const passes = [
        {
            number: "1",
            info: <span>We tokenize your ‘nights’ into <strong>Staynex Passes</strong></span>,
        },
        {
            number: "2",
            info: <span>By allocating an amount of rooms inventory to be sold as <strong>“Timeshare Memberships”</strong></span>,
        },
        {
            number: "3",
            info: <span>These <strong>“Timeshare Products”</strong> don’t conflict with the usual Room Sales.</span>,
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
            info: "Nights Allocated",
        },
        {
            icon: <CardIcon />,
            icon2: <LogoredIcon />,
            number: "5",
            info: "Units of 7 nights",
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
                        {passes.map((data ,i) => {
                            return (
                                <Col key={i} sm={6} md={4} xl={4}>
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
                                {example.map((data,i) => {
                                    return (
                                        <li key={i}>
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
