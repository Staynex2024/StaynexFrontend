import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Col, Row, Modal, Button } from "react-bootstrap";
import ButtonCommon from "../CommonButton/CommonButton";
import "./index.scss";
import {
  connectmetamask,
  disconnectWallet,
} from "../../../Redux/Actions/user.action";
import { custmizeAddress } from "../../../Services/common.service";
import { useTranslation } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";
import { callApiGetMethod } from "../../../Redux/Actions/api.action";
import { APIURL } from "../../../Utils";

/**CONNECT WALLET MODAL */
const ConnectWallet = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: Dispatch<any> = useDispatch();

  /**DECLARE VARIABLES */
  const [show, setShow] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<any>({});

  /**GET STATES FROM STORE */
  const walletAddress = useSelector((state: any) => state?.user?.walletAddress);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(false);
  }, [walletAddress]);

  useEffect(() => {
    setConnectionStatus({});
  }, [show]);

  const { t } = useTranslation();

  const connectToWallet = async (wallet) => {
    setConnectionStatus({ wallet, status: "pending" });
    try {
      if (wallet === "MetaMasK") {
        setTimeout(() => {
          dispatch(connectmetamask());
          setConnectionStatus({ wallet, status: "account" });
        }, 2000);
      }
    } catch (error) {
      setConnectionStatus({ wallet, status: "error" });
    }
  };

  return (
    <div className="">
      <ButtonCommon
        className="WltBtn"
        title={
          walletAddress
            ? custmizeAddress(walletAddress)
            : t("header.connect_wallet_text")
        }
        onClick={() => {
          setShow(true);
        }}
      />
      <Modal
        scrollable={true}
        className="connect_wallet"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {walletAddress ? "Disconnect wallet" : "Connect to a wallet"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5 ">
          <Row>
            <Col className="connect_options">
              {walletAddress ? (
                ""
              ) : (
                <ul>
                  {connectionStatus?.wallet === "MetaMasK" && (
                    <li>
                      <div
                        className={`connect_options_details ${connectionStatus?.status === "error" ? "danger" : ""
                          }`}
                      >
                        {connectionStatus?.status === "pending" && (
                          <Spinner animation="border" />
                        )}
                        <p className="ms-2">
                          {connectionStatus?.status === "pending"
                            ? "Initializing..."
                            : connectionStatus?.status === "error"
                              ? "Error Connecting"
                              : ""}
                        </p>
                        {connectionStatus?.status === "error" && (
                          <ButtonCommon
                            onClick={() => connectToWallet("MetaMasK")}
                            title="Try Again"
                          />
                        )}
                      </div>
                    </li>
                  )}
                  <li>
                    <Button onClick={() => connectToWallet("MetaMasK")} variant='light' >
                      <span>
                        <img
                          src={
                            "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                          }
                          alt=""
                        />
                      </span>{" "}
                      
                      MetaMask{" "}
                      {/* {connectionStatus?.wallet === 'MetaMasK' && connectionStatus?.status === 'pending' ? <Spinner animation="border" variant="light" /> : ""} */}
                    </Button>
                  </li>
                </ul>
              )}
              <div className="add_new text-center">
                {walletAddress ? (
                  <ButtonCommon
                    className="btn-danger"
                    onClick={() => 
                      {dispatch(disconnectWallet());
                      dispatch(callApiGetMethod(APIURL.USER_LOGOUT, {}, false, false))}
                    }
                    title="Disconnect"
                  />
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConnectWallet;
