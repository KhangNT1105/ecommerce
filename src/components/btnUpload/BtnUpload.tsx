import React from 'react';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { IBtnUploadProps } from './BtnUpload.d';
import Button from 'components/button/Button';

const BtnUpload: React.FC<IBtnUploadProps> = ({ handleUpload, type }) => {
  const { t } = useTranslation();
  const onDrop = (fileUpload: File[]) => {
    handleUpload(fileUpload[0]);
  };
  return (
    <Dropzone accept={type} noClick={true} noKeyboard={true} onDrop={onDrop} multiple={false}>
      {({ getInputProps, open }: any) => {
        return (
          <>
            <input {...getInputProps()} />
            <Button color="light" size="sm" onClick={open}>
              {t('UPLOAD')}
            </Button>
          </>
        );
      }}
    </Dropzone>
  );
};

export default BtnUpload;
