import React, { useEffect, useState } from "react";
import { Col, Form, Nav, Row, Tab } from "react-bootstrap";
import CommonHeading from "../../../Common/CommonHeading/CommonHeading";
import "./Approvals.scss";
import { SearchIcon } from "../../../../Assets/Images/svgImgs/svgImgs";
import CustomTable from "../../../Common/Table/Index";
import CommonButton from "../../../Common/CommonButton/CommonButton";
// import Checkbox from '../../../Common/FormInputs/Checkbox';
import CustomSelect from "../../../Common/Select/Select";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_LIMIT } from "../../../../Constant";
import useCopyClipboard from "../../../../hooks/useCopyToClipboard";
import moment from "moment";
import toaster from "../../../Common/Toast";
import useDebounce from "../../../../hooks/useDebounce";
import {
  callApiGetMethod,
  callApiPostMethod,
} from "../../../../Redux/Actions/api.action";
import { APIURL } from "../../../../Utils";
import Swal from "sweetalert2";
import { callContractSendMethod } from "../../../../Redux/Actions/contract.action";
import { CONTRACT_ADDRESS } from "../../../../Constant";

const Approvals = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: any = useDispatch();
  const walletAddress = useSelector((state: any) => state?.user?.walletAddress);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [searchParams, setSearchParams] = useSearchParams();
  const [key, setKey]: any = useState(
    query.get("tab") ? query.get("tab") : "vendor_request"
  );

  //States
  const [currentPage, setcurrentPage]: any = useState(1);
  const [partnerList, setPartnerList] = useState([]);
  const [partnerPropertyList, setPartnerPropertyList] = useState([]);
  const [partnerCount, setPartnerCount] = useState(0);
  const [partnerPropertyListCount, setPartnerPropertyListCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [checkStatus, setCheckStatus] = useState(false);
  const [search_Debounce, setSearch_Debounce] = useState("");
  const [selectOptions, setSelectOptions]: any = useState([]);
  const [passRequestList, setPassRequestList] = useState([]);
  const [passRequestListCount, setPassRequestListCount] = useState(0);

  const navigate = useNavigate();

  useDebounce(() => handleSearchDebounce(search), 1000, [search]);

  const handleSearchDebounce = (search: any) => {
    setSearch_Debounce(search);
    setcurrentPage(1);
  };

  useEffect(() => {
    setSearchParams({ tab: key });
    // eslint-disable-next-line
  }, [query, key]);

  const dataToSend = [{ CONTRACT_ADDRESS }, "300"];

  const fields = [
    "Sr. No.",
    "Account Name",
    "Email Id",
    "Created At (UTC)",
    "Invite Code",
    "Actions",
  ];
  const propertyFields = [
    "Sr. No.",
    "Property Name",
    "Account Name",
    "Created At (UTC)",
    "Actions",
  ];

  const passfield = [
    "Sr. No.",
    "Property Name",
    "Account Name",
    "Pass type",
    "Created At (UTC)",
    "Actions",
  ];

  useEffect(() => {
    setCheckStatus(false);
    //Get partnerReqestList function
    const retreivePartnerRequestList = async () => {
      if (search_Debounce.length >= 2 || search_Debounce.length === 0) {
        const result = await dispatch(
          callApiGetMethod(
            APIURL.PARTNER_REQUEST_LIST,
            {
              page: currentPage,
              limit: PAGE_LIMIT,
              search: search_Debounce.trim(),
            },
            true,
            false
          )
        );
        setPartnerList(result?.data?.data);
        setPartnerCount(result?.data?.count);
        setTotalPage(result?.data?.totalPages);
      }
    };

    // get partnerPropertyList function
    const retreivePartnerPropertyList = async () => {
      if (search_Debounce.length >= 2 || search_Debounce.length === 0) {
        const result = await dispatch(
          callApiGetMethod(
            APIURL.PARTNER_PROPERTY_REQUEST_LIST,
            {
              page: currentPage,
              limit: PAGE_LIMIT,
              search: search_Debounce.trim(),
            },
            true,
            false
          )
        );
        setPartnerPropertyList(result?.data);
        setPartnerPropertyListCount(result?.count);
        setTotalPage(result?.totalPages);
      }
    };

    // get passesRequestList function
    const retreivePassesRequestList = async () => {
      if (search_Debounce.length >= 2 || search_Debounce.length === 0) {
        const result = await dispatch(
          callApiGetMethod(
            APIURL.PASSES_REQUEST_LIST,
            {
              page: currentPage,
              limit: PAGE_LIMIT,
              search: search_Debounce.trim(),
            },
            true,
            false
          )
        );
        setPassRequestList(result?.data?.data);
        setPassRequestListCount(result?.data?.count);
        setTotalPage(result?.data?.totalPages);
      }
    };

    if (
      (search_Debounce.length >= 2 || search_Debounce.length === 0) &&
      key === "vendor_request"
    ) {
      setPartnerList([]);
      retreivePartnerRequestList();
    } else if (
      (search_Debounce.length >= 2 || search_Debounce.length === 0) &&
      key === "properties"
    ) {
      setPartnerPropertyList([]);
      retreivePartnerPropertyList();
    } else if (
      (search_Debounce.length >= 2 || search_Debounce.length === 0) &&
      key === "passes"
    ) {
      setPassRequestList([]);
      retreivePassesRequestList();
    }
    // eslint-disable-next-line
  }, [currentPage, search_Debounce, key, checkStatus]);

  //copy string to clipboard with below code
  const [setCopied] = useCopyClipboard();
  const copy = (data: any, message?: string) => {
    setCopied(data);
    if (message) toaster.success(message);
  };

  // const handlePassActionOnChain = async () => {
  //   await dispatch(
  //     callContractSendMethod(
  //       "transferERC20Tokens",
  //       dataToSend,
  //       walletAddress,
  //       "function"
  //     )
  //   );
  // };
  // handle action function to accept and reject request
  const handleAction = async (type: string, item: any) => {
    if (key === "vendor_request") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accepted!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await dispatch(
            callApiPostMethod(
              APIURL.ACTION_PARTNER_REQUEST,
              { email: item?.email_id, action: type },
              {},
              true
            )
          );
          if (result?.statusCode === 200) {
            setCheckStatus(true);
          } else if (result?.statusCode === 400) {
            setCheckStatus(true);
          }
        }
        // else if (result.isConfirmed && type === 'rejected') {
        //     Swal.fire({
        //         title: "An input!",
        //         text: "Reason for Rejecting",
        //         input: 'text',
        //         showCancelButton: true
        //     }).then(async (result) => {
        //         if (result.value) {
        //             const res = await dispatch(
        //                 callApiPostMethod(
        //                     APIURL.ACTION_PARTNER_REQUEST,
        //                     { email: item?.email_id, action: type },
        //                     {},
        //                     true,
        //                 ),
        //             )
        //             if (res?.statusCode === 200) {
        //                 setCheckStatus(true)
        //             } else if (res?.statusCode === 400) {
        //                 setCheckStatus(true)
        //             }
        //         } else {
        //             toaster.error("Please mention reason before rejecting")
        //         }
        //     });
        // }
      });
    } else if (key === "properties") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accepted!",
      }).then(async (result) => {
        if (result.isConfirmed && type === "accepted") {
          const result = await dispatch(
            callApiPostMethod(
              APIURL.ACTION_PARTNER_PROPERTY,
              { email: item?.user?.email, action: type, message: "" },
              {},
              true
            )
          );
          if (result?.statusCode === 200) {
            setCheckStatus(true);
          } else if (result?.statusCode === 400) {
            setCheckStatus(true);
          }
        } else if (result.isConfirmed && type === "rejected") {
          Swal.fire({
            title: "Rejecting Request Of Property!",
            text: "Reason for Rejecting",
            icon: "warning",
            input: "text",
            showCancelButton: true,
          }).then(async (result) => {
            if (result.value) {
              const res = await dispatch(
                callApiPostMethod(
                  APIURL.ACTION_PARTNER_PROPERTY,
                  {
                    email: item?.user?.email,
                    action: type,
                    message: result.value,
                  },
                  {},
                  true
                )
              );
              if (res?.statusCode === 200) {
                setCheckStatus(true);
              } else if (res?.statusCode === 400) {
                setCheckStatus(true);
              }
            } else {
              toaster.error("Please mention reason before rejecting");
            }
          });
        }
      });
    } else if (key === "passes") {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Accepted!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const result = await dispatch(
              callApiPostMethod(
                APIURL.ACTION_ON_PASS,
                {
                  User_id: item?.property?.user?.id,
                  Pass_id: item?.id,
                  Property_id: item?.property?.id,
                  action: type,
                  message: "",
                },
                {},
                true
              )
            );
            if (result?.statusCode === 200 || result?.statusCode === 201) {
              setCheckStatus(true);
            } else if (result?.statusCode === 400) {
              setCheckStatus(true);
            }
          }
          // else if (result.isConfirmed && type === 'rejected') {
          //   Swal.fire({
          //     title: 'Rejecting Request Of Pass!',
          //     text: 'Reason for Rejecting',
          //     icon: 'warning',
          //     input: 'text',
          //     showCancelButton: true,
          //   }).then(async (result) => {
          //     if (result.value) {
          //       const res = await dispatch(
          //         callApiPostMethod(
          //           APIURL.ACTION_ON_PASS,
          //           {
          //             User_id: item?.property?.user?.id,
          //             Pass_id: item?.id,
          //             Property_id: item?.property?.id,
          //             action: type,
          //             message: result.value,
          //           },
          //           {},
          //           true,
          //         ),
          //       )
          //       if (res?.statusCode === 200) {
          //         setCheckStatus(true)
          //       } else if (res?.statusCode === 400) {
          //         setCheckStatus(true)
          //       }
          //     } else {
          //       toaster.error('Please mention reason before rejecting')
          //     }
          //   })
          // }
        });
    }
  };

  // pagination flow
  const iterateAndSetArray = (value: any) => {
    const array: any = [];
    for (let i = 1; i <= value; i++) {
      const object: any = {
        label: `${i}`,
        value: i,
      };
      array.push(object);
    }
    return array;
  };

  useEffect(() => {
    const filteredOptions = iterateAndSetArray(totalPage);
    setSelectOptions(filteredOptions);
    setcurrentPage(1);
  }, [totalPage, key]);

  const propertyInfo = async (item: any) => {
    const vendorEmail: string = item?.user?.email;
    navigate("/auth/hotel-details/" + vendorEmail);
  };

  const handlePassInfo = async (item: any) => {
    const Pass_id: string = item?.id;
    const User_id: string = item?.property?.user?.id;
    const Property_id: string = item?.property?.id;
    navigate(
      "/auth/pass-details/?passId=" +
        Pass_id +
        "&userId=" +
        User_id +
        "&propertyId=" +
        Property_id
    );
  };

  return (
    <>
      <section className="approval">
        <div className="approval_topheader d-sm-flex justify-content-between">
          <CommonHeading
            heading="Approvals"
            paragraph={
              <>
                There are a total of{" "}
                <span>
                  {key === "vendor_request"
                    ? `${partnerCount} vendor request`
                    : key === "properties"
                    ? `${partnerPropertyListCount} properties request`
                    : key === "passes"
                    ? `${passRequestListCount} passes request`
                    : ""}
                </span>{" "}
                that need your approval
              </>
            }
          />
        </div>
        <div className="approval_topform d-sm-flex align-items-center mb-4 pb-2">
          <div className="Common_search d-flex align-items-center">
            <SearchIcon />
            <Form.Control
              type="text"
              placeholder={
                key === "vendor_request"
                  ? "Search by Name, Email Id"
                  : key === "properties"
                  ? "Search by Name"
                  : "Search by Name"
              }
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="approval_section">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey={
              searchParams.get("tab") === "vendor_request"
                ? "vendor_request"
                : searchParams.get("tab") === "properties"
                ? "properties"
                : searchParams.get("tab") === "passes"
                ? "passes"
                : "vendor_request"
            }
            onSelect={(e: any) => setKey(e)}
          >
            <Row className="mt-5">
              <Col xs={12}>
                <div className="tabs_select">
                  <Nav variant="pills" className="Border_Tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="vendor_request">
                        Vendor Request{" "}
                        {partnerCount ? `( ${partnerCount} )` : ""}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="properties">
                        Properties{" "}
                        {partnerPropertyListCount
                          ? `( ${partnerPropertyListCount} )`
                          : ""}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="passes">
                        Passes{" "}
                        {passRequestListCount
                          ? `( ${passRequestListCount} )`
                          : ""}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="pagination_select">
                    {totalPage && totalPage > 1 ? (
                      <>
                        <CustomSelect
                          // defaultValue={currentPage}
                          defaultValue={{
                            value: currentPage,
                            label: currentPage,
                          }}
                          classgroup="select_pagi"
                          label="Page"
                          options={selectOptions}
                          onChange={(selectedValue: any) =>
                            setcurrentPage(selectedValue?.value)
                          }
                          value={currentPage && { label: currentPage }}
                        />
                        <label>of {totalPage}</label>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <Tab.Content className="mt-4 pt-3">
              <Tab.Pane eventKey="vendor_request">
                <div className="approval_table">
                  <CustomTable fields={fields}>
                    {partnerList &&
                      partnerList.length &&
                      partnerList.map((item: any, key: any) => (
                        <tr key={key}>
                          {/* <td>
                                                    <Checkbox
                                                        id='pool'
                                                        name='pool'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.pool}
                                                    />
                                                </td> */}
                          <td>{PAGE_LIMIT * (currentPage - 1) + (key + 1)}</td>
                          <td>
                            {item?.invited_name
                              ? item?.invited_name?.charAt(0).toUpperCase() +
                                item?.invited_name?.slice(1).toLowerCase()
                              : "---"}{" "}
                          </td>
                          <td>{item?.email_id ? item?.email_id : "---"}</td>
                          <td>
                            {item?.createdAt
                              ? moment(item?.createdAt)
                                  .utc()
                                  .format("dddd, MMMM D, YYYY, hh:mm:ss A")
                              : "---"}
                          </td>
                          <td>
                            {item?.invite_code ? item?.invite_code : "---"}
                            {item?.invite_code ? (
                              <i
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "8px",
                                  color: "black",
                                }}
                                title="copy"
                                className="fa fa-clone"
                                onClick={() =>
                                  copy(item?.invite_code, "Invite code copied")
                                }
                              ></i>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            <div className="tables_btn">
                              {item?.invitation_status === "pending" ? (
                                <>
                                  <CommonButton
                                    title="Reject"
                                    className="dark-greenbtn"
                                    onClick={() =>
                                      handleAction("rejected", item)
                                    }
                                  />
                                  <CommonButton
                                    title="Approve"
                                    className="btncreate"
                                    onClick={() =>
                                      handleAction("accepted", item)
                                    }
                                  />
                                </>
                              ) : item?.invitation_status === "rejected" ? (
                                <span
                                  className="fa fa-close"
                                  style={{
                                    marginLeft: "8px",
                                    color: "red",
                                  }}
                                >
                                  Rejected
                                </span>
                              ) : (
                                <span
                                  className="fa fa-check"
                                  style={{
                                    marginLeft: "8px",
                                    color: "green",
                                  }}
                                >
                                  Accepted
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </CustomTable>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="properties">
                <div className="approval_table">
                  <CustomTable fields={propertyFields}>
                    {partnerPropertyList &&
                      partnerPropertyList.length &&
                      partnerPropertyList.map((item: any, key: any) => (
                        <tr key={key}>
                          {/* <td>
                                                        <Checkbox
                                                        id='pool'
                                                        name='pool'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.pool}
                                                    />
                                                    </td> */}
                          <td>{PAGE_LIMIT * (currentPage - 1) + (key + 1)}</td>
                          <td>
                            {item?.name
                              ? item?.name?.charAt(0).toUpperCase() +
                                item?.name?.slice(1).toLowerCase()
                              : "---"}
                          </td>
                          <td>
                            {item?.user?.name
                              ? item?.user?.name?.charAt(0).toUpperCase() +
                                item?.user?.name?.slice(1).toLowerCase()
                              : "---"}
                          </td>
                          <td>
                            {item?.createdAt
                              ? moment(item?.createdAt)
                                  .utc()
                                  .format("dddd, MMMM D, YYYY, hh:mm:ss A")
                              : "---"}
                          </td>
                          <td>
                            <div className="tables_btn">
                              <CommonButton
                                title="View"
                                className="border-black-btn"
                                onClick={() => propertyInfo(item)}
                              />

                              {item?.verification === "pending" ? (
                                <>
                                  <CommonButton
                                    title="Reject"
                                    className="dark-greenbtn"
                                    onClick={() =>
                                      handleAction("rejected", item)
                                    }
                                  />
                                  <CommonButton
                                    title="Approve"
                                    className="btncreate"
                                    onClick={() =>
                                      handleAction("accepted", item)
                                    }
                                  />
                                </>
                              ) : item?.verification === "rejected" ? (
                                <span
                                  className="fa fa-close"
                                  style={{
                                    marginLeft: "8px",
                                    color: "red",
                                  }}
                                >
                                  Rejected
                                </span>
                              ) : (
                                <span
                                  className="fa fa-check"
                                  style={{
                                    marginLeft: "8px",
                                    color: "green",
                                  }}
                                >
                                  Accepted
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </CustomTable>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="passes">
                <div className="approval_table">
                  <CustomTable fields={passfield}>
                    {passRequestList &&
                      passRequestList.length &&
                      passRequestList.map((item: any, key: number) => (
                        <tr key={key}>
                          <td>{PAGE_LIMIT * (currentPage - 1) + (key + 1)}</td>
                          <td>
                            {item?.property?.name
                              ? item?.property?.name?.charAt(0).toUpperCase() +
                                item?.property?.name?.slice(1).toLowerCase()
                              : "---"}
                          </td>
                          <td>
                            {item?.property?.user?.name
                              ? item?.property?.user?.name
                                  ?.charAt(0)
                                  .toUpperCase() +
                                item?.property?.user?.name
                                  ?.slice(1)
                                  .toLowerCase()
                              : "---"}
                          </td>
                          <td>
                            {item?.redeemable_nights
                              ? `SP${item?.redeemable_nights}`
                              : "---"}
                          </td>
                          <td>
                            {item?.createdAt
                              ? moment(item?.createdAt)
                                  .utc()
                                  .format("dddd, MMMM D, YYYY, hh:mm:ss A")
                              : "---"}
                          </td>
                          <td>
                            <div className="tables_btn">
                              <CommonButton
                                title="View"
                                className="border-black-btn"
                                onClick={() => handlePassInfo(item)}
                              />

                              {item?.approval === "pending" ? (
                                <>
                                  <CommonButton
                                    title="Reject"
                                    className="dark-greenbtn"
                                    onClick={() =>
                                      handleAction("rejected", item)
                                    }
                                  />
                                  <CommonButton
                                    title="Approve"
                                    className="btncreate"
                                    onClick={() =>
                                      handleAction("accepted", item)
                                    }
                                  />
                                </>
                              ) : item?.approval === "rejected" ? (
                                <span
                                  className="fa fa-close"
                                  style={{
                                    marginLeft: "8px",
                                    color: "red",
                                  }}
                                >
                                  Rejected
                                </span>
                              ) : (
                                <span
                                  className="fa fa-check"
                                  style={{
                                    marginLeft: "8px",
                                    color: "green",
                                  }}
                                >
                                  Accepted
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </CustomTable>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>
    </>
  );
};

export default Approvals;
