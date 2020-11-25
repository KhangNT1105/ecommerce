import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import FilterQuick from './FilterQuick';

describe('<FilterQuick />', () => {
  const defaultProps = {
    filterList: [
      {
        field: 'status',
        value: 'Active'
      },
      {
        field: 'type',
        value: 'Admin'
      },
      {
        field: 'type',
        value: 'User'
      },
      {
        field: 'status',
        value: 'inactive',
        title: 'Inactive'
      }
    ]
  };
  const wrapper = renderer.create(<FilterQuick {...defaultProps} />);

  test('render snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('FilterQuick event', () => {
  const defaultProps = {
    filterList: [
      {
        field: 'status',
        value: 'Active',
        chosen: true
      },
      {
        field: 'type',
        value: 'Admin'
      },
      {
        field: 'type',
        value: 'User'
      }
    ],
    onChooseFilter: jest.fn()
  };
  const instance = shallow(<FilterQuick {...defaultProps} />);
  instance.find('.filter-quick-chosen').first().simulate('click');

  expect(defaultProps.onChooseFilter).toHaveBeenCalled();
});
