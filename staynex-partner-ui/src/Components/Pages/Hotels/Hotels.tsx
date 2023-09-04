import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GreentickIcon } from '../../../Assets/Images/svgImgs/svgImgs'
import SliderImage from '../Booking/Component/SliderImage'
import CommonButton from '../../Common/CommonButton/CommonButton'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { callApiGetMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import { propertyDetails } from '../../../Redux/Slices/user.slice'
import './Hotels.scss'

const Hotels = () => {
  const dispatch: any = useDispatch()
  const navigate: any = useNavigate()
  const [vendorProperty, setVendorProperty] = useState<any>({})

  const listspno = [
    { sptitle: 'SP7' },
    { sptitle: 'SP14' },
    { sptitle: 'SP28' },
    { sptitle: 'SP32' },
  ]
  const options = [
    { value: 'india', label: 'India' },
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
    { value: 'russia', label: 'Russia' },
    { value: 'australia', label: 'Australia' },
  ]

  useEffect(() => {
    //Get vendorProperty function
    const retreiveVendorProperty = async () => {
      const result = await dispatch(
        callApiGetMethod(APIURL.VENDOR_DETAILS, {}, true, false),
      )
      if (result?.statusCode === 200) {
        setVendorProperty(result?.data)
        dispatch(propertyDetails(result?.data))
      }
    }

    retreiveVendorProperty()
    // eslint-disable-next-line
  }, [])

  const handleViewPage = () => {
    if (vendorProperty?.property?.[0]?.property_status === 'pending') {
      navigate('/auth/new-property', { state: vendorProperty })
    } else {
      navigate('/auth/update-property', { state: vendorProperty })
    }
  }
  let listOnly = (propertyList: any) => {
    return propertyList.map((d: any, i: any) => d.price)
  }

  return (
    < >
      <div className="black_bg_style">
        <section className="hotels">
          {vendorProperty?.property?.[0]?.verification === 'pending' ? (
            <p className="yellow_bg_box mb-3">

              Approval pending. Until the approval process is complete, you will
              not be able to create any passes. Once your request is approved,
              you will receive further instructions on pass creation.
            </p>
          ) : null}
          {vendorProperty?.property &&
            Object.keys(vendorProperty?.property).length ? (
            vendorProperty?.property?.map((details: any, i: any) => {

              return (
                <>
                  <div key={i} className="hotels_section" >
                    <div className="hotels_section_cards">
                      <div className="top_headbtn">
                        <button className="active">
                          {details?.verification === 'accepted' ? (
                            <>
                              <span style={{ color: 'green' }}>
                                <GreentickIcon />
                                {details?.verification.toUpperCase()}
                              </span>
                            </>
                          ) : details?.verification === 'pending' ? (
                            <>
                              <span
                                className="fa fa-clock-o"
                                style={{ color: 'red' }}
                              >
                                &nbsp;{details?.verification.toUpperCase()}
                              </span>
                            </>
                          ) : (
                            <span
                              className="fa fa-times"
                              style={{ color: 'red' }}
                            >
                              &nbsp;{details?.verification.toUpperCase()}
                            </span>
                          )}
                        </button>
                      </div>
                      <div className="main_containt">
                        <div className="main_containt_left">
                          <SliderImage img={details?.images} />
                        </div>
                        <div className="main_containt_right">
                          <div className="right_textsec">
                            <h3>
                              {' '}
                              {vendorProperty?.property?.[0]?.passes.length > 0
                                ? `$ ${Math.min.apply(
                                  Math,
                                  listOnly(
                                    vendorProperty?.property?.[0]?.passes,
                                  ),
                                )}`
                                : ''}
                            </h3>
                            <h4>{details?.name}</h4>
                            <p>{details?.location?.address}</p>
                            <ul className="list_text">
                              {vendorProperty?.property?.[0]?.passes.map(
                                (item: any, i: any) => (
                                  <li key={i}>
                                    <span>{item.name}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                            <div className="resort_contact mt-3">
                              <div className="resort_number">
                                <label>Resort Contact</label>
                                <p>
                                  {
                                    vendorProperty?.property?.[0]?.location
                                      ?.contact_number
                                  }
                                </p>
                              </div>
                              <p>{vendorProperty?.email}</p>
                            </div>
                          </div>
                          <div className="right_btnsec">
                            {
                              <CommonButton
                                className="grey-btn w-100"
                                onClick={() => handleViewPage()}
                                title={
                                  vendorProperty?.property[0]
                                    ?.property_status === 'pending'
                                    ? 'Add property'
                                    : vendorProperty?.property[0]
                                      ?.property_status === 'drafted'
                                      ? 'Continue'
                                      : vendorProperty?.property[0]
                                        ?.property_status === 'saved'
                                        ? 'View page'
                                        : ''
                                }
                              />
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          ) : (
            <>
              <div className="text-end">
                <Link to="/auth/new-property">
                  <CommonButton title="Create New" className="mt-3 mt-sm-0" />
                </Link>
              </div>
              <div className="white_card mt-4">
                <h5>No property created yet.</h5>
                <ol>
                  <li>Click on the "Create New" button.</li>
                  <li>
                    Fill in the required details, such as property name,
                    location, and other relevant information.
                  </li>
                  <li>Save your changes and confirm the property creation.</li>
                </ol>
                <p>
                  Once you have successfully created a property, you will gain
                  access to a range of options and tools to create pass and
                  manage your property-related tasks. If you require any
                  assistance or have further inquiries, please feel free to
                  contact our support team.
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  )
}

export default Hotels
