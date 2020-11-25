import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Toast from '../../components/toast/Toast';
import { TOAST_TYPE, POSITION } from '../../constants/enum';
import ArtWork from './ArtWork';
import DropZoneArea from '../dropzone/DropZoneArea';
import CONFIG from '../../config';
import { UPLOAD_ACCEPT_FILE_TYPE, FILE_DROPZONE_MIN_SIZE, FILE_DROPZONE_MAX_SIZE } from 'constants/dropzone';

const defaultDropzoneProps = {
  apiURL: CONFIG.API.UPLOAD_SERVICE,
  files: [],
  autoUpload: true,
  config: {
    accept: UPLOAD_ACCEPT_FILE_TYPE,
    disabled: false,
    noClick: false,
    noKeyboard: false,
    minSize: FILE_DROPZONE_MIN_SIZE,
    maxSize: FILE_DROPZONE_MAX_SIZE /* 1 MB */
  },
  pushData: {
    error: false,
    msg: 'OK',
    infos: {
      title: 'Hero Banner Desktop and big screens',
      url: 'https://i.pinimg.com/236x/0a/8b/fb/0a8bfb162ef8a917f1e4d4bf5cd08e4c--android-apps-cover-art.jpg',
      size: '12222'
    }
  }
};

const defaultProps = {
  name: 'artwork',
  title: 'Key Artwork (Arabic)',
  subTitle: 'ARTWORD_SUBTITLE',
  items: [
    {
      title: 'POSTER',
      component: (getMess: any): any => (
        <DropZoneArea
          {...defaultDropzoneProps}
          getData={(e: any) => {
            getMess(e);
          }}
        />
      ),
      status: true
    },
    {
      title: 'LANDSCAPE',
      component: (getMess: any): any => (
        <DropZoneArea
          {...defaultDropzoneProps}
          getData={(e: any) => {
            getMess(e);
          }}
        />
      ),
      status: true
    },
    {
      title: 'HERO_BANNER_DESKTOP_AND_BIG_SCREEN',
      component: (getMess: any): any => (
        <DropZoneArea
          {...defaultDropzoneProps}
          getData={(e: any) => {
            getMess(e);
          }}
        />
      ),
      status: true
    },
    {
      title: 'HERO_BANNER_MOBILE_LANDSCAPE',
      component: (getMess: any): any => (
        <DropZoneArea
          {...defaultDropzoneProps}
          getData={(e: any) => {
            getMess(e);
          }}
        />
      ),
      status: false
    }
  ]
};

const DEMO: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState(false);

  const handleClose = () => {
    setMessage('');
  };

  const getDataHandler = (datas: any) => {
    if (datas) {
      setError(datas.error);
      setMessage(datas.msg);
    }
  };

  return (
    <>
      <ArtWork {...defaultProps} getData={getDataHandler} />
      {message !== '' && (
        <Toast
          message={message}
          type={error ? TOAST_TYPE.ERROR : TOAST_TYPE.SUCCESS}
          position={POSITION.BOTTOM_RIGHT}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

storiesOf('ArtWork', module).add('default', () => <DEMO />);
