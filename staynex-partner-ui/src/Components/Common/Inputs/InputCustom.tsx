import { Form } from 'react-bootstrap'
import { allowOnlyString } from '../../../Services/common.service'
import './InputCustom.scss'

/** CUSTOM COMMON INPUT FIELD WITH DYNAMIC PROPS */
const InputCustom = (props: any) => {
  /** RESTRICT USER TO ENTER e, E, +, -, . IN INPUT TYPE NUBER */
  const disabledCharacters = ['e', 'E', '+', '-']
  const onKeyDown = (e:any) => {
    if (props.disableDecimal) {
      disabledCharacters.push('.')
    }

    if (props.canGiveSpace) {
      return
    } else if (e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault()
    }

    /** RESTRICT USER TO ENTER MORE THEN MAX LENGTH IN INPUT TYPE NUBER */
    return props.type === 'number'
      ? (disabledCharacters.includes(e.key) ||
          (e.key !== 'Backspace' &&
            props.maxlength &&
            e.target.value.length === props.maxlength)) &&
          e.preventDefault()
      : props.onlyChar
      ? !allowOnlyString(e.key) && e.preventDefault()
      : null
  }

  return (
    <>
      <Form.Group
        className={`customInput ${props.className}`}
        controlId={props.controlId}
      >
        {props.label ? (
          <Form.Label htmlFor={props.id} className={props.classLabel}>
            {props.label}
          </Form.Label>
        ) : (
          ''
        )}
        <div className="customInput_inner">
          {props.icon ? (
            <span className={`input_Icon ${props.classIcon}`}>
              {props.icon}
            </span>
          ) : (
            ''
          )}
          <Form.Control
            disabled={props.disabled}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
            onKeyDown={onKeyDown}
            placeholder={props.placeholder}
            onBlur={props.onBlur}
            onChange={props.onChange}
            maxLength={props.maxLength ? props.maxLength : ''}
            required={props.required}
            min={props.min}
            max={props.max}
            isInvalid={props.isInvalid}
            onPaste={(e) =>
              props.onlyChar ? e.preventDefault() : props.onChange
            }
            onWheel={props.onWheel}
            step={props.step}
            autoComplete={props.onlyChar ? props.autoComplete : 'off'}
            pattern="\S(.*\S)?"
            title={props.title ? props.title : 'Blank space are not allowed'}
            onInvalid={props.onInvalid}
            onInput={props.onInput}
            className={props.inputtext}
            readOnly={props.readOnly}
          />
          {props.icontwo ? (
            <span className={`input_Icontwo ${props.classIcontwo}`}>
              {props.icontwo}
            </span>
          ) : (
            ''
          )}
          {props.children}
        </div>
        <p className="error_Msg">{props.error}</p>
        {props.smallText ? (
          <Form.Text id="" muted className="small-text-form">
            {props.smallText}
          </Form.Text>
        ) : (
          ''
        )}
      </Form.Group>
    </>
  )
}
export default InputCustom
