import React, { Fragment } from 'react';
import { InputGroup, Col, FormFeedback } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import InputElement from 'components/field/InputField/InputElement';
import { InputGroupAddon } from 'components/field/InputGroupField/InputGroupAddon';
import { ICustomInputEvent, IInputFieldProps } from 'components/field/InputType';

import './Field.scss';

const InputGroupField: React.FC<IInputFieldProps & ICustomInputEvent> = (props) => {
  const { t } = useTranslation();
  const {
    addonAppendInput,
    addonPrependInput,
    checked,
    children,
    component,
    disabled,
    errorText,
    id,
    invalid,
    label,
    multiple,
    name,
    placeholder,
    touched,
    type,
    value,
    onChange
  } = props;

  return (
    <Fragment>
      <Col className="px-0">
        <InputGroup>
          {addonPrependInput && <InputGroupAddon addonType="prepend">{addonPrependInput}</InputGroupAddon>}
          <InputElement
            checked={checked}
            component={component}
            disabled={disabled}
            id={id}
            invalid={invalid}
            label={label}
            multiple={multiple}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
          >
            {children}
          </InputElement>
          {addonAppendInput && <InputGroupAddon addonType="append">{addonAppendInput}</InputGroupAddon>}
        </InputGroup>
      </Col>
      {/* show error */}
      <Col xs={12} className="px-0 text-error">
        {/* show error text while only touched or processing handle change */}
        {touched && errorText && <FormFeedback className="text-danger">{t(errorText)}</FormFeedback>}
      </Col>
    </Fragment>
  );
};

export default InputGroupField;
