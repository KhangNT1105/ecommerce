import { storiesOf } from '@storybook/react';
import React from 'react';

import { tags } from '../TagsInput.fixtures';
import Tag from './Tag';

const defaultProps = {
  tags,
  removeTag: () => {}
};

storiesOf('Tag', module).add('default', () => <Tag {...defaultProps} />);
