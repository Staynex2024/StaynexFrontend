import { Box, Button, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import HotelIcon from '@mui/icons-material/Hotel'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { useState } from 'react'
import SearchModal from './SearchModal'
import { useNavigate } from 'react-router-dom'

const HeaderSearch = () => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="absolute"
      gap="10px"
      sx={{
        background: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        bottom: { xs: '-50px', sm: '25px' },
        left: '25px',
        width: { xs: '90%', md: '60%' },
        border: '1px solid lightgray',
      }}
    >
      <Box width="100%">
        <Box width="100%">
          <input placeholder="Search anywhere" className="searchinput" />
        </Box>
        <Box display="flex" alignItems="center" gap="20px" mt={1}>
          <div className="searchfiltericon" onClick={() => setOpenModal(true)}>
            <HomeIcon sx={{ fontSize: '14px' }} />
            <Typography fontSize="10px">Villas</Typography>
          </div>

          <div className="searchfiltericon" onClick={() => setOpenModal(true)}>
            <HotelIcon sx={{ fontSize: '14px' }} />
            <Typography fontSize="10px">Villas</Typography>
          </div>

          <div className="searchfiltericon" onClick={() => setOpenModal(true)}>
            <SquareFootIcon sx={{ fontSize: '14px' }} />
            <Typography fontSize="10px">Villas</Typography>
          </div>

          <div className="searchfiltericon" onClick={() => setOpenModal(true)}>
            <LocalOfferIcon sx={{ fontSize: '14px' }} />
            <Typography fontSize="10px">Villas</Typography>
          </div>

          <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
        </Box>
      </Box>

      <Box>
        {/* <Button
          color="orange"
          variant="contained"
          sx={{ color: '#fff', padding: '15px 0' }}
          onClick={() => navigate('/search_result')}
        >
          {' '}
          <SearchIcon sx={{ fontSize: '30px' }} />{' '}
        </Button> */}
      </Box>
    </Box>
  )
}

export default HeaderSearch
