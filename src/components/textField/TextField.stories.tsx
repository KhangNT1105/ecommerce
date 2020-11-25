import { storiesOf } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import TextField from './TextField';

storiesOf('TextField', module)
  .addDecorator(withFormik)
  .add('default', () => <TextField name="text" />)
  .add('disable', () => <TextField name="text" disabled={true} />)
  .add('with addOn', () => <TextField name="text" addOn="VNĐ" />)
  .add('with type=select', () => <TextField name="text" type="select" />)
  .add('with type=file', () => <TextField name="text" type="file" />)
  .add('with type=textarea', () => <TextField name="text" type="textarea" />)
  .add('with type=search', () => <TextField name="text" type="search" />)
  .add('with type=image', () => <TextField name="text" type="image" />)
  .add('with type=number', () => <TextField name="text" type="number" />)
  .add('with type=date', () => <TextField name="text" type="date" />)
  .add('with placeholder', () => <TextField name="text" placeholder="Input your name" />);
