import './Dashboard.scss'
import CommonHeading from '../../Common/CommonHeading/CommonHeading'
import { Col, Row } from 'react-bootstrap'
import CustomSelect from '../../Common/Select/Select'
import CommonButton from '../../Common/CommonButton/CommonButton'
import Dashboardmodal from './Component/Dashboardmodal'
import { useState } from 'react'

const Dashboard = () => {
  const [show, setShow] = useState(false)
  const cardlist = [
    { label: 'Total Sales (USDT)', value: '700 000 000' },
    { label: 'Total pass sold', value: '18' },
    { label: 'Total pass available', value: '45' },
  ]
  const options = [
    { value: '1', label: 'All time' },
    { value: '2', label: 'time' },
    { value: '3', label: 'time' },
    { value: '4', label: 'time' },
    { value: '4', label: 'time' },
  ]
  const options1 = [
    { value: '1', label: 'All pass type' },
    { value: '2', label: 'time' },
    { value: '3', label: 'time' },
  ]
  return (
    <>
      <section className="dashboard">
        <CommonHeading heading="Dashboard" />
        <div className="dashboard_section">
          <div className="statistics_card">
            <p>Statistics</p>
            <Row>
              <Col xs={6} md={4} xl={2}>
                <CustomSelect classgroup="mb-0 mt-4" options={options} />
              </Col>
              <Col xs={6} md={4} xl={3}>
                <CustomSelect classgroup="mb-0 mt-4" options={options1} />
              </Col>
            </Row>
            <ul className="statistics_card_list">
              {cardlist.map((data, i) => (
                <li key={i}>
                  <label>{data.label}</label>
                  <h3>{data.value}</h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="statistics_card">
            <p>Pass Details</p>
            <div className="statistics_card_typepass">
              <label>Types of pass</label>
              <p>4</p>
            </div>
            <ul className="statistics_card_totlelist">
              <li>
                <label>Name</label>
                <label>Total Sold</label>
              </li>
              <li>
                <p>SP3</p>
                <p>
                  <span>20</span>/100
                </p>
              </li>
              <li>
                <p>SP7</p>
                <p>
                  <span>12</span>/100
                </p>
              </li>
              <li>
                <p>SP14</p>
                <p>
                  <span>40</span>/100
                </p>
              </li>
              <li>
                <p>SP30</p>
                <p>
                  <span className="gray_span">0</span>/100
                </p>
              </li>
            </ul>
            <Row className="mt-4 mt-md-5">
              <Col xs={6}>
                <CommonButton
                  onClick={() => setShow(true)}
                  title="Create new"
                  className="w-100"
                />
              </Col>
              <Col xs={6}>
                <CommonButton
                  title="View passes"
                  className="border-btn w-100"
                />
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <Dashboardmodal show={show} handleClose={() => setShow(false)} />
    </>
  )
}

export default Dashboard
