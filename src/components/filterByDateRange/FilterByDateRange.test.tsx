import * as React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { format } from 'date-fns';
import MockDate from 'mockdate';

import FilterByDateRange from './FilterByDateRange';
import { testSnapshots } from 'utils/test';
import {
  getToday,
  getLast7days,
  getLast30days,
  getLastWeek,
  getLastMonth,
  convertDateFromToUTC,
  convertDateToToUTC
} from '../../utils/dateTime';
import { DATE_TIME_FULL_FORMAT } from '../../constants';

import { InputGroup, UncontrolledButtonDropdown, DropdownItem } from 'reactstrap';

let container: HTMLElement;
const mockTime = 1586883600000;
MockDate.set(mockTime);
const today: Date = new Date(mockTime);

describe('FilterByDateRange component testing...', () => {
  const dateRangeChange = jest.fn();

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    MockDate.reset();
  });

  testSnapshots(FilterByDateRange, [
    {
      props: {
        className: 'float-right mt-4 mr-4',
        handlerDateRangeChange: dateRangeChange
      },
      description: 'render with default'
    },
    {
      props: {
        selectedDate: today,
        className: 'float-right mt-4 mr-4',
        handlerDateRangeChange: dateRangeChange
      },
      description: 'render with default'
    }
  ]);
});

describe('Test logic', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
    MockDate.set(mockTime);
  });

  test('handle toggle dropdown range', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      selectedDate: today,
      className: 'float-right mt-4 mr-4',
      handlerDateRangeChange: jest.fn()
    };

    const wrapper = shallow(<FilterByDateRange {...props} />);
    const DropdownProps: any = wrapper.find('UncontrolledButtonDropdown').props();
    DropdownProps.toggle();

    expect(setState).toHaveBeenCalledWith(true);
  });

  test('handle date range select box', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      selectedDate: today,
      className: 'float-right mt-4 mr-4',
      handlerDateRangeChange: jest.fn()
    };
    const defaultExpect = {
      dateFrom: null,
      dateTo: null
    };

    const wrapper = shallow(<FilterByDateRange {...props} />);
    const Dropdown: any = wrapper.find('UncontrolledButtonDropdown');
    const DropdownMenu: any = Dropdown.find('DropdownMenu');

    const SelectItems = DropdownMenu.childAt(0);
    SelectItems.simulate('click');
    expect(setState).toHaveBeenCalledWith(defaultExpect);

    const todayItems = DropdownMenu.childAt(1);
    todayItems.simulate('click');
    expect(setState).toHaveBeenCalledWith(getToday());

    const Last7DaysItems = DropdownMenu.childAt(2);
    Last7DaysItems.simulate('click');
    expect(setState).toHaveBeenCalledWith(getLast7days());

    const Last30DaysItems = DropdownMenu.childAt(3);
    Last30DaysItems.simulate('click');
    expect(setState).toHaveBeenCalledWith(getLast30days());

    const LastWeekItems = DropdownMenu.childAt(4);
    LastWeekItems.simulate('click');
    expect(setState).toHaveBeenCalledWith(getLastWeek());

    const LastMonthItems = DropdownMenu.childAt(5);
    LastMonthItems.simulate('click');
    expect(setState).toHaveBeenCalledWith(getLastMonth());

    const CustomItems = DropdownMenu.childAt(6);
    CustomItems.simulate('click');
    expect(setState).toHaveBeenCalledWith(defaultExpect);
  });

  test('handle date picker specify date from', () => {
    const defaultValue = {
      dateFrom: null,
      dateTo: null
    };
    const props = {
      selectedDate: today,
      className: 'float-right mt-4 mr-4',
      handlerDateRangeChange: jest.fn()
    };
    const event = {
      preventDefault: jest.fn()
    };
    const expectedValue = {
      dateFrom: format(convertDateFromToUTC(new Date(mockTime)), DATE_TIME_FULL_FORMAT),
      dateTo: null
    };

    const wrapper = mount(<FilterByDateRange {...props} />);
    const Dropdown: any = wrapper.find(UncontrolledButtonDropdown);
    const dropdownItem: any = Dropdown.find(DropdownItem);

    const CustomItems = dropdownItem;
    CustomItems.at(6).simulate('click');

    wrapper.update();

    const DatePicker: any = wrapper.find(InputGroup);
    const fromDatePicker = DatePicker.first().props().children.props;
    fromDatePicker.onChangeRaw(event);
    fromDatePicker.onChange(today);

    wrapper.mount();

    expect(props.handlerDateRangeChange).toHaveBeenCalledWith(expectedValue);

    const closeBtn: any = wrapper.find('.react-datepicker__close-icon');
    closeBtn.simulate('click');

    expect(props.handlerDateRangeChange).toHaveBeenCalledWith(defaultValue);
  });

  test('handle date picker specify date to', () => {
    const defaultValue = {
      dateFrom: null,
      dateTo: null
    };
    const props = {
      selectedDate: today,
      className: 'float-right mt-4 mr-4',
      handlerDateRangeChange: jest.fn()
    };
    const event = {
      preventDefault: jest.fn()
    };
    const expectedValue = {
      dateFrom: null,
      dateTo: format(convertDateToToUTC(new Date(mockTime)), DATE_TIME_FULL_FORMAT)
    };

    const wrapper = mount(<FilterByDateRange {...props} />);
    const Dropdown: any = wrapper.find(UncontrolledButtonDropdown);
    const dropdownItem: any = Dropdown.find(DropdownItem);

    const CustomItems = dropdownItem;
    CustomItems.at(6).simulate('click');

    wrapper.update();

    const DatePicker: any = wrapper.find(InputGroup);
    const toDatePicker = DatePicker.at(2).props().children.props;
    toDatePicker.onChangeRaw(event);
    toDatePicker.onChange(today);
    wrapper.mount();

    expect(props.handlerDateRangeChange).toHaveBeenCalledWith(expectedValue);

    const closeBtn: any = wrapper.find('.react-datepicker__close-icon');
    closeBtn.simulate('click');

    expect(props.handlerDateRangeChange).toHaveBeenCalledWith(defaultValue);
  });
});
