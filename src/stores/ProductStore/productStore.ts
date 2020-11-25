import { Params } from '../../api/useAPI.d';
import i18n from 'i18n/i18n';
import { GET_METHOD } from 'api/api.constants';

import ApiConfig from 'config';
import API from 'api';
import cleandeep from 'clean-deep';

import { StoreActionApi, createStore, createHook } from 'react-sweet-state';
import { ProductState } from './productStore.d';
type Actions = typeof actions;
type StoreApi = StoreActionApi<ProductState>;
export const PRODUCT_STORE = 'StoreProduct';

const defaultParams = {
  page: 0,
  limit: 15
};

export const actions = {
  getProducts: (params: Params | undefined = {}) => async ({ setState, getState }: StoreApi) => {
    setState({
      isLoading: true
    });
    const newParams = {
      ...getState().params,
      ...params
    };
    try {
      const response = await API({
        url: ApiConfig.API.PRODUCT_SERVICE,
        params: cleandeep(newParams),
        method: GET_METHOD
      });
      if (response) {
        setState({
          isLoading: false,
          listProduct: response.contents,
          total: response.total
        });
      }
    } catch {
      const message = i18n.t('GET_PRODUCTS_ERROR');
      setState({
        message,
        isLoading: false
      });
    }
  },
  setParams: (params: Params | undefined = defaultParams) => async ({ setState, getState }: StoreApi) => {
    const newParams = {
      ...getState().params,
      ...params
    };

    setState({
      params: newParams
    });
  }
};
export const initialState: ProductState = {
  message: '',
  listProduct: [],
  total: 0,
  params: defaultParams,
  initiated: false,
  isLoading: false,
  success: false
};
const Store = createStore<ProductState, Actions>({
  initialState,
  actions,
  name: PRODUCT_STORE
});

const useProduct = createHook(Store);

export default useProduct;
