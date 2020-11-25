import React from 'react';
import { testSnapshots } from '../../utils/test';
import CountryLookup from './CountryLookup';
import { shallow, mount } from 'enzyme';

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

describe('<CountryLookup />', () => {
  testSnapshots(CountryLookup, [
    {
      props: {},
      description: 'render snapshot correctly'
    }
  ]);
});

describe('CountryLookup event', () => {
  test('onChooseCountry should emit chosen country', () => {
    const onChooseCountry = jest.fn();
    const instance = shallow(<CountryLookup onChooseCountry={onChooseCountry} />);
    instance.find('.country-lookup > div > div').first().simulate('click');
    expect(onChooseCountry).toHaveBeenCalledWith({
      code: 'VNM',
      label: {
        en: 'Vietnam',
        ar: 'Vietnam'
      }
    });
  });

  test('handle search country', () => {
    const onChooseCountry = jest.fn();
    const instance = mount(<CountryLookup onChooseCountry={onChooseCountry} />);
    instance
      .find('input')
      .first()
      .simulate('change', { target: { value: 'Vietnam' } });
    expect(instance.find('.country-lookup > div > div').length).toBe(1);
  });
});
