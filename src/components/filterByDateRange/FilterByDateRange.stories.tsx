import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import FilterByDateRange from './FilterByDateRange';
import { notify } from '../toast/Toast';
import { POSITION } from '../../constants/enum';
import { DateRangeProps } from '../../utils/dateTime';

type DemoProps = {};

const Demo = (props: DemoProps) => {
  // default props

  // method
  const dateRangeChange = (selectedRange: DateRangeProps) => {
    notify.success(`from ${selectedRange.dateFrom} to ${selectedRange.dateTo}`, {
      position: POSITION.BOTTOM_RIGHT
    });
  };

  // render
  return (
    <Row>
      <Col xs="12" sm="12" md="12" lg="12">
        <ToastContainer autoClose={5000} draggable={false} hideProgressBar={true} />
        <FilterByDateRange className="mt-4 mr-4" handlerDateRangeChange={dateRangeChange} />
      </Col>
    </Row>
  );
};

// Stories
storiesOf('Filter by date range component', module).add('Default', () => <Demo />);
