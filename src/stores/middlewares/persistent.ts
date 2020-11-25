import { defaults, StoreState } from 'react-sweet-state';

import database from '../../cache';
import { AUTHENTICATION_STORE } from '../AuthenticationStore/authentication';
import { UI_STORE } from '../UIStore/uiStore';
import { STORE_NAME } from '../../api/storeAPI';

const WHITE_LIST = [STORE_NAME, AUTHENTICATION_STORE, UI_STORE];

const persistent = (storeState: StoreState<any>) => (next: any) => (fn: any) => {
  const result = next(fn);
  const { key } = storeState;
  const isWhiteList: string[] = WHITE_LIST.filter((store) => key.includes(store));
  if (isWhiteList.length > 0) {
    const state = storeState.getState();
    database.setItem(storeState.key, state);
  }

  return result;
};

defaults.middlewares.add(persistent);
