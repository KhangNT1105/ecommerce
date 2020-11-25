import React from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import { Props } from './TextField.d';

const TextField: React.FC<Props> = ({ name, validate, addOn, type, pattern, placeholder = '', disabled, ...props }) => {
  const { t } = useTranslation();
  const [field, meta, helpers] = useField({ name, validate });
  const { setValue } = helpers;
  const newPattern = type === 'number' ? '[0-9]*' : pattern;

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue.trim());
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const newValue = e.currentTarget.validity.valid ? e.currentTarget.value : meta.value;
      setValue(newValue);
    } else {
      setValue(e.currentTarget.value);
    }
  };

  const invalid = !!(meta.touched && meta.error);
  return (
    <>
      {addOn ? (
        <>
          <InputGroup>
            <Input
              addon={true}
              {...props}
              {...field}
              invalid={invalid}
              value={meta.value}
              onBlur={handleBlur}
              pattern={newPattern}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={disabled}
            />
            <InputGroupAddon addonType="append" className={!!invalid ? 'invalid' : ''}>
              <InputGroupText>{addOn}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {invalid ? <FormFeedback style={{ display: 'block' }}>{t(meta.error || '')}</FormFeedback> : null}
        </>
      ) : (
        <>
          <Input
            addon={true}
            {...field}
            {...props}
            invalid={invalid}
            value={meta.value}
            onBlur={handleBlur}
            pattern={newPattern}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
          />
          {invalid ? <FormFeedback>{t(meta.error || '')}</FormFeedback> : null}
        </>
      )}
    </>
  );
};

export default TextField;
