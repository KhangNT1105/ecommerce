import React from 'react';
import classNames from 'classnames';
import { DropdownMenu } from 'reactstrap';
import { DropdownProps } from './Dropdown.d';

const Dropdown: React.FC<DropdownProps> = ({ className, right, children }) => {
  const classes = classNames(className, 'extended-dropdown');

  return (
    <DropdownMenu className={classes} style={{ width: '100vw' }} right={right}>
      {children}
    </DropdownMenu>
  );
};

export { Dropdown };
