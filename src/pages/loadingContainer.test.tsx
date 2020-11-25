import renderer from 'react-test-renderer';
import React from 'react';

import * as StoreApi from '../api/storeAPI';
import LoadingContainer from './loadingContainer';

describe('<LoadingContainer>', () => {
  test('toMatchSnapshot', () => {
    const storeApi = jest.spyOn(StoreApi, 'useStoreAPI');
    storeApi.mockImplementation(() => [
      {
        fetching: true,
        loaded: true,
        error: false,
        data: null,
        faults: null,
        initiated: false
      },
      {
        initData: jest.fn(),
        setData: jest.fn(),
        setFaults: jest.fn(),
        setFetching: jest.fn(),
        setLoaded: jest.fn(),
        setError: jest.fn(),
        setResetErrorMessage: jest.fn()
      }
    ]);
    const wrapper = renderer.create(<LoadingContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
