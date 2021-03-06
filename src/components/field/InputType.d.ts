import { FormEventHandler } from 'react';

export type TInputTextType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'email'
  | 'date'
  | 'datetime'
  | 'datetime-local'
  | 'file'
  | 'image'
  | 'hidden'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'select'
  | 'submit'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'time'
  | 'url'
  | 'week';

export type TCustomInputType = 'checkbox' | 'radio' | 'range' | 'switch';

interface IDefaultInputType {
  addonAppendInput?: any;
  addonPrependInput?: any;
  children?: any;
  component?: string;
  disabled?: boolean;
  errorText?: string;
  id: string;
  invalid?: boolean;
  name: string;
  style?: object;
  touched?: boolean;
  value?: string | [] | number;
  maxLength?: number;
  readOnly?: boolean;
  max?: number | string;
  min?: number | string;
}
export interface IInputFieldProps extends IDefaultInputType {
  checked?: boolean;
  label?: string; // for input type is radio or checkbox
  multiple?: boolean;
  placeholder?: string;
  type?: TInputTextType;
  updateOnValueChange?: boolean;
}
export interface ICustomInputFieldProps extends IDefaultInputType {
  checked?: boolean;
  label: string;
  type: TCustomInputType;
}

export interface ICustomInputEvent {
  onChange?: FormEventHandler<HTMLInputElement>;
  onKeyDown?: FormEventHandler<HTMLInputElement>;
}

export type TimeOutType = number | null | any;
export type TTargetOption = {
  [key: string]: {
    selected: boolean;
    value: number | string | object;
  };
};
