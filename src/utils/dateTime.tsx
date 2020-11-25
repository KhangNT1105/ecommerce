import {
  format,
  parse,
  getTime,
  subDays,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfToday,
  endOfToday,
  startOfDay,
  endOfDay
} from 'date-fns';

import { DATE_FORMAT, DATE_TIME_FULL_FORMAT } from 'constants/index';

export type DateRangeType = { from: string | null; to: string | null };

export const formatDate = (timestamp: string) => {
  return format(parse(timestamp, 'T', new Date()), DATE_FORMAT);
};

export type DateRangeProps = {
  dateFrom: string | null;
  dateTo: string | null;
};

/**
 * get timestamp from a string
 * @param: value string
 */
export const getTimestamp = (value: string): number => {
  return getTime(parse(value, DATE_FORMAT, new Date()));
};

export const getUTCDateFn = (date: Date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

/**
 * Description: combine day from DatePicker and local time then convert to UTC Date
 * @param date: from date picker
 * @return: UTC Date
 */
export const convertDatePickerToUTC = (date: Date) => {
  const today = new Date();
  const combineDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  );

  return getUTCDateFn(combineDateTime);
};

/**
 * Description: convert HH:MM:SS string to seconds
 * @param dateString
 * @param second
 */
export const convertTimeStringToMillisecond = (dateString: String) => {
  return (dateString as any).split(':').reduce((acc: any, time: any) => 60 * acc + +time) * 1000;
};

export const convertDateFromToUTC = (date: Date) => {
  const combineDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return getUTCDateFn(startOfDay(combineDateTime));
};

export const convertDateToToUTC = (date: Date) => {
  const combineDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return getUTCDateFn(endOfDay(combineDateTime));
};

export const getToday = (): DateRangeProps => {
  const dateFrom = getUTCDateFn(startOfToday());
  const dateTo = getUTCDateFn(endOfToday());

  return {
    dateFrom: format(dateFrom, DATE_TIME_FULL_FORMAT),
    dateTo: format(dateTo, DATE_TIME_FULL_FORMAT)
  };
};

export const getLast7days = (): DateRangeProps => {
  const dateTo = format(getUTCDateFn(endOfToday()), DATE_TIME_FULL_FORMAT);
  const dateFrom = format(getUTCDateFn(subDays(startOfToday(), 7)), DATE_TIME_FULL_FORMAT);

  return { dateFrom, dateTo };
};

export const getLast30days = (): DateRangeProps => {
  const dateTo = format(getUTCDateFn(endOfToday()), DATE_TIME_FULL_FORMAT);
  const dateFrom = format(getUTCDateFn(subDays(startOfToday(), 30)), DATE_TIME_FULL_FORMAT);

  return { dateFrom, dateTo };
};

export const getLastWeek = (): DateRangeProps => {
  const dateFrom = format(getUTCDateFn(startOfWeek(subDays(startOfToday(), 7))), DATE_TIME_FULL_FORMAT);
  const dateTo = format(getUTCDateFn(endOfWeek(subDays(endOfToday(), 7))), DATE_TIME_FULL_FORMAT);

  return { dateFrom, dateTo };
};

export const getLastMonth = (): DateRangeProps => {
  const dateFrom = format(getUTCDateFn(startOfMonth(subMonths(startOfToday(), 1))), DATE_TIME_FULL_FORMAT);
  const dateTo = format(getUTCDateFn(endOfMonth(subMonths(endOfToday(), 1))), DATE_TIME_FULL_FORMAT);

  return { dateFrom, dateTo };
};

export const convertMillisecondToHHMMSS = (milliseconds: number) => {
  if (!milliseconds) return '';
  const date = new Date(milliseconds);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getSeconds();
  const hours = hh < 10 ? `0${hh}` : `${hh}`;
  const minutes = mm < 10 ? `0${mm}` : `${mm}`;
  const seconds = ss < 10 ? `0${ss}` : `${ss}`;

  return `${hours}:${minutes}:${seconds}`;
};
