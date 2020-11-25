import React from 'react';
import TableExpandableBody from './TableExpandableBody';
import { mount } from 'enzyme';
import { testSnapshots } from 'utils/test';

interface SpinnerType {
  spinnerType?: string;
}

const TestSpinner: React.FC<SpinnerType> = ({ spinnerType }) => (
  <div className={`spinner-border text-${spinnerType || 'primary'}`} role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const data = [
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
];

const pathList = ['_id', 'name', 'creator', 'action', 'spinner'];

describe('TableExpandableBody test snapshot', () => {
  testSnapshots(TableExpandableBody, [
    {
      props: {
        data,
        pathList,
        dataKey: '_id',
        expansionKey: 'status'
      },
      description: 'render with props'
    }
  ]);
});

describe('TableExpandableBody test event', () => {
  test('render with openall should have 4 .icon-down', () => {
    const wrapper = mount(
      <TableExpandableBody
        data={data}
        dataKey="_id"
        pathList={pathList}
        expansionKey={'status'}
        isOpenAll={true}
        isCloseAll={false}
      />
    );

    expect(wrapper.find('.icon-down').length).toEqual(4);
  });

  test('render with closeAll should have 4 .icon-right', () => {
    const wrapper = mount(
      <TableExpandableBody
        data={data}
        dataKey="_id"
        pathList={pathList}
        expansionKey={'status'}
        isOpenAll={false}
        isCloseAll={true}
      />
    );

    expect(wrapper.find('.icon-arrow-right').length).toEqual(4);
  });

  test('test simulate click should dispatch next state outside', () => {
    const onToggleRow = jest.fn();

    const wrapper = mount(
      <TableExpandableBody
        data={data}
        pathList={pathList}
        expansionKey={'status'}
        isOpenAll={false}
        isCloseAll={false}
        onToggleRow={onToggleRow}
      />
    );

    wrapper.find('tr').first().simulate('click');

    expect(onToggleRow).toHaveBeenCalledWith(true);
  });
});
