import React from 'react';
import classNames from 'classnames';
import { SideBarSectionProps } from '../SideBar.d';

const SideBarSection: React.FC<SideBarSectionProps> = ({ fluid, cover, className, children }) => {
  const classes = classNames(
    'sidebar__section',
    {
      'sidebar__section--fluid': fluid,
      'sidebar__section--cover': cover
    },
    className
  );

  return <div className={classes}>{children}</div>;
};

export { SideBarSection };
