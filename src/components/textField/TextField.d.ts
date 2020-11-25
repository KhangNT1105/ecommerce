import { FieldValidator } from 'formik';
export type InputType =
  | 'text'
  | 'email'
  | 'select'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'button'
  | 'reset'
  | 'submit'
  | 'date'
  | 'datetime-local'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'week'
  | 'password'
  | 'datetime'
  | 'time'
  | 'color';

export interface Props {
  name: string;
  maxLength?: number;
  validate?: FieldValidator;
  type?: InputType;
  min?: number;
  addOn?: string;
  step?: string;
  pattern?: string;
  placeholder?: string;
  disabled?: boolean;
}
