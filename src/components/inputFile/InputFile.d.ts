import { FieldValidator } from 'formik';

export type InputType = 'file';

export interface Props {
  name: string;
  maxLength?: number;
  validate?: FieldValidator;
  type?: InputType;
  min?: number;
  step?: string;
  placeholder?: string;
  disabled?: boolean;
  accept?: string;
  id?: string;
  requestUrl?: Function;
}
