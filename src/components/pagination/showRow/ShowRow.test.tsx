import React from 'react';
import { shallow } from 'enzyme';
import ShowRow from './ShowRow';

import { LIST_MAX_ROWS } from '../../../constants/index';

import { testSnapshots } from '../../../utils/test';
const e = {
  currentTarget: {
    textContent: '50'
  }
};
const defaultProps = {
  listMaxRows: LIST_MAX_ROWS,
  currentSize: 25,
  setCurrentSize: jest.fn(),
  handlePagination: jest.fn()
};
describe('<ShowRow />', () => {
  testSnapshots(ShowRow, [
    {
      props: { ...defaultProps },
      description: 'render snapshot correctly'
    }
  ]);
});

describe('Test Logic', () => {
  // test('should update current size when change dropDown', () => {
  //   const wrapper = shallow(<ShowRow {...defaultProps} />);
  //   wrapper.find('DropdownItem').first().simulate('click', e);
  //   expect(defaultProps.setCurrentSize).toHaveBeenCalledWith(e.currentTarget.textContent);
  // });
  // test('should call api when selected row and return page 1', () => {
  //   const wrapper = shallow(<ShowRow {...defaultProps} />);
  //   wrapper.find('DropdownItem').first().simulate('click', e);
  //   expect(defaultProps.handlePagination).toHaveBeenCalledWith(0, e.currentTarget.textContent);
  // });
});
