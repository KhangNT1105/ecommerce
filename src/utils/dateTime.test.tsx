import {
  getToday,
  getLast30days,
  getLast7days,
  getLastMonth,
  getLastWeek,
  convertDatePickerToUTC,
  convertDateFromToUTC,
  convertDateToToUTC,
  convertTimeStringToMillisecond,
  convertMillisecondToHHMMSS
} from './dateTime';
import { format } from 'date-fns';
import MockDate from 'mockdate';

import { DATE_TIME_FULL_FORMAT } from '../constants';

const mockTime = 1586883600000;
MockDate.set(mockTime);
const today = new Date();

describe('Utils of date-time testing ... ', () => {
  afterEach(() => {
    MockDate.set(mockTime);
  });

  test('- getToday: get today.', () => {
    const dateFrom = format(new Date(2020, 3, 14, 17, 0, 0), DATE_TIME_FULL_FORMAT);
    const dateTo = format(new Date(2020, 3, 15, 16, 59, 59), DATE_TIME_FULL_FORMAT);
    const expectDateRange = { dateFrom, dateTo };
    const dateRangeToday = getToday();
    expect(dateRangeToday).toStrictEqual(expectDateRange);
  });

  test('- getLast30days: get exactly 30 days ago from picked date.', () => {
    const dateFrom = format(new Date(2020, 2, 15, 17, 0, 0), DATE_TIME_FULL_FORMAT);
    const dateTo = format(new Date(2020, 3, 15, 16, 59, 59), DATE_TIME_FULL_FORMAT);
    const expectDateRange = { dateFrom, dateTo };
    const last30days = getLast30days();
    expect(last30days).toStrictEqual(expectDateRange);
  });

  test('- getLast7days: get exactly 7 days ago from picked date.', () => {
    const dateFrom = format(new Date(2020, 3, 7, 17, 0, 0), DATE_TIME_FULL_FORMAT);
    const dateTo = format(new Date(2020, 3, 15, 16, 59, 59), DATE_TIME_FULL_FORMAT);
    const expectDateRange = { dateFrom, dateTo };
    const last7days = getLast7days();
    expect(last7days).toStrictEqual(expectDateRange);
  });

  test('- getLastMonth get whole last month from this month.', () => {
    const dateFrom = format(new Date(2020, 1, 29, 17, 0, 0), DATE_TIME_FULL_FORMAT);
    const dateTo = format(new Date(2020, 2, 31, 16, 59, 59), DATE_TIME_FULL_FORMAT);
    const expectDateRange = { dateFrom, dateTo };
    const lastMonth = getLastMonth();
    expect(lastMonth).toStrictEqual(expectDateRange);
  });

  test('- getLastWeek: get whole last week from this week.', () => {
    const dateFrom = format(new Date(2020, 3, 4, 17, 0, 0), DATE_TIME_FULL_FORMAT);
    const dateTo = format(new Date(2020, 3, 11, 16, 59, 59), DATE_TIME_FULL_FORMAT);
    const expectDateRange = { dateFrom, dateTo };
    const lastWeek = getLastWeek();
    expect(lastWeek).toStrictEqual(expectDateRange);
  });

  test('- convertDatePickerToUTC: Should convert date from date picker to UTC', () => {
    const DateUTC = convertDatePickerToUTC(today);
    const expectValue = new Date('2020-04-14T10:00:00.000Z');

    expect(DateUTC).toStrictEqual(expectValue);
  });

  test('- convertDateFromToUTC: Should convert dateTo from date picker to UTC', () => {
    const DateUTC = convertDateFromToUTC(today);
    const expectValue = new Date('2020-04-14T10:00:00.000Z');

    expect(DateUTC).toStrictEqual(expectValue);
  });

  test('- convertDateFromToToUTC: Should convert dateTo from date picker to UTC', () => {
    const DateUTC = convertDateToToUTC(today);
    const expectValue = new Date('2020-04-15T09:59:59.000Z');

    expect(DateUTC).toStrictEqual(expectValue);
  });

  test('- convertTimeStringToMillisecond: Should convert date string HH:MM:SS to millisecond', () => {
    const value = convertTimeStringToMillisecond('01:23:20');
    const expectValue = 5000 * 1000;

    expect(value).toStrictEqual(expectValue);
  });
  test('- convertMillisecondToHHMMSS: 2000 -> 00:00:02', () => {
    const value = convertMillisecondToHHMMSS(2000);
    expect(value).toEqual('00:00:02');
  });
  test('- convertMillisecondToHHMMSS: 122000 -> 00:02:02', () => {
    const value = convertMillisecondToHHMMSS(122000);
    expect(value).toEqual('00:02:02');
  });
  test('- convertMillisecondToHHMMSS: 7322000 -> 02:02:02', () => {
    const value = convertMillisecondToHHMMSS(7322000);
    expect(value).toEqual('02:02:02');
  });
});
