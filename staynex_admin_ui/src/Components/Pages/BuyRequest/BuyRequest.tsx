import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { SearchIcon } from "../../../Assets/Images/svgImgs/svgImgs";
import CommonHeading from "../../Common/CommonHeading/CommonHeading";
import CustomTable from "../../Common/Table/Index";
import "./BuyRequest.scss";
import CustomSelect from "../../Common/Select/Select";
import useDebounce from "../../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { callApiGetMethod } from "../../../Redux/Actions/api.action";
import { APIURL } from "../../../Utils";
import { CONTRACT_ADDRESS, PAGE_LIMIT } from "../../../Constant";
import CommonButton from "../../Common/CommonButton/CommonButton";
import Swal from "sweetalert2";
import AdminABI from "../../../Abi/AdminABI.json";
import { ethers } from "ethers";
import toaster from "../../Common/Toast";

const BuyRequest = () => {
  const dispatch: any = useDispatch();

  //States
  const [currentPage, setcurrentPage]: any = useState(1);
  const [passList, setpassList] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [search_Debounce, setSearch_Debounce] = useState("");
  const [selectOptions, setSelectOptions]: any = useState([]);
  const walletAddress = useSelector((state: any) => state?.user?.walletAddress);

  useDebounce(() => handleSearchDebounce(search), 1000, [search]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, AdminABI, signer);

  const handleSearchDebounce = (search: any) => {
    setSearch_Debounce(search);
    setcurrentPage(1);
  };

  useEffect(() => {
    //Get customerList function
    const retreiveCustomerList = async () => {
      if (search_Debounce.length >= 2 || search_Debounce.length === 0) {
        const result = await dispatch(
          callApiGetMethod(
            APIURL.PASS_BUY_REQUEST,
            {
              page: currentPage,
              limit: PAGE_LIMIT,
              search: search_Debounce.trim(),
            },
            true,
            false
          )
        );
        if (result?.statusCode === 200) {
          setpassList(result?.data);
          setCustomerCount(result?.count);
          setTotalPage(result?.totalPages);
        }
      }
    };

    retreiveCustomerList();
    // eslint-disable-next-line
  }, [currentPage, search_Debounce]);

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
  }, [totalPage]);

  const fields = [
    "Sr. No.",
    "Customer Name",
    "Totol available Nights",
    "Action",
  ];

  const handleAction = (item) => {
    if (walletAddress) {
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
          await contract.setBookingRED(
            item?.user?.userWallet?.walletAddress,
            Number(item?.tokenId),
            Number(item?.totalAvailableNights)
          );
        }
      });
    }else{
      toaster.error('Please connect wallet')
    }
  };

  return (
    <>
      <section className="members">
        <div className="members_topheader d-sm-flex justify-content-between">
          <CommonHeading
            heading="Buy Request"
            paragraph={
              <>
                There are a total of{" "}
                <span>{customerCount ? customerCount : ""}</span> buy requests
              </>
            }
          />
        </div>
        <div className="members_topform d-sm-flex align-items-center mb-4 pb-2">
          <div className="Common_search d-flex align-items-center">
            <SearchIcon />
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="members_section">
          <div className="pagination_select">
            {totalPage && totalPage > 1 ? (
              <>
                <CustomSelect
                  defaultValue={{ value: currentPage, label: currentPage }}
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
          <div className="members_table">
            <CustomTable fields={fields}>
              {passList &&
                passList.length > 0 &&
                passList.map((item: any, data: any) => (
                  <tr key={data}>
                    <td>{PAGE_LIMIT * (currentPage - 1) + (data + 1)}</td>
                    <td>{item?.user["name"] ? item?.user["name"] : ""}</td>
                    <td>
                      {item?.totalAvailableNights
                        ? item?.totalAvailableNights
                        : ""}
                    </td>
                    {/* <td>
                    <span className="text_orange">{item?.totalAvailableNights ? item?.totalAvailableNights : ""}</span>
                  </td> */}
                    <td>
                      <div className="tables_btn">
                        {item?.approval === "pending" ? (
                          <>
                            <CommonButton
                              title="Set Nights"
                              className="btncreate"
                              onClick={() => handleAction(item)}
                            />
                          </>
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
        </div>
      </section>
    </>
  );
};

export default BuyRequest;
