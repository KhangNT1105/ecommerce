import React from 'react';
import { mount } from 'enzyme';
import ClipList from './ClipList';
import { testSnapshots } from '../../utils/test';
import { data } from './ClipList.fixtures';

const defaultProps = {
  data,
  onSelectDropdown: jest.fn(),
  onSelectCell: jest.fn()
};

describe('<ClipList/>', () => {
  describe('ClipList snapshot', () => {
    testSnapshots(ClipList, [
      {
        props: { ...defaultProps },
        description: 'Should render correctly'
      }
    ]);
  });

  describe('ClipList event', () => {
    let onSelectCell: (param: object) => void;
    let onSelectDropdown: (param: object) => void;
    beforeEach(() => {
      onSelectCell = jest.fn();
      onSelectDropdown = jest.fn();
    });

    test('can click on cell', () => {
      const wrapper = mount(
        <ClipList {...defaultProps} onSelectCell={onSelectCell} onSelectDropdown={onSelectDropdown} />
      );
      const row = wrapper.find('.clip-list table tbody tr td').at(3).children();
      row.simulate('click');
      expect(onSelectCell).toHaveBeenCalled();
    });

    test('can not click on cell', () => {
      const wrapper = mount(<ClipList {...defaultProps} />);
      const row = wrapper.find('.clip-list table tbody tr td').at(0);
      row.simulate('click');
      expect(onSelectCell).not.toHaveBeenCalled();
    });

    test('can choose dropDown item', () => {
      const wrapper = mount(
        <ClipList {...defaultProps} onSelectCell={onSelectCell} onSelectDropdown={onSelectDropdown} />
      );
      const row = wrapper
        .find('.clip-list table tbody tr td')
        .at(10)
        .children()
        .find('div')
        .children('DropdownItem')
        .at(0);

      row.simulate('click');
      expect(onSelectDropdown).toHaveBeenCalled();
    });
  });
});
