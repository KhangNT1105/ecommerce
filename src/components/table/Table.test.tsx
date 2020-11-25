import React from 'react';
import renderer from 'react-test-renderer';

import Table from './Table';
import { testSnapshots } from 'utils/test';

interface SpinnerType {
  spinnerType?: string;
}

const TestSpinner: React.FC<SpinnerType> = ({ spinnerType }) => (
  <div className={`spinner-border text-${spinnerType || 'primary'}`} role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

describe('<Table /> snapshot', () => {
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
      {
        className: 'name',
        cellRender: 'Name'
      },
      'Status',
      <div key="123">
        Creator <b>awesome</b>
      </div>,
      'Action',
      'Spinner'
    ],
    pathList: ['_id', 'name', 'status', 'creator', 'action', 'spinner']
  };
  const wrapper = renderer.create(<Table {...defaultProps} />);

  test('render snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  testSnapshots(Table, [
    {
      props: {
        ...defaultProps,
        data: []
      },
      description: 'test with empty data'
    }
  ]);
});
