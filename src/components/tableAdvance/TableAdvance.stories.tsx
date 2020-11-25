import { storiesOf } from '@storybook/react';
import React from 'react';
import TableAdvance from './TableAdvance';

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
    status: <div style={{ textAlign: 'center' }}>active</div>,
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
    status: <div style={{ textAlign: 'center' }}>active</div>,
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
    status: <div style={{ textAlign: 'center' }}>active</div>,
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
    status: <div style={{ textAlign: 'center' }}>active</div>,
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

const titleList = [
  'ID',
  'Name',
  <div key="123">
    Creator <b>awesome</b>
  </div>,
  'Action',
  'Spinner'
];
const pathList = ['_id', 'name', 'creator', 'action', 'spinner'];

storiesOf('TableAdvance', module).add('default', () => (
  <TableAdvance titleList={titleList} pathList={pathList} data={data} expansionKey="status" />
));
