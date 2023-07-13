import { Box, Pagination, Stack, Typography } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import ShowerIcon from "@mui/icons-material/Shower";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LaptopIcon from "@mui/icons-material/Laptop";
import PoolIcon from "@mui/icons-material/Pool";
import PetsIcon from "@mui/icons-material/Pets";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import WifiIcon from "@mui/icons-material/Wifi";
import { searchResultHotel } from "../../constant/searchconstants";
import { Link } from "react-router-dom";

const ComponentSection = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box
        display="flex"
        alignItems="start"
        flexDirection="column"
        gap="20px"
        width="100%"
      >
        {searchResultHotel.map((single) => (
          <Link to={`/single_hotel/${single.id}`} className="link" >
          <Box
            display="flex"
            alignItems="center"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
            width="100%"
            gap="20px"
            border="1px solid lightgray"
            borderRadius="5px"
          >
            <img src={single.img} alt="Hotel" />
            <Box width="100%" p={2}>
              <Typography variant="h5" fontWeight="700">
                {single.name}
              </Typography>
              <Typography sx={{ color: "lightgray" }}>
                {single.location}
              </Typography>
              <Typography mt={1} mb={1} fontWeight="700">
                {single.from}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                borderTop="1px solid lightgray"
                pt={1}
              >
                <Box display="flex" alignItems="center" gap="5px">
                  <HotelIcon fontSize="18px" />
                  <Typography fontSize="12px" fontWeight="500">
                    {single.bedrooms}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="5px">
                  <ShowerIcon fontSize="18px" />
                  <Typography fontSize="12px" fontWeight="500">
                    {single.bathroom}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="5px">
                  <NightsStayIcon fontSize="18px" />
                  <Typography fontSize="12px" fontWeight="500">
                    {single.nights}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="5px">
                  <SquareFootIcon fontSize="18px" />
                  <Typography fontSize="12px" fontWeight="500">
                    {single.sqft}
                  </Typography>
                </Box>
              </Box>

              <Typography mt={2} fontSize="14px" fontWeight="700">
                DESCRIPTION
              </Typography>
              <Typography fontSize="12px" sx={{ color: "lightgray" }}>
                {single.decription}
              </Typography>

              <Typography mt={2} fontSize="14px" fontWeight="700">
                AMENITIES
              </Typography>
              <Box display="flex" alignItems="center" gap="10px" mt={1}>
                <AcUnitIcon fontSize="24px" />
                <LaptopIcon fontSize="24px" />
                <PoolIcon fontSize="24px" />
                <PetsIcon fontSize="24px" />
                <PersonalVideoIcon fontSize="24px" />
                <KitchenIcon fontSize="24px" />
                <LocalLaundryServiceIcon fontSize="24px" />
                <WifiIcon fontSize="24px" />
              </Box>
            </Box>
          </Box>
          </Link>
        ))}
      </Box>
      <Stack spacing={2} mt={2} mb={4} >
        <Pagination count={10} color="orange" />
      </Stack>
    </Box>
  );
};

export default ComponentSection;
