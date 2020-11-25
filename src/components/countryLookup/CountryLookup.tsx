import React, { useState } from 'react';
import { Input } from 'reactstrap';
import get from 'lodash/get';

import { CountryLookupProps, CountryProps } from './CountryLookup.d';
import './CountryLookup.scss';
import { useCountries } from '../../stores/ConfigurationStore/configuration';
import { LANGUAGES_CODE } from 'constants/enum';

const CountryLookup: React.FC<CountryLookupProps> = ({ onChooseCountry, language = LANGUAGES_CODE.EN, message }) => {
  const [countries] = useCountries();
  const [countryList, setCountryList] = useState(countries);

  const handleChooseCountry = ({ label, code }: CountryProps) => () => {
    onChooseCountry && onChooseCountry({ label, code });
  };

  const renderCountries = () =>
    countryList && countryList.length > 0
      ? countryList.map(({ label, code }) => (
          <div key={code} onClick={handleChooseCountry({ label, code })}>
            {get(label, language, '')}
          </div>
        ))
      : message;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryList(
      countries.filter((country) =>
        get(country, `label[${language}]`, '').toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="country-lookup">
      <Input onChange={handleChange} />
      <div>{renderCountries()}</div>
    </div>
  );
};

export default CountryLookup;
