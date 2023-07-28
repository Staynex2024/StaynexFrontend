import React from 'react';
import './Commoncard.scss';

const Commoncard = ({ className, hotelimag, hoteltitle, adderss, hotellist, bedroom, bathroom, area, price, }: any) => {
    return (
        <>
            <div className={`commoncard ${className} `}>
                <img src={hotelimag} alt='hotelimag' />
                <h5>{hoteltitle}</h5>
                <h6>{adderss}</h6>
                {hotellist && <div className='info_hotel'>
                    <p>{bedroom}</p>
                    <p>{bathroom}</p>
                    <p>{area}</p>
                </div>}
                {price && <p>{price}</p>}
            </div>
        </>
    )
}

export default Commoncard