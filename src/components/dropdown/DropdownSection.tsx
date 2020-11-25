import React from 'react';
import classNames from 'classnames';
import { DropdownSectionProps } from './Dropdown.d';

const DropdownSection: React.FC<DropdownSectionProps> = ({ children, list, className }) => {
  const classes = classNames('extended-dropdown__section', className, {
    'extended-dropdown__section--list': list
  });

  return <div className={classes}>{children}</div>;
};

export { DropdownSection };
