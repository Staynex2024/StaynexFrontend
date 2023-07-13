import React from "react";
import { Col, Row } from "react-bootstrap";
import ButtonCommon from "../Button/ButtonCustom";
import CommonModal from "../CommonModal/CommonModal";
import tick from "../../../Assets/animations/tick.json";
import error from "../../../Assets/animations/error.json";
import loading from "../../../Assets/animations/loading.json";
import Lottie from "react-lottie";
import { EXPLORAR_LINK } from "../../../Constant";

const CommonTrnxModal = ({ show, handleClose, trnxStatus, trnxfunction }) => {
  const viewTransactiononExplorer = (e) => {
    e.preventDefault();
    window.open(`${EXPLORAR_LINK}/tx/${trnxStatus?.txHash}`);
  };
  return (
    <CommonModal
      heading={trnxStatus?.heading}
      className="transaction_modal"
      show={show}
      handleClose={handleClose}
      backdropClassName="transaction_modal_bckdrop"
      backdrop="static"
    >
      <div
        className={`lottie_animation ${
          trnxStatus?.status === "success" ? "tick_animation" : ""
        }`}
      >
        <Lottie
          options={{
            loop:
              trnxStatus?.status === "success"
                ? false
                : trnxStatus?.status === "error"
                ? false
                : true,
            animationData:
              trnxStatus?.status === "success"
                ? tick
                : trnxStatus?.status === "error"
                ? error
                : loading,
            autoplay: true,
          }}
        />
      </div>
      <p className="transaction_text">{trnxStatus?.bodyText}</p>
      {trnxStatus?.txHash ? <div className="url_box"></div> : null}
      {trnxStatus?.status === "success" || trnxStatus?.status === "error" ? (
        <div className="transaction_action_btn">
          <Row>
            <Col sm={6}>
              <ButtonCommon
                fluid
                onClick={() => handleClose()}
                title="Close"
                className="danger"
              />
            </Col>
            {trnxStatus?.status === "error" ? (
              <Col sm={6}>
                <ButtonCommon
                  fluid
                  title="Retry"
                  onClick={(e: any) => trnxfunction(e)}
                />
              </Col>
            ) : trnxStatus?.status === "success" && trnxStatus?.txHash ? (
              <Col sm={6}>
                <ButtonCommon
                  fluid
                  title="View Transaction"
                  onClick={(e) => viewTransactiononExplorer(e)}
                />
              </Col>
            ) : null}
          </Row>
        </div>
      ) : null}
    </CommonModal>
  );
};

export default CommonTrnxModal;
