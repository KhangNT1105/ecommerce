import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { testSnapshots } from '../../utils/test';
import Paginations from './Paginations';

const exampleItems = [...Array(300).keys()].map((i) => ({
  id: i + 1,
  name: `Item + ${i + 1}`
}));

const defaultProps = {
  handlePagination: jest.fn(),
  totals: exampleItems.length
};

const e = {
  preventDefault: jest.fn()
};
describe('<Paginations />', () => {
  testSnapshots(Paginations, [
    {
      props: { ...defaultProps },
      description: 'render snapshot correctly'
    },
    {
      props: { ...defaultProps, isShowGoTo: false },
      description: 'do not render go To when isShowGoTo is false'
    }
  ]);
});

describe('Test Logic', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test('should set to go to maximum page if current value is larger than maximum page', () => {
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const instance = mount(<Paginations {...props} />);
    instance.find('.page-link').at(3).simulate('click');
    instance.mount();
    instance.setProps({ totals: 5 });
    expect((instance.find('.go-to-container').children('input').instance() as any).value).toBe('1');
  });

  test('should set to go to page 1 if page size is set', () => {
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const event = {
      target: {
        value: '3'
      }
    };
    jest.doMock('./showRow/ShowRow', () => 'ShowRow');
    const instance = mount(<Paginations {...props} />);
    instance.find('input').simulate('change', event);
    (instance.find('ShowRow').props() as any).setCurrentSize(50);
    instance.mount();

    expect(instance.find('input').props().value).toBe(1);
  });

  test('should go to previous page when click previous pagination', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      ...defaultProps
    };
    const wrapper = shallow(<Paginations {...props} />);
    wrapper.find('.prev-pagination').children('PaginationLink').simulate('click', e);
    expect(setState).toHaveBeenCalledWith({
      currentPage: 1,
      endIndex: -1,
      endPage: 5,
      from: 1,
      pageSize: 15,
      pages: [1, 2, 3, 4, 5],
      startIndex: -15,
      startPage: 1,
      to: 15,
      totalItems: 300,
      totalPages: 20
    });
    expect(setState).toHaveBeenCalledWith(0);
  });
  test('should go to first page when click first pagination', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      ...defaultProps
    };
    const wrapper = shallow(<Paginations {...props} />);
    wrapper.find('.first-pagination').children('PaginationLink').simulate('click', e);
    expect(setState).toHaveBeenCalledWith({
      currentPage: 1,
      endIndex: 14,
      endPage: 5,
      from: 1,
      pageSize: 15,
      pages: [1, 2, 3, 4, 5],
      startIndex: 0,
      startPage: 1,
      to: 15,
      totalItems: 300,
      totalPages: 20
    });
    expect(setState).toHaveBeenCalledWith(1);
  });

  test('should go to next page when click next pagination', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      ...defaultProps
    };
    const wrapper = shallow(<Paginations {...props} />);
    wrapper.find('.next-pagination').children('PaginationLink').simulate('click', e);
    expect(setState).toHaveBeenCalledWith({
      currentPage: 2,
      endIndex: 29,
      endPage: 5,
      from: 16,
      pageSize: 15,
      pages: [1, 2, 3, 4, 5],
      startIndex: 15,
      startPage: 1,
      to: 30,
      totalItems: 300,
      totalPages: 20
    });
    expect(setState).toHaveBeenCalledWith(2);
  });

  test('should go to last page when click last pagination', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      ...defaultProps
    };
    const wrapper = shallow(<Paginations {...props} />);
    wrapper.find('.last-pagination').children('PaginationLink').simulate('click', e);
    expect(setState).toHaveBeenCalledWith({
      currentPage: 1,
      endIndex: -1,
      endPage: 5,
      from: 1,
      pageSize: 15,
      pages: [1, 2, 3, 4, 5],
      startIndex: -15,
      startPage: 1,
      to: 15,
      totalItems: 300,
      totalPages: 20
    });
    expect(setState).toHaveBeenCalledWith(0);
  });

  test('should set value undefine when focus go to ', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const wrapper = shallow(<Paginations {...props} />);
    wrapper.find('.go-to-container').children('input').simulate('focus');
    expect(setState).toHaveBeenCalledWith('');
  });

  test('should set value undefine when focus go to ', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const wrapper = shallow(<Paginations {...props} />);
    wrapper.find('.go-to-container').children('input').simulate('focus');
    expect(setState).toHaveBeenCalledWith('');
  });

  describe('go to box handling', () => {
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };

    const instance = mount(<Paginations {...props} />);
    instance.update();
    instance.mount();
    const input = instance.find('.go-to-container').children('input');

    const onBlurInput = (input.props() as any).onBlur;
    afterEach(() => {
      defaultProps.handlePagination.mockClear();
    });

    test('should call maximum page when the value exeeds it', () => {
      onBlurInput({
        currentTarget: {
          value: '1000'
        }
      });
      expect(defaultProps.handlePagination).toHaveBeenCalledWith(20, 15);
    });

    test('should not call handlePagination when input negative number', () => {
      onBlurInput({
        currentTarget: {
          value: '-1'
        }
      });
      expect(defaultProps.handlePagination).not.toHaveBeenCalled();
    });

    test('should call value when it is between 1 and maximum page exclusively', () => {
      onBlurInput({
        currentTarget: {
          value: '3'
        }
      });
      expect(defaultProps.handlePagination).toHaveBeenCalledWith(3, 15);
    });
  });

  test('should return the page list from 2 -> 6 when page 4 is chosen', () => {
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const instance = mount(<Paginations {...props} />);
    const setPage = (instance.find('.page-item .page-link').at(5).props() as any).onClick;
    setPage({ preventDefault: jest.fn() });
    instance.mount();

    expect(instance.find('.page-item .page-link').at(2).text()).toBe('2');
    expect(instance.find('.page-item .page-link').at(6).text()).toBe('6');
  });

  test('should return the page list from 1 -> 5 when page 3 is chosen', () => {
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const instance = mount(<Paginations {...props} />);
    const setPage = (instance.find('.page-item .page-link').at(4).props() as any).onClick;
    setPage({ preventDefault: jest.fn() });
    instance.mount();

    expect(instance.find('.page-item .page-link').at(2).text()).toBe('1');
    expect(instance.find('.page-item .page-link').at(6).text()).toBe('5');
  });

  test('should return the page list from 6->10 when page 8 is chosen', () => {
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const instance = mount(<Paginations {...props} />);
    (instance.find('input').props() as any).onBlur({
      currentTarget: { value: '8' }
    });
    instance.mount();

    expect(instance.find('.page-item .page-link').at(2).text()).toBe('6');
    expect(instance.find('.page-item .page-link').at(6).text()).toBe('10');
  });

  test('should return the page list from 8 -> 20(last page) when page 11 is chosen', () => {
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const instance = mount(<Paginations {...props} />);
    (instance.find('input').props() as any).onBlur({
      currentTarget: { value: '11' }
    });
    instance.mount();

    expect(instance.find('.page-item .page-link').at(2).text()).toBe('9');
    expect(instance.find('.page-item .page-link').at(6).text()).toBe('13');
  });

  test('should not change current page list when input invalid value', () => {
    const props = {
      ...defaultProps,
      isShowGoTo: true
    };
    const instance = mount(<Paginations {...props} />);
    defaultProps.handlePagination.mockClear();

    (instance.find('input').props() as any).onBlur({
      currentTarget: { value: 'abcde' }
    });
    instance.mount();
    expect(defaultProps.handlePagination).not.toHaveBeenCalled();

    expect(instance.find('.page-item .page-link').at(2).text()).toBe('1');
    expect(instance.find('.page-item .page-link').at(6).text()).toBe('5');
  });
});
