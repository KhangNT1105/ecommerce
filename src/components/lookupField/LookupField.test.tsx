import * as React from 'react';
import { testSnapshots } from '../../utils/test';
import LookupField from './LookupField';
import { shallow } from 'enzyme';

jest.mock('components/lookupField/LookupFieldWrapper', () => 'LookupFieldWrapper');

describe('<LookupField />', () => {
  testSnapshots(LookupField, [
    {
      props: {},
      description: 'default render'
    },
    {
      props: {
        endpoint: '',
        fieldName: 'email',
        suggestions: [],
        shouldClearTag: false,
        onChange: jest.fn(),
        sort: 'name,asc',
        mappingFn: jest.fn()
      },
      description: 'render with data'
    }
  ]);
});

describe('Test Logic', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test('should update clear tag when clear tag input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      fieldName: 'email'
    };
    const instance = shallow(<LookupField {...props} />);
    const clearTagsFn: any = instance.find('LookupFieldWrapper').props();

    clearTagsFn.clearTags();
    expect(setState).toHaveBeenCalledWith([]);
  });

  test('should set selected items when tags is selected', () => {
    const setState = jest.fn();
    const props = {
      fieldName: 'email',
      onChange: jest.fn()
    };
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const instance = shallow(<LookupField {...props} />);
    const tags = [
      {
        email: 'test@gmail.com',
        id: '5ec61cce42f7cf581be35807'
      }
    ];
    const setSelectedTagsFn: any = instance.find('LookupFieldWrapper').props();
    setSelectedTagsFn.setSelectedTags(tags);
    expect(setState).toHaveBeenCalledWith(tags);
    expect(props.onChange).toHaveBeenCalledWith(tags);
  });
});
