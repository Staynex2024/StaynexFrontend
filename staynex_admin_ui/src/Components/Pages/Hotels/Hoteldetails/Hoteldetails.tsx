import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import CommonHeading from '../../../Common/CommonHeading/CommonHeading';
import Account from './Component/Account';
import Passes from './Component/Passes';
import Propertydetail from './Component/Propertydetail';
import Stats from './Component/Stats';
import './Hoteldetails.scss';

const Hoteldetails = () => {
    return (
        <>
            <section className='hotel_details'>
                <CommonHeading
                    heading='Kunang-Kunang Tent Resort'
                />
                <div className='hotel_details_section'>
                    <Tabs
                        defaultActiveKey="propertydetail"
                        id="uncontrolled-tab-example"
                        className="tabs_section"
                    >
                        <Tab eventKey="propertydetail" title="Property Detail">
                            <Propertydetail />
                        </Tab>
                        <Tab eventKey="passes" title="Passes">
                            <Passes />
                        </Tab>
                        <Tab eventKey="account" title="Account">
                            <Account />
                        </Tab>
                        <Tab eventKey="stats" title="Stats">
                            <Stats />
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </>
    )
}

export default Hoteldetails