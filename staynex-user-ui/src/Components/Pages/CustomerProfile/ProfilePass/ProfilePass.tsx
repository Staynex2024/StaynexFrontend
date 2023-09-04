import "./ProfilePass.scss";
import { Col, Container, Nav, ProgressBar, Row, Tab } from "react-bootstrap";
import userimg from "../../../../Assets/Images/image1.jpg";
import walletIcon from "../../../../Assets/Images/Icons/wallet.svg";
// import CommonButton from "../../../Common/CommonButton/CommonButton";
import YourPassesCard from "./YourPassesCard/YourPassesCard";
import RedeemHistoryCard from "./RedeemHistoryCard/RedeemHistoryCard";
import MyAccountCard from "./MyAccountCard/MyAccountCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callApiGetMethod } from "../../../../Redux/Actions/api.action";
import { APIURL } from "../../../../Utils";
import { custmizeAddress } from "../../../../Services/common.service"

const ProfilePass = () => {
  const dispatch: any = useDispatch()
  const address = useSelector((state: any) => state?.user?.walletAddress);

  const [customerData, setCustomerData] = useState({})
  const [key, setKey] = useState("passes")

  useEffect(() => {
    const handleCustomerDetails = async () => {
      const result = await dispatch(callApiGetMethod(APIURL.CUSTOMER_DETAILS, { walletAddress: address }, true, false))
      // console.log('result>>>>', result)
      setCustomerData(result?.data)
    }

    if (address !== '') {
      handleCustomerDetails()
    }

  }, [address, key])
  return (
    <>
      <div className="Profile_Pass">
        <div className="Booking_Detail_Explorer">
          <Container>
            {customerData && Object.keys(customerData).length > 0 &&
              <Row className="align-items-center">
                <Col xs={12} lg={6}>
                  <div className="Booking_Detail_Explorer_user d-flex align-items-center">
                    <img className="expuser_img" src={customerData['imageUrl']} alt="img" />
                    <div className="ms-3">
                      <h4>{customerData?.['user']['name'] ? customerData?.['user']['name'] : ""}</h4>
                      {customerData['walletAddress'] ?
                        <p>
                          <img src={walletIcon} alt="icon" /> {custmizeAddress(customerData['walletAddress'])}
                        </p> : ""}
                    </div>
                  </div>
                </Col>
                <Col xs={12} lg={6}>
                  <div className="Booking_Detail_Explorer_Progress">
                    <div className="d-flex justify-content-between">
                      <h2 className="text-org">Explorer</h2>
                      <p className="Exp_days">
                        180/<span className="Exp_no">365</span>{" "}
                        <span className="Exp_grey">Nights</span>
                      </p>
                    </div>
                    <ProgressBar now={60} />
                    <p className="text-end">NEXT tier: GLOBETROTTER</p>
                  </div>
                </Col>
              </Row>}
          </Container>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="passes" onSelect={(e: any) => setKey(e)}>
          <div className="Profile_Pass_tabs">
            <Container>
              <Nav variant="pills" className="Border_Tabs">
                <Nav.Item>
                  <Nav.Link eventKey="passes">Staynex Passes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="history">Redeem History</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="account">My Account</Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </div>
          <Container>
            <Tab.Content className="Profile_Pass_tabsContent">
              <Tab.Pane eventKey="passes">
                <YourPassesCard customerData={customerData} />
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <RedeemHistoryCard />
              </Tab.Pane>
              <Tab.Pane eventKey="account">
                <MyAccountCard customerData={customerData} />
              </Tab.Pane>
            </Tab.Content>
          </Container>
        </Tab.Container>
      </div>
    </>
  );
};

export default ProfilePass;
