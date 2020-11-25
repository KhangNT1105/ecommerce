import React from 'react';
import { mount } from 'enzyme';

import TableAdvance from './TableAdvance';
import { testSnapshots } from 'utils/test';

jest.mock('../tableExpandableBody/TableExpandableBody', () => 'TableExpandableBody');

interface SpinnerType {
  spinnerType?: string;
}

const TestSpinner: React.FC<SpinnerType> = ({ spinnerType }) => (
  <div className={`spinner-border text-${spinnerType || 'primary'}`} role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const defaultProps = {
  data: [
    {
      _id: 1,
      name: 'Nate',
      status: 'active',
      creator: 'Will Smith',
      action: (
        <div>
          <button className="btn btn-info">Detail</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      ),
      spinner: <TestSpinner />
    },
    {
      _id: 2,
      name: 'River',
      status: 'active',
      creator: 'Will Smith',
      action: (
        <div>
          <button className="btn btn-info">Detail</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      ),
      spinner: <TestSpinner spinnerType="danger" />
    },
    {
      _id: 3,
      name: 'Light',
      status: 'active',
      creator: 'Will Smith',
      action: (
        <div>
          <button className="btn btn-info">Detail</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      ),
      spinner: <TestSpinner spinnerType="info" />
    },
    {
      _id: 4,
      name: 'Jasmine',
      status: 'active',
      creator: 'Will Smith',
      action: (
        <div>
          <button className="btn btn-info">Detail</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      ),
      spinner: <TestSpinner spinnerType="warning" />
    }
  ],
  titleList: [
    'ID',
    'Name',
    <div key="123">
      Creator <b>awesome</b>
    </div>,
    'Action',
    'Spinner'
  ],
  pathList: ['_id', 'name', 'creator', 'action', 'spinner']
};

describe('<TableAdvance />', () => {
  testSnapshots(TableAdvance, [
    {
      props: defaultProps,
      description: 'render with props'
    }
  ]);
});

describe('TableAdvance event', () => {
  test('show all event should show icon down', () => {
    const wrapper = mount(<TableAdvance {...defaultProps} expansionKey="status" />);
    wrapper.find('div').first().simulate('click');
    expect(wrapper.find('div').first().find('.icon-down').length).toEqual(1);
  });

  test('hide all event should show icon right', () => {
    const wrapper = mount(<TableAdvance {...defaultProps} expansionKey="status" />);
    wrapper.find('div').first().simulate('click');
    wrapper.find('div').first().simulate('click');

    expect(wrapper.find('div').first().find('.icon-down').length).toEqual(0);
  });

  test('1 Row show event should show icon down', () => {
    const wrapper = mount(<TableAdvance {...defaultProps} expansionKey="status" />);
    (wrapper.find('TableExpandableBody').first().props() as any).onToggleRow(true);
    wrapper.update();
    expect(wrapper.find('div').first().find('.icon-down').length).toEqual(1);
  });

  test('one Row show then hide event should show icon right', () => {
    const wrapper = mount(<TableAdvance {...defaultProps} expansionKey="status" />);
    (wrapper.find('TableExpandableBody').first().props() as any).onToggleRow(true);
    (wrapper.find('TableExpandableBody').first().props() as any).onToggleRow(false);

    wrapper.update();
    expect(wrapper.find('div').first().find('.icon-down').length).toEqual(0);
  });
});
