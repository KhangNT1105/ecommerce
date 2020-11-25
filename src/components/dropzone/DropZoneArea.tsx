import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { clone } from 'lodash';
import get from 'lodash/get';

import { IDropZone } from './DropZoneAreaType';
import DropzonePreview from './preview/DropzonePreview';
import API from 'api/';
import {
  UPLOAD_ACCEPT_FILE_TYPE,
  FILE_DROPZONE_MIN_SIZE,
  FILE_DROPZONE_MAX_SIZE,
  RESOLUTION_MIN_SIZE_LANDSCAPE,
  RESOLUTION_MIN_SIZE_PORTRAIT
} from 'constants/dropzone';
import { DROPZONE_EVENT_TYPE } from 'constants/enum';
import { notify } from 'components/toast/Toast';

import 'components/dropzone/Dropzone.scss';

const DropZoneArea: React.FC<IDropZone> = (props) => {
  const { t } = useTranslation();
  const { apiURL, files, autoUpload, config, getData, pushData } = props;

  const [fileHandle, setfileHandle] = useState<File[]>([]);
  const [filesUpload, setFilesUpload] = useState<boolean>(false);
  const [fileResponse, setFileResponse] = useState<object>();
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [resolutionMediaMinSize, setResolutionMediaMinSize] = useState<string>('');
  const [mediaTypeError, setMediaTypeError] = useState<boolean>(false);

  const form = React.useRef() as React.MutableRefObject<HTMLFormElement>;

  const formData = new FormData(form.current);

  let eventStatus: string;
  const onDrop = (files: File[], rejectedFiles: File[]) => {
    if (!rejectedFiles) {
      pushData.infos.fileName = files[0].name;
    }

    setfileHandle(files);
    // Check bypass for autoupload
    if (autoUpload || !autoUpload || eventStatus !== DROPZONE_EVENT_TYPE.DROP) {
      setIsDrag(true);
      onFileUpload(files);
    }

    // check image dimension
    // clone file to avoid control param
    const dropFiles = (rejectedFiles.length > 0 && clone(rejectedFiles)) || clone(files);
    if (config.accept.indexOf('image/') > -1) {
      // call FileReader to get media's solution
      const reader = new FileReader();
      reader.onload = function () {
        const image: any = new Image();
        image.src = reader.result;

        image.onload = function () {
          let resolutionMedia = '';
          // validate if image dimension is smaller than requirement
          if (image.width < RESOLUTION_MIN_SIZE_LANDSCAPE || image.height < RESOLUTION_MIN_SIZE_PORTRAIT) {
            // is landscape
            resolutionMedia = `${RESOLUTION_MIN_SIZE_LANDSCAPE}x${RESOLUTION_MIN_SIZE_PORTRAIT}`;
            // is portrait
            if (image.width < image.height) {
              resolutionMedia = `${RESOLUTION_MIN_SIZE_PORTRAIT}x${RESOLUTION_MIN_SIZE_LANDSCAPE}`;
            }
          } else {
            resolutionMedia = '';
          }

          // set resolution media
          setResolutionMediaMinSize(resolutionMedia);
        };
      };

      // call readAsDataURL to recall onload fn
      reader.readAsDataURL(dropFiles[0]);
    }
  };

  const onDropRejected = (rejectedFiles: File[]) => {
    if (rejectedFiles.length > 0) {
      // validate if image type is not in requirement
      if (props.config.accept.indexOf(rejectedFiles[0].type) === -1) {
        setMediaTypeError(true);
      }
    }
  };

  const { rejectedFiles, getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    ...config,
    onDrop,
    onDropRejected
  });

  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > config.maxSize;

  // Remove a file
  const onRemoveFile = (file: number) => {
    setfileHandle(files.slice(file));

    // reset all prev state
    setMediaTypeError(false);
    setResolutionMediaMinSize('');
  };

  const onFileUpload = async (files: File[]) => {
    if (files.length > 0) {
      files.forEach((file: File) => {
        formData.append('files', file, file.name);
      });
      await postData(formData);
    }
  };

  const onSendDatas = (datas: object) => {
    if (getData) {
      getData && getData(datas);
    }
  };

  const postData = async (datas: any) => {
    try {
      await API({
        url: apiURL,
        params: '',
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: datas
      })
        .then((resp: any) => {
          notify.success(t('CREATED_CAST_SUCCESSFULLY'));
          if (resp) {
            setFilesUpload(true);
            setFileResponse(pushData);
            onSendDatas(pushData);
          }
        })
        .catch((error: any) => {
          const userMessage = get(error, 'response.userMessage', '');
          if (userMessage) {
            notify.error(userMessage);
            return;
          }
        });
    } catch {
      setFilesUpload(false);
    }
  };

  const onDragHandle = (e: React.MouseEvent) => {
    eventStatus = e.type;
  };

  const renderErrorMessage = () => {
    const mimeType = config.accept.replace(new RegExp('image/|video/', 'g'), '').toUpperCase();

    return (
      <div className="error-container">
        <small className="small">
          {!isDragActive && !isFileTooLarge && !resolutionMediaMinSize && t('DROPZONE_IS_DRAG_ACTIVE')}
        </small>
        <small className="small">{isDragActive && !isDragReject && t('DROPZONE_DROP_TO_FILE')}</small>
        <small className="small">{mediaTypeError && t('DROPZONE_FILE_TYPE_NOT_ALLOWED', { mimeType })}</small>
        <small className="small">
          {isFileTooLarge && t('DROPZONE_IS_FILE_TOO_LARGE', { maxSize: config.maxSize })}
        </small>
        <small className="small">
          {resolutionMediaMinSize &&
            t('DROPZONE_IS_FILE_RESOLUTION_TOO_SMALL', {
              resolutionMediaMinSize
            })}
        </small>
      </div>
    );
  };

  const renderReview = () => {
    if (!isFileTooLarge && !resolutionMediaMinSize) {
      return (
        <DropzonePreview
          files={fileHandle}
          onFileRemove={onRemoveFile}
          onFileUpload={() => onFileUpload(fileHandle)}
          status={filesUpload}
          datas={fileResponse}
          drag={isDrag}
        />
      );
    }
  };

  return (
    <section className="dropzone--wrapper">
      <div
        {...getRootProps({
          className: 'dropzone',
          onDrop: (e) => {
            onDragHandle(e);
          },
          onClick: (e) => {
            onDragHandle(e);
          }
        })}
        className="dropzone"
      >
        <div>
          <i className="fa fa-cloud-upload fa-fw fa-3x mb-3" />
          <form encType="multipart/form-data" ref={form}>
            <input {...getInputProps()} />
          </form>
          <h5 className="mt-0">{t('DROPZONE_MENTION_TEXT')}</h5>

          {renderErrorMessage()}
        </div>
      </div>
      {renderReview()}
    </section>
  );
};

DropZoneArea.defaultProps = {
  apiURL: '',
  files: [],
  config: {
    accept: UPLOAD_ACCEPT_FILE_TYPE,
    disabled: false,
    noClick: false,
    noKeyboard: false,
    minSize: FILE_DROPZONE_MIN_SIZE,
    maxSize: FILE_DROPZONE_MAX_SIZE /* 1 MB */
  }
};

export default DropZoneArea;
