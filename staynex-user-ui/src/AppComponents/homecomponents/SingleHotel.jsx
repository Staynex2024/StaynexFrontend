import { Box, Typography } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import ShowerIcon from "@mui/icons-material/Shower";
import { Link } from "react-router-dom";

const SingleHotel = ({ hotel }) => {
  return (
    <Link to={`/single_hotel/${hotel.id}`} className="link">
      <Box width="281px" mt={1} mr={1}>
        <img src={hotel.src} alt="hotelimg" />
        <Typography variant="h6" fontWeight="500">
          {hotel.name}
        </Typography>
        <Typography fontSize="14px" fontWeight="500">
          {hotel.location}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid lightgray"
          borderTop="1px solid lightgray"
          padding="10px 0"
        >
          <Box display="flex" alignItems="center" gap="5px">
            <HotelIcon fontSize="12px" />
            <Typography
              fontSize="12px"
              fontWeight="500"
            >{`${hotel.bedroom} Bedrooms`}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="5px">
            <ShowerIcon fontSize="12px" />
            <Typography
              fontSize="12px"
              fontWeight="500"
            >{`${hotel.bathroom} Bathrooms`}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="5px">
            <SquareFootIcon fontSize="12px" />
            <Typography
              fontSize="12px"
              fontWeight="500"
            >{`${hotel.sqft}sqft`}</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap="5px" mt={1.5}>
          <Typography fontWeight="500">From</Typography>
          <Typography
            fontWeight="700"
            variant="h6"
          >{`$${hotel.from}`}</Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default SingleHotel;
