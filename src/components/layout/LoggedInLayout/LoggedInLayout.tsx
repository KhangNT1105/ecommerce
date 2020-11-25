import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../components/header/Header';
import mockDataHeader from '../../../components/header/Header.mock.json';
import SideBar from '../../../components/sideBar/SideBar';
import { BREAKPOINTS } from '../../../constants/enum';
import { ILocation, IBreadCrumbs, BreadCrumbType } from './LoggedInLayout.d';
import './LoggedInLayout.scss';
import useUI, { UISubscriber } from '../../../stores/UIStore/uiStore';
import { mockDataSidebar } from '../../sideBar/SideBarMenu';
import useAuthentication from 'stores/AuthenticationStore/authentication';
import { useTranslation } from 'react-i18next';
import { ENTITIES, PAGE_ACTIONS } from 'constants/enum';
import ConfigurationLoader from '../../configurationLoader/ConfigurationLoader';
import { SideBarMiddleNavProps } from 'components/sideBar/SideBar.d';

const LoggedLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const [storeUI] = useUI();
  const [storeAuthentication] = useAuthentication();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const { pathname, state }: ILocation = useLocation();
  const [defaultBreadCrumbs, setDefaultBreadCrumbs] = useState<BreadCrumbType[]>([]);

  const isNoPermission = storeAuthentication.user.permissions.length === 0;

  const getLayoutSidebarWidth = (collapsed: boolean, windowWidth: number) => {
    const largeScreen = windowWidth > BREAKPOINTS.LARGE;
    switch (true) {
      case collapsed && largeScreen:
        return 60;
      case collapsed && !largeScreen:
        return 0;
      case !collapsed && largeScreen:
        return 250;
      case !collapsed && !largeScreen:
        return 0;
      default:
        break;
    }
  };

  const menuListItems: SideBarMiddleNavProps = { menus: [] };
  const { menus } = mockDataSidebar;
  const menusItems = menus.map((items) => {
    // TODO: Vu, please help to check this again
    const subMenus = items.subMenus.filter((item: any) => {
      return item && storeAuthentication.authenticate.menuItems?.includes(item.menuItemName.toLowerCase());
    });
    return {
      ...items,
      subMenus
    };
  });

  Object.assign(menuListItems, { menus: menusItems });

  const pathnameSplited = pathname.substr(pathname.indexOf('/') + 1).split('/');

  const action = [PAGE_ACTIONS.CREATE, PAGE_ACTIONS.EDIT, PAGE_ACTIONS.DELETE];

  let actionItem: Object[];
  let path: String[];
  let subdomain: String[];

  if (pathnameSplited) {
    actionItem = pathnameSplited.reduce((results: Object[], item: string) => {
      if (action.includes(item)) results.push(item);
      return results;
    }, []);

    path = Object.entries(ENTITIES.PATH).reduce((results: String[], item: any) => {
      if (pathnameSplited.includes(item[1])) results.push(item);
      return results;
    }, []);
    subdomain = Object.entries(ENTITIES.NAME).reduce((results: String[], item: any) => {
      if (pathnameSplited.includes(item[1])) results.push(item);
      return results;
    }, []);
  }
  const getBreadCrumbs = (menus: IBreadCrumbs[], pathname: string) => {
    let breadCrumbs: { label: string; path?: string }[] = [];
    let actionBreadcrumb: any;

    menus.forEach((menu) => {
      if (menu.subMenus) {
        let subMenu: any;
        if (actionItem && actionItem.length > 0) {
          subMenu = menu.subMenus.find((subMenu) => subMenu.to === `/${path[0][1]}/${subdomain[0][1]}`);
        } else {
          subMenu = menu.subMenus.find((subMenu) => subMenu.to === pathname);
        }
        if (subMenu) {
          const parentBreadCrumb = {
            label: subMenu.title,
            path: subMenu.to
          };
          const subBreadCrumb = {
            label: subMenu.subMenus[0].title,
            path: ''
          };
          if (actionItem.length > 0) {
            actionBreadcrumb = {
              label: actionItem[0],
              path: ''
            };
            breadCrumbs = [parentBreadCrumb, actionBreadcrumb];
          } else {
            breadCrumbs = [parentBreadCrumb, subBreadCrumb];
          }
        }
      }
    });
    return breadCrumbs;
  };

  const layoutSideBarWidth = getLayoutSidebarWidth(storeUI.sideBar.collapsed, windowWidth);
  const slimSideBar = storeUI.sideBar.collapsed && windowWidth > BREAKPOINTS.LARGE;

  window.onresize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    if (!state || !state.breadCrumbs) {
      const defaultBreadCrumbs = getBreadCrumbs(menuListItems.menus, pathname);
      defaultBreadCrumbs && setDefaultBreadCrumbs(defaultBreadCrumbs);
    }
    // eslint-disable-next-line
  }, [state, pathname]);

  return (
    <UISubscriber>
      {({ sideBar }, { toggleSideBar }) => (
        <>
          <ConfigurationLoader />
          <div className="layout layout--animations-enabled layout--theme--dark--primary">
            <div className="layout__sidebar layout-sidebar" style={{ width: layoutSideBarWidth }}>
              <SideBar
                {...menuListItems}
                collapsed={sideBar.collapsed}
                slim={slimSideBar}
                onClose={() => toggleSideBar(!sideBar.collapsed)}
                isNoPermission={isNoPermission}
              />
            </div>
            <div className="layout__wrap layout-wrap">
              <div className="layout__navbar layout-wrap-navbar">
                <Header
                  breadCrumbs={state && state.breadCrumbs ? state.breadCrumbs : defaultBreadCrumbs}
                  username={storeAuthentication.user.email}
                  {...mockDataHeader}
                  onClickBurgerBtn={() => toggleSideBar(!sideBar.collapsed)}
                />
              </div>
              <div className="layout__content layout-content">{children}</div>
              <div className="layout-footer text-right">
                <p>
                  <small className="small">{t('CMS_COPYRIGHT')}</small>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </UISubscriber>
  );
};

export default LoggedLayout;
