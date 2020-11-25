import React from 'react';
import { storiesOf } from '@storybook/react';

import Editor from './Editor';

const EditorStoryContent = {
  text:
    'Exercitationem tenetur nihil perspiciatis sunt facilis provident omnis autem. Magni mollitia minus architecto laboriosam autem qui non neque',
  html:
    '<h1><span style="color: rgb(230, 0, 0);">Exercitationem</span></h1> tenetur nihil perspiciatis sunt facilis provident omnis autem. Magni mollitia minus architecto laboriosam autem qui non neque',
  format: ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'color'],
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['clean'],
      [{ color: [] }]
    ]
  }
};

storiesOf('Editor', module)
  .add('Default Editor Without HTMLTags', () => (
    <Editor content={EditorStoryContent.text} format={EditorStoryContent.format} modules={EditorStoryContent.modules} />
  ))
  .add('Default Editor With HTMLTags', () => (
    <Editor content={EditorStoryContent.html} format={EditorStoryContent.format} modules={EditorStoryContent.modules} />
  ));
