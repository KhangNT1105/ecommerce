import { createStore, createHook, createContainer } from 'react-sweet-state';
import { StoreApi, IStoreAPIState, APIActions } from './storeAPI.d';

export const STORE_NAME = 'StoreAPI';

export const initialState: IStoreAPIState = {
  loaded: true,
  fetching: false,
  error: false,
  data: null,
  faults: '',
  initiated: false
};

// All the actions that mutate the store
export const actions = {
  initData: (payload: IStoreAPIState) => ({ setState }: StoreApi) => {
    setState({
      ...payload
    });
  },
  setData: (data: any = null) => ({ setState, getState }: StoreApi) => {
    const { data: prevData } = getState();
    setState({
      ...prevData,
      data
    });
  },

  setFetching: (payload: boolean = false) => ({ setState }: StoreApi) => {
    setState({
      fetching: payload
    });
  },

  setError: (payload: boolean = false) => ({ setState }: StoreApi) => {
    setState({
      error: payload
    });
  },

  setFaults: (payload: string = '') => ({ setState }: StoreApi) => {
    setState({
      faults: payload
    });
  },

  setLoaded: (payload: boolean = false) => ({ setState }: StoreApi) => {
    setState({
      loaded: payload
    });
  },

  setResetErrorMessage: () => ({ setState }: StoreApi) => {
    setState({
      faults: ''
    });
  }
};

const Store = createStore({ initialState, actions, name: STORE_NAME });

export const useStoreAPI = createHook(Store);
type StoreContainerProps = {
  initialState: IStoreAPIState;
};
export const APIContainer = createContainer<IStoreAPIState, APIActions, StoreContainerProps>(Store, {
  onInit: () => ({ setState }: StoreApi, { initialState }) => {
    setState({ ...initialState });
  }
});
// populate store from cache
export const storeKey = `${Store.key.join('__')}@__global__`;

export default {
  useStoreAPI
};
