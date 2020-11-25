import React, { Fragment } from 'react';
import { Col, FormFeedback } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import CustomInputElement from 'components/field/CustomInputField/CustomInputElement';
import { ICustomInputEvent, ICustomInputFieldProps } from 'components/field/InputType';

import './Field.scss';

const CustomInputField: React.FC<ICustomInputFieldProps & ICustomInputEvent> = (props) => {
  const { t } = useTranslation();
  const {
    component,
    checked,
    disabled,
    errorText,
    id,
    invalid,
    label,
    name,
    touched,
    type,
    value,
    readOnly,
    onChange
  } = props;

  return (
    <Fragment>
      {/* is checkbox or radio */}
      <Col className="pl-20">
        <CustomInputElement
          component={component}
          checked={checked}
          disabled={disabled}
          id={id}
          invalid={invalid}
          label={label}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
      </Col>

      {/* show error */}
      <Col xs={12} className="px-0 text-error">
        {/* show error text while only touched or processing handle change */}
        {touched && errorText && <FormFeedback className="text-danger">{t(errorText)}</FormFeedback>}
      </Col>
    </Fragment>
  );
};

export default CustomInputField;
