import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GreentickIcon } from "../../../Assets/Images/svgImgs/svgImgs";
import SliderImage from "../Booking/Component/SliderImage";
import CommonButton from "../../Common/CommonButton/CommonButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callApiGetMethod } from "../../../Redux/Actions/api.action";
import { APIURL } from "../../../Utils";

const Hotels = () => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();


  const [vendorProperty, setVendorProperty] = useState<any>({});

  const listspno = [
    { sptitle: "SP7" },
    { sptitle: "SP14" },
    { sptitle: "SP28" },
    { sptitle: "SP32" },
  ];
  const options = [
    { value: "india", label: "India" },
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "russia", label: "Russia" },
    { value: "australia", label: "Australia" },
  ];

  useEffect(() => {
    //Get vendorProperty function
    const retreiveVendorProperty = async () => {
      const result = await dispatch(
        callApiGetMethod(APIURL.VENDOR_DETAILS, {}, true, false)
      );
      setVendorProperty(result?.data);
    };

    retreiveVendorProperty();
    // eslint-disable-next-line
  }, []);

  const handleViewPage = () => {
    navigate("/auth/new-property", {state : vendorProperty})
  }
  return (
    <>
      <section className="hotels">
        {vendorProperty && Object.keys(vendorProperty).length ? (
          vendorProperty?.property?.map((details) => {
            return (
              <>
                <div className="hotels_section">
                  <div className="hotels_section_cards">
                    {/* <div className="top_headbtn">
                      <button className="active">
                        LISTED <GreentickIcon />
                      </button>
                      <button>UNLIST</button>
                    </div> */}
                    <div className="main_containt">
                      <div className="main_containt_left">
                        <SliderImage />
                      </div>
                      <div className="main_containt_right">
                        <div className="right_textsec">
                          <h3>$4,300</h3>
                          <h4>{details?.name}</h4>
                          <p>Indonesia</p>
                          <ul className="list_text">
                            {listspno.map((item) => (
                              <li>
                                <span>{item.sptitle}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="resort_contact">
                            <div className="resort_number">
                              <label>Resort Contact</label>
                              <p>{vendorProperty?.mobile_number}</p>
                            </div>
                            <p>{vendorProperty?.email}</p>
                          </div>
                        </div>
                        <div className="right_btnsec">
                          <CommonButton onClick={handleViewPage} title="See Details"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <>
            <Link to="/auth/new-property">
              <CommonButton title="Add New Property" className="mt-3 mt-sm-0" />
            </Link>
            <p>
              No property created yet. 1. Click on the "Create New" button. 2.
              Fill in the required details, such as property name, location, and
              other relevant information. 3. Save your changes and confirm the
              property creation. Once you have successfully created a property,
              you will gain access to a range of options and tools to create
              pass and manage your property-related tasks. If you require any
              assistance or have further inquiries, please feel free to contact
              our support team.
            </p>
          </>
        )}
      </section>
    </>
  );
};

export default Hotels;
