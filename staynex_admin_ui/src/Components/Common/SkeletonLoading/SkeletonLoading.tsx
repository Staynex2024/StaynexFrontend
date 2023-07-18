import React from 'react'
import { Card, Col, Placeholder, Row } from 'react-bootstrap';

const SkeletonLoading = (props: any) => {
    return (

        props.field.map((item, index) => {
            return <div className='my-5' key={item}>
                <Row className='main_containt align-items-center'>
                    <Col xs={12} lg={4} className='main_containt_left'>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder className="Demo_Images" xs={12} />
                        </Placeholder>
                    </Col>
                    <Col xs={12} lg={8} className='main_containt_right'>
                        <Row className='align-items-center'>
                            <Col xs={12} lg={6}>
                                <div className='right_textsec'>
                                    <div className='Placeholder_trans'>
                                        <Placeholder as={Card.Title} animation="glow">
                                            <Placeholder xs={12} className="py-3" />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation="glow">
                                            <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={4} />
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation="glow">
                                            <Placeholder xs={4} /> <Placeholder xs={4} />
                                        </Placeholder>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} lg={6} className='text-end'>
                                <div className='right_btnsec'>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder className="py-4" xs={5} />
                                    </Placeholder>
                                </div>
                            </Col>
                        </Row>


                    </Col>
                </Row>

            </div>

        })
    )
}

export default SkeletonLoading