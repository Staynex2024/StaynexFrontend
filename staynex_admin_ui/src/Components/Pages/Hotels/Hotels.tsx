import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GreentickIcon,
  SearchIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'
import './Hotels.scss'
import SliderImage from './Component/SliderImage'
import CommonButton from '../../Common/CommonButton/CommonButton'
import { Form } from 'react-bootstrap'
import Pagination from '../../Common/Pagination/Pagination'
import { useDispatch } from 'react-redux'
import { PAGE_LIMIT } from '../../../Constant'
import { getPropertyList } from '../../../Redux/Actions/user.action'
import SkeletonLoading from '../../Common/SkeletonLoading/SkeletonLoading'
import toaster from '../../Common/Toast'
import { useDebounce } from 'use-debounce'
import emptyImg from '../../../Assets/Images/blankimg.jpeg'
// import { loader } from '../../../Redux/Slices/loader.slice'
import { callApiPostMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import Swal from 'sweetalert2'
import CommonPropertyRequest from './CommonPropertyRequest'
// import CustomSelect from '../../Common/Select/Select'

const Hotels = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: any = useDispatch()

  const navigate = useNavigate()

  const arr: any = [1, 2, 3, 4, 5]

  // States
  const [currentPage, setcurrentPage]: any = useState(1)
  const [propertyList, setPropertyList] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [propertyCount, setPropertyCount] = useState(0)
  const [seachedProperty, setSearchedProperty] = useState('')
  const [skeletonLoader, setSkeletonLoader] = useState(false)
  const [isUnList, setIsUnlist] = useState(false)
  const [seachedProperty_Debounce] = useDebounce(seachedProperty, 1000)

  let Country = require('country-state-city').Country

  // Pagination
  const handlePageChange = (selectedObject: any) => {
    setcurrentPage(selectedObject.selected + 1)
  }

  useEffect(() => {
    setSkeletonLoader(true)
    //Get transferList function
    const retreivePropertyList = async () => {
      setTimeout(async () => {
        const result = await dispatch(
          getPropertyList(currentPage, PAGE_LIMIT, seachedProperty_Debounce.trim()),
        )
        setPropertyList(result?.data)
        setPropertyCount(result?.count)
        setTotalPage(result?.totalPages)
        setSkeletonLoader(false)
      }, 1000)
    }

    retreivePropertyList()
    // eslint-disable-next-line
  }, [currentPage, isUnList, seachedProperty_Debounce])

  const handleInfo = async (item: any) => {
    const vendorEmail: string = item?.user?.email
    navigate('/auth/hotel-details/' + vendorEmail)
  }

  // const handleUnList = async (item: any) => {
  //   dispatch(loader(true))
  //   setIsUnlist(false)
  //   const vendorEmail: string = item?.user?.email
  //   let dataToSend = {
  //     email: vendorEmail,
  //   }
  //   // let result = await dispatch(UnListProperty(dataToSend))
  //   let result = await dispatch(
  //     callApiPostMethod(APIURL.UNLIST_PROPERTY, dataToSend, {}, false),
  //   )
  //   if (result.statusCode === 200) {
  //     toaster.success(result?.message)
  //     setIsUnlist(true)
  //     dispatch(loader(false))
  //   } else if (result.statusCode === 400) {
  //     toaster.error(result?.message)
  //     setIsUnlist(false)
  //     dispatch(loader(false))
  //   } else {
  //     setIsUnlist(false)
  //     dispatch(loader(false))
  //   }
  // }

  //Seach function
  const handleSearchUser = async (event?: any) => {
    let value = event.target.value
    setSearchedProperty(value)
    setcurrentPage(1)
  }

  const handleAction = async (item: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsUnlist(false)
        const vendorEmail: string = item?.user?.email
        let dataToSend = {
          email: vendorEmail,
        }

        let result = await dispatch(
          callApiPostMethod(APIURL.UNLIST_PROPERTY, dataToSend, {}, false),
        )
        if (result?.statusCode === 200) {
          toaster.success(result?.message)
          setIsUnlist(true)
        } else if (result?.statusCode === 400) {
          toaster.error(result?.message)
          setIsUnlist(false)
        }
      }
    })
  }
  // const options = [
  //   { value: 'india', label: 'India' },
  //   { value: 'indonesia', label: 'Indonesia' },
  // ]

  let listOnly = (propertyList: any) => {
    return propertyList.map((d) => d.price)
  }

  const handlePassInfo = async (item: any, data: any) => {
    const Pass_id: string = data?.id
    const User_id: string = item?.user?.id
    const Property_id: string = item?.id
    navigate(
      '/auth/pass-details/?passId=' +
      Pass_id +
      '&userId=' +
      User_id +
      '&propertyId=' +
      Property_id,
    )
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [currentPage])

  return (
    <>
      <section className="hotels">
        <CommonPropertyRequest />
        <div className="hotels_topheader d-sm-flex justify-content-between">
          <CommonHeading
            heading="All Properties"
            paragraph={
              <>
                There is a total of{' '}
                <span>{propertyCount ? propertyCount : 0}</span> properties
              </>
            }
          />
          {/* <Link to="/auth/hotels/new-property">
            <CommonButton title="Add New Property" className="mt-3 mt-sm-0" />
          </Link> */}
        </div>
        <div className="hotels_topform d-sm-flex mb-4 pb-2">
          <div className="Common_search d-flex align-items-center">
            <SearchIcon />
            <Form.Control
              type="text"
              placeholder="Search by property name"
              onChange={(event: any) => handleSearchUser(event)}
            />
          </div>
          {/* <CustomSelect className="hotels_Select ms-md-3" options={options} placeholder={'select'} /> */}
        </div>
        <div className="hotels_section">
          {!skeletonLoader ? (
            <>
              {propertyList && propertyList.length ? (
                propertyList?.map((item: any, data: any) => {

                  return (
                    <div className="hotels_section_cards" key={data}>
                      <div className="top_headbtn">
                        <button className="active">
                          {/* <GreentickIcon /> */}
                          {item?.verification === 'accepted' ? (
                            <>
                              <span style={{ color: 'green' }}>
                                <GreentickIcon />
                                {item?.verification.toUpperCase()}
                              </span>
                            </>
                          ) : item?.verification === 'pending' ? (
                            <>
                              <span
                                className="fa fa-clock-o"
                                style={{ color: 'red' }}
                              >
                                &nbsp;{item?.verification.toUpperCase()}
                              </span>
                            </>
                          ) : (
                            <span
                              className="fa fa-times"
                              style={{ color: 'red' }}
                            >
                              &nbsp;{item?.verification.toUpperCase()}
                            </span>
                          )}
                        </button>

                        {item?.verification === 'delisted' ||
                          item?.verification === 'pending' ? null : (
                          <CommonButton
                            title="UNLIST"
                            className="dark-greenbtn"
                            onClick={() => handleAction(item)}
                          />
                        )}
                      </div>
                      <div className="main_containt">
                        {item?.images && item?.images.length ? (
                          <div className="main_containt_left">
                            <SliderImage img={item?.images} />
                          </div>
                        ) : (
                          <div className="main_containt_left">
                            {' '}
                            <span className="EmptyImg">
                              <img src={emptyImg} alt="no data" />
                            </span>
                          </div>
                        )}
                        <div className="main_containt_right">
                          <div className="right_textsec">
                            <h3>
                              {item?.passes.length > 0
                                ? `$ ${Math.min.apply(
                                  Math,
                                  listOnly(item?.passes),
                                )}`
                                : ''}
                            </h3>
                            <h4>{item?.name ? item?.name : ''}</h4>
                            <p>
                              {item?.location?.country
                                ? Country.getCountryByCode(
                                  item?.location?.country,
                                )['name']
                                : ''}
                            </p>
                            <ul className="list_text">
                              {item?.passes &&
                                item?.passes.length > 0 &&
                                item?.passes.map((data: any, index: number) => (
                                  <li key={index}>
                                    <span
                                      onClick={() => handlePassInfo(item, data)}
                                    >
                                      {data?.redeemable_nights
                                        ? `SP${data?.redeemable_nights}`
                                        : '---'}
                                    </span>
                                  </li>
                                ))}
                            </ul>
                            <div className="resort_contact">
                              <div className="resort_number">
                                <label>Resort Contact</label>
                                <p>
                                  {item?.user?.mobile_number
                                    ? item?.user?.mobile_number
                                    : ''}
                                </p>
                              </div>
                              <p>
                                {item?.user?.email ? item?.user?.email : ''}
                              </p>
                            </div>
                          </div>
                          <div className="right_btnsec">
                            <CommonButton
                              className="w-100"
                              title="See Details"
                              onClick={() => handleInfo(item)}
                            />
                            {/* <Link to='/auth/hotel-details'>See Details</Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="empty_msg text-center">
                  <svg
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.3 18.0551C28.0667 18.0551 28.7083 17.7884 29.225 17.2551C29.7417 16.7217 30 16.0884 30 15.3551C30 14.5884 29.7417 13.9467 29.225 13.4301C28.7083 12.9134 28.0667 12.6551 27.3 12.6551C26.5667 12.6551 25.9333 12.9134 25.4 13.4301C24.8667 13.9467 24.6 14.5884 24.6 15.3551C24.6 16.0884 24.8667 16.7217 25.4 17.2551C25.9333 17.7884 26.5667 18.0551 27.3 18.0551ZM12.7 18.0551C13.4667 18.0551 14.1083 17.7884 14.625 17.2551C15.1417 16.7217 15.4 16.0884 15.4 15.3551C15.4 14.5884 15.1417 13.9467 14.625 13.4301C14.1083 12.9134 13.4667 12.6551 12.7 12.6551C11.9667 12.6551 11.3333 12.9134 10.8 13.4301C10.2667 13.9467 10 14.5884 10 15.3551C10 16.0884 10.2667 16.7217 10.8 17.2551C11.3333 17.7884 11.9667 18.0551 12.7 18.0551ZM20 23.8551C17.7667 23.8551 15.7417 24.4801 13.925 25.7301C12.1083 26.9801 10.7667 28.6384 9.9 30.7051H12.55C13.2833 29.3051 14.3167 28.2217 15.65 27.4551C16.9833 26.6884 18.45 26.3051 20.05 26.3051C21.6167 26.3051 23.0583 26.6967 24.375 27.4801C25.6917 28.2634 26.7333 29.3384 27.5 30.7051H30.1C29.2667 28.6051 27.9333 26.9384 26.1 25.7051C24.2667 24.4717 22.2333 23.8551 20 23.8551V23.8551ZM20 40.7051C17.2333 40.7051 14.6333 40.1801 12.2 39.1301C9.76667 38.0801 7.65 36.6551 5.85 34.8551C4.05 33.0551 2.625 30.9384 1.575 28.5051C0.525 26.0717 0 23.4717 0 20.7051C0 17.9384 0.525 15.3384 1.575 12.9051C2.625 10.4717 4.05 8.35508 5.85 6.55508C7.65 4.75508 9.76667 3.33008 12.2 2.28008C14.6333 1.23008 17.2333 0.705078 20 0.705078C22.7667 0.705078 25.3667 1.23008 27.8 2.28008C30.2333 3.33008 32.35 4.75508 34.15 6.55508C35.95 8.35508 37.375 10.4717 38.425 12.9051C39.475 15.3384 40 17.9384 40 20.7051C40 23.4717 39.475 26.0717 38.425 28.5051C37.375 30.9384 35.95 33.0551 34.15 34.8551C32.35 36.6551 30.2333 38.0801 27.8 39.1301C25.3667 40.1801 22.7667 40.7051 20 40.7051ZM20 37.7051C24.7333 37.7051 28.75 36.0551 32.05 32.7551C35.35 29.4551 37 25.4384 37 20.7051C37 15.9717 35.35 11.9551 32.05 8.65508C28.75 5.35508 24.7333 3.70508 20 3.70508C15.2667 3.70508 11.25 5.35508 7.95 8.65508C4.65 11.9551 3 15.9717 3 20.7051C3 25.4384 4.65 29.4551 7.95 32.7551C11.25 36.0551 15.2667 37.7051 20 37.7051Z"
                      fill="black"
                    />
                  </svg>
                  <h2>No Data Found</h2>
                </div>
              )}
            </>
          ) : (
            <div>
              <SkeletonLoading field={arr} />
            </div>
          )}
        </div>
      </section>
      <div className="text-center text-md-end mt-5">
        {propertyList &&
          propertyList.length &&
          propertyCount > PAGE_LIMIT &&
          !skeletonLoader ? (
          <>
            <Pagination
              totalPage={totalPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Hotels
