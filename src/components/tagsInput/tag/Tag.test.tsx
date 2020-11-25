import React from 'react';
import { shallow } from 'enzyme';

import Tag from './Tag';
import { testSnapshots } from '../../../utils/test';
import { tags } from '../TagsInput.fixtures';

const defaultProps = {
  tags,
  removeTag: jest.fn()
};

describe('<Tag/>', () => {
  describe('Tag snapshot', () => {
    testSnapshots(Tag, [
      {
        props: defaultProps,
        description: 'Should render correctly'
      }
    ]);
  });

  describe('Tag event', () => {
    let wrapper: any;
    const mockRemoveTagEvent = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<Tag {...defaultProps} removeTag={mockRemoveTagEvent} />);
    });

    test('Can click on button to remove tag with index tag', () => {
      const button = wrapper.find('button');
      const index = 0;
      button.first().simulate('click', index);
      expect(mockRemoveTagEvent).toHaveBeenCalledWith(index);
    });
  });
});
