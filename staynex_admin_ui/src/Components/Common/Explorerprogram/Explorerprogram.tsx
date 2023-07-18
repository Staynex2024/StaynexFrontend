import React from 'react';
import { Whitecheckcircle } from '../../../Assets/Images/svgImgs/svgImgs';
import './Explorerprogram.scss';

const Explorerprogram = () => {
    const explorerlist = [
        { headlabel: 'Novice', valuelabel: '0', bottomlabel: 'NIGHTS', },
        { headlabel: 'Adventurer', valuelabel: '30', bottomlabel: 'NIGHTS', },
        { headlabel: 'Wanderer', valuelabel: '90', bottomlabel: 'NIGHTS', },
        { headlabel: 'Explorer', valuelabel: '180', bottomlabel: 'NIGHTS', },
        { headlabel: 'Globetrotter', valuelabel: '365', bottomlabel: 'NIGHTS', },
    ]
    return (
        <>
            <div className='explorer_program'>
                <ul className='explorer_program_list'>
                    {explorerlist.map((data) => (
                        <li>
                            <div className='content'>
                                <h6>{data.headlabel}</h6>
                                <h4>{data.valuelabel}</h4>
                                <h6>{data.bottomlabel}</h6>
                            </div>
                            <div className='content_hover'>
                                <h6>{data.headlabel}</h6>
                                <h4>{data.valuelabel}</h4>
                                <h6>{data.bottomlabel}</h6>
                                <div className='hover_content'>
                                    <p><Whitecheckcircle /> <span>7.5% Discounts -  Applied to the price before taxes & charges</span></p>
                                    <p><Whitecheckcircle /> <span>Staking Bonuses = 20%</span></p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Explorerprogram