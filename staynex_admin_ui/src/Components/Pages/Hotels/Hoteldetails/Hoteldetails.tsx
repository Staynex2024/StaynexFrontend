import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loader } from '../../../../Redux/Slices/loader.slice'
import CommonHeading from '../../../Common/CommonHeading/CommonHeading'
import Propertydetail from './Component/Propertydetail'
import './Hoteldetails.scss'
import Account from './Component/Account'
import Stats from './Component/Stats'
import PropertyPass from './Component/PropertyPass'
import { callApiGetMethod, callApiPostMethod } from '../../../../Redux/Actions/api.action'
import { APIURL } from '../../../../Utils'
import toaster from '../../../Common/Toast'
import Swal from 'sweetalert2'

const Hoteldetails = () => {
  const dispatch: any = useDispatch()
  const navigate: any = useNavigate()

  const { id } = useParams()
  const [data, setData]: any = useState([])
  const [key, setKey] = useState("propertydetail")
  // const [isUnList, setIsUnlist] = useState(false)
  const [isApproveReject, setIsApproveReject] = useState(false)

  useEffect(() => {
    dispatch(loader(true))
    const handleHotelDetails = async () => {
      let result = await dispatch(callApiGetMethod(
        APIURL.SEE_DETAILS,
        { email: id },
        true,
        false,
      ),
      )
      if (result) {
        setData(result?.data)
      } else {
        navigate(-1)
      }
    }

    if (key !== "") {
      setData([])
      handleHotelDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, key, isApproveReject])

  // const handleAction = async (type: string, item: any) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'info',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, Confirm!',
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       setIsUnlist(false)
  //       let dataToSend = {
  //         list: type === "true" ? true : false,
  //         User_id: data?.user?.id,
  //         Pass_id: item?.id,
  //         Property_id: data?.id
  //       }
  //       let result = await dispatch(
  //         callApiPostMethod(APIURL.LIST_DELIST_PASS, dataToSend, {}, false),
  //       )
  //       if (result?.statusCode === 201) {
  //         toaster.success(result?.message)
  //         setIsUnlist(true)
  //       } else if (result?.statusCode === 400) {
  //         toaster.error(result?.message)
  //         setIsUnlist(false)
  //       }
  //     }
  //   })
  // }


  const handleApproveReject = async (type: string, item: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Accepted!',
    }).then(async (result) => {
      if (result.isConfirmed && type === 'accepted') {
        setIsApproveReject(false)
        const result = await dispatch(
          callApiPostMethod(
            APIURL.ACTION_PARTNER_PROPERTY,
            { email: item?.user?.email, action: type, message: '' },
            {},
            true,
          ),
        )
        if (result?.statusCode === 200) {
          setIsApproveReject(true)
        } else if (result?.statusCode === 400) {
          setIsApproveReject(false)
        }
      } else if (result.isConfirmed && type === 'rejected') {
        Swal.fire({
          title: "Rejecting Request Of Property!",
          text: "Reason for Rejecting",
          icon: 'warning',
          input: 'text',
          showCancelButton: true
        }).then(async (result) => {
          if (result.value) {
            const res = await dispatch(
              callApiPostMethod(
                APIURL.ACTION_PARTNER_PROPERTY,
                { email: item?.user?.email, action: type, message: result.value },
                {},
                true,
              ),
            )
            if (res?.statusCode === 200) {
              setIsApproveReject(true)
            } else if (res?.statusCode === 400) {
              setIsApproveReject(false)
            }
          } else {
            toaster.error("Please mention reason before rejecting")
          }
        });
      }
    })
  }

  return (
    <>
      <section className="hotel_details">
        <CommonHeading heading="Property information" />
        <div className="hotel_details_section mt-4">
          <Tabs
            defaultActiveKey="propertydetail"
            id="uncontrolled-tab-example"
            className="tabs_section"
            onSelect={(e: any) => setKey(e)}
          >
            <Tab eventKey="propertydetail" title="Property Detail">
              <Propertydetail data={data} handleAction= {handleApproveReject} />
            </Tab>
            <Tab eventKey="passes" title="Passes">
              <PropertyPass data={data} />
            </Tab>
            <Tab eventKey="account" title="Account">
              <Account data={data} />
            </Tab>
            <Tab eventKey="stats" title="Stats">
              <Stats />
            </Tab>
          </Tabs>
        </div>
      </section>
    </>
  )
}

export default Hoteldetails
