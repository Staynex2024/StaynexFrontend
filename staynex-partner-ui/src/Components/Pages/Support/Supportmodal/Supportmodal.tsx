import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import './Supportmodal.scss';
import { CopyIcon, FlagIcon, MorehoriIcon } from '../../../../Assets/Images/svgImgs/svgImgs';
import CommonButton from '../../../Common/CommonButton/CommonButton';
import CommonModal from '../../../Common/CommonModal/CommonModal';
import userImg from "../../../../Assets/Images/userimg.png"

const Supportmodal = ({ show, handleClose, }) => {
    const tabledroplist = [
        { name: "Mark as Resolved", },
        { name: "Reply ", },
        { name: "View Details", to: '' },
        { name: "Close Report", },
    ];
    return (
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='support_Modal'
                heading=''
            >
                <div className='main_content'>
                    <div className='Modal_Heading'>
                        <div className='Modal_Heading_left'>
                            <h4>Unable to book room</h4>
                            <p><FlagIcon /> Technical Issue</p>
                        </div>
                        <div className='Modal_Heading_right'>
                            <CommonButton title="Mark as closed" className="text_btn" />
                            <Dropdown className='table_Dropdown mx-4'>
                                <Dropdown.Toggle variant="" id="dropdown-basic"><MorehoriIcon /></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {tabledroplist.map((data, i) => {
                                        return (
                                            <Dropdown.Item key={i} href={data.to} >
                                                <div className='table_drop d-flex'>
                                                    <span>{data.name}</span>
                                                </div>
                                            </Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <ul className='details_user'>
                        <li>
                            <div className='user_info'>
                                <img src={userImg} alt='userimg' />
                                <h6>Kylee Arroyo</h6>
                            </div>
                        </li>
                        <li>
                            <p className='address'>0x71c...976f <button><CopyIcon /></button></p>
                        </li>
                        <li>
                            <p className='date'>10 Feb 2023</p>
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

export default Supportmodal