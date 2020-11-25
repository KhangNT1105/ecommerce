import { StoreActionApi } from 'react-sweet-state';

export type IStoreAPIState = {
  loaded: boolean;
  fetching: boolean;
  error: boolean;
  data: any;
  faults: any;
  initiated?: boolean;
};

export type StoreApi = StoreActionApi<IStoreAPIState>;
export type APIActions = typeof actions;
