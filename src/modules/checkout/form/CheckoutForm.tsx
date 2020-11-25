import { Form, FormikBag, FormikProps, withFormik } from 'formik';
import React from 'react';
import './CheckoutForm.scss';
import local from 'data/all.json';
import { CheckoutFormValues, CheckoutFormProps, CheckoutFormFieldValues, OtherProps } from '../CheckoutWrapper.d';
import { useTranslation } from 'react-i18next';
import InputField from 'components/field/InputField/InputField';
import { Button, Label } from 'reactstrap';
import { checkValueError, validateRequired } from 'utils/validation';
import CheckoutReport from '../report/CheckoutReport';
import CheckoutPayment from '../payment/CheckoutPayment';
const CheckoutInnerForm = (props: CheckoutFormProps & OtherProps & FormikProps<CheckoutFormValues>) => {
  const { t } = useTranslation();
  const { values, touched, errors, setPaymentType } = props;
  const getDistrictValues = (cityName: string) => {
    const city = local.find((item: any) => item.name === cityName) as any;
    return city.huyen.map((item: any) => ({
      id: item.id,
      value: item.name
    }));
  };
  const getWardValues = (cityName: string, districtName: string) => {
    const city = local.find((item: any) => item.name === cityName) as any;
    const district = city.huyen.find((item: any) => item.name === districtName) as any;
    return district?.xa?.map((item: any) => ({
      id: item.id,
      value: item.name
    }));
  };
  const fields: CheckoutFormFieldValues[] = [
    {
      column: '5',
      label: t('TEN'),
      name: 'firstName',
      id: 'firstNameCheckoutId',
      type: 'text'
    },
    {
      column: '7',
      label: t('HO_TEN_DEM'),
      name: 'lastName',
      id: 'lastNameCheckoutId',
      type: 'text'
    },
    {
      column: '12',
      label: t('PHONE_NUMBER'),
      name: 'phoneNumber',
      id: 'phoneNumberCheckoutId',
      type: 'tel'
    },
    {
      column: '12',
      label: t('CITY'),
      name: 'city',
      id: 'cityCheckoutId',
      type: 'select',
      options: local.map((item: any) => ({
        id: item.id,
        value: item.name
      })),
      placeholder: t('CITY')
    },
    {
      column: '12',
      label: t('DISTRICT'),
      name: 'district',
      id: 'districtCheckoutId',
      type: 'select',
      options: values.city && getDistrictValues(values.city),
      placeholder: t('DISTRICT')
    },
    {
      column: '12',
      label: t('WARD'),
      name: 'ward',
      id: 'wardCheckoutId',
      type: 'select',
      options: values.city && values.district && getWardValues(values.city, values.district),
      placeholder: t('WARD')
    },
    {
      column: '12',
      label: t('ADDRESS'),
      name: 'address',
      id: 'addressCheckoutId',
      type: 'textarea'
    },
    {
      column: '12',
      label: t('NOTES'),
      name: 'notes',
      id: 'notesCheckoutId',
      type: 'textarea'
    }
  ];
  const renderFields = (fields: CheckoutFormFieldValues[]) => {
    return fields.map((item: CheckoutFormFieldValues, index: number) => (
      <div className={`col-md-${item.column} col-12 pb-3`} key={`${item.id}-${index}`}>
        <Label aria-required={true} htmlFor={item.id}>
          {item.label}{' '}
        </Label>
        {item.type === 'select' ? (
          <InputField
            errorText={errors[item.name]}
            touched={touched[item.name]}
            invalid={touched[item.name] && errors[item.name] ? true : false}
            component={item.type}
            id={item.id}
            name={item.name}
          >
            {item.placeholder && (
              <option value="" selected={true} disabled={true} hidden={true}>
                {item.placeholder}
              </option>
            )}
            {item.options &&
              item.options.map((optionItem: any, index: number) => (
                <option value={optionItem.value} key={`${optionItem.id}-${index}`}>
                  {optionItem.value}
                </option>
              ))}
          </InputField>
        ) : item.type === 'textarea' ? (
          <InputField
            errorText={errors[item.name]}
            touched={touched[item.name]}
            invalid={touched[item.name] && errors[item.name] ? true : false}
            component={item.type}
            id={item.id}
            name={item.name}
          />
        ) : (
          <InputField
            type={item.type}
            id={item.id}
            errorText={errors[item.name]}
            touched={touched[item.name]}
            invalid={touched[item.name] && errors[item.name] ? true : false}
            name={item.name}
          />
        )}
      </div>
    ));
  };
  return (
    <Form className="checkoutForm">
      <div className="row">
        <div className="col-12 col-md-7 pb-3 left">
          <h1>{t('CHI_TIET_HOA_DON')}</h1>
          <div className="row">{renderFields(fields)}</div>
        </div>
        <div className="col-12 col-md-5">
          <div className="row">
            <div className="col-12 pb-3">
              <CheckoutReport />
            </div>
            <div className="col-12 pb-3">
              <CheckoutPayment setPaymentType={setPaymentType} />
            </div>
            <div className="col-12">
              <Button type="submit">{t('THANH_TOAN')}</Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
const validateFields = {
  city: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_CITY_REQUIRED'
    }
  ],
  district: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_DISTRICT_REQUIRED'
    }
  ],
  firstName: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_FIRST_NAME_REQUIRED'
    }
  ],
  lastName: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_LAST_NAME_REQUIRED'
    }
  ],
  phoneNumber: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_PHONE_NUMBER_REQUIRED'
    }
  ],
  ward: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_WARD_REQUIRED'
    }
  ],
  address: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_ADDRESS_REQUIRED'
    }
  ]
};
const onSubmit = async (
  values: CheckoutFormValues,
  { setSubmitting, props }: FormikBag<CheckoutFormProps & OtherProps, CheckoutFormValues>
) => {
  props.placeOrder(values);
};
const CheckoutForm = withFormik<CheckoutFormProps & OtherProps, CheckoutFormValues>({
  mapPropsToValues: (props) => {
    return {
      city: '',
      district: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      ward: '',
      notes: '',
      address: ''
    };
  },
  handleSubmit: onSubmit,
  validate: checkValueError(validateFields)
})(CheckoutInnerForm);
export default CheckoutForm;
