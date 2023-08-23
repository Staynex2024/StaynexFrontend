import React, { ReactNode } from 'react'
import './Select.scss'
import Select from 'react-select'
import { Form } from 'react-bootstrap'

type valueType = { value: string | number; label: string | ReactNode }
type propsType = {
  defaultValue?: valueType
  onChange?: any
  options?: valueType[]
  genderList?: valueType[]
  menuIsOpen?: boolean
  className?: string
  name?: string
  label?: any
  placeholder?: any
  isSearchable?: any
  controlId?: any
  id?: any
  classLabel?: any
  classgroup?: any
  error?: any
  isClearable?: any
  value?: valueType
}

const CustomSelect = ({
  classgroup,
  className,
  menuIsOpen,
  defaultValue,
  onChange,
  options,
  genderList,
  name,
  label,
  controlId,
  placeholder,
  isSearchable,
  id,
  classLabel,
  error,
  isClearable,
  value,
}: propsType) => {
  return (
    <>
      <Form.Group className={`customInput ${classgroup}`} controlId={controlId}>
        {label ? (
          <Form.Label htmlFor={id} className={classLabel}>
            {label}
          </Form.Label>
        ) : (
          ''
        )}
        <Select
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          // genderList={genderList}
          className={`common_select ${className}`}
          classNamePrefix={'select'}
          menuIsOpen={menuIsOpen}
          name={name}
          placeholder={placeholder}
          isSearchable={isSearchable}
          isClearable={isClearable}
          value={value}
        />
        {error ? error : ""}
      </Form.Group>
    </>
  )
}

export default CustomSelect
