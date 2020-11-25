import { storiesOf } from '@storybook/react';
import React from 'react';

import { suggestions } from '../TagsInput.fixtures';
import Suggestions from './Suggestions';

const defaultProps = {
  handleMouseOut: () => {},
  focusedSuggestion: 0,
  suggestions,
  onClickSuggestion: () => {}
};

storiesOf('Suggestions', module).add('default', () => <Suggestions {...defaultProps} />);
