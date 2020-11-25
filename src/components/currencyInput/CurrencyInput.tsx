import { useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Props } from './CurrencyInput.d';

const CurrencyInput: React.FC<Props> = ({ currency = '', name, placeholder }) => {
  const { t } = useTranslation();
  const [, meta, helpers] = useField({ name });
  const { value } = meta;
  const { setValue } = helpers;
  const invalid = !!(meta.touched && meta.error);

  const handleChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.validity.valid ? e.currentTarget.value : value;
      setValue(newValue);
    },
    [setValue, value]
  );

  return (
    <>
      <InputGroup>
        <Input
          type="text"
          pattern="^\d*(\.\d{0,2})?$"
          maxLength={10}
          value={value}
          placeholder={placeholder}
          invalid={invalid}
          onChange={handleChange}
        />
        <InputGroupAddon addonType="append" className={!!invalid ? 'invalid' : ''}>
          <InputGroupText data-testid="currency-label">{currency}</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {invalid ? <FormFeedback>{t(meta.error || '')}</FormFeedback> : null}
    </>
  );
};

export default CurrencyInput;
