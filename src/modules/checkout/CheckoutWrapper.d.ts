import { TInputTextType } from 'components/field/InputType';
import { Object } from 'lodash';

export type CheckoutFieldName =
  | 'firstName'
  | 'lastName'
  | 'phoneNumber'
  | 'city'
  | 'district'
  | 'ward'
  | 'address'
  | 'notes';
export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  notes?: string;
}
export interface OtherProps {
  setPaymentType: (value: string) => void;
  placeOrder: (values: CheckoutFormValues) => void;
}
export interface CheckoutFormProps {
  message?: string;
}
export interface CheckoutFormFieldValues {
  column: string;
  label: string;
  name: CheckoutFieldName;
  id: string;
  type: TInputTextType;
  options?: any[];
  placeholder?: string;
}
export interface CheckoutPaymentProps {
  setPaymentType: (value: string) => void;
}
