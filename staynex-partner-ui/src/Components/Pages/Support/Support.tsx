import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import {
    CheckcircleIcon, ClosedocIcon, CopyIcon, DocviewIcon,
    EditIcon, MoreIcon, SearchIcon,
} from '../../../Assets/Images/svgImgs/svgImgs';
import CommonHeading from '../../Common/CommonHeading/CommonHeading';
import Checkbox from '../../Common/FormInputs/Checkbox';
import CustomSelect from '../../Common/Select/Select';
import CustomTable from '../../Common/Table/Index';
import './Support.scss';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import Supportmodal from './Supportmodal/Supportmodal';

const Support = () => {
    const [show, setShow] = useState(false);
    const options = [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'USA' },
        { value: 'canada', label: 'Canada' },
        { value: 'russia', label: 'Russia' },
        { value: 'australia', label: 'Australia' },
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
        "Ref ID",
        "Customer Name",
        "Address",
        "Date",
        "Type",
        "Concern",
        "Status",
        "",
    ]
    const tabledata = [
        {
            refid: '1344', customername: 'Kylee Arroyo', address: '0x71c...985f', date: '10 Feb 2023',
            type: 'Technical', concern: 'Unable to book room', classstatus: 'resolved', status: 'Resolved',
        },
        {
            refid: '1344', customername: 'Kylee Arroyo', address: '0x71c...985f', date: '10 Feb 2023',
            type: 'Technical', concern: 'Unable to book room', status: 'In progress',
        },
        {
            refid: '1344', customername: 'Kylee Arroyo', address: '0x71c...985f', date: '10 Feb 2023',
            type: 'Technical', concern: 'Unable to book room', classstatus: 'pending', status: 'Action needed',
        },
        {
            refid: '1344', customername: 'Kylee Arroyo', address: '0x71c...985f', date: '10 Feb 2023',
            type: 'Technical', concern: 'Unable to book room', classstatus: 'resolved', status: 'Resolved',
        },
        {
            refid: '1344', customername: 'Kylee Arroyo', address: '0x71c...985f', date: '10 Feb 2023',
            type: 'Technical', concern: 'Unable to book room', status: 'In progress',
        },
        {
            refid: '1344', customername: 'Kylee Arroyo', address: '0x71c...985f', date: '10 Feb 2023',
            type: 'Technical', concern: 'Unable to book room', classstatus: 'pending', status: 'Action needed',
        },
    ]
    const tabledroplist = [
        { icondrop: <CheckcircleIcon />, name: "Mark as Resolved", },
        { icondrop: <EditIcon />, name: "Reply ", onClick: () => setShow(true), },
        { icondrop: <DocviewIcon />, name: "View Details", to: '' },
        { icondrop: <ClosedocIcon />, name: "Close Report", },
    ];
    return (
        <>
            <section className='support'>
                <CommonHeading
                    heading='Support'
                    paragraph={<>There are a total of <span>84</span> concerns</>}
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
                <div className='support_section'>
                    <div className='support_table'>
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
                                    <td>{item.refid}</td>
                                    <td>{item.customername}</td>
                                    <td><div className='copy_icon'>{item.address} <button><CopyIcon /></button></div></td>
                                    <td>{item.date}</td>
                                    <td>{item.type}</td>
                                    <td>{item.concern}</td>
                                    <td className={item.classstatus}>{item.status}</td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            {/* <span className='checkIcon'><CheckcircleIcon /></span> */}
                                            <Dropdown className='table_Dropdown mx-4'>
                                                <Dropdown.Toggle variant="" id="dropdown-basic"><MoreIcon /></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {tabledroplist.map((data, i) => {
                                                        return (
                                                            <Dropdown.Item key={i} href={data.to} onClick={data.onClick}>
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
                </div>
            </section>
            <Supportmodal
                show={show}
                handleClose={() => setShow(false)}
            />
        </>
    )
}

export default Support