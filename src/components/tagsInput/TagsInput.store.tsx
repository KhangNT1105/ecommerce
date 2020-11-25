import { createStore, createHook, StoreActionApi } from 'react-sweet-state';
import { Params, TagsInputState } from './TagsInput.d';

type StoreApi = StoreActionApi<TagsInputState>;

const initialState: TagsInputState = {
  isSearching: false,
  data: [],
  params: {}
};

export const actions = {
  setSearching: (isSearching: boolean = false, params: Params = {}) => ({ setState, getState }: StoreApi) => {
    setState({
      ...getState(),
      params,
      isSearching
    });
  },

  setParams: (params: Params) => ({ setState, getState }: StoreApi) => {
    setState({
      ...getState(),
      params: { ...params }
    });
  }
};
const store = createStore({
  initialState,
  actions
});

export const useTagsInputState = createHook(store);
