import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import CustomTable from '../../../../Common/Table/Index';
import './Hotelindex.scss';
import Checkbox from '../../../../Common/FormInputs/Checkbox';
import { CheckcircleIcon, CopyIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';

const Stats = () => {

    /**CREATE DISPATCH OBJECT */
    // const dispatch: any = useDispatch();

    const addnewproperty = Yup.object().shape({
    });

    const formik = useFormik({

        initialValues: {
            pool: '',
        },
        validationSchema: addnewproperty,
        onSubmit: async (values) => {
            // await dispatch(loginAdmin(values));
        },

    });
    const cardlist = [
        { label: 'Total pass sold', value: '18', }, { label: 'Total pass available', value: '45', },
        { label: 'Types of Pass', value: '4', },
    ]
    const fields = [
        "",
        "Booking ID",
        "Customer Name",
        "Address",
        "SP Type",
        "Room Type",
        "Check-in",
        "Check-out",
        "Booking Status",
        "",
    ]
    const tabledata = [
        {
            bookingid: 'DB24220', customername: 'Kylee Arroyo', address: '0x71c...985f', sptype: 'SP7',
            roomtype: 'Triple room', checkin: '12 Feb 2023', checkout: '13 Feb 2023', bookingstatus: 'Confirmed',
            confirm: <CheckcircleIcon />,
        },
        {
            bookingid: 'DB24220', customername: 'Derrick Obonyo', address: '0x71c...985f', sptype: 'SP7',
            roomtype: 'Single room deluxe', checkin: '12 Feb 2023', checkout: '13 Feb 2023', bookingstatus: 'Cancelled',
        },
        {
            bookingid: 'DB24220', customername: '1', address: '0x71c...985f', sptype: 'SP7', roomtype: 'Single room deluxe',
            checkin: '12 Feb 2023', checkout: '13 Feb 2023', bookingstatus: 'In Progress',
        },
    ]
    return (
        <>
            <section className='stats'>
                <div className='statistics_card'>
                    <p>Statistics</p>
                    <ul className='statistics_card_list'>
                        {cardlist.map((data) => (
                            <li>
                                <label>{data.label}</label>
                                <h3>{data.value}</h3>
                            </li>
                        ))}
                    </ul>
                    <ul className='statistics_card_totlelist'>
                        <li>
                            <label>Name</label>
                            <label>Total Sold</label>
                        </li>
                        <li>
                            <p>SP3</p>
                            <p><span>20</span>/100</p>
                        </li>
                        <li>
                            <p>SP7</p>
                            <p><span>12</span>/100</p>
                        </li>
                        <li>
                            <p>SP14</p>
                            <p><span>40</span>/100</p>
                        </li>
                        <li>
                            <p>SP30</p>
                            <p><span className='gray_span'>0</span>/100</p>
                        </li>
                    </ul>
                </div>
                <h4>Booking History</h4>
                <div className='stats_table'>
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
                                <td>{item.bookingid}</td>
                                <td>{item.customername}</td>
                                <td><div className='copy_icon'>{item.address} <button><CopyIcon /></button></div></td>
                                <td>{item.sptype}</td>
                                <td>{item.roomtype}</td>
                                <td>{item.checkin}</td>
                                <td>{item.checkout}</td>
                                <td>{item.bookingstatus}</td>
                                <td>{item.confirm}</td>
                            </tr>
                        ))}
                    </CustomTable>
                </div>
            </section>
        </>
    )
}

export default Stats