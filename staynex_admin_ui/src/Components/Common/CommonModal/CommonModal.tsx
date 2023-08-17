import React, { ReactNode } from "react";
import { Modal } from "react-bootstrap";
// import closeIcon from "../../../Assets/Images/Cancel.svg";
import './CommonModal.scss'

interface CommonModals {
  show?: boolean;
  handleClose?: () => void;
  heading?: ReactNode;
  className?: string;
  variant?: "small" | "large";
  children?: ReactNode;
  backdropClassName?: string;
  backdrop?: any;
}
const CommonModal = (props: CommonModals) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        centered
        backdropClassName={props.backdropClassName}
        className={`${props.className} ${props.variant} commonModal`}
        backdrop={props?.backdrop}
      >
        {props.heading && (
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>{props.heading}</h3>
            </Modal.Title>
          </Modal.Header>
        )}
        <button onClick={props.handleClose} className="modal_close_btn">
          {/* <CrossIcon /> */}
          {/* <img src={closeIcon} alt="icon" /> */}
        </button>
        <Modal.Body>{props?.children}</Modal.Body>
      </Modal>
    </>
  );
};

export default CommonModal;
