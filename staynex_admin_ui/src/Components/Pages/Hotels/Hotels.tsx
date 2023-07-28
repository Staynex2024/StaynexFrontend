import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { loader } from '../../../Redux/Slices/loader.slice'
import { callApiPostMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'

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

  const listspno = [
    { sptitle: 'SP7' },
    { sptitle: 'SP14' },
    { sptitle: 'SP28' },
    { sptitle: 'SP32' },
  ]

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
          getPropertyList(currentPage, PAGE_LIMIT, seachedProperty_Debounce),
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

  const handleUnList = async (item: any) => {
    dispatch(loader(true))
    setIsUnlist(false)
    const vendorEmail: string = item?.user?.email
    let dataToSend = {
      email: vendorEmail,
    }
    // let result = await dispatch(UnListProperty(dataToSend))
    let result = await dispatch(
      callApiPostMethod(APIURL.UNLIST_PROPERTY, dataToSend, {}, false),
    )
    if (result.statusCode === 200) {
      toaster.success(result?.message)
      setIsUnlist(true)
      dispatch(loader(false))
    } else if (result.statusCode === 400) {
      toaster.error(result?.message)
      setIsUnlist(false)
      dispatch(loader(false))
    } else {
      setIsUnlist(false)
      dispatch(loader(false))
    }
  }

  //Seach function
  const handleSearchUser = async (event?: any) => {
    let value = event.target.value
    setSearchedProperty(value)
    setcurrentPage(1)
  }

  return (
    <>
      <section className="hotels">
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
          <Link to="/auth/hotels/new-property">
            <CommonButton title="Add New Property" className="mt-3 mt-sm-0" />
          </Link>
        </div>
        <div className="hotels_topform d-sm-flex align-items-center mb-4 pb-2">
          <div className="Common_search d-flex align-items-center">
            <SearchIcon />
            <Form.Control
              type="text"
              placeholder="Search by property name"
              onChange={(event: any) => handleSearchUser(event)}
            />
          </div>
          {/* <CustomSelect
                        className="hotels_Select ms-md-3"
                        options={options}
                    /> */}
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
                          LISTED <GreentickIcon />
                        </button>
                        <button onClick={() => handleUnList(item)}>
                          UNLIST
                        </button>
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
                            <h3>$4,300</h3>
                            <h4>{item?.name ? item?.name : ''}</h4>
                            <p>{item?.country ? item?.country : ''}</p>
                            <ul className="list_text">
                              {listspno.map((item, index) => (
                                <li key={index}>
                                  <span>{item.sptitle}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="resort_contact">
                              <div className="resort_number">
                                <label>Resort Contact</label>
                                <p>
                                  {item?.contact_number
                                    ? item?.contact_number
                                    : ''}
                                </p>
                              </div>
                              <p>
                                {item?.contact_email ? item?.contact_email : ''}
                              </p>
                            </div>
                          </div>
                          <div className="right_btnsec">
                            <CommonButton
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
                <span>No Data Found</span>
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
