import React from 'react';
import { testSnapshots } from '../../../utils/test';
import LookupFieldTag from './LookupFieldTag';
import { shallow } from 'enzyme';

const defaultProps = {
  fieldName: 'name',
  tags: [
    {
      id: '5ec61cce42f7cf581be35807',
      name: 'look up field tag'
    },
    {
      id: '5ec61cce42f7cf581be35806',
      name: 'look up field tag 1'
    },
    {
      id: '5ec61cce42f7cf581be35808',
      name: 'look up field tag 2'
    }
  ],
  removeTag: jest.fn()
};

const withoutSuggestionList = {
  ...defaultProps,
  isShowSuggestion: false
};

describe('<LookupFieldTag />', () => {
  testSnapshots(LookupFieldTag, [
    {
      props: defaultProps,
      description: 'default render snapshot'
    }
  ]);
  testSnapshots(LookupFieldTag, [
    {
      props: withoutSuggestionList,
      description: 'Render without suggestion list snapshot'
    }
  ]);
});

describe('Test logic', () => {
  test('should remove tag when click remove icon', () => {
    const props = {
      fieldName: 'name',
      tags: [
        {
          id: '5ec61cce42f7cf581be35807',
          name: 'look up field tag'
        },
        {
          id: '5ec61cce42f7cf581be35806',
          name: 'look up field tag 1'
        },
        {
          id: '5ec61cce42f7cf581be35808',
          name: 'look up field tag 2'
        }
      ],
      removeTag: jest.fn(),
      single: false
    };
    const instance: any = shallow(<LookupFieldTag {...props} />);
    instance.find('.suggestions-container').children('.item').first().props().children[1].props.onClick();
    expect(props.removeTag).toHaveBeenCalledWith(0);
  });
});
