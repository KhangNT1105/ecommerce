import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { SideBarMenuItem } from '../sideBarMenuItem/SideBarMenuItem';
import { SideBarMiddleNavProps } from '../SideBar.d';

const SideBarMiddleNav: React.FC<SideBarMiddleNavProps> = ({ menus, slim }) => {
  const { t } = useTranslation();
  const classes = classNames('sidebar-menu', {
    'sidebar-menu--slim': slim
  });

  return (
    <>
      {menus.map((menu: any, menuIndex: number) => (
        <React.Fragment key={`${menuIndex}`}>
          {!slim && menu.subMenus.length > 0 && (
            <h6 className="pl-2">
              <i className={`fa fa-fw ${menu.icon} mr-2`} />
              {t(menu.title)}
            </h6>
          )}
          <ul className={classes}>
            {menu.subMenus.map((submenu: any, submenuIndex: number) => (
              <SideBarMenuItem
                key={`${submenu.title}-${submenuIndex}`}
                title={t(submenu.title)}
                to={submenu.to}
                icon={submenu.icon}
                slim={slim}
                isParent={submenu.parent}
              />
            ))}
          </ul>
        </React.Fragment>
      ))}
    </>
  );
};

export default SideBarMiddleNav;
