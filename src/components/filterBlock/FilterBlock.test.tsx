import React from 'react';
import renderer from 'react-test-renderer';
import FilterBlock from './FilterBlock';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';

describe('component FilterBlock', () => {
  test('renders snapshot correctly', () => {
    const tree = renderer.create(<FilterBlock filterList={['id', 'name', 'this is a very long item']} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('FilterBlock event', () => {
  test('click on filter button', () => {
    const instance = shallow(<FilterBlock className="test" filterList={['id', 'name', 'this is a very long item']} />);
    instance.find('.test > div:first-child').first().simulate('click');
  });

  test('click on filter button', () => {
    const testFunc = jest.fn();

    const instance = shallow(
      <FilterBlock onItemChoose={testFunc} className="test" filterList={['id', 'name', 'this is a very long item']} />
    );
    instance.find('.test > div:first-child').first().simulate('click');
    instance.find('.test > div:last-child > div > div:first-child').first().simulate('click');

    expect(testFunc).toHaveBeenCalled();
  });

  test('outside click', () => {
    interface EventInterface {
      [name: string]: any;
    }

    const event: EventInterface = {};

    const addEventListener = jest.spyOn(document, 'addEventListener').mockImplementation((key, func) => {
      event[key] = func;
    });
    const instance = mount(<FilterBlock className="test" filterList={['id', 'name', 'this is a very long item']} />);

    instance.find('.test > div').first().simulate('click');

    event.click(<div />);
    expect(instance.find('.test > div:last-child > div > div').length).toEqual(0);
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

    const instance = mount(<FilterBlock className="test" filterList={['id', 'name', 'this is a very long item']} />);

    event.click({
      target: ReactDOM.findDOMNode(instance.find('.test').last().instance())
    });
    expect(instance.find('.test>div:last-child>div>div').length).toEqual(0);
    addEventListener.mockRestore();
  });

  test('unmount', () => {
    const removeEvent = jest.spyOn(document, 'removeEventListener');
    const instance = mount(<FilterBlock className="test" filterList={['id', 'name', 'this is a very long item']} />);
    instance.unmount();
    expect(removeEvent).toHaveBeenCalled();
  });
});
