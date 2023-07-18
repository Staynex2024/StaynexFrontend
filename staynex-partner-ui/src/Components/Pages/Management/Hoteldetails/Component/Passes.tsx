import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { GreentickIcon } from '../../../../../Assets/Images/svgImgs/svgImgs';
import Passes1 from '../../../../../Assets/Images/Passes1.png';
import Passes2 from '../../../../../Assets/Images/Passes2.png';
import Passes3 from '../../../../../Assets/Images/Passes3.png';
import Passes4 from '../../../../../Assets/Images/Passes4.png';

const Passes = () => {
    return (
        <>
            <section className='passes'>
                <Row>
                    <Col xl={3} lg={6} md={6}>
                        <div className='passes_card'>
                            <div className='passes_card_imageinfo'>
                                <img src={Passes1} alt='card_image' />
                                <h6>23/50</h6>
                            </div>
                            <div className='passes_card_textinfo'>
                                <h5>SP3</h5>
                                <p>3-day express pass</p>
                                <ul className='textlist'>
                                    <li>
                                        <label>Redeemable Nights</label>
                                        <p>3x nights per year</p>
                                    </li>
                                    <li>
                                        <label>Total Redeemable</label>
                                        <p>30 nights</p>
                                    </li>
                                </ul>
                                <hr className='linespace' />
                                <div className='offierinfo'>
                                    <label>Perks</label>
                                    <p>5% off on restaurant F&B</p>
                                    <p>5% off on villa resort services</p>
                                    <p>Free shuttle to-and from airport</p>
                                </div>
                                <h3>$2999</h3>
                                <div className='listedbtn'>
                                    <button className='active'>LISTED <GreentickIcon /></button>
                                    <button >UNLIST</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={6}>
                        <div className='passes_card'>
                            <div className='passes_card_imageinfo'>
                                <img src={Passes2} alt='card_image' />
                                <h6>23/50</h6>
                            </div>
                            <div className='passes_card_textinfo'>
                                <h5>SP3</h5>
                                <p>3-day express pass</p>
                                <ul className='textlist'>
                                    <li>
                                        <label>Redeemable Nights</label>
                                        <p>3x nights per year</p>
                                    </li>
                                    <li>
                                        <label>Total Redeemable</label>
                                        <p>30 nights</p>
                                    </li>
                                </ul>
                                <hr className='linespace' />
                                <div className='offierinfo'>
                                    <label>Perks</label>
                                    <p>5% off on restaurant F&B</p>
                                    <p>5% off on villa resort services</p>
                                    <p>Free shuttle to-and from airport</p>
                                </div>
                                <h3>$2999</h3>
                                <div className='listedbtn'>
                                    <button className='active'>LISTED <GreentickIcon /></button>
                                    <button >UNLIST</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={6}>
                        <div className='passes_card'>
                            <div className='passes_card_imageinfo'>
                                <img src={Passes3} alt='card_image' />
                                <h6>23/50</h6>
                            </div>
                            <div className='passes_card_textinfo'>
                                <h5>SP3</h5>
                                <p>3-day express pass</p>
                                <ul className='textlist'>
                                    <li>
                                        <label>Redeemable Nights</label>
                                        <p>3x nights per year</p>
                                    </li>
                                    <li>
                                        <label>Total Redeemable</label>
                                        <p>30 nights</p>
                                    </li>
                                </ul>
                                <hr className='linespace' />
                                <div className='offierinfo'>
                                    <label>Perks</label>
                                    <p>5% off on restaurant F&B</p>
                                    <p>5% off on villa resort services</p>
                                    <p>Free shuttle to-and from airport</p>
                                </div>
                                <h3>$2999</h3>
                                <div className='listedbtn'>
                                    <button className='active'>LISTED <GreentickIcon /></button>
                                    <button >UNLIST</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={6} md={6}>
                        <div className='passes_card'>
                            <div className='passes_card_imageinfo'>
                                <img src={Passes4} alt='card_image' />
                                <h6>23/50</h6>
                            </div>
                            <div className='passes_card_textinfo'>
                                <h5>SP3</h5>
                                <p>3-day express pass</p>
                                <ul className='textlist'>
                                    <li>
                                        <label>Redeemable Nights</label>
                                        <p>3x nights per year</p>
                                    </li>
                                    <li>
                                        <label>Total Redeemable</label>
                                        <p>30 nights</p>
                                    </li>
                                </ul>
                                <hr className='linespace' />
                                <div className='offierinfo'>
                                    <label>Perks</label>
                                    <p>5% off on restaurant F&B</p>
                                    <p>5% off on villa resort services</p>
                                    <p>Free shuttle to-and from airport</p>
                                </div>
                                <h3>$2999</h3>
                                <div className='listedbtn'>
                                    <button className='active'>LISTED <GreentickIcon /></button>
                                    <button >UNLIST</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default Passes