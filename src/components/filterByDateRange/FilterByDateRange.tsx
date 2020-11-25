import React, { useState, useEffect } from 'react';
import { InputGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import { format } from 'date-fns';

import DatePickerAddonInput from 'components/datePickerAddonInput/datePickerAddonInput';
import Config from '../../config';
import { CATING_DATE_OF_BIRTH_FORMAT, DATE_TIME_FULL_FORMAT } from '../../constants';
import { DATE_RANGE } from '../../constants/enum';
import { classConcat } from '../../utils/common';
import {
  getToday,
  getLast7days,
  getLast30days,
  getLastWeek,
  getLastMonth,
  DateRangeProps,
  convertDateFromToUTC,
  convertDateToToUTC
} from '../../utils/dateTime';

import './FilterByDateRange.scss';
import { Props, StateType, DateRangeData } from './FilterByDateRange.d';

// init
setDefaultLocale(Config.LANG);

// Component
const FilterByDateRange: React.FC<Props> = ({
  dateFormat = CATING_DATE_OF_BIRTH_FORMAT,
  className = '',
  handlerDateRangeChange,
  classNameDateFrom = '',
  classNameDateTo = '',
  classNameSelectBox = ''
}) => {
  const { t } = useTranslation();
  const rangeData: DateRangeData[] = [
    {
      rangeText: t('SELECT_RANGE'),
      rangeValue: ''
    },
    {
      rangeText: t('TODAY'),
      rangeValue: DATE_RANGE.TODAY
    },
    {
      rangeText: t('LAST_7_DAYS'),
      rangeValue: DATE_RANGE.LAST_7_DAYS
    },
    {
      rangeText: t('LAST_30_DAYS'),
      rangeValue: DATE_RANGE.LAST_30_DAYS
    },
    {
      rangeText: t('LAST_WEEK'),
      rangeValue: DATE_RANGE.LAST_WEEK
    },
    {
      rangeText: t('LAST_MONTH'),
      rangeValue: DATE_RANGE.LAST_MONTH
    },
    {
      rangeText: t('CUSTOM_RANGE'),
      rangeValue: DATE_RANGE.CUSTOM_DATE
    }
  ];

  let dateRange: DateRangeProps = { dateFrom: null, dateTo: null };
  const maxDate = new Date();
  const minDate = null;

  // default props
  const initState: StateType = {
    dateFrom: null,
    dateTo: null,
    maxDateFrom: maxDate,
    maxDateTo: maxDate,
    minDateTo: minDate,
    isDateRangeOpen: false,
    showCustomRange: false,
    selectedDateRangeText: t('SELECT_RANGE')
  };

  const [showCustomRange, setShowCustomRange] = useState(initState.showCustomRange);
  const [maxDateFrom, setMaxDateFrom] = useState(initState.maxDateFrom);
  const [maxDateTo] = useState(initState.maxDateTo);
  const [minDateTo, setMinDateTo] = useState(initState.minDateTo);
  const [dateFromState, setDateFromState] = useState(initState.dateFrom);
  const [dateToState, setDateToState] = useState(initState.dateTo);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(initState.isDateRangeOpen);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState(initState.selectedDateRangeText);
  const [dateRangeState, setDateRangeState] = useState(dateRange);
  const [changeDateStatus, setChangeDateStatus] = useState(false);

  // methods
  const toggleDropDown = () => {
    setIsDateRangeOpen(!isDateRangeOpen);
  };

  const handleClearDate = (date: Date | null, type: string) => {
    if (type === 'from') {
      dateToState && (dateRange.dateTo = format(new Date(convertDateToToUTC(dateToState)), DATE_TIME_FULL_FORMAT));
      setDateFromState(date);
      setMinDateTo(null);
    } else {
      dateFromState &&
        (dateRange.dateFrom = format(new Date(convertDateFromToUTC(dateFromState)), DATE_TIME_FULL_FORMAT));
      setDateToState(date);
      setMaxDateFrom(maxDate);
    }
  };

  // handle event
  const handleDate = (date: Date | null, type: string) => {
    setChangeDateStatus(true);

    if (date) {
      if (type === 'from') {
        const dateFrom = convertDateFromToUTC(date);
        dateRange.dateFrom = format(dateFrom, DATE_TIME_FULL_FORMAT);
        dateToState && (dateRange.dateTo = format(new Date(convertDateToToUTC(dateToState)), DATE_TIME_FULL_FORMAT));
        setDateFromState(date);
        setMinDateTo(date);
      } else {
        const dateTo = convertDateToToUTC(date);
        dateRange.dateTo = format(dateTo, DATE_TIME_FULL_FORMAT);
        dateFromState &&
          (dateRange.dateFrom = format(new Date(convertDateFromToUTC(dateFromState)), DATE_TIME_FULL_FORMAT));
        setDateToState(date);
        setMaxDateFrom(date);
      }
    } else {
      handleClearDate(date, type);
    }

    if (selectedDateRangeText !== t('CUSTOM_RANGE')) {
      setSelectedDateRangeText(t('CUSTOM_RANGE'));
    }

    setDateRangeState(dateRange);
  };

  const handleDateRange = (item: { rangeText: string; rangeValue: string }) => {
    setChangeDateStatus(true);
    setShowCustomRange(false);
    setSelectedDateRangeText(item.rangeText);

    // get date range
    switch (item.rangeValue) {
      case '':
        selectedDateRangeText === t('SELECT_RANGE') && setChangeDateStatus(false);
        break;
      case DATE_RANGE.TODAY:
        dateRange = getToday();
        break;
      case DATE_RANGE.LAST_7_DAYS:
        dateRange = getLast7days();
        break;
      case DATE_RANGE.LAST_30_DAYS:
        dateRange = getLast30days();
        break;
      case DATE_RANGE.LAST_WEEK:
        dateRange = getLastWeek();
        break;
      case DATE_RANGE.LAST_MONTH:
        dateRange = getLastMonth();
        break;
      case DATE_RANGE.CUSTOM_DATE:
        setShowCustomRange(true);
        break;
    }

    setDateFromState(null);
    setDateToState(null);
    setMaxDateFrom(maxDate);
    setMinDateTo(null);
    setDateRangeState(dateRange);
  };

  useEffect(() => {
    handlerDateRangeChange && changeDateStatus && handlerDateRangeChange(dateRangeState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRangeState]);

  // render
  const renderDropDown = () => {
    return (
      <UncontrolledButtonDropdown isOpen={isDateRangeOpen} className={classNameSelectBox} toggle={toggleDropDown}>
        <DropdownToggle caret={true} color="secondary" size="sm" outline={true}>
          {selectedDateRangeText}
        </DropdownToggle>
        <DropdownMenu persist={false}>
          {rangeData.map((item, index) => (
            <DropdownItem
              key={`range-${index.toString()}`}
              onClick={() => {
                handleDateRange(item);
              }}
            >
              {item.rangeText}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    );
  };

  const renderInput = () => {
    return (
      <>
        <div className="custom-range-wrapper mb-3 mb-sm-0">
          <InputGroup className={classConcat(['from-date', classNameDateFrom])}>
            <DatePicker
              dateFormat={dateFormat}
              selected={dateFromState}
              onChange={(date) => {
                handleDate(date, 'from');
              }}
              onChangeRaw={(event) => {
                event.preventDefault();
              }}
              maxDate={maxDateFrom}
              customInput={<DatePickerAddonInput />}
              isClearable={true}
              placeholderText={t('FROM_LABEL')}
            />
          </InputGroup>
          <InputGroup className={classConcat(['to-date', classNameDateTo])}>
            <DatePicker
              dateFormat={dateFormat}
              selected={dateToState}
              onChange={(date) => {
                handleDate(date, 'to');
              }}
              onChangeRaw={(event) => {
                event.preventDefault();
              }}
              minDate={minDateTo}
              maxDate={maxDateTo}
              customInput={<DatePickerAddonInput />}
              isClearable={true}
              placeholderText={t('TO_LABEL')}
            />
          </InputGroup>
        </div>
      </>
    );
  };

  return (
    <div className={classConcat(['filter-by-daterange-wrapper', className])}>
      {showCustomRange && renderInput()}
      {renderDropDown()}
    </div>
  );
};

export default FilterByDateRange;
