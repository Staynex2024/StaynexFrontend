import React, { useEffect, useState } from "react";
import { TOM_TOM_API_KEY } from "../../../Constant";
const TomtomLocation = (props: any) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([{}]);

  const handleSearch: any = async () => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/search/${searchQuery}.json?key=${TOM_TOM_API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    latLong();
  }, [searchResults]);

  const latLong = () => {
    let mod = searchResults.map((d: any) => {
      d = {
        label: d.poi && d.poi.name ? d.poi.name : d.address.freeformAddress,
        value: d.position,
      };
      return d;
    });
    setDropdownOptions(mod);
  };
  const handleListClick = (name, latLong) => {
    setSearchQuery(name);
    setSearchResults([]);
    props?.setSelectedLatLong(latLong);
  };

  return (
    <div className="location_Search">
      <input
        type="text"
        className="form-control"
        placeholder={props?.placeholder}
        value={searchQuery}
        onChange={(e: any) => handleSearch() && setSearchQuery(e.target.value)}
      />
      {/* <button onClick={handleSearch}>Search</button> */}

      <ul>
        {searchResults.map((location: any) => (
          <li
            // key={location.position.lat}
            onClick={() =>
              handleListClick(
                location.poi && location.poi.name
                  ? location.poi.name
                  : location.address?.freeformAddress,
                location.position
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
    </div>
  );
};

export default TomtomLocation;
