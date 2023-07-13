import { Box } from '@mui/material'
import HeaderViewer from '../AppComponents/./homecomponents/HeaderViewer'
import HeaderSearch from '../AppComponents/./homecomponents/HeaderSearch'
import HomeHotels from '../AppComponents/./homecomponents/HomeHotels'
import FavouiteDestination from '../AppComponents/./homecomponents/FavouiteDestination'
import Fitness from '../AppComponents/./homecomponents/Fitness'
import HomeEvents from '../AppComponents/homecomponents/HomeEvents'
import StayConnected from '../AppComponents/./homecomponents/StayConnected'
import Footer from '../components/Footer'
import Template from '../components/Template'

const Home = () => {
  return (
    <>
      <Template>
        <Box>
          <Box
            display="flex"
            sx={{ flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}
          >
            <Box flex={2.5} sx={{ background: '#EAE2DB' }}>
              <HeaderViewer />
            </Box>
            <Box flex={7.5} position="relative" height="100%">
              <img
                src="/Assets/headerimg.svg"
                alt="headerimg"
                style={{
                  minHeight: '100%',
                  minWidth: '100%',
                  maxWidth: '100%',
                }}
              />
              <HeaderSearch />
            </Box>
          </Box>
          <HomeHotels />
          <FavouiteDestination />
          <Fitness />
          <HomeEvents />
          <StayConnected />
          <Footer />
        </Box>
      </Template>
    </>
  )
}

export default Home
