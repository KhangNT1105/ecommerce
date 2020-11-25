import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { StringPropertyObject } from 'constants/types';

interface GenderDropDownProps {
  currentValue: string;
  handleOnValueChosen?: (value: string) => void;
  readonly?: boolean;
}

const GenderDropDown: React.FC<GenderDropDownProps> = ({ currentValue, handleOnValueChosen, readonly }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const genderValueMapping: StringPropertyObject = {
    Male: t('MALE'),
    Female: t('FEMALE')
  };

  const toggle = () => setIsOpen(!isOpen);

  const onChosen = (value: string) => () => {
    handleOnValueChosen && handleOnValueChosen(value);
  };

  const currentValueRender = (currentValue && genderValueMapping[currentValue]) || t('GENDER');

  return (
    <Dropdown isOpen={isOpen} toggle={toggle} disabled={readonly}>
      <DropdownToggle caret={true}> {currentValueRender}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={onChosen('Male')}>{t('MALE')}</DropdownItem>
        <DropdownItem onClick={onChosen('Female')}>{t('FEMALE')}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default GenderDropDown;
