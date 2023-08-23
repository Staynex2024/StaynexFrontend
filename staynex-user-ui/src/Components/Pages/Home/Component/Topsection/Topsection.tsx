import { useState } from "react";
import "./Topsection.scss";
import Slider from "react-slick";
import swap1 from "../../../../../Assets/Images/swap1.png";
import swap2 from "../../../../../Assets/Images/swap2.png";
import swap3 from "../../../../../Assets/Images/swap3.png";
import {
  BedroomIcon,
  NightshelterIcon,
  SearchwhiteIcon,
  SellIcon,
  SquareareaIcon,
} from "../../../../../Assets/Images/svgImgs/svgImgs";
import LocationPicker from "../../../../Common/LocationPicker/LocationPicker";
import { useNavigate } from "react-router-dom";

const Topsection = () => {
  const [selectedLatLong, setSelectedLatLong] = useState<any>({});
  const navigate: any = useNavigate();
  const swaping = [
    { slideimage: swap1 },
    { slideimage: swap2 },
    { slideimage: swap3 },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleGetAllPropertyList = async () => {
    if (selectedLatLong.lat && selectedLatLong.lon) {
      navigate("/listing", { state: { selectedLatLong } });
    }
  };
  console.log(selectedLatLong, "this is selected Lat Long");
  return (
    <>
      <section className="top_section">
        <Slider {...settings}>
          {swaping.map((data, i) => (
            <div key={i} className="swip">
              <div className="swip_textsec">
                <h3>Ski the Swiss Alps this winter</h3>
                <p>
                  Discover Switzerland’s best ski resorts and plan the perfect
                  holiday
                </p>
              </div>
              <div className="swip_imagesec">
                <img src={data.slideimage} alt="sideimage" />
              </div>
            </div>
          ))}
        </Slider>
        <div className="bar_space">
          <div className="searchbar">
            <div className="search_fields">
              <LocationPicker
                setSelectedLatLong={setSelectedLatLong}
                placeholder={"Search anywhere"}
              />
              <ul className="listinghotel">
                <li>
                  <NightshelterIcon /> Villas
                </li>
                <li>
                  <BedroomIcon /> 2 bedrooms
                </li>
                <li>
                  <SquareareaIcon /> {">900sqft"}
                </li>
                <li>
                  <SellIcon /> {">$3,500"}
                </li>
              </ul>
            </div>
            <button onClick={handleGetAllPropertyList}>
              <SearchwhiteIcon />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Topsection;
