import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import { testSnapshots } from '../../utils/test';
import SideBar from './SideBar';
import { mockDataSidebar } from './SideBarMenu';

let defaultProps: any = mockDataSidebar;
const wrapper = (props: any) => (
  <BrowserRouter>
    <SideBar {...props} />
  </BrowserRouter>
);

describe('<SideBar />', () => {
  testSnapshots(wrapper, [
    {
      props: defaultProps,
      description: 'default render'
    }
  ]);
});

describe('Test Logic', () => {
  test('should close side bar when click close icon', () => {
    defaultProps = {
      ...defaultProps,
      onClose: jest.fn(),
      isNoPermission: false
    };
    const wrapper = shallow(<SideBar {...defaultProps} />);
    wrapper.find('.sidebar__close').simulate('click');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
