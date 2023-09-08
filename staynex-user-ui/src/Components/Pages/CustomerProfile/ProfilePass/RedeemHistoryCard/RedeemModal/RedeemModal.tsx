import React, { useState } from 'react';
import CommonModal from '../../../../../Common/CommonModal/CommonModal';
import './RedeemModal.scss';
import { CheckcircleIcon } from '../../../../../../Assets/Images/svgImgs/svgImgs';
import CommonButton from '../../../../../Common/CommonButton/CommonButton';
import RedeemBookingModal from '../RedeemBookingModal/RedeemBookingModal';

const RedeemModal = ({ show, handleClose, data, propertyData, userPassId }) => {
    const [showbooking, setShowbooking] = useState(false);
    return (
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='RedeemModal'
                heading=''
            >
                <div className='main_content'>
                    <div className='text-center'>
                        <span className='blackcircleIcon'><CheckcircleIcon /></span>
                        <h2 className='my-4'>You’re almost done</h2>
                        <p>You have scored a great deal. If you leave now, we can’t hold the room and rate for you.</p>
                        <div className='my-4 pt-4'>
                            <CommonButton title="Continue booking" onClick={() => setShowbooking(true)} className="w-100" />
                        </div>
                    </div>
                </div>
            </CommonModal>

            <RedeemBookingModal
                show={showbooking}
                handleClose={() => setShowbooking(false)}
                data={data}
                propertyData= {propertyData}
                userPassId= {userPassId}
            />
        </>
    )
}

export default RedeemModal