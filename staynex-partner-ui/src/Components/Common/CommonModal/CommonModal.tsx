import React, { ReactNode } from "react";
import { Modal } from "react-bootstrap";
import closeIcon from "../../../Assets/Images/Icons/close.png";

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
          <Modal.Header>
            <Modal.Title>
              <h4>{props.heading}</h4>
            </Modal.Title>
            <button onClick={props.handleClose} className="modal_close_btn">
              {/* <CrossIcon /> */}
              <img src={closeIcon} alt="" />
            </button>
          </Modal.Header>
        )}
        <Modal.Body>{props?.children}</Modal.Body>
      </Modal>
    </>
  );
};

export default CommonModal;
