import { createStore, createHook, StoreActionApi } from 'react-sweet-state';

// defaults.devtools = true;
type State = { count: number };
type StoreApi = StoreActionApi<State>;
type Actions = typeof actions;
// This is the value of the store on initialisation
const initialState = {
  count: 0
};

// All the actions that mutate the store
const actions = {
  increment: (by = 1) => ({ setState, getState }: StoreApi) => {
    setState({ count: getState().count + by });
  }
};

const Store = createStore({ initialState, actions, name: 'StoreCounter' });

export const useCounter = createHook(Store);

export default {
  useCounter
};
