import React from 'react';
import CommonModal from '../../../Common/CommonModal/CommonModal';
import './DeclineBookingModal.scss';
import CommonButton from '../../../Common/CommonButton/CommonButton';
import { CopyIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import userImg from "../../../../Assets/Images/userimg.png"
import { Form } from 'react-bootstrap';

const DeclineBookingModal = ({ show, handleClose, }) => {

    return (
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='DeclineBooking_Modal'
                heading=''
            >
                <div className='main_content'>
                    <div className='Modal_Heading'>
                        <h2>Customer Support</h2>
                    </div>
                    <ul className='Send_to'>
                        <li>
                            <div className='Send_to_User'>
                                <p>Send to</p>
                                <img src={userImg} alt="img" />
                                <p>Randall Thomas</p>
                            </div>
                            <p>0x71c...976f <CopyIcon /></p>
                            <p className='Send_to_Date'>10 Feb 2023</p>
                        </li>
                    </ul>
                    <div className='py-5'>
                        <label><strong>Subject</strong></label>
                        <p className='mb-4 mt-2'>Your booking was not accepted. We could not complete your booking for the following reason:</p>
                        <Form.Control as="textarea" rows={5} />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <CommonButton title="Send" className="" />
                    </div>
                </div>
            </CommonModal>
        </>
    )
}

export default DeclineBookingModal