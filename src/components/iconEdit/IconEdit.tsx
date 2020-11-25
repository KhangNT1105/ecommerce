import React from 'react';
import './IconEdit.scss';
import { IconEditProps } from './IconEdit.d';

const IconEdit: React.FC<IconEditProps> = ({ enabled, onClick }) => {
  return (
    <div className={enabled ? 'icon-edit-button' : 'icon-edit-button icon-edit-button-disabled'} onClick={onClick}>
      <span className="icon-edit" />
    </div>
  );
};

export default IconEdit;
