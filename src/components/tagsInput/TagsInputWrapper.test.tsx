import * as React from 'react';
import { shallow } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import axios, { AxiosStatic } from 'axios';

import TagsInputWrapper from './TagsInputWrapper';

import { testSnapshots } from '../../utils/test';
import { actions } from './TagsInput.store';
import useAPI from 'api/useAPI';
import { TagElement, IExpectedData } from './TagsInput.d';
import fakeSuggestionData from '../../apiMock/suggestion';

const { users } = fakeSuggestionData;
const mockedDataFromApi: TagElement[] = users;

jest.mock('axios').mock('localforage');

let mockData: IExpectedData;
const mockedAxios = axios as AxiosStatic | any;

const defaultProps = {
  endpoint: 'test'
};

describe('<TagsInputWrapper/>', () => {
  describe('TagsInput snapshot', () => {
    testSnapshots(TagsInputWrapper, [
      {
        props: defaultProps,
        description: 'Should render correctly'
      }
    ]);
  });

  describe('TagsInputWrapper event', () => {
    const thunk = actions.setParams({ q: 'example1' });
    const setState = jest.fn();
    const getState = jest.fn(() => ({}));

    beforeAll(() => {
      mockData = {
        data: {
          status: 200,
          data: {
            users: mockedDataFromApi
          }
        }
      };
    });

    beforeEach(() => {
      mockedAxios.mockClear();
    });

    test('Test performing GET request', async () => {
      const initialValue: TagElement[] = [];
      mockedAxios.mockResolvedValue(mockData);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAPI({
          url: defaultProps.endpoint,
          initialValue,
          loadInitialState: true
        })
      );

      expect(result.current.data).toEqual([]);
      expect(result.current.loading).toBeTruthy();

      await waitForNextUpdate();

      expect(result.current.data).toEqual(mockData.data);
      expect(result.current.loading).toBeFalsy();
    });

    test('Test handleInputChange', () => {
      getState.mockImplementation(() => ({
        data: 'example1',
        isSearching: true,
        params: {
          q: 'example1'
        }
      }));
      thunk({ setState, getState } as any);
      const instance = shallow(<TagsInputWrapper {...defaultProps} />);
      (instance as any).find('TagsInput').props().handleInputChange('example');
      (instance as any).find('TagsInput').props().handleInputChange('example1');
      const expectedResult = {
        data: 'example1',
        isSearching: true,
        params: {
          q: 'example1'
        }
      };
      expect(setState).toHaveBeenCalledWith(expectedResult);
    });
  });
});
