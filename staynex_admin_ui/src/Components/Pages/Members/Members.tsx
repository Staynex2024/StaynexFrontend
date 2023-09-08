import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { SearchIcon } from '../../../Assets/Images/svgImgs/svgImgs'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'
import CustomTable from '../../Common/Table/Index'
import './Members.scss'
import CustomSelect from '../../Common/Select/Select'
import useDebounce from '../../../hooks/useDebounce'
import useCopyClipboard from '../../../hooks/useCopyToClipboard'
import toaster from '../../Common/Toast'
import { useDispatch } from 'react-redux'
import { callApiGetMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import { PAGE_LIMIT } from '../../../Constant'

const Members = () => {
  const dispatch: any = useDispatch()

  //States
  const [currentPage, setcurrentPage]: any = useState(1)
  const [customerList, setCustomerList] = useState([])
  const [customerCount, setCustomerCount] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [search, setSearch] = useState('')
  const [search_Debounce, setSearch_Debounce] = useState('')
  const [selectOptions, setSelectOptions]: any = useState([])

  useDebounce(() => handleSearchDebounce(search), 1000, [search])

  const handleSearchDebounce = (search: any) => {
    setSearch_Debounce(search)
    setcurrentPage(1)
  }

  useEffect(() => {

    //Get customerList function
    const retreiveCustomerList = async () => {
      if (search_Debounce.length >= 2 || search_Debounce.length === 0) {
        const result = await dispatch(
          callApiGetMethod(APIURL.CUSTOMER_LIST,
            {
              page: currentPage,
              limit: PAGE_LIMIT,
              search: search_Debounce.trim(),
            },
            true,
            false,
          ),
        )
        setCustomerList(result?.data)
        setCustomerCount(result?.count)
        setTotalPage(result?.totalPages)
      }
    }

    retreiveCustomerList()
    // eslint-disable-next-line
  }, [currentPage, search_Debounce])

  //copy string to clipboard with below code
  const [setCopied] = useCopyClipboard()
  const copy = (data: any, message?: string) => {
    setCopied(data)
    if (message) toaster.success(message)
  }

  // pagination flow
  const iterateAndSetArray = (value: any) => {
    const array: any = []
    for (let i = 1; i <= value; i++) {
      const object: any = {
        label: `${i}`,
        value: i,
      }
      array.push(object)
    }
    return array
  }

  useEffect(() => {
    const filteredOptions = iterateAndSetArray(totalPage)
    setSelectOptions(filteredOptions)
    setcurrentPage(1)
  }, [totalPage])


  const fields = [
    'Sr. No.',
    'Customer Name',
    'Address',
    'No. of passes',
    'Membership',
    '',
  ]

  return (
    <>
      <section className="members">
        <div className="members_topheader d-sm-flex justify-content-between">
          <CommonHeading
            heading="Customers"
            paragraph={
              <>
                There are a total of <span>{customerCount ? customerCount : ''}</span> customers
              </>
            }
          />
        </div>
        <div className="members_topform d-sm-flex align-items-center mb-4 pb-2">
          <div className="Common_search d-flex align-items-center">
            <SearchIcon />
            <Form.Control type="text" placeholder="Search" onChange={(e: any) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="members_section">
          <div className="pagination_select">
            {totalPage && totalPage > 1 ? (
              <>
                <CustomSelect
                  defaultValue={{ value: currentPage, label: currentPage }}
                  classgroup="select_pagi"
                  label="Page"
                  options={selectOptions}
                  onChange={(selectedValue: any) =>
                    setcurrentPage(selectedValue?.value)
                  }
                  value={currentPage && { label: currentPage }}
                />
                <label>of {totalPage}</label>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="members_table">
            <CustomTable fields={fields} >
              {customerList && customerList.length > 0 && customerList.map((item: any, data: any) => (
                <tr key={data}>
                  <td>{PAGE_LIMIT * (currentPage - 1) + (data + 1)}</td>
                  <td>{item?.user['name'] ? item?.user['name'] : ""}</td>
                  <td>
                    <div className="copy_icon">
                      {item?.walletAddress ? item?.walletAddress : ""}{' '}
                      {item?.walletAddress ? (
                          <i
                            style={{
                              cursor: 'pointer',
                              marginLeft: '8px',
                              color: 'black',
                            }}
                            title="copy"
                            className="fa fa-clone"
                            onClick={() =>
                              copy(item?.walletAddress, 'wallet address copied')
                            }
                          ></i>
                        ) : (
                          ''
                        )}
                      {/* <button>
                        <CopyIcon />
                      </button> */}
                    </div>
                  </td>
                  <td>{1}</td>
                  <td>
                    <span className="text_orange">{item?.membership['name'] ? item?.membership['name'] : ""}</span>
                  </td>
                  {/* <td>
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
                  </td> */}
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
