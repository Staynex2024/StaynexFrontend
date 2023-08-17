import React, { useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import {
  BlockIcon,
  CopyIcon,
  DocviewIcon,
  MailIcon,
  MoreIcon,
  SearchIcon,
  WhitelistIcon,
} from '../../../Assets/Images/svgImgs/svgImgs'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'
import CustomTable from '../../Common/Table/Index'
import './Members.scss'
import Checkbox from '../../Common/FormInputs/Checkbox'
import CustomSelect from '../../Common/Select/Select'

const Members = () => {

  const [selectedMemberList, setSelectedMemberList]: any = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);


  const fields = [
    '',
    'Customer Name',
    'Address',
    'No. of passes',
    'Membership',
    '',
  ]
  const tabledata = [
    {
      customername: 'Kylee Arroyo',
      address: '0x71c56789098765567890987985f',
      noofpass: '4',
      membership: 'Wanderer',
    },
    {
      customername: 'Kylee Arroyo',
      address: '0x71c56789098765567890987985f',
      noofpass: '4',
      membership: 'Wanderer',
    },
    {
      customername: 'Kylee Arroyo',
      address: '0x71c56789098765567890987985f',
      noofpass: '4',
      membership: 'Wanderer',
    },
    {
      customername: 'Kylee Arroyo',
      address: '0x71c56789098765567890987985f',
      noofpass: '4',
      membership: 'Wanderer',
    },
    {
      customername: 'Kylee Arroyo',
      address: '0x71c56789098765567890987985f',
      noofpass: '4',
      membership: 'Wanderer',
    },
    {
      customername: 'Kylee Arroyo',
      address: '0x71c56789098765567890987985f',
      noofpass: '4',
      membership: 'Wanderer',
    },
    {
      customername: 'Kylee Arroyo',
      address: '0x71c56789098765567890987985f',
      noofpass: '4',
      membership: 'Wanderer',
    },
    {
      customername: 'Kylee Arroyo',
      address: '0x71c56789098765567890987985f',
      noofpass: '4',
      membership: 'Wanderer',
    },
  ]
  const tabledroplist = [
    { icondrop: <WhitelistIcon />, name: 'Whitelist' },
    { icondrop: <DocviewIcon />, name: 'View Details' },
    { icondrop: <MailIcon />, name: 'Contact via email' },
    { icondrop: <BlockIcon />, name: 'Blacklist' },
  ]
  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '102', label: '102' },
  ]

  const handleChange = (e: any) => {
    const id = e.target.id;

    if (e.target.checked) {
      setSelectedMemberList([...selectedMemberList, id])

    } else {
      let latestMemberList = selectedMemberList.filter((f: any) => f !== id)
      setSelectedMemberList(latestMemberList)
    }
  };

  const handleSelectAll = (e: any) => {
    setIsCheckAll(!isCheckAll);
    setSelectedMemberList(tabledata.map((li: any) => li.address))
    if (isCheckAll) {
      setSelectedMemberList([]);
    }
  };

  return (
    <>
      <section className="members">
        <div className="members_topheader d-sm-flex justify-content-between">
          <CommonHeading
            heading="Members"
            paragraph={
              <>
                There are a total of <span>84</span> global members
              </>
            }
          />
        </div>
        <div className="members_topform d-sm-flex align-items-center mb-4 pb-2">
          <div className="Common_search d-flex align-items-center">
            <SearchIcon />
            <Form.Control type="text" placeholder="Search" />
          </div>
        </div>
        <div className="members_section">
          <div className="pagination_select">
            <CustomSelect
              classgroup="select_pagi"
              label="Page"
              options={options}
            />
            <label>of 102</label>
          </div>
          <div className="members_table">
            <CustomTable fields={fields} >
              <Checkbox
                name="selectAll"
                id="head-select"
                onChange={handleSelectAll}
                checked={isCheckAll}
                className='table_checkall_box'
              />
              {tabledata.map((item: any, data: any) => (
                <tr key={data}>
                  <td>
                    <Checkbox
                      id={item?.address}
                      name="select"
                      onChange={handleChange}
                      checked={selectedMemberList.includes(item?.address)}
                      disabled={isCheckAll}
                    />
                  </td>
                  <td>{item.customername}</td>
                  <td>
                    <div className="copy_icon">
                      {item.address}{' '}
                      <button>
                        <CopyIcon />
                      </button>
                    </div>
                  </td>
                  <td>{item.noofpass}</td>
                  <td>
                    <span className="text_orange">{item.membership}</span>
                  </td>
                  <td>
                    <Dropdown className="table_Dropdown mx-4">
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                        <MoreIcon />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {tabledroplist.map((data, i) => {
                          return (
                            <Dropdown.Item key={i}>
                              <div className="table_drop d-flex">
                                {data.icondrop}
                                <span>{data.name}</span>
                              </div>
                            </Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </CustomTable>
          </div>
        </div>
      </section>
    </>
  )
}

export default Members
