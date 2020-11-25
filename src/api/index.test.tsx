import axios from 'axios';

import API, { ERROR_MESSAGE_NO_NETWORK, API_ERROR_MESSAGE_GENERAL } from './index';
import { AxiosMock } from './axios.mock';
import i18n from 'i18n/i18n';
jest.mock('axios');
const mockedAxios = axios as AxiosMock;

describe('API ', () => {
  beforeEach(() => {
    mockedAxios.mockClear();
  });

  describe('API GET successfully', () => {
    it('fetches successfully data from an API', async () => {
      const expectedData = {
        data: 'data'
      };
      mockedAxios.mockResolvedValue(expectedData);
      await expect(API({ url: 'api-endpoint/resource/:id' })).resolves.toEqual(expectedData.data);
    });
  });

  describe('API erroneously', () => {
    it('fetches erroneously data from an API', async () => {
      mockedAxios.mockRejectedValue({
        response: {
          data: {
            userMessage: i18n.t(ERROR_MESSAGE_NO_NETWORK)
          }
        }
      });
      await expect(API({ url: 'api-endpoint/resource/:id' })).rejects.toEqual({
        response: {
          data: {
            userMessage: i18n.t(ERROR_MESSAGE_NO_NETWORK)
          }
        }
      });
    });
  });
  describe('API offline', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });
    test('fetches erroneously data from an API', async () => {
      mockedAxios.mockRejectedValue({
        response: {
          data: {
            userMessage: i18n.t(ERROR_MESSAGE_NO_NETWORK)
          }
        }
      });
      await expect(API({ url: 'api-endpoint/resource/:id' })).rejects.toEqual({
        response: {
          data: {
            userMessage: i18n.t(ERROR_MESSAGE_NO_NETWORK)
          }
        }
      });
    });
  });
});
