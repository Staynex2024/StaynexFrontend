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

const Propertydetail = ({ data }: any) => {
  return (
    <>
      <section className="property_detail">
        <section className="new_property">
          <h6>Property information</h6>
          <div className="new_property_section">
            <Form>
              <Row className="align-items-end">
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
                      data?.location?.country ? data?.location?.country : ''
                    }
                    readOnly
                  />
                </Col>
                <Col lg={4} md={6}>
                  <InputCustom
                    label="State"
                    className="mb-44"
                    placeholder="State"
                    id="State"
                    name="State"
                    type="text"
                    maxLength={25}
                    autoFocus={true}
                    value={data?.location?.state ? data?.location?.state : ''}
                    readOnly
                  />
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
                <Col lg={4} md={6}>
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
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Bedroom (s)"
                    className="mb-44"
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
                <Col lg={4} md={6}>
                  <InputCustom
                    label="Size (sqft)"
                    className="mb-44"
                    placeholder="Enter Size (sqft)"
                    id="size"
                    name="size"
                    type="text"
                    maxLength={25}
                    autoFocus={true}
                    value={
                      data?.rooms?.sizes[0]?.room_1
                        ? data?.rooms?.sizes[0]?.room_1
                        : ''
                    }
                    readOnly
                  />
                </Col>
                <Col lg={12}>
                  <div className="upload_image">
                    {data?.images && data?.images.length ? (
                      <>
                        <label>Images</label>
                        <div className="main_containt_left">
                          <SliderImage img={data?.images} />
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </Col>
                <hr className="spaceline" />
                <Col lg={12}>
                  <div className="check_box_fields">
                    <h6>Amenities</h6>
                    <ul>
                      <li>
                        {data?.amenity?.outdoor_pool && (
                          <Checkbox
                            className="check_reverse"
                            label={
                              <>
                                <img src={PoolIcon} alt="Icon" /> Shared outdoor
                                pool
                              </>
                            }
                            id="pool"
                            name="pool"
                            value={data?.amenity?.outdoor_pool}
                            checked={data?.amenity?.outdoor_pool}
                          />
                        )}
                      </li>
                      <li>
                        {data?.amenity?.pet_allowed && (
                          <Checkbox
                            className="check_reverse"
                            label={
                              <>
                                <img src={PoolIcon} alt="Icon" /> Pet allowed
                              </>
                            }
                            id="pet"
                            name="pet"
                            value={data?.amenity?.pet_allowed}
                            checked={data?.amenity?.pet_allowed}
                          />
                        )}
                      </li>
                      <li>
                        {data?.amenity?.workspace && (
                          <Checkbox
                            className="check_reverse"
                            label={
                              <>
                                <img src={WorkspaceIcon} alt="Icon" /> Dedicated
                                Workspace
                              </>
                            }
                            id="workspace"
                            name="workspace"
                            value={data?.amenity?.workspace}
                            checked={data?.amenity?.workspace}
                          />
                        )}
                      </li>
                      <li>
                        {data?.amenity?.wifi && (
                          <Checkbox
                            className="check_reverse"
                            label={
                              <>
                                <img src={WorkspaceIcon} alt="Icon" /> Wifi
                              </>
                            }
                            id="wifi"
                            name="wifi"
                            value={data?.amenity?.wifi}
                            checked={data?.amenity?.wifi}
                          />
                        )}
                      </li>
                      <li>
                        {data?.amenity?.air_conditioner && (
                          <Checkbox
                            className="check_reverse"
                            label={
                              <>
                                <img src={ConditioningIcon} alt="Icon" /> Air
                                conditioning
                              </>
                            }
                            id="ac"
                            name="ac"
                            value={data?.amenity?.air_conditioner}
                            checked={data?.amenity?.air_conditioner}
                          />
                        )}
                      </li>
                      <li>
                        {data?.amenity?.free_washer && (
                          <Checkbox
                            className="check_reverse"
                            label={
                              <>
                                <img src={ConditioningIcon} alt="Icon" /> Free
                                washer
                              </>
                            }
                            id="washer"
                            name="washer"
                            value={data?.amenity?.free_washer}
                            checked={data?.amenity?.free_washer}
                          />
                        )}
                      </li>
                      <li>
                        {data?.amenity?.kitchen && (
                          <Checkbox
                            className="check_reverse"
                            label={
                              <>
                                <img src={KitchenIcon} alt="Icon" /> Kitchen
                              </>
                            }
                            id="kitchen"
                            name="kitchen"
                            value={data?.amenity?.kitchen}
                            checked={data?.amenity?.kitchen}
                          />
                        )}
                      </li>
                      <li>
                        {data?.amenity?.hd_tv && (
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
                        )}
                      </li>
                    </ul>
                  </div>
                </Col>

                <hr className="spaceline" />
                <h6 className="heading_space">Contact info</h6>
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
                    label="Website."
                    className="mb-44"
                    placeholder="Website."
                    id="website"
                    name="website"
                    type="string"
                    onWheel={(e: any) => e.target.blur()}
                    autoFocus={true}
                    value={
                      data?.user?.mobile_number ? data?.user?.mobile_number : ''
                    }
                    readOnly
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </section>
      </section>
    </>
  )
}

export default Propertydetail
