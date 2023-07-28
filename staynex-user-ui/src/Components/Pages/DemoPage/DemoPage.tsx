import React, { useState } from 'react'
import "./DemoPage.scss"
import { Container } from 'react-bootstrap'
import DemoModal from './DemoModal/DemoModal'
import CommonButton from '../../Common/CommonButton/CommonButton'

const DemoPage = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className='Home_page py-5'>
                <Container>
                    <CommonButton title="Open Modal" onClick={() => setShow(true)} />
                </Container>
            </div>

            <DemoModal
                show={show}
                handleClose={() => setShow(false)}
            />
        </>
    )
}
 
export default DemoPage

