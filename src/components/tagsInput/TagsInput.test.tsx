import * as React from 'react';
import { shallow, mount } from 'enzyme';

import TagsInput from './TagsInput';
import { testSnapshots } from '../../utils/test';
import { KEYS } from '../../constants/keyCode.type';
import fakeSuggestionData from '../../apiMock/suggestion';

const { users } = fakeSuggestionData;

describe('<TagsInput/>', () => {
  describe('TagsInput snapshot', () => {
    testSnapshots(TagsInput, [
      {
        props: {},
        description: 'Should render correctly'
      },
      {
        props: {
          readonly: true
        },
        description: 'Should render readonly correctly'
      }
    ]);
  });

  describe('TagsInput event', () => {
    let wrapper: any;
    const getSelectedTags = jest.fn();
    const handleInputChange = jest.fn();
    const clearTags = jest.fn();

    const defaultProps = {
      getSelectedTags,
      handleInputChange,
      clearTags,
      suggestions: [],
      shouldClearTags: false
    };

    beforeEach(() => {
      wrapper = shallow(<TagsInput {...defaultProps} />);
    });

    test('can add tag', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleChange({
        currentTarget: { value: 'a@gmail.com' }
      });
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'a@gmail.com' }
      });

      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(1);
    });

    test('can show suggestion', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleChange({
        currentTarget: { value: 'a@gmail.com' }
      });

      const suggestion = wrapper.find('Suggestions');
      expect(suggestion).toBeTruthy();
    });

    test('can add tag with pressing Down Arrow', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.DOWN_ARROW,
        currentTarget: { value: 'a@gmail.com' }
      });
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'a@gmail.com' }
      });

      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(1);
    });

    test('can add tag with pressing Up Arrow', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.UP_ARROW,
        currentTarget: { value: 'a@gmail.com' }
      });
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'a@gmail.com' }
      });

      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(1);
    });

    test('can not add tag with empty value', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: '' }
      });

      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(0);
    });

    test('can not add tag without pressing enter', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: 65,
        currentTarget: { value: 'a' }
      });

      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(0);
    });

    test('can not add tag by pressing Escape', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.ESCAPE,
        currentTarget: { value: 'a' }
      });

      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(0);
    });

    test('can not add tag by pressing ousite Input', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleBlur();
      inputElement.handleKeyDown({
        keyCode: KEYS.ESCAPE,
        currentTarget: { value: 'a' }
      });

      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(0);
    });

    test('can delete tag with pressing Backspace and empty value', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'a@gmail.com' }
      });
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'b@gmail.com' }
      });
      inputElement.handleKeyDown({
        keyCode: KEYS.BACKSPACE,
        currentTarget: { value: '' }
      });

      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(1);
    });

    test('can delete tag', () => {
      const inputElement = wrapper.find('Input').props();
      const tagElement = wrapper.find('Tag').props();
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'a@gmail.com' }
      });
      tagElement.removeTag(0);
      expect(tagElement.tags.length).toEqual(0);
    });

    test('can click suggestion', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: 65,
        currentTarget: { value: 'axample' }
      });
      const suggestion = wrapper.find('Suggestions').props();
      suggestion.onClickSuggestion({
        id: '5e9326340a31c940b66bd1da',
        email: 'example1@gmail.com'
      });
      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(1);
    });

    test('reset flag to false after adding users to group', () => {
      const instance = mount(<TagsInput {...defaultProps} />);
      instance.setProps({ shouldClearTags: true });
      expect(clearTags).toHaveBeenCalledWith(false);
    });

    test('can not add duplicated tag', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'a@gmail.com' }
      });
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'a@gmail.com' }
      });
      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(1);
    });

    test('can not add invalid tag', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'a' }
      });
      const tagElement = wrapper.find('Tag').props().tags;
      expect(tagElement.length).toEqual(0);
    });

    test('can display error when enter invalid tag', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'invalid' }
      });

      expect(wrapper.find('.text-danger')).toBeTruthy();
    });

    test('can hide suggestion when error is displayed', () => {
      const inputElement = wrapper.find('Input').props();
      inputElement.handleFocus();
      inputElement.handleKeyDown({
        keyCode: KEYS.ENTER,
        currentTarget: { value: 'invalid' }
      });

      expect(wrapper.find('Suggestion').exists()).toBeFalsy();
    });
  });
});
