import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import renderer from 'react-test-renderer';

import Steps, { Step } from './Steps';

describe('<Steps />', () => {
  describe('snapshots', () => {
    test('snapshots active the first card', () => {
      const props = {
        current: 0
      };
      const tree = renderer
        .create(
          <Steps {...props}>
            <Step key={0} title={'First'} />
            <Step key={1} title={'Second'} />
          </Steps>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('snapshots active the second card with onChange props', () => {
      const props = {
        current: 1,
        onChange: jest.fn()
      };
      const tree = renderer
        .create(
          <Steps {...props}>
            <Step key={0} title={'First'} />
            <Step key={1} title={'Second'} />
          </Steps>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Check if add classes into steps correctly', () => {
    let wrap: ReactWrapper;
    let StepsItem: ReactWrapper;
    let FirstStep: ReactWrapper;
    let SecondStep: ReactWrapper;
    let ThirdStep: ReactWrapper;

    const props = {
      current: 1,
      onChange: jest.fn()
    };
    beforeEach(() => {
      wrap = mount(
        <Steps {...props}>
          <Step key={0} title={'First'} />
          <Step key={1} title={'Second'} />
          <Step key={2} title={'Third'} />
        </Steps>
      );
      StepsItem = wrap.find('.steps-item');
      FirstStep = StepsItem.at(0);
      SecondStep = StepsItem.at(1);
      ThirdStep = StepsItem.at(2);
    });
    test('should have render classes correctly', () => {
      expect(FirstStep.find('.finish')).toHaveLength(1);
      expect(SecondStep.find('.active')).toHaveLength(1);
      expect(SecondStep.find('.pointer')).toHaveLength(0);
      expect(ThirdStep.find('.wait')).toHaveLength(1);
    });

    test('should call onChange', () => {
      const changeCurrent = 2;
      ThirdStep.simulate('click', changeCurrent);
      expect(props.onChange).toHaveBeenCalledWith(changeCurrent);
    });
  });
});
