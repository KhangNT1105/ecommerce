import React from 'react';
import { storiesOf } from '@storybook/react';
import withFormik from 'storybook-formik';
import CurrencyInput from './CurrencyInput';

storiesOf('CurrencyInput', module)
  .addDecorator(withFormik)
  .add('default', () => <CurrencyInput name="date" />, {
    formik: {
      initialValues: {
        date: '10'
      }
    }
  })
  .add('showTimeInput', () => <CurrencyInput name="date" currency="SGD" />, {
    formik: {
      initialValues: {
        date: '20'
      }
    }
  });
