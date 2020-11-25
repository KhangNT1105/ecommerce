import React from 'react';
import { testSnapshots } from '../../utils/test';
import CountryLookupDropdown from './CountryLookupDropdown';
import { mount } from 'enzyme';

jest.mock('stores/ConfigurationStore/configuration', () => ({
  useCountries: () => [
    [
      {
        code: 'VNM',
        label: {
          en: 'Vietnam',
          ar: 'Vietnam'
        }
      }
    ]
  ]
}));

describe('<CountryLookupDropdown />', () => {
  testSnapshots(CountryLookupDropdown, [
    {
      props: {},
      description: 'render snapshot correctly'
    },
    {
      props: { countryCode: 'VNM', readonly: true },
      description: 'Country Lookup Dropdown readonly snapshot'
    }
  ]);
});

describe('CountryLookupDropdown event', () => {
  test('onChooseCountry should emit chosen country', () => {
    const onChooseCountry = jest.fn();
    const instance = mount(<CountryLookupDropdown onChooseCountry={onChooseCountry} />);
    instance.find('.country-lookup > div > div').first().simulate('click');
    expect(onChooseCountry).toHaveBeenCalledWith('VNM');
  });

  test('onChooseCountry should emit chosen country', () => {
    const onChooseCountry = jest.fn();
    const instance = mount(<CountryLookupDropdown onChooseCountry={onChooseCountry} countryCode="VNM" />);
    expect(instance.find('DropdownToggle').first().text()).toBe('Vietnam');
  });
});
