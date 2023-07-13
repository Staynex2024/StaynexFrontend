import { Box, IconButton, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { eventlist } from "../../Constant";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const HomeEvents = () => {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  return (
    <Box sx={{ padding: {xs: '70px 0px 20px 10px', sm : '30px 0 30px 50px'} }}>
      <Typography variant="h5" fontWeight="700">
        Events and stuff
      </Typography>
      <Typography>
        Discover Switzerland’s best ski resorts and plan the perfect holiday
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        gap="10px"
        overflow="scroll"
        mt={6}
        ref={elementRef}
      >
        {eventlist.map((event) => (
          <Box width={281} mr={1} >
            <img src={event.src} alt="event" />
            <Typography fontWeight="500">{event.name}</Typography>
            <Typography fontSize="12px" fontWeight="500">
              {event.time}
            </Typography>
          </Box>
        ))}

        
      </Box>
      <Box>
          <IconButton
            disabled={arrowDisable}
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 10, 281, -10);
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 10, 281, 10);
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
    </Box>
  );
};

export default HomeEvents;
