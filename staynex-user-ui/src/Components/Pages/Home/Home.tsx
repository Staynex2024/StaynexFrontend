import React, { useEffect, useState } from 'react'
import './Home.scss'
import Destinations from './Component/Destinations/Destinations'
import Arsenalnft from './Component/Arsenalnft/Arsenalnft'
import Eventandstuff from './Component/Eventandstuff/Eventandstuff'
import FavoriteDestinations from './Component/FavoriteDestinations/FavoriteDestinations'
import Topsection from './Component/Topsection/Topsection'
import { callApiGetMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import { useDispatch } from 'react-redux'

const Home = () => {
  const dispatch: any = useDispatch()

  return (
    <>
      <div className="Home_page">
        <Topsection />
        <Destinations />
        <FavoriteDestinations />
        <Arsenalnft />
        <Eventandstuff />
      </div>
    </>
  )
}

export default Home
