import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';

import { CountryLookupDropdownProps, CountryProps } from './CountryLookup.d';
import CountryLookup from './CountryLookup';
import './CountryLookupDropdown.scss';
import { useCountries } from '../../stores/ConfigurationStore/configuration';
import { LANGUAGES_CODE } from 'constants/enum';

const CountryLookupDropdown: React.FC<CountryLookupDropdownProps> = ({
  onChooseCountry,
  countryCode,
  language = LANGUAGES_CODE.EN,
  readonly
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleOff = () => setIsOpen(false);

  const [countries] = useCountries();
  const foundCountry: CountryProps | undefined = countries.find((country) => country.code === countryCode);

  const currentValueRender = get(foundCountry, `label[${language}]`, t('COUNTRY'));

  const handleChooseCountry = ({ code }: CountryProps) => {
    toggleOff();
    onChooseCountry && onChooseCountry(code);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle className="country-lookup-dropdown" caret={true} disabled={readonly}>
        {currentValueRender}
      </DropdownToggle>
      {!readonly && (
        <DropdownMenu className="wrapper-country">
          <CountryLookup onChooseCountry={handleChooseCountry} language={language} message={t('NO_DATA')} />
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default CountryLookupDropdown;
