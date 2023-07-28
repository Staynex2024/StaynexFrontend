import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { seeDetails } from '../../../../Redux/Actions/user.action'
import { loader } from '../../../../Redux/Slices/loader.slice'
import CommonHeading from '../../../Common/CommonHeading/CommonHeading'
import Propertydetail from './Component/Propertydetail'
import './Hoteldetails.scss'

const Hoteldetails = () => {
  const dispatch: any = useDispatch()
  const { id } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(loader(true))
    const handleHotelDetails = async () => {
      let result = await dispatch(seeDetails(id))
      setData(result?.data)
      dispatch(loader(false))
    }
    handleHotelDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id])

  return (
    <>
      <section className="hotel_details">
        <CommonHeading heading="Property information" />
        <div className="hotel_details_section">
          <Tabs
            defaultActiveKey="propertydetail"
            id="uncontrolled-tab-example"
            className="tabs_section"
          >
            <Tab eventKey="propertydetail" title="Property Detail">
              <Propertydetail data={data} />
            </Tab>
          </Tabs>
        </div>
      </section>
    </>
  )
}

export default Hoteldetails
