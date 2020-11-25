import React from 'react';
import { shallow } from 'enzyme';

import Suggestions from './Suggestions';
import { testSnapshots } from '../../../utils/test';
import { suggestions } from '../TagsInput.fixtures';

const defaultProps = {
  handleMouseOut: jest.fn(),
  focusedSuggestion: 0,
  suggestions,
  onClickSuggestion: jest.fn()
};

describe('<Suggestions/>', () => {
  describe('Suggestions snapshot', () => {
    testSnapshots(Suggestions, [
      {
        props: defaultProps,
        description: 'Should render correctly'
      }
    ]);
  });

  describe('Suggestions event', () => {
    let wrapper: any;
    const mockOnClickEvent = jest.fn();
    const mockOnMouseOutEvent = jest.fn();
    beforeEach(() => {
      wrapper = shallow(
        <Suggestions {...defaultProps} onClickSuggestion={mockOnClickEvent} handleMouseOut={mockOnMouseOutEvent} />
      );
    });

    test('Can click on item of suggestion list with suggestion item value', () => {
      const suggestionItem = wrapper.find('li');
      const value = {
        id: 'john@gmail.com',
        email: 'john@gmail.com'
      };
      suggestionItem.first().simulate('click', value);
      expect(mockOnClickEvent).toHaveBeenCalledWith(value);
    });

    test('MouseOut event can effect suggestion list', () => {
      wrapper.simulate('mouseout');
      expect(mockOnMouseOutEvent).toHaveBeenCalled();
    });

    test('Show default message when no suggestion is found', () => {
      const NO_RESULT = 'No matches found.';
      const wrapper = shallow(<Suggestions {...defaultProps} suggestions={[]} message={NO_RESULT} />);
      expect(wrapper.find('li').text()).toEqual(NO_RESULT);
    });
  });
});
