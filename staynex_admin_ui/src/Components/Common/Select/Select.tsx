import React, { ReactNode } from "react";
import "./Select.scss";
import Select from "react-select";
import { Form } from "react-bootstrap";

type valueType = { value: string | number; label: string | ReactNode };
type propsType = {
  defaultValue?: valueType;
  onChange?: any;
  options?: valueType[];
  menuIsOpen?: boolean;
  className?: string;
  name?: string;
  label?: any;
  controlId?: any;
  id?: any;
  classLabel?: any;
  classgroup?: any;
  isSearchable?: any;
  value?: any;
  placeholder?: any;
};

const CustomSelect = ({
  classgroup,
  className,
  menuIsOpen,
  defaultValue,
  onChange,
  options,
  name,
  label,
  controlId,
  id,
  classLabel,
  isSearchable,
  placeholder,
}: propsType) => {
  return (
    <>

      <Form.Group
        className={`customInput ${classgroup}`}
        controlId={controlId}
      >
        {label ? (
          <Form.Label htmlFor={id} className={classLabel}>
            {label}
          </Form.Label>
        ) : (
          ""
        )}
        <Select
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          className={`common_select ${className}`}
          classNamePrefix={"select"}
          menuIsOpen={menuIsOpen}
          name={name}
          isSearchable={isSearchable}
          placeholder={placeholder}
        />
      </Form.Group>
    </>
  );
};

export default CustomSelect; 
