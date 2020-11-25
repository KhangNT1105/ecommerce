import { storiesOf } from '@storybook/react';
import React from 'react';
import FilterTag from './FilterTag';

storiesOf('FilterTag', module).add('default', () => (
  <FilterTag
    tagName="name"
    suggestionList={[
      'Nate',
      'Sona',
      'Soraka',
      'Ezreal',
      'this is a very very very long name abce abce',
      {
        title: 'Test',
        value: 'test'
      }
    ]}
  />
));
