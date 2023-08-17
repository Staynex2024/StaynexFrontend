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
    type?: any,
    accept?: any,
    required?: any,
    maxLength?: any,
    onClick?: any,
    disabled?: any,
    imgName?: any,
}

const Upload = (props: propTypes) => {
    return (
        <>
            <Form.Group className={`customInput ${props.className}`} controlId={props.id}>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <div className="file_up">
                    <Form.Control
                        type={props?.type}
                        className='upload'
                        name={props?.name}
                        disabled={props?.disabled}
                        placeholder={props?.placeholder}
                        value={props?.value}
                        onChange={(event: any) => {
                            props?.onChange(event)
                        }}
                        required={props?.required || false}
                        maxLength={props?.maxLength || 999999999999}
                        isInvalid={props?.error}
                        accept="application/pdf, image/jpeg, image/jpg, images/png"
                        onClick={props?.onClick}
                    />
                    <span><PlusIcon /></span>
                </div>

                <p className="error_Msg">{props.error}</p>
                <p className=''>{props?.imgName}</p>
            </Form.Group>
        </>
    )
}

export default Upload