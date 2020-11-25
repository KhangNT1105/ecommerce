import React from 'react';
import { shallow } from 'enzyme';

import { testSnapshots } from '../../utils/test';
import SearchBox from './SearchBox';

jest.useFakeTimers();

const event = {
  preventDefault: jest.fn(),
  currentTarget: {
    value: 'Search box value'
  },
  target: {
    value: 'Search box value'
  }
};

const eventForTextTrimmed = {
  preventDefault: jest.fn(),
  currentTarget: {
    value: '  Search box value  '
  },
  target: {
    value: '  Search box value  '
  }
};

const onSubmit = jest.fn();

const inputProps = {
  name: 'search-box',
  placeholder: 'Search for a show by name or id',
  inputType: 'text' as 'text'
};

const inputDebounceProps = {
  name: 'search-box',
  placeholder: 'Search for a show by name or id',
  inputType: 'text' as 'text',
  autoSubmitAfterTime: 600
};

const buttonProps = {
  children: 'Search',
  color: 'success',
  btnType: 'button' as 'button'
};

const searchBoxProps = { inputProps, buttonProps, onSubmit };
const searchBoxWithDebounceProps = {
  inputProps: inputDebounceProps,
  buttonProps,
  onSubmit
};

describe('<SearchBox />', () => {
  testSnapshots(SearchBox, [
    {
      props: searchBoxProps,
      description: 'default render'
    },
    {
      props: { ...searchBoxProps, readonly: true },
      description: 'readonly render'
    }
  ]);
});

describe('Test logic function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Test change input without debounce', () => {
    const wrapper = shallow(<SearchBox {...searchBoxProps} />);

    wrapper.find('Input').simulate('change', event);
    expect(wrapper.find('Input').prop('value')).toEqual(event.currentTarget.value);
  });

  test('Test change input without debounce', () => {
    const wrapper = shallow(<SearchBox {...searchBoxProps} />);

    wrapper.find('Input').simulate('change', event);
    expect(wrapper.find('Input').prop('value')).toEqual(event.currentTarget.value);
  });

  test('Test change input with debounce', () => {
    const wrapper = shallow(<SearchBox {...searchBoxWithDebounceProps} />);

    wrapper.find('Input').simulate('change', event);
    jest.runAllTimers();

    wrapper.find('Input').simulate('change', event);
    jest.runAllTimers();

    expect(wrapper.find('Input').prop('value')).toEqual(event.currentTarget.value);
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });
});
