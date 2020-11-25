import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { testSnapshots } from '../../../utils/test';

import LookupFieldTags from './LookupFieldTags';
jest.mock('components/tagsInput/inputTag/InputTag', () => 'InputTag');

describe('<LookupFieldTags />', () => {
  test('<LookupFieldTags/> -> default render with single is false', () => {
    const wrapper = shallow(<LookupFieldTags fieldName="email" single={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('<LookupFieldTags/> -> default render with single is true', () => {
    const wrapper = shallow(<LookupFieldTags fieldName="email" single={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Test logic', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test('should focus on lookup field when user is focusing', () => {
    const setState = jest.fn();
    const props = {
      fieldName: 'email',
      single: false
    };
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const instance = shallow(<LookupFieldTags {...props} />);
    const inputTagComponent: any = instance.find('InputTag').props();
    inputTagComponent.handleFocus();
    expect(setState).toHaveBeenCalledWith(true);
  });

  test('should blur on lookup field when user is blurring', () => {
    const setState = jest.fn();
    const props = {
      fieldName: 'email',
      single: false
    };
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const instance = shallow(<LookupFieldTags {...props} />);
    const inputTagComponent: any = instance.find('InputTag').props();
    inputTagComponent.handleBlur();
    expect(setState).toHaveBeenCalledWith(false);
  });

  test('should change lookup field when user is changing data', () => {
    const setState = jest.fn();
    const props = {
      fieldName: 'email',
      single: false,
      handleInputChange: jest.fn()
    };
    const event = {
      currentTarget: {
        value: 'abc'
      }
    };
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const instance = shallow(<LookupFieldTags {...props} />);
    const inputTagComponent: any = instance.find('InputTag').props();
    inputTagComponent.handleChange(event);
    expect(setState).toHaveBeenCalledWith(event.currentTarget.value);
    expect(props.handleInputChange).toHaveBeenCalledWith(event.currentTarget.value);
  });
  test('should add value input when user press key down', () => {
    const setState = jest.fn();
    const props = {
      fieldName: 'email',
      single: false
    };
    const event = {
      currentTarget: {
        value: 'abc'
      },
      keyCode: 1
    };
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const instance = shallow(<LookupFieldTags {...props} />);
    const inputTagComponent: any = instance.find('InputTag').props();
    inputTagComponent.handleKeyDown(event);
    expect(setState).toHaveBeenCalledWith(event.currentTarget.value);
  });
});
