import Configs from 'config';

export const UPLOAD_ACCEPT_FILE_TYPE: string = 'image/jpeg, image/jpg, image/png, image/svg, image/bmp, image/gif';
export const UPLOAD_ACCEPT_FILE_VIDEO_TYPE: string =
  'video/mp4, video/webm, video/wmv, video/flv, video/ogv, video/avi, video/mov';
export const FILE_DROPZONE_MIN_SIZE: number = 0;
export const FILE_DROPZONE_MAX_SIZE: number = 10048576;
export const FILE_DROPZONE_VIDEO_MAX_SIZE: number = 1000048576;
export const FILE_SIZE_IN_MB: number = 1;
export const FILE_SIZE_IN_PX: number = 1920;
export const RESOLUTION_MIN_SIZE_LANDSCAPE: number = 0;
export const RESOLUTION_MIN_SIZE_PORTRAIT: number = 0;

export const defaultDropzone = {
  apiURL: Configs.API.UPLOAD_SERVICE,
  files: [],
  autoUpload: true,
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

export const defaultDropzoneVideo = {
  ...defaultDropzone,
  config: {
    ...defaultDropzone.config,
    accept: UPLOAD_ACCEPT_FILE_VIDEO_TYPE,
    maxSize: FILE_DROPZONE_VIDEO_MAX_SIZE
  }
};

export const defaultDropzonePreviewInit = {
  files: [],
  onFileRemove: () => {},
  onFileUpload: () => {},
  status: false
};
