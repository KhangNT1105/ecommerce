import React from 'react';
import GenderDropdown from './GenderDropdown';
import { testSnapshots } from '../../utils/test';
import { DropdownItem } from 'reactstrap';
import { mount } from 'enzyme';

describe('<GenderDropdown />', () => {
  testSnapshots(GenderDropdown, [
    {
      props: {
        currentValue: ''
      },
      description: 'render with empty current value'
    },
    {
      props: {
        currentValue: 'Male'
      },
      description: 'render with male current value'
    }
  ]);
});

describe('GenderDropdown event', () => {
  test('should emit gender value when click on it', () => {
    const handleChooseGender = jest.fn();
    const instance = mount(<GenderDropdown currentValue="" handleOnValueChosen={handleChooseGender} />);
    instance.find(DropdownItem).first().simulate('click');
    expect(handleChooseGender).toHaveBeenCalledWith('Male');
  });
});
