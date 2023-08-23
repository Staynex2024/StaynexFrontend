import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import InputCustom from "../Inputs/InputCustom";
import CustomSelect from "../Select/Select";

interface Location {
  position: {
    lat: number;
    lon: number;
  };
  poi?: {
    name: string;
  };
  address?: {
    freeformAddress: string;
  };
}

const LocationPicker = (props:any) => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);
//   const [dropdownOptions, setDropdownOptions] = useState<any>([]);

  const API_KEY: string = "tiu4xTdPRBK1Y2CpiABKXH57inAhSMIZ";

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/search/${searchQuery}.json?key=${API_KEY}`
      );
      if (response.ok) {
        const data: { results: Location[] } = await response.json();
        setSearchResults(data.results);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setSearchQuery(props.formik.values.address);
    handleSearch();
  }, [props.formik.values.address])
  

//   useEffect(() => {
//     latLong();
//   }, [searchResults]);

//   const latLong = () => {
//     let mod = searchResults?.map((d: any) => {
//       d = {
//         label: d.poi && d.poi.name ? d.poi.name : d.address?.freeformAddress,
//         value: d.position,
//       };
//       return d;
//     });
//     // setDropdownOptions(mod || []);
//   };

  const handleListClick = (name: any, latLong: any) => {
    setSearchQuery(name);
    setSearchResults([]);
    props?.setSelectedLatLong(latLong);
  };
  return (
    <div className="address_selectbox">
      <InputCustom
       label="Address"
       className="mb-44"
       placeholder="Enter Address"
       id="address"
       name="address"
       type="text"
       maxLength={50}
       canGiveSpace={true}
       onChange={props.formik.handleChange}
       autoFocus={true}
       value={searchQuery? searchQuery : props.formik.values.address}
       error={
        props.formik.errors.address && props.formik.touched.address ? (
           <span>{props.formik.errors.address}</span>
         ) : null
       }


        // value={searchQuery}
        // onChange={(e) => {
        //   setSearchQuery(e.target.value);
        //   handleSearch();
        // }}
      />

     <ul>
        {searchResults.map((location) => (
          <li
            key={location.position.lat}
            onClick={() =>
              handleListClick(
                location.poi && location.poi.name
                  ? location.poi.name
                  : location.address?.freeformAddress,
                location?.position
              )
            }
          >
            {" "}
            {location.poi && location.poi.name
              ? location.poi.name
              : location.address?.freeformAddress}
          </li>
        ))}
      </ul>

      {/* <CustomSelect classgroup="select_pagi" label="Page" options={dropdownOptions} /> */}
    </div>
  );
};

export default LocationPicker;
