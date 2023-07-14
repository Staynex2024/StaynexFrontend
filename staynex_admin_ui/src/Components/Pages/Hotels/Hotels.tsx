import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GreentickIcon, SearchIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import CommonHeading from '../../Common/CommonHeading/CommonHeading';
import './Hotels.scss';
import SliderImage from './Component/SliderImage';
import CommonButton from '../../Common/CommonButton/CommonButton';
import { Form } from 'react-bootstrap';
import Pagination from '../../Common/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { PAGE_LIMIT } from '../../../Constant';
import { getPropertyList } from '../../../Redux/Actions/user.action';
import SkeletonLoading from '../../Common/SkeletonLoading/SkeletonLoading';

const Hotels = () => {
    /**CREATE DISPATCH OBJECT */
    const dispatch: any = useDispatch()

    const navigate = useNavigate();

    const arr: any = [1, 2, 3, 4, 5]

    // States
    const [currentPage, setcurrentPage]: any = useState(1);
    const [propertyList, setPropertyList] = useState([]);
    const [totalPage, setTotalPage] = useState(0)
    const [propertyCount, setPropertyCount] = useState(0);
    const [loader, setLoader] = useState(false);

    const listspno = [
        { sptitle: 'SP7', }, { sptitle: 'SP14', }, { sptitle: 'SP28', }, { sptitle: 'SP32', },
    ]

    // Pagination
    const handlePageChange = (selectedObject: any) => {
        setcurrentPage(selectedObject.selected + 1);
    };

    useEffect(() => {
        setLoader(true);
        //Get transferList function
        const retreivePropertyList = async () => {
            setTimeout(async () => {
                const result = await dispatch(getPropertyList(currentPage, PAGE_LIMIT));
                setPropertyList(result?.data)
                setPropertyCount(result?.count)
                setTotalPage(result?.totalPages)
                setLoader(false);
            }, 1000)
        }

        retreivePropertyList()
        // eslint-disable-next-line
    }, [currentPage])

    const handleInfo = async (item: any) => {
        const vendorEmail: string = item?.user?.email
        navigate("/auth/hotels/hotel-details/" + vendorEmail)
    }

    console.log('propertList :>> ', propertyList);
    return (
        <>
            <section className='hotels'>
                <div className='hotels_topheader d-sm-flex justify-content-between'>
                    <CommonHeading
                        heading='All Properties'
                        paragraph={<>There is a total of <span>{propertyCount ? propertyCount : 0}</span> properties</>}
                    />
                    <Link to="/auth/hotels/new-property"><CommonButton title="Add New Property" className="mt-3 mt-sm-0" /></Link>
                </div>
                <div className='hotels_topform d-sm-flex align-items-center mb-4 pb-2'>
                    <div className='Common_search d-flex align-items-center'>
                        <SearchIcon />
                        <Form.Control type="text" placeholder="Search" />
                    </div>
                    {/* <CustomSelect
                        className="hotels_Select ms-md-3"
                        options={options}
                    /> */}
                </div>
                <div className='hotels_section'>
                    <div className='hotels_section_cards'>
                        {!loader ?
                            <>
                                {propertyList && propertyList.length ?
                                    propertyList?.map((item: any, index: any) => {
                                        return (
                                            <>
                                                <div className='top_headbtn'>
                                                    <button className='active'>LISTED <GreentickIcon /></button>
                                                    <button >UNLIST</button>
                                                </div>
                                                <div className='main_containt'>
                                                    {item?.images && item?.images.length ?
                                                        <div className='main_containt_left'>
                                                            <SliderImage img={item?.images} />
                                                        </div> : ""
                                                    }
                                                    <div className='main_containt_right'>
                                                        <div className='right_textsec'>
                                                            <h3>$4,300</h3>
                                                            <h4>{item?.name ? item?.name : ""}</h4>
                                                            <p>{item?.country ? item?.country : ""}</p>
                                                            <ul className='list_text'>
                                                                {listspno.map((item) => (
                                                                    <li>
                                                                        <span>{item.sptitle}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div className='resort_contact'>
                                                                <div className='resort_number'>
                                                                    <label>Resort Contact</label>
                                                                    <p>{item?.contact_number ? item?.contact_number : ""}</p>
                                                                </div>
                                                                <p>{item?.contact_email ? item?.contact_email : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className='right_btnsec'>
                                                            <CommonButton
                                                                title="See Details" onClick={() => handleInfo(item)} />
                                                            {/* <Link to='/auth/hotel-details'>See Details</Link> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }) : <span>No Data Found</span>}
                            </>
                            :
                            <div>
                                <SkeletonLoading field={arr} />
                            </div>
                        }
                    </div>
                </div>
            </section>
            {
                propertyList && propertyList.length && propertyCount > PAGE_LIMIT ?
                    <>
                        <Pagination totalPage={totalPage} currentPage={currentPage} handlePageChange={handlePageChange} />
                    </>
                    : ""
            }
        </>
    )
}

export default Hotels