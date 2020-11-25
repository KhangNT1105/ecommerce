import axios, { AxiosError } from 'axios';

import ApiConfig from 'config';
import databases from 'cache';
import { storeKey } from 'stores/AuthenticationStore/authentication';
import { AuthenticationStates } from 'stores/AuthenticationStore/authenticationType';
import API from './index';
import RoutesString from 'pages/routesString';
import { API_ERROR_CODE } from 'constants/enum';

axios.interceptors.request.use(
  async (config) => {
    // ignore login request
    if (config.url === ApiConfig.API.USER_SERVICE_LOGIN) {
      return config;
    }
    const authStates: AuthenticationStates = await databases.getItem(storeKey);
    const accessToken = Object.keys(authStates.authenticate).length > 0 ? authStates.authenticate.token : '';
    const newConfig = { ...config };
    newConfig.headers[`Authorization`] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const handleRefreshToken = async (theRefreshToken: string, theAccessToken: string) => {
  try {
    const response = await API({
      url: ApiConfig.API.USER_SERVICE_REFRESH_SESSION,
      data: {
        accessToken: theAccessToken,
        refreshToken: theRefreshToken
      },
      method: 'POST'
    });
    return response;
  } catch (error) {
    throw error;
  }
};

axios.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (error.response?.status !== 400) {
      return Promise.reject(error);
    }

    if (`${error.response?.data.errorCode}` === API_ERROR_CODE.TOKEN_EXPIRED) {
      try {
        const authStates: AuthenticationStates = await databases.getItem(storeKey);
        const refreshToken =
          Object.keys(authStates.authenticate).length > 0 ? authStates.authenticate.refreshToken : '';
        const accessToken = Object.keys(authStates.authenticate).length > 0 ? authStates.authenticate.token : '';

        const response = await handleRefreshToken(refreshToken, accessToken);

        const newAuthStates = { ...authStates };
        newAuthStates.authenticate = { ...response };
        databases.setItem(storeKey, newAuthStates);

        error.response.config.headers[`Authorization`] = `Bearer ${response.accessToken}`;

        return axios(error.response.config);
      } catch {
        // TODO
      }
    }

    // just redirect user to login page when his token is invalid
    if (
      `${error.response?.data.errorCode}` === API_ERROR_CODE.REFRESH_TOKEN_INVALID ||
      `${error.response?.data.errorCode}` === API_ERROR_CODE.TOKEN_INVALID ||
      `${error.response?.data.errorCode}` === API_ERROR_CODE.REFRESH_TOKEN_EXPIRED
    ) {
      await databases.removeItem(storeKey);
      window.location.href = RoutesString.Login;
      return;
    }

    return Promise.reject(error);
  }
);
