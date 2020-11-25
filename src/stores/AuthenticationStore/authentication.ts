import { createStore, createHook, StoreActionApi, createContainer } from 'react-sweet-state';
import jwt from 'jsonwebtoken';

import databases from 'cache';
import { AuthenticationStates, TokenData, UserInformation } from './authenticationType';
import API from 'api';
import { LoginFormValues, SignUpFormValues } from 'modules/login/loginTypes';
import ApiConfig, { SESSION_TIMEOUT } from 'config';
import { notify } from 'components/toast/Toast';
import i18n from 'i18n/i18n';
import { handleRefreshToken } from 'api/interceptors';
import { POST_METHOD } from 'api/api.constants';

export const AUTHENTICATION_STORE = 'StoreAuthentication';
type StoreApi = StoreActionApi<AuthenticationStates>;
type Actions = typeof actions;

export const requestLogin = async (token: string, email: string) => {
  const headers = {
    email
  };
  const response = await API({
    url: ApiConfig.API.USER_SERVICE_LOGIN,
    method: 'POST',
    headers,
    data: {
      token
    }
  });
  return response;
};

export const actions = {
  onLoad: (payload: AuthenticationStates) => ({ setState }: StoreApi) => {
    setState({ ...payload });
  },
  logout: () => async ({ setState }: StoreApi) => {
    try {
      notify.success(i18n.t('DANG_XUAT_THANH_CONG'));
      setState({ ...initialState });
      await databases.removeItem(storeKey);
    } catch {
      setState({ ...initialState });
      if (databases) {
        await databases.removeItem(storeKey);
      }
    }
  },
  resetMessage: () => ({ setState }: StoreApi) => {
    setState({ message: '' });
  },
  login: (values: LoginFormValues) => async ({ setState, getState }: StoreApi) => {
    try {
      const response = await API({
        url: ApiConfig.API.USER_SERVICE_LOGIN,
        data: values,
        method: POST_METHOD
      });
      const decodeToken = jwt.decode(response.token) as TokenData;
      const { iat, exp, ...restData } = decodeToken;
      const timeout = (exp - iat) * 1000;
      setState({
        loggedIn: true,
        timeout,
        user: {
          ...restData
        } as UserInformation,
        authenticate: response
      });
      notify.success(i18n.t('DANG_NHAP_THANH_CONG'));
    } catch (error) {
      const message = i18n.t('LOGIN_ERROR');
      setState({
        message,
        loggedIn: false,
        failedTimes: getState().failedTimes + 1
      });
      notify.error(message);
    }
  },
  signUp: (values: SignUpFormValues) => async ({ getState, setState }: StoreApi) => {
    try {
      const response = await API({
        url: ApiConfig.API.USER_SERVICE_SIGNUP,
        data: values,
        method: POST_METHOD
      });
      setState({
        loggedIn: true,
        authenticate: { ...response }
      });
    } catch (error) {}
  },
  setCaptchaToken: (token: string | null) => ({ setState }: StoreApi) => {
    setState({ captchaToken: token });
  },
  refreshToken: () => async ({ setState, getState }: StoreApi) => {
    const refreshToken = getState().authenticate.refreshToken;
    const accessToken = getState().authenticate.token;
    try {
      const response = await handleRefreshToken(refreshToken, accessToken);
      const decodeToken = jwt.decode(response.accessToken) as TokenData;
      const timeout = (decodeToken.exp - decodeToken.iat) * 1000;
      setState({
        authenticate: { ...response },
        loggedIn: true,
        failedTimes: 0,
        timeout
      });
    } catch {
      const message = i18n.t('EXTEND_SESSION_ERROR');
      notify.error(message);
    }
  },
  getUserPermissions: () => async ({ setState, getState }: StoreApi) => {
    try {
      const response = await API({
        url: '/'
      });

      const authenticate = getState().authenticate;
      const menuItems = {
        ...authenticate,
        menuItems: [...response.menuItems]
      };

      const userInfor = getState().user;
      const newPermissions = {
        ...userInfor,
        permissions: [...response.permissions]
      };

      setState({
        authenticate: { ...menuItems },
        user: { ...newPermissions }
      });
    } catch (error) {
      // TODO: maybe do not need to show any error message
    }
  }
};

export const initialState: AuthenticationStates = {
  user: {
    id: '',
    firstName: null,
    lastName: null,
    email: '',
    token: '',
    permissions: []
  },
  message: '',
  loggedIn: false,
  failedTimes: 0,
  initiated: false,
  authenticate: {
    token: '',
    refreshToken: '',
    menuItems: []
  },
  captchaToken: '',
  timeout: SESSION_TIMEOUT
};
const Store = createStore<AuthenticationStates, Actions>({
  initialState,
  actions,
  name: AUTHENTICATION_STORE
});

const useAuthentication = createHook(Store);

export const storeKey = `${Store.key.join('__')}@__global__`;

type StoreContainerProps = {
  initialState: AuthenticationStates;
};
export const AuthenticationContainer = createContainer<AuthenticationStates, Actions, StoreContainerProps>(Store, {
  onInit: () => ({ setState }: StoreApi, { initialState }) => {
    setState({ ...initialState });
  }
});
export default useAuthentication;
