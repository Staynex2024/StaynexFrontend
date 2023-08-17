import { Col, Container, Row } from 'react-bootstrap'
import '../AboutUs.scss'
import partner_img from '../../../../Assets/Images/partner-img.png'

const OfficialPartner = () => {
    const partner = [
        {
            content: "Stay at your most favourite places in London",
        },
        {
            content: "Watch Arsenal FC matches at the Emirates Stadium",
        },
        {
            content: "Get a 'behind-the-scenes' tour of London Colney",
        },
        {
            content: "And a whole lot more!",
        },
    ];
    return (
        <section className='partner_sec'>
            <Container>
                <div className='partner_area'>
                    <div className='partner_head'>
                        <h2>OFFICIAL PARTNER</h2>
                        <img src={partner_img} alt="parnter-img" />
                        <p>We're proud to announce Staynex as Arsenal FC's Official Hotel and Resort Membership NFT Partner.
                            Stay tuned to enjoy an experience of a lifetime!
                        </p>
                    </div>
                    <div className='partner_box'>
                        <Row className="mx-0">
                            {partner.map((data, i) => {
                                return (
                                    <Col key={i} sm={6} md={3} className='d-flex'>
                                        <div className='partner_card w-100'>
                                            <p>{data.content}</p>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default OfficialPartner
