import React, { ReactNode } from 'react'
import { Form } from 'react-bootstrap'

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

const TextArea = (props: propTypes) => {
    return (
        <>
            <Form.Group className={`customInput ${props.className}`} controlId={props.id}>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <div className="customInput_inner">
                    <Form.Control placeholder={props.placeholder} name={props.name} as="textarea" rows={props.rows || 3} onChange={props.onChange} value={props.value} />
                </div>
                <p className="error_Msg">{props.error}</p>
            </Form.Group>
        </>
    )
}

export default TextArea
