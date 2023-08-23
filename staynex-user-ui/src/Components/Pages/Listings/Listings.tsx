import React, { useEffect, useState } from "react";
import "./Listings.scss";
import "../Home/Component/Topsection/Topsection.scss";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import CommonHeading from "../../Common/CommonHeading/CommonHeading";
import Checkbox from "../../Common/FormInputs/Checkbox";
import InputCustom from "../../Common/Inputs/InputCustom";
import {
  CrosscircleIcon,
  FilterIcon,
  FilterToggleIcon,
} from "../../../Assets/Images/svgImgs/svgImgs";
import ListingCard from "../../Common/ListingCard/ListingCard";
import CommonButton from "../../Common/CommonButton/CommonButton";
import RangeSlider from "../../Common/RangeSlider/RangeSlider";
import { useDispatch } from "react-redux";
import { callApiGetMethod } from "../../../Redux/Actions/api.action";
import { APIURL } from "../../../Utils";
import { PAGE_LIMIT } from "../../../Constant";
import Pagination from "../../Common/Pagination/Pagination";
import useDebounce from "../../../hooks/useDebounce";
import { useLocation } from "react-router-dom";
import TomtomLocation from "../../Common/LocationPicker/LocationPicker";

const Listings = () => {
  const dispatch: any = useDispatch();
  const { state } = useLocation();

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  // const [propertyList, setPropertyList]: any = useState([])
  // const [currentPage, setcurrentPage]: any = useState(1)
  // const [totalPage, setTotalPage] = useState(0)
  // const [propertyCount, setPropertyCount] = useState(0)
  // const [isActive, setActive] = useState(false)
  // const [loader, setLoader] = useState(false)
  // const [search, setSearch]: any = React.useState({
  //   rooms: 0,
  //   unitSize: 0,
  //   numberOfNight: 0,
  // })
  // const [search_Debounce, setSearch_Debounce] = useState({
  //   rooms: 0,
  //   unitSize: 0,
  //   numberOfNight: 0,
  // })
  // const [minValue, set_minValue] = useState(0)
  // const [maxValue, set_maxValue] = useState(100)
  // const [search_DebounceMinMax, setSearch_DebounceMinMax] = useState({
  //   minPrice: 0,
  //   maxPrice: 0,
  // })

  const [propertyList, setPropertyList]: any = useState([]);
  const [selectedLatLong, setSelectedLatLong] = useState<any>({});
  const [currentPage, setcurrentPage]: any = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);
  const [isActive, setActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [search, setSearch]: any = React.useState({
    rooms: 0,
    unitSize: 0,
    numberOfNight: 0,
  });
  const [search_Debounce, setSearch_Debounce] = useState({
    rooms: 0,
    unitSize: 0,
    numberOfNight: 0,
  });
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(100);
  const [search_DebounceMinMax, setSearch_DebounceMinMax] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [selectedPropertyType, setSelectedPropertyType]: any = useState([]);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const fliterlist = [
    { name: "Our top picks" },
    { name: "Most popular" },
    { name: "Price (lowest first)" },
  ];

  useEffect(() => {
    setLoader(true);
    //Get propertyList function
    const retreivePropertyList = async () => {
      let dataToSend: any = {
        page: currentPage,
        limit: PAGE_LIMIT,
      };
      if (search_DebounceMinMax?.minPrice > 0) {
        dataToSend.min = search_DebounceMinMax.minPrice;
      }
      if (search_DebounceMinMax?.maxPrice > 0) {
        dataToSend.max = search_DebounceMinMax.maxPrice;
      }
      if (search_Debounce?.numberOfNight > 0) {
        dataToSend.nights = search_Debounce.numberOfNight;
      }
      if (search_Debounce?.rooms > 0) {
        dataToSend.rooms = search_Debounce.rooms;
      }
      if (selectedPropertyType?.length) {
        dataToSend.propertyType = selectedPropertyType.join(",");
      }
      if (query.get("country") !== null) {
        dataToSend.country = query.get("country");
      }
      if (query.get("state") !== null) {
        dataToSend.state = query.get("state");
      }
      if (selectedLatLong?.lat) {
        dataToSend.latitude = selectedLatLong?.lat;
      }
      if (selectedLatLong?.lon) {  
        dataToSend.longitude = selectedLatLong?.lon;
      }
      const result = await dispatch(
        callApiGetMethod(APIURL.GET_PROPERTY_LIST, dataToSend, true, false)
      );
      setPropertyList(result?.data);
      setTotalPage(result?.totalPages);
      setPropertyCount(result?.count);
      setLoader(false);
    };
      retreivePropertyList();
    
  }, [
    dispatch,
    currentPage,
    search_DebounceMinMax.minPrice,
    search_DebounceMinMax.maxPrice,
    search_Debounce.numberOfNight,
    search_Debounce.rooms,
    selectedPropertyType,
    query,
    state,
    selectedLatLong,
  ]);

  useEffect(() => {
    setSelectedLatLong(state?.selectedLatLong);
    window.scroll(0, 0);
  }, []);

  // Pagination
  const handlePageChange = (selectedObject: any) => {
    setcurrentPage(selectedObject.selected + 1);
  };

  const propertyType = [
    {
      label: "Resorts",
      value: "resort",
    },
    {
      label: "Hotels",
      value: "hotel",
    },
    {
      label: "Villas & mansions",
      value: "villa",
    },
    {
      label: "Boutique hotels",
      value: "boutique",
    },
  ];

  const handlePropertyType = (e: any) => {
    const id = e.target.id;

    if (e.target.checked) {
      setSelectedPropertyType([...selectedPropertyType, id]);
    } else {
      let latestMemberList = selectedPropertyType.filter((f: any) => f !== id);
      setSelectedPropertyType(latestMemberList);
    }
  };

  useDebounce(() => handleSearchDebounce(search.rooms), 1000, [search.rooms]);
  useDebounce(() => handleSearchDebounceUnitSize(search.unitSize), 1000, [
    search.unitSize,
  ]);
  useDebounce(
    () => handleSearchDebounceNumberOfNight(search.numberOfNight),
    1000,
    [search.numberOfNight]
  );

  const handleSearchDebounce = (room: any) => {
    setSearch_Debounce({ ...search_Debounce, rooms: room });
  };
  const handleSearchDebounceUnitSize = (unitSize: any) => {
    setSearch_Debounce({ ...search_Debounce, unitSize: unitSize });
  };
  const handleSearchDebounceNumberOfNight = (numberOfNight: any) => {
    setSearch_Debounce({ ...search_Debounce, numberOfNight: numberOfNight });
  };

  // range slider
  const handleInput = (e: any) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useDebounce(() => handleDebounceMinPrice(minValue), 1000, [minValue]);
  useDebounce(() => handleDebounceMaxPrice(maxValue), 1000, [maxValue]);

  const handleDebounceMinPrice = (minValue: any) => {
    setSearch_DebounceMinMax({ ...search_DebounceMinMax, minPrice: minValue });
  };

  const handleDebounceMaxPrice = (maxValue: any) => {
    setSearch_DebounceMinMax({ ...search_DebounceMinMax, maxPrice: maxValue })
  }

  return (
    <>
      <div className="Listings">
        <section className="Listings_Banner">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} md={7}>
                <CommonHeading
                  className="text_size mb-0"
                  heading="Showing results for ‘Bali, Indonesia’"
                  paragraph="Over 500 properties"
                />
              </Col>
              <Col xs={12} md={5}>
                <div className="customInput">
                  <TomtomLocation
                    setSelectedLatLong={setSelectedLatLong}
                    placeholder={"Search"}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section
          className={
            isActive ? "Listings_Filter openFilter" : "Listings_Filter"
          }
        >
          <Container>
            <div className="Listings_Filter_Btns d-flex align-items-center justify-content-between justify-content-xl-end mb-5">
              <span
                className="filter_toggle d-block d-xl-none"
                onClick={toggleClass}
              >
                <FilterToggleIcon />
              </span>
              <Dropdown className="filter_Dropdown">
                <Dropdown.Toggle
                  className="filter_btn"
                  variant=""
                  id="dropdown-basic"
                >
                  Sort by: Our top picks <FilterIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {fliterlist.map((data, i) => {
                    return (
                      <Dropdown.Item key={i} href="#">
                        <span>{data.name}</span>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Row className="gx-5">
              <Col xs={12} xl={3}>
                <div className="listing_filter_box">
                  <div className="Flietr_mobile_header d-block d-xl-none text-center">
                    <span onClick={toggleClass} className="Close_filter_btn">
                      <CrosscircleIcon />
                    </span>
                    <h5>Filters</h5>
                  </div>
                  <div className="listing_filter_centerbox">
                    <h5>Your search</h5>
                    <h2>Bali, Indonesia</h2>
                    <h4>33 accomadations</h4>

                    <div className="listing_filter_box_Inner">
                      <h5>Price range</h5>
                      <RangeSlider
                        data={(e) => handleInput(e)}
                        minValue={minValue}
                        maxValue={maxValue}
                      />
                    </div>
                    <div className="listing_filter_box_Inner">
                      <h5>Property type</h5>
                      {propertyType &&
                        propertyType.map((item, index) => (
                          <Checkbox
                            label={item?.label}
                            name="select"
                            id={item.value}
                            onChange={handlePropertyType}
                          />
                        ))}
                    </div>
                    <div className="listing_filter_box_Inner">
                      <h5>No of rooms</h5>
                      <InputCustom
                        type="number"
                        placeholder="2 Bedrooms"
                        name=""
                        onWheel={(e: any) => e.target.blur()}
                        onChange={(event: any) =>
                          setSearch({ ...search, rooms: event.target.value })
                        }
                      />
                    </div>
                    <div className="listing_filter_box_Inner">
                      <h5>Unit size</h5>
                      <InputCustom
                        type="number"
                        placeholder=">2,500 sqft"
                        name=""
                        onWheel={(e: any) => e.target.blur()}
                        onChange={(event: any) =>
                          setSearch({ ...search, unitSize: event.target.value })
                        }
                      />
                    </div>
                    <div className="listing_filter_box_Inner">
                      <h5>Number of nights</h5>
                      <InputCustom
                        type="number"
                        placeholder="30"
                        name=""
                        onWheel={(e: any) => e.target.blur()}
                        onChange={(event: any) =>
                          setSearch({
                            ...search,
                            numberOfNight: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="Flietr_mobile_footer d-flex justify-content-between align-items-center d-xl-none">
                    <h5>Clear all</h5>
                    <CommonButton title="Show properties" />
                  </div>
                </div>
              </Col>
              <Col xs={12} xl={9} className="">
                <ListingCard data={propertyList} />
                {propertyList &&
                propertyList.length &&
                propertyCount > PAGE_LIMIT &&
                !loader ? (
                  <Pagination
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    className="mt-5 justify-content-center"
                  />
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Listings;
