import dev from './development';
import qc from './qc';
import prod from './production';

export interface IConfig {
  API: {
    USER_SERVICE_LOGIN: string;
    USER_SERVICE_REFRESH_SESSION: string;
    USER_SERVICE_SUGGESTION: string;
    USER_SERVICE_LOGOUT: string;
    USER_SERVICE_SIGNUP: string;
    EXPORT_SERVICE: string;
    UPLOAD_SERVICE: string;
    PRODUCT_SERVICE: string;
    COMMENT_SERVICE: string;
  };
  LINK: {
    ACEXIS_WEB: string;
  };
  LANG: string;
  GIGYA_KEY: string;
  SITE_NAME: string;
}

let config: IConfig = { ...dev };
const env = process.env.REACT_APP_ENV;
switch (env) {
  case 'dev':
    config = dev;
    break;
  case 'qc':
    config = qc;
    break;
  case 'prod':
    config = prod;
    break;
  default:
    break;
}

export const isDevEnv = () => {
  return process.env.REACT_APP_ENV === 'dev';
};
export const SESSION_TIMEOUT = Number(process.env.REACT_APP_SESSION_TIMEOUT);
export default {
  // Add common config values here
  env,
  ...config
};
