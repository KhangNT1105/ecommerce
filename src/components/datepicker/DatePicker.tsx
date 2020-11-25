import React from 'react';
import { FormFeedback } from 'reactstrap';
import ReactDatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { format, parse, isValid } from 'date-fns';
import { Props } from './DatePicker.d';

import { DATE_FORMAT } from 'constants/index';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';
import { CLASS_NAME } from 'constants/enum';

const DatePicker: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [, meta, helpers] = useField({
    name: props.name,
    validate: props.validate
  });
  const { value } = meta;
  const { setValue } = helpers;
  const { dateFormat = DATE_FORMAT, readOnly, isShowYearPicker } = props;
  const invalid = !!(meta.touched && meta.error);

  const handleChangeDate = (date: Date) => {
    if (!isValid(date)) {
      setValue(date);
      return;
    }
    setValue(format(date, dateFormat));
  };
  const parsedDate = parse(value, dateFormat, new Date());
  return (
    <>
      <div className={`date-picker ${!!invalid ? 'invalid' : ''}`}>
        <ReactDatePicker
          className={`form-control ${readOnly ? CLASS_NAME.READONLY : ''}`}
          onChange={handleChangeDate}
          selected={value && isValid(parsedDate) ? parsedDate : null}
          showTimeInput={props.showTimeInput}
          minDate={props.minDate}
          maxDate={props.maxDate}
          placeholderText={props.placeholder}
          readOnly={readOnly}
          dateFormat={dateFormat}
          showMonthYearPicker={isShowYearPicker}
        />
        <span className="icon-calendar" />
      </div>
      {invalid ? <FormFeedback>{t(meta.error || '')}</FormFeedback> : null}
    </>
  );
};

export default DatePicker;
