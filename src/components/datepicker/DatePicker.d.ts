import { FieldValidator } from 'formik';

export interface Props {
  name: string;
  showTimeInput?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  validate?: FieldValidator;
  placeholder?: string;
  dateFormat?: string;
  readOnly?: boolean;
  isShowYearPicker?: boolean;
}
