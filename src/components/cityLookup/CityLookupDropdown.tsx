import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';

import CityLookup from './CityLookup';

import { CityProps, CityLookupDropdownProps } from './CityLookup.d';
import { LANGUAGES_CODE } from 'constants/enum';

import './CityLookupDropdown.scss';

const CityLookupDropdown: React.FC<CityLookupDropdownProps> = ({
  onChooseCity,
  value = '',
  cities,
  language = LANGUAGES_CODE.EN,
  readonly
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleOff = () => setIsOpen(false);

  const valueRender = value || t('CITY');

  const handleChooseCity = (city: CityProps) => {
    toggleOff();
    onChooseCity && onChooseCity(get(city, `label[${language}]`, ''));
  };

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle className="city-lookup-dropdown" caret={true} disabled={readonly}>
        {valueRender}
      </DropdownToggle>
      {!readonly && (
        <DropdownMenu className="wrapper-city">
          <CityLookup onChooseCity={handleChooseCity} language={language} cities={cities} message={t('NO_DATA')} />
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default CityLookupDropdown;
