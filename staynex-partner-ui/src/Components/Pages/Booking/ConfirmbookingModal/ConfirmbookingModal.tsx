import React from 'react';
import CommonModal from '../../../Common/CommonModal/CommonModal';
import './ConfirmbookingModal.scss';
import { CheckcircleIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import CommonButton from '../../../Common/CommonButton/CommonButton';

const ConfirmbookingModal = ({ show, handleClose, }) => {
    return (
        <>
            <CommonModal 
                show={show}
                handleClose={handleClose}
                className='Confirmbooking_Modal'
                heading=''
            >
                <div className='main_content'>
                    <div className='Confirm_booking_heading text-center'>
                        <CheckcircleIcon />
                        <h2>Confirm booking</h2>
                        <p>Are you sure you want to confirm this booking? This action cannot be undone.</p>
                    </div>
                    <div className='check_out_in py-5 d-flex justify-content-between'>
                        <div>
                            <span>Check out</span>
                            <p>20 Feb 2023</p>
                        </div>
                        <div>
                            <span>Check in</span>
                            <p>20 Feb 2023</p>
                        </div>
                    </div>
                    <div className='check_room pb-5 d-flex justify-content-between'>
                        <div>
                            <p>Kunang-Kunang</p>
                            <p className='text-org text-start'>SP7</p>
                        </div>
                        <div>
                            <p>Triple room</p>
                        </div>
                    </div>
                    <CommonButton title="Confirm Booking" className="w-100" />
                </div>
            </CommonModal>
        </>
    )
}

export default ConfirmbookingModal