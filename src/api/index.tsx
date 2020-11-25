import axios from 'axios';
import { stringify, parse } from 'query-string';

import { APIFunction } from './api.d';
import './interceptors';
import i18n from 'i18n/i18n';

export const API_ERROR_MESSAGE_GENERAL = 'Oops. Something wrong happened';
export const ERROR_MESSAGE_NO_NETWORK = 'ERROR_MESSAGE_NO_NETWORK';

let isOnline: boolean = navigator.onLine;

window.addEventListener('offline', () => {
  isOnline = false;
});

window.addEventListener('online', () => {
  isOnline = true;
});

const api: APIFunction = async ({ url, params = '', method = 'get', headers = {}, data = '', cancelTokenSource }) => {
  const newParams = parse(stringify(params as any, { arrayFormat: 'comma' }));
  try {
    const response = await axios({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers
      },
      params: newParams,
      data,
      cancelToken: cancelTokenSource?.token
    });

    return response && response.data;
  } catch (error) {
    if (isOnline) {
      throw error;
    } else {
      const offlineResponse = {
        response: {
          data: {
            userMessage: i18n.t(ERROR_MESSAGE_NO_NETWORK)
          }
        }
      };

      throw offlineResponse;
    }
  }
};

export default api;
