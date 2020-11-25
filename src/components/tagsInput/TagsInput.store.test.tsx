import { StoreActionApi } from 'react-sweet-state';

import { actions } from './TagsInput.store';
import { suggestions } from './TagsInput.fixtures';

describe('TagsInput Actions', () => {
  test('setSearching when user type', () => {
    const storeApi = ({
      setState: jest.fn(),
      getState: jest.fn()
    } as unknown) as StoreActionApi<any>;

    actions.setSearching()(storeApi);

    expect(storeApi.setState).toHaveBeenCalled();
  });

  test('setParams', () => {
    const storeApi = ({
      setState: jest.fn(),
      getState: jest.fn()
    } as unknown) as StoreActionApi<any>;

    actions.setParams({})(storeApi);

    expect(storeApi.setState).toHaveBeenCalled();
  });
});
