import React from 'react';
import {CopyIcon, DeleteIcon, DocviewIcon, EditIcon, MailIcon, MoreIcon, SearchIcon } from '../../../Assets/Images/svgImgs/svgImgs';
import CommonHeading from '../../Common/CommonHeading/CommonHeading';
import './Customers.scss';
import { Dropdown, Form } from 'react-bootstrap';
import CustomSelect from '../../Common/Select/Select';
import CustomTable from '../../Common/Table/Index';
import Checkbox from '../../Common/FormInputs/Checkbox';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';

const Customers = () => {
    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ]

    /**CREATE DISPATCH OBJECT */
    const dispatch: any = useDispatch();

    const addnewproperty = Yup.object().shape({
    });

    const formik = useFormik({

        initialValues: {
            pool: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            // console.log('values', values)
            // await dispatch(loginAdmin(values));
        },

    });
    const fields = [
        "",
        "Pass Holders",
        "Address",
        "No. of passes",
        "Total nights redeemed",
        "Total nights left",
        "Membership",
        "",
    ]
    const tabledata = [
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
        { passholder: 'DB24220', address: '0x71c...985f', nopass: '4', nightred: '23', nightleft: '120', membership: 'Wanderer', },
    ]
    const tabledroplist = [
        { icondrop: <EditIcon />, name: "Edit", },
        { icondrop: <DocviewIcon />, name: "View Details", to: '/auth/customers-details' },
        { icondrop: <MailIcon />, name: "Contact via email", },
        { icondrop: <DeleteIcon />, name: "Cancel Booking", },
    ];
    return (
        <>
            <section className='customers_Pages'>
                <CommonHeading
                    heading='Customers'
                    paragraph={<>You have a total of <span>84</span> Customers</>}
                />
                <div className='d-sm-flex align-items-center mb-4 pb-2'>
                    <div className='Common_search d-flex align-items-center'>
                        <SearchIcon />
                        <Form.Control type="text" placeholder="Search" />
                    </div>
                    <CustomSelect
                        classgroup="hotels_Select ms-md-3 mt-sm-0 mt-3"
                        options={options}
                    />
                </div>

                <div className='booking_table'>
                    <div className='pagination_select mb-4'>
                        <CustomSelect
                            classgroup="select_pagi"
                            label='Page'
                            options={options}
                        />
                        <label>of 102</label>
                    </div>
                    <CustomTable
                        fields={fields}
                    >
                        {tabledata.map((item) => (
                            <tr>
                                <td>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Checkbox
                                            id='pool'
                                            name='pool'
                                            onChange={formik.handleChange}
                                            value={formik.values.pool}
                                        />
                                    </Form>
                                </td>
                                <td>{item.passholder}</td>
                                <td><div className='copy_icon'>{item.address} <button><CopyIcon /></button></div></td>
                                <td>{item.nopass}</td>
                                <td>{item.nightred}</td>
                                <td>{item.nightleft}</td>
                                <td>{item.membership}</td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <Dropdown className='table_Dropdown mx-4'>
                                            <Dropdown.Toggle variant="" id="dropdown-basic"><MoreIcon /></Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {tabledroplist.map((data, i) => {
                                                    return (
                                                        <Dropdown.Item key={i} href={data.to}>
                                                            <div className='table_drop d-flex'>
                                                                {data.icondrop}
                                                                <span>{data.name}</span>
                                                            </div>
                                                        </Dropdown.Item>
                                                    )
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </CustomTable>
                </div>
            </section>
        </>
    )
}

export default Customers