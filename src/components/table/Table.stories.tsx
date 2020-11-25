import React from 'react';
import { storiesOf } from '@storybook/react';
import Table from './Table';

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

const titleList = [
  'ID',
  'Name',
  'Status',
  <div key="123">
    Creator <b>awesome</b>
  </div>,
  'Action',
  'Spinner'
];
const pathList = ['_id', 'name', 'status', 'creator', 'action', 'spinner'];

storiesOf('Table', module)
  .add('default', () => <Table data={data} titleList={titleList} pathList={pathList} dataKey="_id" />)
  .add('resposive', () => (
    <Table data={data} titleList={titleList} pathList={pathList} dataKey="_id" className="table-responsive" />
  ))
  .add('hoverable', () => (
    <Table data={data} titleList={titleList} pathList={pathList} dataKey="_id" className="table-hover" />
  ))
  .add('small', () => (
    <Table data={data} titleList={titleList} pathList={pathList} dataKey="_id" className="table-sm" />
  ));
