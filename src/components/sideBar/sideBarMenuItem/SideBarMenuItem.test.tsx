import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';

import { testSnapshots } from '../../../utils/test';
import { SideBarMenuItem } from './SideBarMenuItem';

const wrapper = (props: any) => (
  <BrowserRouter>
    <SideBarMenuItem {...props} />
  </BrowserRouter>
);

describe('<SideBarMenuItem />', () => {
  testSnapshots(wrapper, [
    {
      props: {
        title: 'Shows',
        to: '/content/shows',
        subNode: true
      },
      description: 'Sub Menu'
    },
    {
      props: {
        title: 'Content',
        children: <ul className="sidebar-submenu">Hi, i'm Submenu</ul>
      },
      description: 'Parent Menu with Sub Menu'
    }
  ]);
});

describe('SideBarMenuItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
    jest.useFakeTimers();
  });
  test('isParent is True', () => {
    const props: any = {
      menus: [
        {
          title: 'Menu',
          to: 'string',
          icon: 'string',
          subMenus: [
            {
              title: 'Sub menu Lv1',
              to: 'string',
              menuItemName: 'string',
              parent: true,
              subMenus: [
                {
                  title: 'Sub menu Lv2',
                  to: 'string',
                  icon: 'string'
                }
              ]
            }
          ]
        }
      ],
      slim: 'boolean'
    };
    const container = mount(
      <BrowserRouter>
        <SideBarMenuItem {...props} />
      </BrowserRouter>
    );
    const menu = container.find('li.sidebar-submenu__entry');
    expect(menu).toHaveLength(1);
  });

  test('isParent is True', () => {
    const props: any = {
      menus: [
        {
          title: 'Menu',
          to: 'string',
          icon: 'string',
          subMenus: [
            {
              title: 'Sub menu Lv1',
              to: 'string',
              menuItemName: 'string',
              parent: false,
              subMenus: [
                {
                  title: 'Sub menu Lv2',
                  to: 'string',
                  icon: 'string'
                }
              ]
            }
          ]
        }
      ],
      slim: 'boolean'
    };
    const container = mount(
      <BrowserRouter>
        <SideBarMenuItem {...props} />
      </BrowserRouter>
    );
    const menu = container.find('div.sidebar-menu__entry');
    expect(menu).toHaveLength(0);
  });
});
