import React from 'react'
import { Container } from 'react-bootstrap'
import './PropertyRevenue.scss'
import { BookingsIcon, DemandIcon, IncreaseIcon, OccupancyIcon, RedrightIcon, RedSpeakerIcon } from '../../../../../Assets/Images/svgImgs/svgImgs'

const PropertyRevenue = () => {
    return (
        <div className='proerty_revenue'>
            <Container>
                <div className='property_data'>
                    <h3>Which allows your property
                        to create and maximize revenue
                    </h3>
                    <div className='property_list'>
                        <div className='list_box'>
                            <ul className='listing'>
                                <li><RedrightIcon /> <p>Create <span>additional revenue</span> streams through Timeshare products</p></li>
                                <li><OccupancyIcon /> <p><span>Maximizing lower occupancy</span> and off peak days</p></li>
                                <li><IncreaseIcon /> <p><span>Increase</span> ADR and Revenue</p></li>
                            </ul>
                        </div>
                        <div className='list_box'>
                            <ul className='listing'>
                                <li><RedSpeakerIcon /> <p><span>Maximize ancillary revenue</span> by monetizing amenities</p></li>
                                <li><DemandIcon /><p><span> Drive demand </span>and exposure through Global Partners</p></li>
                                <li><BookingsIcon /><p> <span>Increase</span> in repeated bookings</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PropertyRevenue
