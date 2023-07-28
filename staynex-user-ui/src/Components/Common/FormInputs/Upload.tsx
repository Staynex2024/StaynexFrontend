import React, { ReactNode } from 'react'
import { Form } from 'react-bootstrap'
import { PlusIcon } from '../../../Assets/Images/svgImgs/svgImgs'

type propTypes = {
    label?: string | ReactNode,
    rows?: number,
    id?: string,
    onChange?: any,
    name?: any,
    placeholder?: string,
    value?: any,
    error?: any,
    className?: any,
}

const Upload = (props: propTypes) => {
    return (
        <>
            <Form.Group className={`customInput ${props.className}`} controlId={props.id}>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <div className="file_up">
                    <Form.Control type="file" className='upload' />
                    <span><PlusIcon /></span>
                </div>
                <p className="error_Msg">{props.error}</p>
            </Form.Group>
        </>
    )
}

export default Upload