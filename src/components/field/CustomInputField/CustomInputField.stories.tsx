import React from 'react';
import * as Yup from 'yup';
import withFormik from 'storybook-formik';
import { storiesOf } from '@storybook/react';

// import Components
import CustomInputElement from 'components/field/CustomInputField/CustomInputElement';

const textValidationSchema = Yup.object({
  checkbox: Yup.string().required('Is Required Field'),
  radio: Yup.string().required('Is Required Field')
});
const handleFormik = {
  formik: {
    initialValues: {
      checkbox: false,
      radio: false
    },
    validationSchema: textValidationSchema
  }
};

storiesOf('CustomInputElement', module)
  .addDecorator(withFormik)
  .add(
    'with type=checkbox',
    () => (
      <CustomInputElement
        component="input"
        id="input-field"
        key="custom_checkbox"
        label="Custom Checkbox"
        name="checkbox"
        type="checkbox"
      />
    ),
    handleFormik
  )
  .add(
    'with type=Disabled Checkbox',
    () => (
      <CustomInputElement
        component="input"
        disabled={true}
        id="input-field"
        key="disabled_custom_checkbox"
        label="Disabled Custom Checkbox"
        name="checkbox"
        type="checkbox"
      />
    ),
    handleFormik
  )
  .add(
    'with type=radio',
    () => (
      <CustomInputElement
        component="input"
        id="input-field"
        key="radio"
        label="Unchecked radio"
        name="radio"
        type="radio"
      />
    ),
    handleFormik
  )
  .add(
    'with type=radio Disabled',
    () => (
      <CustomInputElement
        component="input"
        disabled={true}
        id="input-field"
        key="disabled_radio"
        label="Disabled Radio"
        name="radio"
        type="radio"
      />
    ),
    handleFormik
  );
