import React from 'react';
import { mount } from 'enzyme';
import { testSnapshots } from 'utils/test';
import CityLookupDropdown from './CityLookupDropdown';

const data = [
  {
    code: '',
    label: {
      ar: 'Ho Chi Minh',
      en: 'Ho Chi Minh'
    }
  },
  {
    code: '',
    label: {
      ar: 'Ha Noi',
      en: 'Ha Noi'
    }
  }
];

describe('<CityLookupDropdown />', () => {
  testSnapshots(CityLookupDropdown, [
    {
      props: { cities: data },
      description: 'render snapshot correctly'
    },
    {
      props: { value: 'Ho Chi Minh', readonly: true },
      description: 'City Lookup Dropdown readonly snapshot'
    }
  ]);
});

describe('CityLookupDropdown event', () => {
  const onChooseCity = jest.fn();
  const countryCode = 'VN';

  test('onChooseCity should emit chosen city', () => {
    const instance = mount(<CityLookupDropdown cities={data} onChooseCity={onChooseCity} />);
    instance.find('.city-lookup > div > div').first().simulate('click');
    expect(onChooseCity).toHaveBeenCalledWith('Ho Chi Minh');
  });

  test('onChooseCity should emit chosen country', () => {
    const instance = mount(<CityLookupDropdown cities={data} onChooseCity={onChooseCity} />);
    expect(instance.find('DropdownToggle').first().text()).toBe('CITY');
  });
});
