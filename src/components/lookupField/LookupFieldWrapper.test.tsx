import React from 'react';
import { shallow } from 'enzyme';

import { testSnapshots } from 'utils/test';
import LookupFieldWrapper from 'components/lookupField/LookupFieldWrapper';
import { actions } from 'components/tagsInput/TagsInput.store';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

const defaultProps = {
  fieldName: '',
  single: false
};

describe('<LookupFieldWrapper />', () => {
  testSnapshots(LookupFieldWrapper, [
    {
      props: defaultProps,
      description: 'renders LookupFieldWrapper correctly'
    }
  ]);
});

describe('Test logic function', () => {
  let wrapper: any;
  const getState = jest.fn(() => ({}));
  const setState = jest.fn();
  const thunk = actions.setParams({ q: 'example1' });

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallow(<LookupFieldWrapper {...defaultProps} />);
  });

  test('should handle Input Change when input text', () => {
    thunk({ setState, getState } as any);
    const expectedResult = {
      data: 'example1',
      isSearching: true,
      params: {
        q: 'example1',
        sort: null
      }
    };

    const findLookupFieldTags = wrapper.find('LookupFieldTags');
    findLookupFieldTags.props().handleInputChange('example1');

    expect(setState).toHaveBeenCalledWith({
      params: {
        q: 'example1'
      }
    });
  });
});
