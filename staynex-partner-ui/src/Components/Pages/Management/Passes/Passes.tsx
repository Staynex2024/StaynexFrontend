import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { GreentickIcon } from "../../../../Assets/Images/svgImgs/svgImgs";
import Passes1 from "../../../../Assets/Images/Passes1.png";
// import Passes3 from '../../../../Assets/Images/Passes3.png'
// import Passes2 from '../../../../Assets/Images/Passes2.png'
// import Passes4 from '../../../../Assets/Images/Passes4.png'
import "./Passes.scss";
import CommonHeading from "../../../Common/CommonHeading/CommonHeading";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import {
  callApiGetMethod,
  callApiPostMethod,
} from "../../../../Redux/Actions/api.action";
import { APIURL } from "../../../../Utils";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import toaster from "../../../Common/Toast";
import passicon from "../../../../Assets/Images/Icons/home.svg";

import resortImage from "../../../../Assets/Images/resort.jpeg";

const Passes = () => {
  const dispatch: any = useDispatch();
  const [passAllData, setPassAllData] = useState<any>();
  const [isUnList, setIsUnlist] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    passAllList();
    // eslint-disable-next-line
  }, [isUnList]);

  const passAllList = async () => {
    const result: any = await dispatch(
      callApiGetMethod(APIURL.PASSES_LIST, {}, true, false)
    );
    setPassAllData(result?.data);
  };

  const handleAction = async (type: string, item: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsUnlist(false);
        let dataToSend = {
          list: type === "true" ? true : false,
          // User_id: data?.user?.id,
          passId: item?.id,
        };
        let result = await dispatch(
          callApiPostMethod(APIURL.LIST_DELIST_PASS, dataToSend, {}, false)
        );
        if (result?.statusCode === 201) {
          toaster.success(result?.message);
          setIsUnlist(true);
        } else if (result?.statusCode === 400) {
          toaster.error(result?.message);
          setIsUnlist(false);
        }
      }
    });
  };
  const handleUpdate = (id, approval) => {
    if (approval === "accepted") {
      navigate(`/auth/update-pass/` + id);
    }
  };

  const handleReSubmit = (id) => {
    navigate("/auth/resubmit-pass/" + id, { state: { resubmit: "resubmit" } });
  };


  return (
    <>
      <section className="passes">
        <div className="passes_topheader d-sm-flex justify-content-between">
          <CommonHeading heading="Passes" />
          <Link to="/auth/create-pass">
            {passAllData && passAllData?.length < 4  ? (
              <CommonButton title="Create New Pass" className="mt-3 mt-sm-0" />
            ) : null}
          </Link>
        </div>

        <Row>
          {passAllData?.length >= 0
            ? passAllData &&
              passAllData?.map((item: any, i: any) => (
                <Col xl={3} lg={6} md={6} className="d-flex">
                  <div className="passes_card w-100">
                    <div
                      className="passes_card_imageinfo"
                      onClick={() => handleUpdate(item.id, item.approval)}
                    >
                      {/* <img src={Passes1} alt="card_image" /> */}
                      <div className="custom_card_pass">
                        <div className="pass_number">
                          <h5>Staynex</h5>
                          <p>SP {item?.redeemable_nights}</p>
                        </div>
                        <div className="pass_content_icon">
                          <img src={passicon} alt="" />
                          <p>{item?.name}</p>
                        </div>
                      </div>
                      <h6>{item["total_copies"] - item["total_sold"]}</h6>
                    </div>
                    <div className="passes_card_textinfo">
                      <h5>SP{item?.redeemable_nights}</h5>
                      <p>{item?.redeemable_nights}-day express pass</p>
                      <ul className="textlist">
                        <li>
                          <label>Redeemable Nights</label>
                          <p>{item?.redeemable_nights} nights per year</p>
                        </li>
                        <li>
                          <label>Total Redeemable</label>
                          <p>{item?.redeemable_nights * 10} nights</p>
                        </li>
                      </ul>
                      <hr className="linespace" />
                      <div className="offierinfo">
                        <h4>Perks</h4>
                        {item?.perks?.map((index, i) => (
                          <p>{index}</p>
                        ))}
                      </div>
                      <h3>${item?.price}</h3>
                      <div className="listedbtn">
                        {item?.approval === "pending" ? (
                          <span className="pending_pass">Pending Approval</span>
                        ) : item?.approval === "accepted" &&
                          item?.listing_status === "unlisted" ? (
                          <>
                            <button
                              type="button"
                              className="active"
                              onClick={() => handleAction("true", item)}
                            >
                              LIST
                            </button>
                            <span>DELIST</span>
                          </>
                        ) : item?.approval === "accepted" &&
                          item?.listing_status === "listed" ? (
                          <>
                            <span className="listed_check">
                              Listed <GreentickIcon />
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAction("false", item)}
                            >
                              UNLIST
                            </button>
                          </>
                        ) : item?.approval === "accepted" &&
                          item?.listing_status === "delisted" ? (
                          <>
                            <button
                              type="button"
                              className="active"
                              onClick={() => handleAction("true", item)}
                            >
                              LIST
                            </button>
                            <span className="text-red delist_pass">
                              DELISTED
                            </span>
                          </>
                        ) : item?.approval === "rejected" ? (
                          <>
                            <div className="w-100">
                              <span
                                className="rejected_pass"
                                // onClick={() => handleReSubmit(item.id)}
                              >
                                Pass Request Rejected
                              </span>
                              <span
                                className="rejected_pass mt-3"
                                onClick={() => handleReSubmit(item.id)}
                              >
                                Resubmit
                              </span>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            : null}
        </Row>
      </section>
    </>
  );
};
export default Passes;
