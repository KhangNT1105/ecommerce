import { FILE_SIZE_IMG } from 'constants/index';
import { useField } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormFeedback, Input } from 'reactstrap';
import { ValidateExtensionImg, ValidateSizeImg, validFileExtensions } from 'utils/validation';

import { Props } from './InputFile.d';

const InputFile: React.FC<Props> = ({
  name,
  validate,
  type,
  placeholder = '',
  disabled,
  accept,
  requestUrl = () => {},
  ...props
}) => {
  const { t } = useTranslation();
  const [field, meta] = useField({ name, validate });

  const [errorFileExtension, setErrorFileExtension] = useState<boolean>(false);
  const [errorFileSize, setErrorFileSize] = useState<boolean>(false);
  const [acceptedTypes, setAcceptedTypes] = useState<string>('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    const { accept = '' } = e.currentTarget.dataset;
    if (files && files.length > 0) {
      const file = files[0];
      const validationType = ValidateExtensionImg({
        oInput: e.currentTarget,
        acceptTypeFile: e.currentTarget.dataset.filetype || ''
      });
      const validationSize = ValidateSizeImg(e.currentTarget);
      if (validationType && validationSize) {
        setErrorFileExtension(true);
        setErrorFileSize(true);
        requestUrl(file);
      } else {
        setAcceptedTypes(accept || validFileExtensions.join(', '));
        setErrorFileExtension(validationType);
        setErrorFileSize(validationSize);
      }
    }
  };

  const invalid = !!(meta.touched && meta.error);

  return (
    <>
      <Input
        addon={true}
        {...field}
        {...props}
        invalid={invalid}
        value={meta.value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        accept={accept}
      />
      {accept ? (
        <>
          {!errorFileExtension ? (
            <FormFeedback>
              {t('ERROR_EXTENSION')} {acceptedTypes}
            </FormFeedback>
          ) : null}
          {!errorFileSize ? (
            <FormFeedback>{t('ERROR_LIMIT_SIZE', { value: `${FILE_SIZE_IMG}MB` })}</FormFeedback>
          ) : null}
        </>
      ) : null}

      {invalid ? <FormFeedback>{t(meta.error || '')}</FormFeedback> : null}
    </>
  );
};

export default InputFile;
