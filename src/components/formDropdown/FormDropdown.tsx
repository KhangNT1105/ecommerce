import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FormDropdownProps } from './FormDropdown.d';
import './FormDropdown.scss';

const FormDropdown: React.FC<FormDropdownProps> = ({ placeholder, currentValue, itemList, readonly, disabled }) => {
  const [isShow, setIsShow] = useState(false);

  const toggle = () => {
    setIsShow(!isShow);
  };

  return (
    <Dropdown isOpen={isShow} toggle={toggle}>
      <DropdownToggle caret={true} className="form-dropdown" disabled={disabled}>
        {currentValue || placeholder}
      </DropdownToggle>
      {!(readonly || disabled) && (
        <DropdownMenu>
          {itemList?.map(({ content, onChosen }, index) => (
            <DropdownItem key={index} onClick={onChosen}>
              {content}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default FormDropdown;
