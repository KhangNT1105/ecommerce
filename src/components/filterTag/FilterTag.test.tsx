import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

import { shallow, mount } from 'enzyme';

import FilterTag from './FilterTag';
import { KEY_NAMES } from 'constants/keyCode.type';

describe('<FilterTag />', () => {
  const defaultProps = {
    tagName: 'test',
    suggestionList: ['test1', 'test2'],
    values: ['test1']
  };
  const wrapper = renderer.create(<FilterTag {...defaultProps} />);

  test('render snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('filterTag event', () => {
  const defaultProps = {
    tagName: 'test',
    suggestionList: ['test1', 'test2'],
    values: ['test1']
  };

  test('show input', () => {
    const instance = shallow(<FilterTag {...defaultProps} />);
    instance.find('.dropdown-button').first().simulate('click');
    expect(instance.find('input').length).toEqual(1);
  });

  test('show showSuggestion', () => {
    const instance = shallow(<FilterTag {...defaultProps} />);
    instance.find('.dropdown-button').first().simulate('click');
    instance
      .find('input')
      .first()
      .simulate('change', {
        target: {
          value: 'test'
        }
      });
    expect(instance.find('.filter-tag__input > div > div').length).toEqual(1);
  });

  test('mounting for add event', () => {
    const addEvent = jest.spyOn(document, 'addEventListener');
    mount(<FilterTag {...defaultProps} />);
    expect(addEvent).toHaveBeenCalled();
  });

  test('unmounting for removeEvent', () => {
    const removeEvent = jest.spyOn(document, 'removeEventListener');
    const instance = mount(<FilterTag {...defaultProps} />);
    instance.unmount();
    expect(removeEvent).toHaveBeenCalled();
  });

  test('addValue', () => {
    const props = {
      ...defaultProps,
      addValue: jest.fn()
    };
    const instance = shallow(<FilterTag {...props} />);
    instance.find('.dropdown-button').first().simulate('click');
    instance
      .find('input')
      .first()
      .simulate('change', {
        target: {
          value: 'test'
        }
      });
    instance.find('.filter-tag__input > div > div').first().simulate('click');
    expect(props.addValue).toHaveBeenCalled();
  });

  test('removeValue', () => {
    const props = {
      ...defaultProps,
      removeValue: jest.fn()
    };
    const instance = shallow(<FilterTag {...props} />);
    instance.find('.tag-button').first().simulate('click');
    expect(props.removeValue).toHaveBeenCalled();
  });

  test('outside click', () => {
    interface EventInterface {
      [name: string]: any;
    }

    const event: EventInterface = {};

    const addEventListener = jest.spyOn(document, 'addEventListener').mockImplementation((key, func) => {
      event[key] = func;
    });
    const instance = mount(<FilterTag {...defaultProps} />);
    event.click(<div />);
    expect(instance.find('input').length).toEqual(0);
    addEventListener.mockRestore();
  });

  test('inside click', () => {
    interface EventInterface {
      [name: string]: any;
    }

    const event: EventInterface = {};

    const addEventListener = jest.spyOn(document, 'addEventListener').mockImplementation((key, func) => {
      event[key] = func;
    });
    const instance = mount(<FilterTag {...defaultProps} />);
    event.click({
      target: ReactDOM.findDOMNode(instance.find('.dropdown-button').instance())
    });
    expect(instance.find('input').length).toEqual(0);
    addEventListener.mockRestore();
  });

  test('handleOnKeyDown', () => {
    const props = {
      ...defaultProps,
      addValue: jest.fn()
    };

    const instance = mount(<FilterTag {...props} />);
    instance.find('.dropdown-button').first().simulate('click');

    instance.find('input').simulate('change', { target: { value: 'test' } });
    instance.find('input').simulate('keydown', { key: KEY_NAMES.ENTER });

    expect(props.addValue).toHaveBeenCalled();
  });

  test('handleOnKeyDown with empty value', () => {
    const props = {
      ...defaultProps,
      addValue: jest.fn()
    };

    const instance = mount(<FilterTag {...props} />);
    instance.find('.dropdown-button').first().simulate('click');

    instance.find('input').simulate('keydown', { key: KEY_NAMES.ENTER });

    expect(props.addValue).not.toHaveBeenCalled();
  });
});
