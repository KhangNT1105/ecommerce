import React from 'react';
import { testSnapshots } from '../../../utils/test';
import LookupFieldSuggestions from './LookupFieldSuggestions';
import { shallow } from 'enzyme';

describe('<LookupFieldSuggestions>', () => {
  testSnapshots(LookupFieldSuggestions, [
    {
      props: {
        fieldName: 'email',
        focusedSuggestion: 1,
        message: 'test abc',
        suggestions: [
          {
            id: '5ec61cce42f7cf581be35807',
            email: 'test42@gmail.com'
          }
        ],
        handleMouseOut: jest.fn(),
        onClickSuggestion: jest.fn()
      },
      description: 'default render snapshot'
    },
    {
      props: {
        fieldName: 'email',
        focusedSuggestion: 0,
        message: 'test abc',
        suggestions: [
          {
            id: '5ec61cce42f7cf581be35807',
            email: 'test42@gmail.com'
          }
        ],
        handleMouseOut: jest.fn(),
        onClickSuggestion: jest.fn()
      },
      description: 'render with className is focused'
    },
    {
      props: {
        fieldName: 'email',
        focusedSuggestion: 0,
        message: 'test abc',
        suggestions: [],
        handleMouseOut: jest.fn(),
        onClickSuggestion: jest.fn()
      },
      description: 'no suggestion'
    }
  ]);
});

describe('Test logic', () => {
  test('should choose suggestion when click one suggestion', () => {
    const props = {
      fieldName: 'email',
      focusedSuggestion: 1,
      message: 'test abc',
      suggestions: [
        {
          id: '5ec61cce42f7cf581be35807',
          email: 'test42@gmail.com'
        }
      ],
      handleMouseOut: jest.fn(),
      onClickSuggestion: jest.fn()
    };
    const instance: any = shallow(<LookupFieldSuggestions {...props} />);
    const suggestionsComponent: any = instance.find('.suggestions').props().children[0];
    suggestionsComponent && suggestionsComponent.props.onClick();
    expect(props.onClickSuggestion).toHaveBeenCalledWith({
      id: '5ec61cce42f7cf581be35807',
      email: 'test42@gmail.com'
    });
  });
});
