import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { showRowProps } from '../Paginations.d';
import './ShowRow.scss';

const ShowRow: React.FC<showRowProps> = ({ listMaxRows, currentSize, setCurrentSize, handlePagination }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onDropDownItemClick = (e: any) => {
    const value = e.currentTarget.textContent;
    setCurrentSize(value);
    handlePagination && handlePagination(0, value);
  };

  const listDropDown = listMaxRows.map((item: number, index: number) => {
    return (
      <DropdownItem key={index + item} onClick={onDropDownItemClick}>
        {item}
      </DropdownItem>
    );
  });

  return (
    <div className="show-row-container">
      <p>
        <span>{t('SHOW_ROWS')}</span>
      </p>
      <Dropdown direction="up" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret={true}>{currentSize}</DropdownToggle>
        <DropdownMenu>{listDropDown}</DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ShowRow;
