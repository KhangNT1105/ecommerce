import React from 'react';
import { shallow } from 'enzyme';
import { testSnapshots } from '../../utils/test';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

const mockHistoryPush = jest.fn();

jest
  .mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush
    })
  }))
  .mock('../breadCrumb/BreadCrumb', () => 'BreadCrumb')
  .mock('stores/AuthenticationStore/authentication', () => () => [
    {
      user: {
        permissions: ['VIEW_USERGROUP']
      }
    },
    {
      logout: jest.fn()
    }
  ]);
const defaultProps = {
  breadCrumbs: [
    { label: 'Start', path: '/' },
    { label: 'Page Link', path: '/some-link' }
  ],
  notifications: [
    {
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      status: 'success'
    },
    {
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      status: 'warning'
    },
    {
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      status: 'danger'
    },
    {
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      status: 'primary'
    }
  ],
  username: 'John',
  onClickBurgerBtn: jest.fn()
};

const wrapper = () => (
  <BrowserRouter>
    <Header {...defaultProps} />
  </BrowserRouter>
);
describe('<Header />', () => {
  testSnapshots(wrapper, [
    {
      props: { ...defaultProps },
      description: 'render snapshot correctly'
    }
  ]);
});

describe('Test logic', () => {
  const setState = jest.fn();
  const useStateMock: any = (initState: any) => [initState, setState];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  test('should toggle  burger menu when click nav item', () => {
    const instance = shallow(<Header {...defaultProps} />);
    instance.find('NavItem').first().simulate('click');
    expect(defaultProps.onClickBurgerBtn).toHaveBeenCalled();
  });
});
