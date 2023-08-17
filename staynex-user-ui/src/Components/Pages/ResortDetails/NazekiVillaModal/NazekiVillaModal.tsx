import React, { useState } from 'react'
import CommonModal from '../../../Common/CommonModal/CommonModal'
import './NazekiVillaModal.scss'
import { Col, Row } from 'react-bootstrap'
import GalleryModal from '../GalleryModal/GalleryModal'

const NazekiVillaModal = ({ show, handleClose, data, handleOpen }) => {
  const [galleryModal, showGalleryModal] = useState(false)
  const [initialSlide, setInitialSlide] = useState(0)
  return (
    <>
      <CommonModal
        show={show}
        handleClose={handleClose}
        className="NazekiVillaModal"
        heading={data?.name ? data?.name : ''}
      >
        <div className="modal_data">
          <Row gutter={40} className="align-items-center">
            {data &&
              data?.images.length > 0 &&
              data?.images.map((item, idx) => (
                <Col
                  lg={3}
                  md={6}
                  onClick={() => {
                    handleClose()
                    showGalleryModal(true)
                    setInitialSlide(idx)
                  }}
                >
                  <div className="villaimg_sec">
                    <img src={item} alt="Image" />
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </CommonModal>
      <GalleryModal
        handleOpen={handleOpen}
        show={galleryModal}
        slides={data}
        initialSlide={initialSlide}
        handleClose={() => {
          showGalleryModal(false)
        }}
      />
    </>
  )
}

export default NazekiVillaModal
