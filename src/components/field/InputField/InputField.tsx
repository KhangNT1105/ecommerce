import React, { Fragment } from 'react';
import { Col, FormFeedback } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import InputElement from 'components/field/InputField/InputElement';
import { ICustomInputEvent, IInputFieldProps } from 'components/field/InputType';

import {
  TEXT_AREA,
  TEXT_AREA_PROPERTY,
  DEFAULT_MAX_LENGTH_INPUT,
  DEFAULT_MIN_NUMBER_INPUT,
  DEFAULT_MAX_NUMBER_INPUT,
  TYPE
} from 'constants/index';

import './Field.scss';

const InputField: React.FC<IInputFieldProps & ICustomInputEvent> = (props) => {
  const { t } = useTranslation();
  const {
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
    style,
    touched,
    type,
    value = '',
    maxLength,
    readOnly,
    onChange,
    onKeyDown,
    max,
    min,
    updateOnValueChange
  } = props;
  const updateMaxLength =
    component === TEXT_AREA && maxLength === DEFAULT_MAX_LENGTH_INPUT ? TEXT_AREA_PROPERTY.MAX_LENGTH : maxLength;
  const minValue = type === TYPE.NUMBER ? min : '';
  const maxValue = type === TYPE.NUMBER ? max : '';

  return (
    <Fragment>
      {/* is not checkbox and radio */}
      <Col className="px-0">
        {type === TYPE.NUMBER ? (
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
            style={style}
            type={type}
            value={value}
            maxLength={updateMaxLength}
            readOnly={readOnly}
            onChange={onChange}
            onKeyDown={onKeyDown}
            max={maxValue}
            min={minValue}
            updateOnValueChange={updateOnValueChange}
          >
            {children}
          </InputElement>
        ) : (
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
            style={style}
            type={type}
            value={value}
            maxLength={updateMaxLength}
            readOnly={readOnly}
            onChange={onChange}
            onKeyDown={onKeyDown}
            updateOnValueChange={updateOnValueChange}
          >
            {children}
          </InputElement>
        )}
      </Col>

      {/* show error */}
      <Col xs={12} className="px-0 text-error">
        {/* show error text while only touched or processing handle change */}
        {touched && errorText && <FormFeedback className="text-danger">{t(errorText)}</FormFeedback>}
      </Col>
    </Fragment>
  );
};

InputField.defaultProps = {
  maxLength: 100,
  min: DEFAULT_MIN_NUMBER_INPUT,
  max: DEFAULT_MAX_NUMBER_INPUT
};

export default InputField;
