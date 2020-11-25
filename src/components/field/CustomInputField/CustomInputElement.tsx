import React from 'react';
import { useField } from 'formik';
import { CustomInput } from 'reactstrap';

import { ICustomInputEvent, ICustomInputFieldProps } from 'components/field/InputType';
import { CLASS_NAME } from 'constants/enum';

import './Field.scss';

const CustomInputElement: React.FC<ICustomInputFieldProps & ICustomInputEvent> = (props) => {
  const { component, checked, disabled, errorText, id, invalid, label, name, type, value, readOnly, onChange } = props;
  const [, , helpers] = useField({ name });
  const { setValue } = helpers;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // set current value to display in input
    setValue(e.currentTarget.checked);

    // validate field
    const isValidValue = e.currentTarget.validity && e.currentTarget.validity.valid;
    if (!errorText && isValidValue) {
      // call api if have onChange fn
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <CustomInput
      className={`${readOnly ? CLASS_NAME.READONLY : ''}`}
      component={component}
      checked={checked}
      disabled={disabled}
      id={id}
      invalid={invalid}
      label={label}
      name={name}
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={handleChange}
    />
  );
};

export default CustomInputElement;
