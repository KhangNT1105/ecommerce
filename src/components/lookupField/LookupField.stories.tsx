import React from 'react';
import * as Yup from 'yup';
import withFormik from 'storybook-formik';
import { storiesOf } from '@storybook/react';

// import Components
import LookupField from 'components/lookupField/LookupField';

const textValidationSchema = Yup.object({});
const handleFormik = {
  formik: {
    initialValues: {
      fieldName: 'name'
    },
    validationSchema: textValidationSchema
  }
};

storiesOf('LookupField', module)
  .addDecorator(withFormik)
  .add('default', () => <LookupField endpoint={'/'} fieldName="name" sort="name,asc" />, handleFormik)
  .add(
    'has selected Tags',
    () => (
      <LookupField
        endpoint={'/'}
        fieldName="name"
        selectedTags={[
          {
            id: '5ec61cce42f7cf581be35807',
            type: 'tips',
            language: 'en',
            name: 'Catalog 11'
          },
          {
            id: '5ec79d19c9a6673b89f1a5eb',
            type: 'tips',
            language: 'en',
            name: 'Catalog 2'
          }
        ]}
        sort="name,asc"
      />
    ),
    handleFormik
  )
  .add(
    'has single selected Tags',
    () => (
      <LookupField
        endpoint={'/'}
        fieldName="name"
        selectedTags={[
          {
            id: '5ec61cce42f7cf581be35807',
            type: 'tips',
            language: 'en',
            name: 'Catalog 1'
          }
        ]}
        single={true}
        sort="name,asc"
      />
    ),
    handleFormik
  )
  .add(
    'no endpoint',
    () => (
      <LookupField
        fieldName="name"
        suggestions={[
          {
            id: '5ec79d19c9a6673b89f1a5eb',
            language: 'en',
            name: 'Catalog 2',
            type: 'tips'
          },
          {
            id: '5ec7abbccee841676f615f41',
            language: 'en',
            name: 'Catalog 5',
            type: 'tips'
          },
          {
            id: '5ec786699f9f2a15139f51cb',
            language: 'en',
            name: 'catalog 11',
            type: 'tips'
          },
          {
            id: '5ecb6c06ed435d1c5ff0994b',
            type: 'tips',
            name: 'catalog1111',
            language: 'en'
          }
        ]}
        sort="name,asc"
      />
    ),
    handleFormik
  )
  .add(
    'no endpoint with selected tags',
    () => (
      <LookupField
        fieldName="name"
        suggestions={[
          {
            id: '5ec79d19c9a6673b89f1a5eb',
            language: 'en',
            name: 'Catalog 2',
            type: 'tips'
          },
          {
            id: '5ec7abbccee841676f615f41',
            language: 'en',
            name: 'Catalog 5',
            type: 'tips'
          },
          {
            id: '5ec786699f9f2a15139f51cb',
            language: 'en',
            name: 'catalog 11',
            type: 'tips'
          },
          {
            id: '5ecb6c06ed435d1c5ff0994b',
            type: 'tips',
            name: 'catalog1111',
            language: 'en'
          }
        ]}
        sort="name,asc"
        selectedTags={[
          {
            id: '5ec61cce42f7cf581be35807',
            type: 'tips',
            language: 'en',
            name: 'Catalog 1'
          },
          {
            id: '5ec79d19c9a6673b89f1a5eb',
            type: 'tips',
            language: 'en',
            name: 'Catalog 2'
          }
        ]}
      />
    ),
    handleFormik
  )
  .add(
    'must select single',
    () => (
      <LookupField
        fieldName="name"
        single={true}
        suggestions={[
          {
            id: '5ec79d19c9a6673b89f1a5eb',
            language: 'en',
            name: 'Catalog 2',
            type: 'tips'
          },
          {
            id: '5ec7abbccee841676f615f41',
            language: 'en',
            name: 'Catalog 5',
            type: 'tips'
          },
          {
            id: '5ec786699f9f2a15139f51cb',
            language: 'en',
            name: 'catalog 11',
            type: 'tips'
          },
          {
            id: '5ecb6c06ed435d1c5ff0994b',
            type: 'tips',
            name: 'catalog1111',
            language: 'en'
          }
        ]}
        sort="name,asc"
        selectedTags={[
          {
            id: '5ec61cce42f7cf581be35807',
            type: 'tips',
            language: 'en',
            name: 'Catalog 1'
          }
        ]}
      />
    ),
    handleFormik
  )
  .add(
    'be error field',
    () => (
      <LookupField
        errorText="This field has error"
        fieldName="name"
        suggestions={[
          {
            id: '5ec79d19c9a6673b89f1a5eb',
            language: 'en',
            name: 'Catalog 2',
            type: 'tips'
          },
          {
            id: '5ec7abbccee841676f615f41',
            language: 'en',
            name: 'Catalog 5',
            type: 'tips'
          },
          {
            id: '5ec786699f9f2a15139f51cb',
            language: 'en',
            name: 'catalog 11',
            type: 'tips'
          },
          {
            id: '5ecb6c06ed435d1c5ff0994b',
            type: 'tips',
            name: 'catalog1111',
            language: 'en'
          }
        ]}
        sort="name,asc"
        selectedTags={[
          {
            id: '5ec61cce42f7cf581be35807',
            type: 'tips',
            language: 'en',
            name: 'Catalog 1'
          }
        ]}
      />
    ),
    handleFormik
  );
