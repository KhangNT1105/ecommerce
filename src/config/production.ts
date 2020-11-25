import { IConfig } from './index';
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;
const CONFIG: IConfig = {
  API: {
    UPLOAD_SERVICE: `${REACT_APP_API_HOST}/upload`,
    EXPORT_SERVICE: `${REACT_APP_API_HOST}/exportFiles`,
    USER_SERVICE_LOGIN: `${REACT_APP_API_HOST}/bo-auth/login`,
    USER_SERVICE_LOGOUT: `${REACT_APP_API_HOST}/bo-auth/logout`,
    USER_SERVICE_SUGGESTION: `${REACT_APP_API_HOST}/suggestion`,
    USER_SERVICE_REFRESH_SESSION: `${REACT_APP_API_HOST}/bo-auth/refresh-session`,
    USER_SERVICE_SIGNUP: `${REACT_APP_API_HOST}/auth/signup`,
    PRODUCT_SERVICE: `${REACT_APP_API_HOST}/products`,
    COMMENT_SERVICE: `${REACT_APP_API_HOST}/comments`
  },
  LINK: {
    ACEXIS_WEB: `${process.env.REACT_APP_ACEXIS_WEB}`
  },
  LANG: 'en',
  GIGYA_KEY: `${process.env.REACT_APP_GIGYA_SITE_KEY}`,
  SITE_NAME: `${process.env.REACT_APP_GIGYA_SITE_NAME}`
};

export default CONFIG;
