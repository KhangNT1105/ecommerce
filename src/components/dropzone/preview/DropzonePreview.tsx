import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { IDropZoneFile } from '../DropZoneAreaType';
import Button from '../../button/Button';
import LoadingBar from '../../loadingBar/LoadingBar';

const DropZonePreview: React.FC<IDropZoneFile> = (props) => {
  const { t } = useTranslation();
  const { files, onFileRemove, onFileUpload, status, datas, drag } = props;

  const [fileStatus, setFileStatus] = useState(false);

  useEffect(() => {
    drag && setFileStatus(true);
  }, [drag]);

  const onFileUploadHandler = (file: any) => {
    if (onFileUpload) {
      setFileStatus(true);
      onFileUpload && onFileUpload(file);
    }
  };

  const renderDropzonePreview = () => {
    return files.map((file: any, index: number) => (
      <div
        className="align-items-center mb-0 mt-0 dropzone--preview"
        key={`${file.size}${index}`}
        style={
          status
            ? {
                backgroundImage: `url(${status && datas ? datas.infos.url : URL.createObjectURL(file)})`
              }
            : {}
        }
      >
        {!status && (
          <>
            <div className="dropzone--preview-info d-flex">
              <i
                className="fa fa-times fa-fw text-danger"
                onClick={() => {
                  onFileRemove(file);
                  setFileStatus(false);
                }}
              />
              <p>
                <small className="small">
                  <span className="text-nowrap">{file.name}</span>
                </small>
              </p>
              {
                // Pending HIDE button when autoload
                !drag && (
                  <Button type="button" disabled={fileStatus} onClick={() => onFileUploadHandler(file)}>
                    <small className="small">{fileStatus ? t('UPLOADING') : t('UPLOAD')}</small>
                  </Button>
                )
              }
            </div>
            <div
              className="dropzone--preview-image"
              style={{
                backgroundImage: `url(${!datas ? URL.createObjectURL(file) : datas.infos.url})`
              }}
            />
            {fileStatus ? <LoadingBar /> : <></>}
          </>
        )}
      </div>
    ));
  };

  return <>{renderDropzonePreview()}</>;
};

DropZonePreview.defaultProps = {
  files: [],
  drag: false
};

export default DropZonePreview;
