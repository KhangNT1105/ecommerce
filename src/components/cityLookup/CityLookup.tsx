import React, { useState } from 'react';
import { Input } from 'reactstrap';
import get from 'lodash/get';

import { CityLookupProps, CityProps } from './CityLookup.d';
import './CityLookup.scss';
import { LANGUAGES_CODE } from 'constants/enum';

const CityLookup: React.FC<CityLookupProps> = ({ onChooseCity, cities, language = LANGUAGES_CODE.EN, message }) => {
  const [cityList, setCityList] = useState(cities);

  const handleChooseCity = ({ label, code }: CityProps) => () => {
    onChooseCity && onChooseCity({ label, code });
  };

  const renderCountries = () =>
    cityList && cityList.length > 0
      ? cityList?.map(({ label, code }) => (
          <div key={code || get(label, language, '')} onClick={handleChooseCity({ label, code })}>
            {get(label, language, '')}
          </div>
        ))
      : message;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityList(
      cities?.filter((city) =>
        get(city, `label[${language}]`, '').toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="city-lookup">
      <Input onChange={handleChange} />
      <div>{renderCountries()}</div>
    </div>
  );
};

export default CityLookup;
