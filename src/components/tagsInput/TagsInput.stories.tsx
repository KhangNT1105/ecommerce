import { storiesOf } from '@storybook/react';
import React from 'react';

import config from '../../config/development';
import { tags, suggestions } from './TagsInput.fixtures';

import TagsInput from './TagsInput';
import TagsInputWrapper from './TagsInputWrapper';

const GET_USER_SUGGESTION_API_ENDPOINT = config.API.USER_SERVICE_SUGGESTION;

storiesOf('TagsInput', module)
  .add('default', () => <TagsInput suggestions={suggestions} tags={tags} />)
  .add('with handling API', () => <TagsInputWrapper endpoint={GET_USER_SUGGESTION_API_ENDPOINT} />);
