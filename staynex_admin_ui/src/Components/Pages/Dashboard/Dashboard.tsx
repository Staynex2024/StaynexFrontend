import './Dashboard.scss';
import CommonHeading from '../../Common/CommonHeading/CommonHeading';
import React, { useState } from 'react';
import CommonButton from '../../Common/CommonButton/CommonButton';
import Dashboardmodal from './Component/Dashboardmodal';
import './Dashboard.scss';


const Dashboard = () => {
    const [show, setShow] = useState(false);
    const cardlist = [
        { label: 'Total pass sold', value: '18', }, { label: 'Total pass available', value: '45', },
        { label: 'Nights redeemed', value: '120', }, { label: 'Total properties', value: '120', },
    ]

    return (
        <>
            <section className='dashboard'>
                <CommonHeading
                    heading='Dashboard'
                />
                <div className='dashboard_section'>
                    <div className='statistics_card'>
                        <p>Statistics</p>
                        <ul className='statistics_card_list'>
                            {cardlist.map((data) => (
                                <li>
                                    <label>{data.label}</label>
                                    <h3>{data.value}</h3>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='statistics_card'>
                        <p>Pass Details</p>
                        <div className='statistics_card_typepass'>
                            <label>Types of pass</label>
                            <p>4</p>
                        </div>
                        <ul className='statistics_card_totlelist'>
                            <li>
                                <label>Name</label>
                                <label>Total Sold</label>
                            </li>
                            <li>
                                <p>SP3</p>
                                <p><span>20</span>/100</p>
                            </li>
                            <li>
                                <p>SP7</p>
                                <p><span>12</span>/100</p>
                            </li>
                            <li>
                                <p>SP14</p>
                                <p><span>40</span>/100</p>
                            </li>
                            <li>
                                <p>SP30</p>
                                <p><span className='gray_span'>0</span>/100</p>
                            </li>
                        </ul>
                        <div className='create_btn'>
                            <CommonButton title="Create new" className="btncreate" onClick={() => setShow(true)} />
                        </div>
                    </div>
                </div>
            </section>
            <Dashboardmodal
                show={show}
                handleClose={() => setShow(false)}
            />
        </>
    )
}

export default Dashboard