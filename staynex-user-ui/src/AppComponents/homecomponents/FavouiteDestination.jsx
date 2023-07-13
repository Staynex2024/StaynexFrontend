import { Box, Typography } from '@mui/material'
import React from 'react'
import { favoritelist } from '../../Constant'

const FavouiteDestination = () => {
  return (
    <Box sx={{display: {xs: 'none', md: 'flex'}}} flexDirection="column" mb={10} >
        <Box display="flex" flexDirection="column" alignItems="center" mt={20} >
            <Typography variant='h5' fontWeight="700" >Favorite Destinations</Typography>
            <Typography>Discover Switzerland’s best ski resorts and plan the perfect holiday</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" >
            {favoritelist.map((fav) => (
                <div className='favimg' >
                    <img src={fav.src} alt='favimg'/>
                    <Typography fontSize="14px" fontWeight="500" >{fav.name}</Typography>
                </div>
            ))}
        </Box>
    </Box>
  )
}

export default FavouiteDestination;