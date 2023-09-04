import { Col, Form, Row } from 'react-bootstrap'
import Checkbox from '../../../../Common/FormInputs/Checkbox'
import TextArea from '../../../../Common/FormInputs/TextArea'
import InputCustom from '../../../../Common/Inputs/InputCustom'
import SliderImage from '../../Component/SliderImage'
import PoolIcon from '../../../../../Assets/Images/Icons/PoolIcon.svg'
import WorkspaceIcon from '../../../../../Assets/Images/Icons/WorkspaceIcon.svg'
import ConditioningIcon from '../../../../../Assets/Images/Icons/ConditioningIcon.svg'
import KitchenIcon from '../../../../../Assets/Images/Icons/KitchenIcon.svg'
import TVIcon from '../../../../../Assets/Images/Icons/TVIcon.svg'
import './Hotelindex.scss'
import CommonButton from '../../../../Common/CommonButton/CommonButton'
// import { useDispatch } from 'react-redux'

const Propertydetail = ({ data, handleAction }: any) => {

  let Country = require("country-state-city").Country;
  let State = require("country-state-city").State;

  return (
    <>
      <section className="property_detail">
        <section className="new_property">
          <h6>Property information</h6>
          <div className="new_property_section mt-4">
            <Form>
              {data?.verification === 'rejected' ? <span style={{ color: "red" }}>Property Rejected</span> : data?.verification === 'accepted' ? <span style={{ color: "green" }}>Property Accepted</span> : ""}
              <Row>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Name"
                    className="mb-44"
                    placeholder="Enter Name"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={25}
                    autoFocus={true}
                    value={data?.name ? data?.name : ''}
                    readOnly
                  />
                </Col>
                <Col lg={4} md={6}>
                  {data?.location?.country && (
                    <InputCustom
                      label="Country"
                      className="mb-44"
                      placeholder="Country"
                      id="Country"
                      name="Country"
                      type="text"
                      maxLength={25}
                      autoFocus={true}
                      value={
                        Country.getCountryByCode(data?.location?.country)[
                        'name'
                        ]
                      }
                      readOnly
                    />
                  )}
                </Col>
                <Col lg={4} md={6}>
                  {data?.location?.state && (
                    <InputCustom
                      label="State"
                      className="mb-44"
                      placeholder="State"
                      id="State"
                      name="State"
                      type="text"
                      maxLength={25}
                      autoFocus={true}
                      value={
                        State.getStateByCodeAndCountry(
                          data?.location?.state,
                          data?.location?.country,
                        )['name']
                      }
                      readOnly
                    />
                  )}
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Address"
                    className="mb-44"
                    placeholder="Address"
                    id="address"
                    name="address"
                    type="text"
                    maxLength={25}
                    autoFocus={true}
                    value={
                      data?.location?.address ? data?.location?.address : ''
                    }
                    readOnly
                  />
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Latitude"
                    className="mb-44"
                    placeholder="Latitude"
                    id="latitude"
                    name="latitude"
                    type="text"
                    maxLength={25}
                    autoFocus={true}
                    value={
                      data?.location?.latitude ? data?.location?.latitude : ''
                    }
                    readOnly
                  />
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Longitude"
                    className="mb-44"
                    placeholder="Longitude"
                    id="longitude"
                    name="longitude"
                    type="text"
                    maxLength={25}
                    autoFocus={true}
                    value={
                      data?.location?.longitude ? data?.location?.longitude : ''
                    }
                    readOnly
                  />
                </Col>
                <Col lg={12}>
                  <TextArea
                    label="Description"
                    className="textarea_feilds mb-44"
                    placeholder="Enter Description"
                    name="description"
                    maxLength={70}
                    readOnly
                    value={data?.description ? data?.description : ''}
                  />
                </Col>
                <Col lg={6} md={6}>
                  <InputCustom
                    label="Type"
                    className="mb-44"
                    placeholder="Type"
                    id="type"
                    name="type"
                    type="text"
                    maxLength={25}
                    autoFocus={true}
                    value={data?.type ? data?.type : ''}
                    readOnly
                  />
                </Col>
                <Col lg={12} md={12}>
                  <Row>
                    <Col lg={6} md={12}>
                      <InputCustom
                        label="Bedroom (s)"
                        className="mb-4"
                        placeholder="Enter Bedroom (s)"
                        id="bedroom"
                        name="bedroom"
                        type="text"
                        maxLength={25}
                        autoFocus={true}
                        value={data?.rooms?.total ? data?.rooms?.total : ''}
                        readOnly
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={12} md={12} className="mb-5">
                  <Row>
                    {data?.rooms?.total &&
                      Array.from({ length: Number(data?.rooms?.total) }).map(
                        (item: any, index: any) => (
                          <Col lg={4} md={12}>
                            <InputCustom
                              label="Size (sqft)"
                              className="mb-4"
                              placeholder="Enter Size (imagessqft)"
                              id="size"
                              name="size"
                              type="text"
                              maxLength={25}
                              autoFocus={true}
                              value={
                                data?.rooms?.sizes[index][`room_` + (index + 1)]
                              }
                              readOnly
                            />
                          </Col>
                        ),
                      )}
                  </Row>
                </Col>
                <Col lg={12}>
                  <div className="upload_image">
                    {data?.images && data?.images.length ? (
                      <>
                        <label className="form-label">Images</label>
                        <div className="main_containt_left">
                          <SliderImage img={data?.images} />
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </Col>
                {/* <hr className="spaceline" /> */}
                <Col lg={12} className="mt-5">
                  <div className="check_box_fields">
                    {data?.amenity &&
                      Object.values(data?.amenity).includes(true) && (
                        <>
                          <h2>Amenities</h2>
                          <ul className="mt-4">
                            {data?.amenity?.outdoor_pool && (
                              <li>
                                <Checkbox
                                  className="check_reverse"
                                  label={
                                    <>
                                      <img src={PoolIcon} alt="Icon" /> Shared
                                      outdoor pool
                                    </>
                                  }
                                  id="pool"
                                  name="pool"
                                  value={data?.amenity?.outdoor_pool}
                                  checked={data?.amenity?.outdoor_pool}
                                />
                              </li>
                            )}
                            {data?.amenity?.pet_allowed && (
                              <li>
                                <Checkbox
                                  className="check_reverse"
                                  label={
                                    <>
                                      <img src={PoolIcon} alt="Icon" /> Pet
                                      allowed
                                    </>
                                  }
                                  id="pet"
                                  name="pet"
                                  value={data?.amenity?.pet_allowed}
                                  checked={data?.amenity?.pet_allowed}
                                />
                              </li>
                            )}
                            {data?.amenity?.workspace && (
                              <li>
                                <Checkbox
                                  className="check_reverse"
                                  label={
                                    <>
                                      <img src={WorkspaceIcon} alt="Icon" />{' '}
                                      Dedicated Workspace
                                    </>
                                  }
                                  id="workspace"
                                  name="workspace"
                                  value={data?.amenity?.workspace}
                                  checked={data?.amenity?.workspace}
                                />
                              </li>
                            )}
                            {data?.amenity?.wifi && (
                              <li>
                                <Checkbox
                                  className="check_reverse"
                                  label={
                                    <>
                                      <img src={WorkspaceIcon} alt="Icon" />{' '}
                                      Wifi
                                    </>
                                  }
                                  id="wifi"
                                  name="wifi"
                                  value={data?.amenity?.wifi}
                                  checked={data?.amenity?.wifi}
                                />
                              </li>
                            )}
                            {data?.amenity?.air_conditioner && (
                              <li>
                                <Checkbox
                                  className="check_reverse"
                                  label={
                                    <>
                                      <img src={ConditioningIcon} alt="Icon" />{' '}
                                      Air conditioning
                                    </>
                                  }
                                  id="ac"
                                  name="ac"
                                  value={data?.amenity?.air_conditioner}
                                  checked={data?.amenity?.air_conditioner}
                                />
                              </li>
                            )}
                            {data?.amenity?.free_washer && (
                              <li>
                                <Checkbox
                                  className="check_reverse"
                                  label={
                                    <>
                                      <img src={ConditioningIcon} alt="Icon" />{' '}
                                      Free washer
                                    </>
                                  }
                                  id="washer"
                                  name="washer"
                                  value={data?.amenity?.free_washer}
                                  checked={data?.amenity?.free_washer}
                                />
                              </li>
                            )}
                            {data?.amenity?.kitchen && (
                              <li>
                                <Checkbox
                                  className="check_reverse"
                                  label={
                                    <>
                                      <img src={KitchenIcon} alt="Icon" />{' '}
                                      Kitchen
                                    </>
                                  }
                                  id="kitchen"
                                  name="kitchen"
                                  value={data?.amenity?.kitchen}
                                  checked={data?.amenity?.kitchen}
                                />
                              </li>
                            )}
                            {data?.amenity?.hd_tv && (
                              <li>
                                <Checkbox
                                  className="check_reverse"
                                  label={
                                    <>
                                      <img src={TVIcon} alt="Icon" /> 40” HDTV
                                    </>
                                  }
                                  id="hdtv"
                                  name="hdtv"
                                  value={data?.amenity?.hd_tv}
                                  checked={data?.amenity?.hd_tv}
                                />
                              </li>
                            )}
                          </ul>
                        </>
                      )}
                  </div>
                </Col>
                {/* <hr className="spaceline" /> */}
                <Col xs={12}>
                  <label className="form-label">Contact info</label>
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Email"
                    className="mb-44"
                    placeholder="Enter Email"
                    id="email"
                    name="email"
                    type="text"
                    maxLength={40}
                    autoFocus={true}
                    value={data?.user?.email ? data?.user?.email : ''}
                    readOnly
                  />
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Contact no."
                    className="mb-44"
                    placeholder="Enter Contact no."
                    id="contact"
                    name="contact"
                    type="string"
                    onWheel={(e: any) => e.target.blur()}
                    autoFocus={true}
                    value={
                      data?.user?.mobile_number ? data?.user?.mobile_number : ''
                    }
                    readOnly
                  />
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Website"
                    className="mb-44"
                    placeholder="Website"
                    id="website"
                    name="website"
                    type="string"
                    onWheel={(e: any) => e.target.blur()}
                    autoFocus={true}
                    value={
                      data?.location?.website ? data?.location?.website : ''
                    }
                    readOnly
                  />
                </Col>
              </Row>
              {data?.verification === 'pending' && (
                <div className='d-flex align-items-center mb-4'>
                  <CommonButton
                    title="Reject"
                    type='button'
                    className="dark-greenbtn"
                    onClick={() =>
                      handleAction('rejected', data)
                    }
                  />
                  <CommonButton
                    title="Approve"
                    type='button'
                    className="btncreate ms-3"
                    onClick={() =>
                      handleAction('accepted', data)
                    }
                  />
                </div>
              )}
            </Form>
          </div>
        </section>
      </section>
    </>
  )
}

export default Propertydetail
