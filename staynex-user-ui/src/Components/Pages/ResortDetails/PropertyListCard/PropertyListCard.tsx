import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import destinationimg from '../../../../Assets/Images/Destination.png';
import "./PropertyListCard.scss";
import ConnectWalletModal from '../../../Common/ConnectWalletModal/ConnectWalletModal';

const PropertyListCard = () => {
    const [show, setShow] = useState(false)
    const statSync = [
        {
            img: destinationimg,
            heading: "$4,999",
            stay_text: "SP7",
        },
        {
            img: destinationimg,
            heading: "$4,999",
            stay_text: "SP7",
        },
        {
            img: destinationimg,
            heading: "$4,999",
            stay_text: "SP7",
        },
    ];
    return (
        <>
            <div className='property_List_card'>
                {statSync.map((item) => {
                    return (
                        <div className='staynexpass_sec'>
                            <Row>
                                <Col xs={12} lg={4} className='d-flex pe-lg-0'>
                                    <div className='destination_pic w-100'>
                                        <img src={item.img} alt="destinationimg" />
                                    </div>
                                </Col>
                                <Col xs={12} lg={8} className='d-flex ps-lg-0'>
                                    <div className='destination_borderbox w-100'>
                                        <Row className='align-items-center'>
                                            <Col xs={12} lg={6}>
                                                <div className='staynexpass_text'>
                                                    <h3>{item.heading}</h3>
                                                    <p>{item.stay_text}</p>
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={6}>
                                                <div className='passtype'>
                                                    <Card className='passtype_card'>
                                                        <Card.Header>
                                                            <h3>PASS TYPE</h3>
                                                            <div className='passtype_text'>
                                                                <h4>SP7</h4>
                                                                <h4>3-day express pass</h4>
                                                            </div>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <h3>PASS TYPE</h3>
                                                            <p>3x nights per year</p>
                                                            <h3>PERKS</h3>
                                                            <h5>5%-off on restaurants</h5>
                                                            <h5> 5%-off on villa resort services</h5>
                                                            <h5> Free shuttle to-and-from airpot</h5>
                                                        </Card.Body>
                                                    </Card>
                                                    <button onClick={() => setShow(true)} type='button' className='btn-style w-100'>
                                                        Buy
                                                        <svg className='ms-4' width="141" height="31" viewBox="0 0 141 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <mask id="mask0_3308_7755" maskUnits="userSpaceOnUse" x="0" y="0" width="141" height="31">
                                                                <path d="M140.967 0.578369H0.966797V30.5784H140.967V0.578369Z" fill="white" />
                                                            </mask>
                                                            <g mask="url(#mask0_3308_7755)">
                                                                <path d="M111.311 15.9873H113.498L112.398 12.9727L111.311 15.9873ZM53.1277 13.1712C52.7526 12.9063 52.3151 12.7744 51.8722 12.7929C51.4269 12.7753 50.9871 12.907 50.6088 13.1712C50.2799 13.4092 50.0165 13.745 49.8477 14.1412C49.6823 14.5225 49.5964 14.941 49.5964 15.365C49.5964 15.7891 49.6823 16.2076 49.8477 16.5889C50.0157 16.9851 50.2794 17.3205 50.6088 17.5568C50.9865 17.8229 51.4266 17.9553 51.8722 17.9371C52.3154 17.9562 52.7532 17.8236 53.1277 17.5568C53.4525 17.3168 53.7131 16.9822 53.8817 16.5889C54.047 16.2075 54.1329 15.7891 54.1329 15.365C54.1329 14.941 54.047 14.5225 53.8817 14.1412C53.7125 13.7477 53.4521 13.4127 53.1277 13.1712ZM104.51 12.8344H103.179V15.0657H104.51C105.116 15.0657 105.765 14.7694 105.765 13.9437C105.765 13.1179 105.089 12.8334 104.51 12.8334M139.664 0.57838H10.5024C9.99072 0.573146 9.49422 0.773546 9.10262 1.14337L1.54661 8.4962C1.36766 8.66345 1.22316 8.87227 1.12306 9.10828C1.02296 9.34429 0.969648 9.60187 0.966797 9.86325L0.966797 16.9405C0.999745 17.2098 1.09784 17.4638 1.25042 17.6749C1.40299 17.886 1.60421 18.0461 1.83217 18.1377C2.06014 18.2294 2.30612 18.2491 2.54338 18.1948C2.78063 18.1404 3.00007 18.0141 3.17782 17.8295C5.60704 15.4589 7.65001 13.4695 10.41 10.7651C10.6709 10.5233 10.9987 10.3911 11.337 10.3911C11.6752 10.3911 12.003 10.5233 12.2639 10.7651C16.0181 14.4415 18.4227 16.7953 22.3133 20.6011C22.3455 20.6343 22.3749 20.6706 22.4013 20.7098C22.5885 20.923 22.6945 21.2095 22.6969 21.5088V21.5187L22.7277 29.1066C22.7229 29.4468 22.8329 29.7764 23.0357 30.0292C23.1881 30.2063 23.3713 30.3465 23.574 30.4409C23.7766 30.5354 23.9944 30.5822 24.2138 30.5784C24.5701 30.5784 82.2238 30.4579 95.878 30.2583C96.7719 30.2455 132.979 30.2416 133.271 30.2297C133.907 30.2116 134.518 29.9502 135.003 29.4889L140.171 24.4296C140.416 24.1995 140.614 23.9126 140.75 23.5886C140.887 23.2647 140.96 22.9113 140.963 22.5529V1.84567C140.939 1.48499 140.789 1.14972 140.545 0.9125C140.302 0.675284 139.985 0.555239 139.664 0.57838ZM35.2539 14.238L36.1135 14.399C38.2885 14.8247 39.4199 15.6831 39.4199 17.3148C39.4199 19.0059 37.6673 20.0894 35.4923 20.0894C33.4256 20.0894 31.5076 19.398 31.124 17.3326L33.5708 16.977C33.7046 17.4047 33.9644 17.7682 34.3073 18.0075C34.6501 18.2467 35.0555 18.3474 35.4563 18.2927C36.3159 18.2927 36.776 17.8976 36.776 17.386C36.776 16.9425 36.4294 16.6402 35.4967 16.4614L34.6371 16.2846C32.7728 15.9113 31.6026 15.0746 31.6026 13.5979C31.6026 11.8368 33.174 10.6268 35.458 10.6268C37.6145 10.6268 39.2052 11.6047 39.4252 13.4369L37.0118 13.7945C36.959 13.3854 36.768 13.0148 36.4784 12.7595C36.1888 12.5043 35.8228 12.384 35.4563 12.4235C34.6169 12.4235 34.177 12.87 34.177 13.3836C34.177 13.7945 34.47 14.075 35.2565 14.238M47.0067 13.0241H44.5573V17.1163C44.5573 17.4541 44.7227 17.6309 45.0702 17.6309H47.0058V19.804H44.1745C42.7114 19.804 41.9266 19.0227 41.9266 17.5993V13.0241H39.8422V10.9113H41.9266V8.2621H44.5573V10.9113H47.0067V13.0241ZM56.794 19.801H54.3868V18.5644H54.2777C54.1396 18.7615 53.9823 18.9408 53.8087 19.0987C53.5264 19.357 53.208 19.5613 52.8664 19.7032C52.3787 19.897 51.8632 19.9875 51.3461 19.9699C50.7069 19.9852 50.0719 19.8506 49.4817 19.5748C48.9761 19.3332 48.5222 18.9733 48.1505 18.5189C47.7999 18.0891 47.5286 17.5855 47.3525 17.0373C47.0036 15.9551 47.0036 14.77 47.3525 13.6878C47.5286 13.1395 47.7998 12.6359 48.1505 12.2062C48.5222 11.7518 48.976 11.3918 49.4817 11.1503C50.0719 10.8746 50.7069 10.74 51.3461 10.7552C51.8639 10.7361 52.3801 10.8293 52.8664 11.0298C53.2063 11.1758 53.5241 11.3797 53.8087 11.6343C53.9828 11.7886 54.1402 11.9653 54.2777 12.1608H54.3868V10.9261H56.7949L56.794 19.801ZM62.395 23.1811H59.635L61.3542 19.3931L57.6439 10.9073H60.4594L62.6704 16.3508L64.8427 10.9113H67.6582L62.395 23.1811ZM77.1877 19.9679H74.5209V14.8069C74.5209 13.5041 73.9305 12.8314 72.9099 12.8314C71.7661 12.8314 71.1722 13.7362 71.1722 15.042V19.9689H68.5063V10.9113H71.1731L71.1344 12.4314C71.4165 11.8805 71.8243 11.4238 72.3157 11.1084C72.8071 10.793 73.3645 10.6301 73.9305 10.6367C76.1679 10.6367 77.1859 12.0501 77.1859 14.5126L77.1877 19.9679ZM82.7209 20.2574C79.777 20.2574 78.0191 18.2285 78.0191 15.4559C78.0377 14.7871 78.1755 14.1293 78.4245 13.5214C78.6735 12.9134 79.0285 12.3677 79.4686 11.9165C79.9086 11.4653 80.4248 11.1177 80.9866 10.8943C81.5484 10.6709 82.1445 10.5762 82.7394 10.6159C85.2381 10.6159 87.2371 12.463 87.2371 15.0894C87.2436 15.4068 87.2123 15.7237 87.1439 16.0318H80.5539C80.5854 16.6427 80.8267 17.2162 81.2271 17.6316C81.6274 18.047 82.1557 18.2719 82.7007 18.2591C83.1151 18.2918 83.5279 18.174 83.8781 17.923C84.2282 17.672 84.4972 17.3012 84.6451 16.8654L87.1254 17.3188C86.7163 18.8587 85.3288 20.2524 82.7209 20.2524M96.6751 19.963H93.7312L91.8254 17.3721L89.9382 19.963H86.9784L90.3834 15.4697L86.9784 10.9053H89.9558L91.8254 13.514L93.7312 10.9053H96.6751L93.2701 15.4697L96.6751 19.963ZM104.594 17.0096H103.186V19.9917H100.825V10.8846H104.593C106.747 10.8846 108.195 12.1143 108.195 13.9466C108.195 15.7789 106.747 17.0195 104.593 17.0195M114.753 20.0015L114.016 17.9717H110.798L110.061 20.0015H107.537L111.109 10.8856H113.693L117.278 20.0015H114.753ZM120.808 14.2331L121.61 14.4188C123.579 14.884 124.535 15.8431 124.535 17.3494C124.535 19.0286 123.039 20.2001 120.894 20.2001C118.787 20.2001 117.415 19.2785 117.13 17.6734L117.093 17.466L119.361 16.9138L119.417 17.1341C119.507 17.4882 119.703 17.7965 119.972 18.0064C120.242 18.2164 120.567 18.3151 120.894 18.2858C121.5 18.2858 122.111 18.0231 122.111 17.4363C122.111 17.0067 121.676 16.7094 121.245 16.6047L120.443 16.4071C118.304 15.8836 117.432 15.0381 117.432 13.4893C117.432 11.8664 118.888 10.688 120.895 10.688C122.831 10.688 124.165 11.5711 124.567 13.112L124.625 13.3322L122.36 13.8864L122.298 13.674C122.209 13.3376 122.02 13.0456 121.762 12.8461C121.505 12.6466 121.195 12.5515 120.883 12.5766C120.293 12.5766 119.831 12.944 119.831 13.4142C119.831 13.7817 119.995 14.0474 120.809 14.2331M128.858 14.2331L129.659 14.4188C131.628 14.884 132.585 15.8421 132.585 17.3494C132.585 19.0286 131.089 20.2001 128.944 20.2001C126.832 20.2001 125.465 19.2785 125.179 17.6734L125.142 17.466L127.409 16.9138L127.466 17.1341C127.555 17.4884 127.752 17.7968 128.021 18.0068C128.291 18.2168 128.617 18.3154 128.944 18.2858C129.549 18.2858 130.16 18.0231 130.16 17.4363C130.16 17.0067 129.725 16.7094 129.294 16.6047L128.492 16.4071C126.354 15.8836 125.481 15.0381 125.481 13.4893C125.481 11.8664 126.937 10.688 128.944 10.688C130.879 10.688 132.213 11.5711 132.615 13.112L132.673 13.3322L130.409 13.8864L130.347 13.674C130.258 13.3376 130.068 13.0456 129.811 12.8461C129.554 12.6466 129.243 12.5515 128.932 12.5766C128.342 12.5766 127.88 12.944 127.88 13.4142C127.88 13.7817 128.044 14.0474 128.858 14.2331ZM82.7033 12.5618C82.2078 12.5292 81.7198 12.7095 81.3385 13.0662C80.9571 13.4228 80.7109 13.929 80.6498 14.482H84.6478C84.639 14.21 84.5809 13.943 84.477 13.6971C84.3731 13.4512 84.2257 13.2317 84.0437 13.052C83.8617 12.8723 83.649 12.7361 83.4185 12.6518C83.1881 12.5675 82.9447 12.5369 82.7033 12.5618Z" fill="#FDFDFD" />
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
                })}
            </div>

            <ConnectWalletModal
                show={show}
                handleClose={() => setShow(false)}
            />
        </>
    )
}

export default PropertyListCard
