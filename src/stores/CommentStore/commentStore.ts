import { Params } from '../../api/useAPI.d';
import i18n from 'i18n/i18n';
import { DELETE_METHOD, GET_METHOD, POST_METHOD } from 'api/api.constants';
import { CommentState, SubmitCommentValues } from './commentStore.d';
import ApiConfig from 'config';
import API from 'api';

import { StoreActionApi, createStore, createHook } from 'react-sweet-state';
type Actions = typeof actions;
type StoreApi = StoreActionApi<CommentState>;
export const COMMENT_STORE = 'StoreComment';

export const actions = {
  getComments: (params: Params | undefined = {}) => async ({ setState }: StoreApi) => {
    setState({
      isLoading: true
    });
    try {
      const response = await API({
        url: ApiConfig.API.COMMENT_SERVICE,
        params,
        method: GET_METHOD
      });
      if (response) {
        setState({
          isLoading: false,
          listComment: response.contents
        });
      }
    } catch {
      const message = i18n.t('GET_COMMENTS_ERROR');
      setState({
        message
      });
    }
  },
  postComment: (values: SubmitCommentValues) => async ({ getState, setState }: StoreApi) => {
    setState({
      isLoading: true
    });
    try {
      const response = await API({
        url: ApiConfig.API.COMMENT_SERVICE,
        method: POST_METHOD,
        data: values
      });
      setState({
        isLoading: false,
        success: true,
        message: response?.message,
        comment: response.contents
      });
    } catch (error) {}
  },
  deleteComment: (id: string) => async ({ getState, setState }: StoreApi) => {
    setState({
      isLoading: true
    });
    try {
      const response = await API({
        url: `${ApiConfig.API.COMMENT_SERVICE}/${id}`,
        method: DELETE_METHOD
      });
      setState({
        isLoading: false,
        success: true,
        comment: {
          _id: '',
          content: '',
          product: ''
        },
        message: response.message
      });
    } catch (error) {}
  }
};
export const initialState: CommentState = {
  message: '',
  listComment: [],
  comment: {
    _id: '',
    content: '',
    product: ''
  },
  initiated: false,
  isLoading: false,
  success: false
};
const Store = createStore<CommentState, Actions>({
  initialState,
  actions,
  name: COMMENT_STORE
});

const useComment = createHook(Store);

export default useComment;
