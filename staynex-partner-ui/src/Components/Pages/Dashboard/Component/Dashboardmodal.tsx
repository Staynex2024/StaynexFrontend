import React from 'react';
import CommonModal from '../../../Common/CommonModal/CommonModal';
import CustomSelect from '../../../Common/Select/Select';
import './Dashboardmodal.scss';
import chartimg from '../../../../Assets/Images/chartimg.png';

const Dashboardmodal = ({ show, handleClose, }) => {
    const options = [
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' },
        { value: '2027', label: '2027' },
        { value: '2028', label: '2028' },
        { value: '2029', label: '2029' },
    ]
    return ( 
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='dashboardmodal'
                heading=''
            >
                <div className='main_content'>
                    <h6>Monthly Analytics</h6>
                    <div className='select_valuesyear'>
                        <CustomSelect
                            classgroup="select_year"
                            options={options}
                        />
                        <CustomSelect
                            classgroup="select_year"
                            options={options}
                        />
                    </div>
                    <ul className='booking_value'>
                        <li>
                            <label>Total Bookings</label>
                            <p>1200</p>
                        </li>
                        <li>
                            <label>Avg. Monthly Bookings</label>
                            <p>30</p>
                        </li>
                    </ul>
                    <div className='chart'>
                        <img src={chartimg} alt="chartimg" />
                    </div>
                </div>
            </CommonModal>
        </>
    )
}

export default Dashboardmodal