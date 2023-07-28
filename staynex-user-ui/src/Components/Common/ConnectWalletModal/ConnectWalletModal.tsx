import React from 'react';
import CommonModal from '../CommonModal/CommonModal';
import './ConnectWalletModal.scss';
import { WalletIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import { Link } from 'react-router-dom';
import CommonButton from '../CommonButton/CommonButton';

const ConnectWalletModal = ({ show, handleClose, }) => {
    return (
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='connect_Wallet_modal'
                heading=''
            >
                <div className='main_content'>
                    <div className='text-center'>
                        <span><WalletIcon /></span>
                        <h2 className='my-4'>Connect your wallet</h2>
                        <p>By connecting your wallet, you agree to our <Link to="#"><u>terms of service</u></Link> and <Link to="#"><u>our privacy policy</u></Link>.</p>
                        <div className='my-4 pt-4'>
                            <CommonButton title="BNB Chain" className="w-100" />
                            <CommonButton title="Connect Wallet" className="black-btn w-100 mt-3" />
                        </div>
                        <p>New to BNB Chain? Learn about wallets</p>
                    </div>
                </div>
            </CommonModal>
        </>
    )
}

export default ConnectWalletModal