import React from 'react';
import { shallow, mount } from 'enzyme';
import { testSnapshots } from 'utils/test';
import CityLookup from './CityLookup';

const cities = [
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

describe('<CityLookup />', () => {
  testSnapshots(CityLookup, [
    {
      props: {},
      description: 'render snapshot correctly'
    }
  ]);
});

describe('CityLookup event', () => {
  test('onChooseCountry should emit chosen country', () => {
    const onChooseCity = jest.fn();
    const instance = shallow(<CityLookup cities={cities} onChooseCity={onChooseCity} />);
    instance.find('.city-lookup > div > div').first().simulate('click');
    expect(onChooseCity).toHaveBeenCalledWith(cities[0]);
  });

  test('handle search city', () => {
    const onChooseCity = jest.fn();
    const language = 'ar';
    const instance = mount(<CityLookup onChooseCity={onChooseCity} cities={cities} language={language} />);
    instance
      .find('input')
      .first()
      .simulate('change', { target: { value: 'H' } });
    expect(instance.find('.city-lookup > div > div').length).toBe(2);
  });
});
