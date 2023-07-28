import React, { useState } from 'react';
import CommonModal from '../../../Common/CommonModal/CommonModal';
import './NazekiVillaModal.scss';
import villaimg from '../../../../Assets/Images/villaimg1.png';
import villaimg2 from '../../../../Assets/Images/villaimg2.png';
import sliderimg from '../../../../Assets/Images/resort2.jpg';
import resort3 from '../../../../Assets/Images/resort3.jpg';

import { Link } from 'react-router-dom';
import CommonButton from '../../../Common/CommonButton/CommonButton';
import { Col, Row } from 'react-bootstrap';
import GalleryModal from '../GalleryModal/GalleryModal';

const NazekiVillaModal = ({ show, handleClose, }) => {
    const VillaLinkContent = [
        {
            img: villaimg2,
        },
        {
            img: sliderimg,
        },
        {
            img: resort3,
        },
        {
            img: villaimg,
        },
        {
            img: villaimg,
        },
        {
            img: resort3,
        },
        {
            img: sliderimg,
        },
        {
            img: villaimg2,
        },
        {
            img: villaimg,
        },
        {
            img: villaimg,
        },
        {
            img: villaimg,
        },
        {
            img: villaimg,
        },
        {
            img: villaimg,
        },
        {
            img: villaimg,
        },
        {
            img: villaimg,
        },
        {
            img: villaimg,
        },
    ];
    const [galleryModal, showGalleryModal] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);
    return (
        <>
            <CommonModal
                show={show}
                handleClose={handleClose}
                className='NazekiVillaModal'
                heading='Nazeki Villa'
            >
                <div className='modal_data'>
                    <Row gutter={40} className='align-items-center' >
                        {VillaLinkContent.map((item, idx) => (
                            <Col lg={3} md={6} onClick={() => {handleClose() ;showGalleryModal(true);setInitialSlide(idx) }}>
                                <div className='villaimg_sec'>
                                    <img src={item?.img} alt="Image" />
                                    

                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </CommonModal>
            <GalleryModal
                show={galleryModal}
                slides={VillaLinkContent}
                initialSlide={initialSlide}
                handleClose={() => { showGalleryModal(false); }}
            />
        </>
    )
}

export default NazekiVillaModal