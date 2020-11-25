import React from 'react';
import { storiesOf } from '@storybook/react';
import withFormik from 'storybook-formik';
import DatePicker from './DatePicker';

storiesOf('DatePicker', module)
  .addDecorator(withFormik)
  .add('default', () => <DatePicker name="date" />, {
    formik: {
      initialValues: {
        date: '20 Dec 2020'
      }
    }
  })
  .add('showTimeInput', () => <DatePicker name="date" showTimeInput={true} />, {
    formik: {
      initialValues: {
        date: '20 Dec 2020'
      }
    }
  })
  .add('minDate', () => <DatePicker name="date" minDate={new Date()} />, {
    formik: {
      initialValues: {
        date: '20 Dec 2020'
      }
    }
  })
  .add('maxDate', () => <DatePicker name="date" maxDate={new Date('2020-12-12')} />, {
    formik: {
      initialValues: {
        date: '20 Dec 2020'
      }
    }
  });
