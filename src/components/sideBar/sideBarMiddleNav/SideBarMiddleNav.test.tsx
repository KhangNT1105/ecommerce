import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';

import { testSnapshots } from '../../../utils/test';
import SideBarMiddleNav from './SideBarMiddleNav';
import { mockDataSidebar } from '../SideBarMenu';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));
jest.mock('components/roleFormField/RoleFormFields', () => 'RoleFormFields');

const wrapper = (props: any) => (
  <BrowserRouter>
    <SideBarMiddleNav {...props} />
  </BrowserRouter>
);

describe('<SideBarMiddleNav />', () => {
  testSnapshots(wrapper, [
    {
      props: mockDataSidebar,
      description: 'default render'
    }
  ]);
});

describe('SideBarMiddleNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
    jest.useFakeTimers();
  });
  test('Dont have sub menus', () => {
    const props: any = {
      menus: [
        {
          title: 'string',
          to: 'string',
          icon: 'string',
          subMenus: []
        }
      ],
      slim: 'boolean'
    };
    const container = shallow(
      <BrowserRouter>
        <SideBarMiddleNav {...props} />
      </BrowserRouter>
    );
    container.update();
    const menu = container.find('ul.sidebar-menu').children();
    expect(menu).toHaveLength(0);
  });
});
