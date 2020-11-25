import axios from 'axios';

import { actions, initialState, requestLogin } from './authentication';
import { AxiosMock } from 'api/axios.mock';
import loginResponse from 'apiMock/login';
import * as API from 'api';

jest.mock('axios');
jest.mock('localforage');
// jest.mock('utils/gigyaUtils', () => ({
//   then: jest.fn(),
//   getGigyaErrorMessage: jest.fn(() => 'Invalid loginID')
// }));
jest.mock('api', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJjYWNoZSI6IlVzZXJfNTA3ZDc2MGE4NWYwNGJlYjk0YTZmOTkxZDBkODA1MWMiLCJ1aWQiOiJhcHIxU2hhaGlkRW5LdGtJdmgyS2thMzFnb3p6OWc3cjAiLCJkaWQiOiJXZWIiLCJzdWJpZCI6IjUwN2Q3NjBhODVmMDRiZWI5NGE2Zjk5MWQwZDgwNTFjIiwic3ViIjoic2hhaGlkLXRva2VuLWVuY29kZSIsImlzcyI6InNoYWhpZC10b2tlbi1lbmNvZGUiLCJpYXQiOjE1ODc0NjkyMzUsImV4cCI6MTYxOTAwNTIzNX0.UChmd5mF507OvtFgGl_G4jA3MOdkHfpYIExACQYndKE',
      refreshToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJjYWNoZSI6IlVzZXJfNTA3ZDc2MGE4NWYwNGJlYjk0YTZmOTkxZDBkODA1MWMiLCJ1aWQiOiJhcHIxU2hhaGlkRW5LdGtJdmgyS2thMzFnb3p6OWc3cjAiLCJkaWQiOiJXZWIiLCJzdWJpZCI6IjUwN2Q3NjBhODVmMDRiZWI5NGE2Zjk5MWQwZDgwNTFjIiwic3ViIjoic2hhaGlkLXRva2VuLWVuY29kZSIsImlzcyI6InNoYWhpZC10b2tlbi1lbmNvZGUiLCJpYXQiOjE1ODc0NjkyMzUsImV4cCI6MTYxOTAwNTIzNX0.UChmd5mF507OvtFgGl_G4jA3MOdkHfpYIExACQYndKE',
      menuItems: [
        'shows',
        'schedules',
        'channels',
        'catalogs',
        'categories',
        'casting',
        'clips',
        'playlists',
        'contracts',
        'licensors',
        'system-users',
        'user-groups',
        'configurations'
      ],
      permissions: ['CREATE_SHOW', 'VIEW_SHOW']
    })
  )
}));
jest.mock('api/interceptors', () => ({
  handleRefreshToken: jest.fn().mockImplementation(() =>
    Promise.resolve({
      accessToken:
        'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJNQkMtU2hhaGlkLUJhY2tPZmZpY2UiLCJzdWIiOiJraGFtLm5ndXllbkBweWNvZ3JvdXAuY29tIiwiaWF0IjoxNTg5MjY4MDgwLCJleHAiOjE1ODkyNzE2ODB9.5HYtRQSIFAi2iod1C4faqYZdKQSYPdEgzRyW2b16Sl6hrJKb03OUouY2B3os3bOUy29tNFneI6kx2gvIJxeA6Q',
      refreshToken:
        'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJNQkMtU2hhaGlkLUJhY2tPZmZpY2UiLCJzdWIiOiJleUpoYkdjaU9pSklVelV4TWlKOS5leUpwYzNNaU9pSk5Ra010VTJoaGFHbGtMVUpoWTJ0UFptWnBZMlVpTENKemRXSWlPaUpyYUdGdExtNW5kWGxsYmtCd2VXTnZaM0p2ZFhBdVkyOXRJaXdpYVdGMElqb3hOVGc1TWpZNE1EZ3dMQ0psZUhBaU9qRTFPRGt5TnpFMk9EQjkuNUhZdFJRU0lGQWkyaW9kMUM0ZmFxWVpkS1FTWVBkRWd6UnlXMmIxNlNsNmhySktiMDNPVW91WTJCM29zM2JPVXkyOXRORm5lSTZreDJndklKeGVBNlEiLCJpYXQiOjE1ODkyNjgwODAsImV4cCI6MTU4OTM1NDQ4MH0.UUHIX1CU1rn6wvhd1VVaCbOOdw3O4po72hSekSg5AY9dLjeYhHr9xD8C5teTgDKmcZN9U-8-fsdVpmJ1puamPw',
      menuItems: ['seasons', 'shows', 'users']
    })
  )
}));
const mockedAxios = axios as AxiosMock;

const setState = jest.fn();
const getState = () => ({ ...initialState });
const dispatch = jest.fn();

describe('actions', () => {
  describe('Login api', () => {
    afterEach(() => {
      mockedAxios.mockClear();
      jest.clearAllMocks();
    });
  });
  describe('onLoad', () => {
    test('initialize states when loading', () => {
      actions.onLoad(initialState)({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith(initialState);
    });
  });
  describe('resetMessage', () => {
    test('Reset value of message', () => {
      actions.resetMessage()({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({ message: '' });
    });
  });
  describe('Request login', () => {
    test('request successful', async () => {
      const res = await requestLogin('token', 'email');
      expect(res).toEqual(loginResponse);
    });
  });
  describe('reCaptcha', () => {
    test('set value of recaptcha token', () => {
      actions.setCaptchaToken('token')({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({ captchaToken: 'token' });
    });
  });
  describe('refreshToken', () => {
    test('refresh token success', async () => {
      const mockData = {
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJNQkMtU2hhaGlkLUJhY2tPZmZpY2UiLCJzdWIiOiJraGFtLm5ndXllbkBweWNvZ3JvdXAuY29tIiwiaWF0IjoxNTg5MjY4MDgwLCJleHAiOjE1ODkyNzE2ODB9.5HYtRQSIFAi2iod1C4faqYZdKQSYPdEgzRyW2b16Sl6hrJKb03OUouY2B3os3bOUy29tNFneI6kx2gvIJxeA6Q',
        refreshToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJNQkMtU2hhaGlkLUJhY2tPZmZpY2UiLCJzdWIiOiJleUpoYkdjaU9pSklVelV4TWlKOS5leUpwYzNNaU9pSk5Ra010VTJoaGFHbGtMVUpoWTJ0UFptWnBZMlVpTENKemRXSWlPaUpyYUdGdExtNW5kWGxsYmtCd2VXTnZaM0p2ZFhBdVkyOXRJaXdpYVdGMElqb3hOVGc1TWpZNE1EZ3dMQ0psZUhBaU9qRTFPRGt5TnpFMk9EQjkuNUhZdFJRU0lGQWkyaW9kMUM0ZmFxWVpkS1FTWVBkRWd6UnlXMmIxNlNsNmhySktiMDNPVW91WTJCM29zM2JPVXkyOXRORm5lSTZreDJndklKeGVBNlEiLCJpYXQiOjE1ODkyNjgwODAsImV4cCI6MTU4OTM1NDQ4MH0.UUHIX1CU1rn6wvhd1VVaCbOOdw3O4po72hSekSg5AY9dLjeYhHr9xD8C5teTgDKmcZN9U-8-fsdVpmJ1puamPw',
        menuItems: ['seasons', 'shows', 'users']
      };
      await actions.refreshToken()({ setState, getState, dispatch });

      expect(setState).toHaveBeenCalledWith({
        authenticate: { ...mockData },
        loggedIn: true,
        failedTimes: 0,
        timeout: 3600000
      });
    });
  });
  describe('getUserPermissions', () => {
    test("get user's permissions successfully", async () => {
      jest.spyOn(API, 'default').mockImplementation(() =>
        Promise.resolve({
          menuItems: ['shows', 'seasons'],
          permissions: ['CREATE_SHOW', 'VIEW_SHOW']
        })
      );

      const getState = jest.fn().mockImplementation(() => ({
        authenticate: {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          menuItems: ['shows', 'seasons'],
          permissions: ['CREATE_SHOW', 'VIEW_SHOW']
        },
        user: {
          email: 'user@gmail.com',
          lastName: '',
          firstName: ''
        }
      }));
      const setState = jest.fn();
      await actions.getUserPermissions()({ setState, getState, dispatch });

      expect(setState).toHaveBeenCalledWith({
        authenticate: {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          menuItems: ['shows', 'seasons'],
          permissions: ['CREATE_SHOW', 'VIEW_SHOW']
        },
        user: {
          email: 'user@gmail.com',
          lastName: '',
          firstName: '',
          permissions: ['CREATE_SHOW', 'VIEW_SHOW']
        }
      });
    });
  });
});
