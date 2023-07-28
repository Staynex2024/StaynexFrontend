import React, { ReactNode } from 'react'
import { Form } from 'react-bootstrap'

type propTypes = {
    id?: string,
    label?: string | ReactNode,
    name?: string,
    disabled?: boolean,
    onChange?: any,
    value?: any
    className?: string,
    labelleft?: any,
}

const Switch = (props: propTypes) => {
    return (
        <>
            <Form.Group className={`${props.className} checkbox_input`} controlId={props.id}>
                {props.labelleft && <Form.Label className='label_left'>{props.labelleft}</Form.Label>}
                <Form.Check
                    className='form-check'
                    disabled={props.disabled}
                    type="switch"
                    id={props.id}
                    label={props.label}
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                />
            </Form.Group>

        </>
    )
}

export default Switch
