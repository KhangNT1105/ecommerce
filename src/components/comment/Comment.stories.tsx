import React from 'react';
import { storiesOf } from '@storybook/react';
import Comment from './Comment';
import { PostCommentValues } from './Comment.d';
const handleSubmit = async (values: PostCommentValues) => {};
const handleDelete = async (id: string) => {};
const props = {
  handleSubmit,
  handleDelete
};
storiesOf('Comment', module).add('default', () => <Comment {...props} />);
