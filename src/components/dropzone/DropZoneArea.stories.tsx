import React from 'react';
import { storiesOf } from '@storybook/react';

import DropZoneArea from './DropZoneArea';
import DropzonePreview from './preview/DropzonePreview';

import CONFIG from '../../config';
import { UPLOAD_ACCEPT_FILE_TYPE, FILE_DROPZONE_MIN_SIZE, FILE_DROPZONE_MAX_SIZE } from 'constants/dropzone';

const defaultDropzone = {
  apiURL: CONFIG.API.UPLOAD_SERVICE,
  files: [],
  autoUpload: false,
  config: {
    accept: UPLOAD_ACCEPT_FILE_TYPE,
    disabled: false,
    noClick: false,
    noKeyboard: false,
    minSize: FILE_DROPZONE_MIN_SIZE,
    maxSize: FILE_DROPZONE_MAX_SIZE
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

const defaultDropzonePreviewInit = {
  files: [],
  onFileRemove: () => {},
  onFileUpload: () => {},
  status: false
};

const defaultDropzonePreviewUploading = {
  files: [
    {
      lastModified: 1587457542381,
      name: 'Screen Shot 2020-04-21 at 15.25.27.png',
      path: 'Screen Shot 2020-04-21 at 15.25.27.png',
      size: 93804,
      type: 'image/png',
      webkitRelativePath: ''
    }
  ],
  onFileRemove: () => {},
  onFileUpload: () => {},
  status: false,
  datas: {
    infos: {
      title: '',
      url: 'https://i.pinimg.com/236x/0a/8b/fb/0a8bfb162ef8a917f1e4d4bf5cd08e4c--android-apps-cover-art.jpg',
      size: 0
    }
  }
};

const defaultDropzonePreviewFinish = {
  files: [
    {
      lastModified: 1587457542381,
      name: 'Screen Shot 2020-04-21 at 15.25.27.png',
      path: 'Screen Shot 2020-04-21 at 15.25.27.png',
      size: 93804,
      type: 'image/png',
      webkitRelativePath: ''
    }
  ],
  onFileRemove: () => {},
  onFileUpload: () => {},
  status: true,
  datas: {
    infos: {
      title: '',
      url: 'https://i.pinimg.com/236x/0a/8b/fb/0a8bfb162ef8a917f1e4d4bf5cd08e4c--android-apps-cover-art.jpg',
      size: 0
    }
  }
};

storiesOf('DropZoneArea', module)
  .add('Init', () => (
    <DropZoneArea {...defaultDropzone}>
      <DropzonePreview {...defaultDropzonePreviewInit} />
    </DropZoneArea>
  ))
  .add('Uploading', () => <DropzonePreview {...defaultDropzonePreviewUploading} />)
  .add('Finish', () => <DropzonePreview {...defaultDropzonePreviewFinish} />);
