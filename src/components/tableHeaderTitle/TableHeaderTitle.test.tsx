import * as React from 'react';

import TableHeaderTitle from './TableHeaderTitle';
import { testSnapshots } from '../../utils/test';
import { mount } from 'enzyme';

describe('<TableHeaderTitle />', () => {
  testSnapshots(TableHeaderTitle, [
    {
      props: {
        title: 'test'
      },
      description: 'render with default'
    },
    {
      props: {
        sortable: true,
        title: 'test',
        sortField: 'test'
      },
      description: 'render sortable'
    }
  ]);
});

describe('TableHeaderTitle event', () => {
  test('onClick', () => {
    const props = {
      sortable: true,
      title: 'test',
      sortField: 'test',
      onClick: jest.fn()
    };
    const instance = mount(<TableHeaderTitle {...props} />);
    instance.find('div').first().simulate('click');
    instance.find('div').first().simulate('click');
    expect(instance.find('.fa.fa-sort-down').length).toEqual(1);
  });
  test('should setState when params props changes with sort is asc', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      sortable: true,
      title: 'test',
      sortField: 'email',
      onClick: jest.fn(),
      params: {
        sort: 'email,asc'
      }
    };

    const wrapper = mount(<TableHeaderTitle {...props} />);
    wrapper.find('div').first().simulate('click');
    expect(setState).toHaveBeenCalledWith(1);
  });
  test('should setState when params props changes with sort is desc', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      sortable: true,
      title: 'test',
      sortField: 'email',
      onClick: jest.fn(),
      params: {
        sort: 'email,desc'
      }
    };

    const wrapper = mount(<TableHeaderTitle {...props} />);
    wrapper.find('div').first().simulate('click');
    expect(setState).toHaveBeenCalledWith(2);
  });
});
